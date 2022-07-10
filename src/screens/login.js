import React from "react";
import Auth0 from "react-native-auth0";
import {
  Button,
  Center,
  Divider,
  Heading,
  Stack,
  useColorModeValue,
} from "native-base";
import Config from "react-native-config";
import { useDispatch, useSelector } from "react-redux";
import { saveToken, setLoading, setUser } from "../features/auth/authSlice";
import Layout from "../components/layout";

const auth0 = new Auth0({
  domain: Config.AUTH0_DOMAIN,
  clientId: Config.AUTH0_CLIENT_ID,
});

export default function Login() {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);

  const login = () => {
    dispatch(setLoading());

    auth0.webAuth
      .authorize({ scope: "openid profile email" }, { ephemeralSession: true })
      .then(credentials => {
        dispatch(saveToken(credentials.accessToken));
        auth0.auth
          .userInfo({ token: credentials.accessToken })
          .then(async info => {
            fetch(`https://onboard.mcsurfacesinc.com/v1/users?sub=${info.sub}`)
              .then(response => response.json())
              .then(data => dispatch(setUser(data.user)));
          });
      })
      .catch(error => console.log("Log out cancelled."));

    dispatch(setLoading());
  };

  return (
    <Layout>
      <Stack
        bg={useColorModeValue("coolGray.800", "warmGray.50")}
        borderRadius={"lg"}
        h={"20%"}
        justifyContent={"flex-end"}
        w={"40%"}>
        <Center flex={1}>
          <Heading
            color={useColorModeValue("white", "black")}
            size={"2xl"}
            textAlign={"center"}>
            OnBoard by MCS
          </Heading>
        </Center>

        <Button
          size={"lg"}
          onPress={() => login()}
          bg={"success.400"}
          _text={{ fontSize: "xl" }}
          isLoading={auth.loading}
          fontWeight={"bold"}
          h={"30%"}>
          Login
        </Button>
      </Stack>
    </Layout>
  );
}
