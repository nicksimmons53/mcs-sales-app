import React from "react";
import { Box, Center, Divider, IconButton, Image, VStack } from "native-base";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { useDispatch } from "react-redux";
import { clearToken } from "../features/auth/authSlice";

export default function Toolbar({ navigation, route }) {
  const dispatch = useDispatch();

  const NavIcon = () => {
    if (
      (route !== undefined && route.name === "ClientDetails") ||
      (route !== undefined && route.name === "ProgramDetails") ||
      (route !== undefined && route.name === "ProgramPricing")
    ) {
      return (
        <IconButton
          icon={
            <FontAwesome5
              name={"arrow-left"}
              size={24}
              color={"#fafaf9"}
              flex={1}
            />
          }
          width={"100%"}
          my={2.5}
          onPress={() => navigation.goBack()}
        />
      );
    }

    return (
      <IconButton
        icon={
          <FontAwesome5 name={"home"} size={24} color={"#fafaf9"} flex={1} />
        }
        width={"100%"}
        my={2.5}
        onPress={() => navigation.popToTop()}
      />
    );
  };

  return (
    <VStack
      alignItems={"center"}
      bg={"coolGray.800"}
      borderRightRadius={"md"}
      my={2}>
      <Box my={2}>
        <Image
          alt={"Logo"}
          borderRadius={"md"}
          size={50}
          source={require("./logo.png")}
        />
      </Box>

      <Divider />

      <Box>
        <NavIcon />
        <Divider />
      </Box>

      <Divider />

      <Box justifyContent={"flex-start"}>
        <IconButton
          icon={<FontAwesome5 name={"question"} size={24} color={"#fafaf9"} />}
          width={"100%"}
          my={2.5}
        />
      </Box>

      <Box flex={1} justifyContent={"flex-end"}>
        <IconButton
          icon={
            <FontAwesome5
              name={"sign-out-alt"}
              size={24}
              color={"#dc2626"}
              flex={1}
            />
          }
          m={2.5}
          mb={10}
          onPress={() => dispatch(clearToken())}
        />
      </Box>
    </VStack>
  );
}
