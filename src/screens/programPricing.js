import React, { Suspense } from "react";
import { Box, Divider, Heading, HStack, ScrollView, Select } from "native-base";
import Toolbar from "../components/toolbar";
import CarpetPricingForm from "../forms/carpetPricingForm";
import CabinetPricingForm from "../forms/cabinetPricingForm";
import CountertopsPricingForm from "../forms/countertopsPricingForm";
import WoodPricingForm from "../forms/woodPricingForm";
import VinylPricingForm from "../forms/vinylPricingForm";

export default function ProgramPricing({ navigation, route }) {
  const clientId = route.params?.clientId;
  const [form, setForm] = React.useState(null);
  const [programs, setPrograms] = React.useState(route.params.programs);

  const TilePricingForm = React.lazy(() => import("../forms/tilePricingForm"));

  return (
    <HStack flex={1} justifyContent={"flex-start"} pt={5}>
      <Toolbar navigation={navigation} route={route} />
      <ScrollView flex={1} p={5}>
        <HStack justifyContent={"space-between"}>
          <Heading>Program Pricing</Heading>
          <Box alignItems={"flex-end"}>
            <Select
              onValueChange={itemValue => setForm(itemValue)}
              placeholder={"Select Program"}
              selectedValue={form}
              w={"35%"}>
              <Select.Item label={"Cabinets"} value={"Cabinets"} />
              <Select.Item label={"Carpet"} value={"Carpet"} />
              <Select.Item label={"Countertops"} value={"Countertops"} />
              <Select.Item label={"LVP"} value={"LVP"} />
              <Select.Item label={"Tile"} value={"Tile"} />
              <Select.Item label={"Wood"} value={"Wood"} />
            </Select>
          </Box>
        </HStack>
        <Divider bg={"coolGray.400"} />

        {form === "Cabinets" && (
          <CabinetPricingForm clientId={clientId} programs={programs} />
        )}
        {form === "Carpet" && (
          <CarpetPricingForm clientId={clientId} programs={programs} />
        )}
        {form === "Countertops" && (
          <CountertopsPricingForm clientId={clientId} programs={programs} />
        )}
        {form === "LVP" && (
          <VinylPricingForm clientId={clientId} programs={programs} />
        )}
        {form === "Tile" && (
          <Suspense fallback={<Box>Loading....</Box>}>
            <TilePricingForm clientId={clientId} programs={programs} />
          </Suspense>
        )}
        {form === "Wood" && (
          <WoodPricingForm clientId={clientId} programs={programs} />
        )}
      </ScrollView>
    </HStack>
  );
}
