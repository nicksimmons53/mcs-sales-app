import React from "react";
import { Box, Divider, Heading, HStack, ScrollView, Select } from "native-base";
import Toolbar from "../components/toolbar";
import CabinetDetailsForm from "../forms/cabinetDetailsForm";
import CarpetDetailsForm from "../forms/carpetDetailsForm";
import CountertopDetailsForm from "../forms/countertopDetailsForm";
import TileDetailsForm from "../forms/tileDetailsForm";
import WoodVinylDetailsForm from "../forms/woodVinylDetailsForm";

export default function ProgramDetails({ navigation, route }) {
  const clientId = route.params?.clientId;
  const [form, setForm] = React.useState(null);
  const [programs, setPrograms] = React.useState(route.params.programs);

  return (
    <HStack flex={1} justifyContent={"flex-start"} pt={5}>
      <Toolbar navigation={navigation} route={route} />
      <ScrollView flex={1} p={5}>
        <HStack justifyContent={"space-between"}>
          <Heading>Program Details</Heading>
          <Box alignItems={"flex-end"}>
            <Select
              onValueChange={itemValue => setForm(itemValue)}
              placeholder={"Select Program"}
              selectedValue={form}
              w={"35%"}>
              <Select.Item label={"Cabinets"} value={"Cabinets"} />
              <Select.Item label={"Carpet"} value={"Carpet"} />
              <Select.Item label={"Countertops"} value={"Countertops"} />
              <Select.Item label={"Tile"} value={"Tile"} />
              <Select.Item label={"Wood and Vinyl"} value={"Wood and Vinyl"} />
            </Select>
          </Box>
        </HStack>
        <Divider bg={"coolGray.400"} />

        {form === "Cabinets" && (
          <CabinetDetailsForm
            programs={programs}
            clientId={clientId}
            navigation={navigation}
          />
        )}
        {form === "Carpet" && (
          <CarpetDetailsForm
            programs={programs}
            navigation={navigation}
            clientId={clientId}
          />
        )}
        {form === "Countertops" && (
          <CountertopDetailsForm
            programs={programs}
            navigation={navigation}
            clientId={clientId}
          />
        )}
        {form === "Tile" && (
          <TileDetailsForm
            programs={programs}
            navigation={navigation}
            clientId={clientId}
          />
        )}
        {form === "Wood and Vinyl" && (
          <WoodVinylDetailsForm
            programs={programs}
            navigation={navigation}
            clientId={clientId}
          />
        )}
      </ScrollView>
    </HStack>
  );
}
