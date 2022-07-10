import React from "react";
import { Center, HStack, Spinner } from "native-base";
import Toolbar from "../components/toolbar";

export default function Loading({ navigation }) {
  return (
    <HStack flex={1} justifyContent={"flex-start"} pt={5}>
      {navigation !== undefined && <Toolbar navigation={navigation} />}
      <Center flex={1}>
        <Spinner size={"lg"} />
      </Center>
    </HStack>
  );
}
