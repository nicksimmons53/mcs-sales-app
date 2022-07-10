import React from "react";
import { Center, useColorModeValue } from "native-base";

export default function Layout({ children }) {
  return (
    <Center
      w={"100%"}
      h={"100%"}
      bg={useColorModeValue("warmGray.50", "coolGray.800")}>
      {children}
    </Center>
  );
}
