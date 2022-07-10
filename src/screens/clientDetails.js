import React from "react";
import {
  Center,
  Divider,
  Heading,
  HStack,
  ScrollView,
  Text,
} from "native-base";
import Toolbar from "../components/toolbar";
import AccountingInfoForm from "../forms/accountingInfoForm";
import ExpeditingInfoForm from "../forms/expeditingInfoForm";
import { useGetClientDetailsQuery } from "../services/client";
import Loading from "./loading";

export default function ClientDetails({ navigation, route }) {
  const clientId = route.params?.clientId;
  const { data, error, isLoading } = useGetClientDetailsQuery(clientId);

  if (data === undefined || isLoading) {
    return <Loading navigation={navigation} />;
  }

  if (Object.keys(data).length === 0 || error) {
    return (
      <HStack flex={1} justifyContent={"flex-start"} pt={5}>
        <Toolbar navigation={navigation} route={route} />
        <ScrollView flex={1} p={5}>
          <Heading>Client Details</Heading>
          <Divider bg={"coolGray.400"} />
          <Center>
            <Text color={"danger.500"}>No data was found. This is an error.</Text>
            <Text color={"danger.500"}>Please report this.</Text>
          </Center>
        </ScrollView>
      </HStack>
    );
  }

  return (
    <HStack flex={1} justifyContent={"flex-start"} pt={5}>
      <Toolbar navigation={navigation} route={route} />
      <ScrollView flex={1} p={5}>
        <Heading>Client Details</Heading>
        <Divider bg={"coolGray.400"} />

        <AccountingInfoForm data={data.tables.accounting_details} clientId={clientId} />
        <ExpeditingInfoForm data={data.tables.expediting_details} clientId={clientId} />
      </ScrollView>
    </HStack>
  );
}
