/**
 * @format
 * @flow strict-local
 */

import React from "react";
import { NativeBaseProvider, extendTheme } from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useDispatch, useSelector } from "react-redux";
import Login from "./src/screens/login";
import Home from "./src/screens/home";
import ClientProfile from "./src/screens/clientProfile";
import ClientDetails from "./src/screens/clientDetails";
import ProgramDetails from "./src/screens/programDetails";
import ProgramPricing from "./src/screens/programPricing";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { saveToken, setUser } from "./src/features/auth/authSlice";
import { SSRProvider } from "@react-aria/ssr/src/SSRProvider";
import { useGetUserInfoQuery } from "./src/services/user";

const theme = extendTheme({
  fontConfig: {
    Quicksand: {
      100: {
        normal: "Quicksand-Regular",
        italic: "Quicksand-Light",
      },
      200: {
        normal: "Quicksand-Regular",
        italic: "Quicksand-Light",
      },
      300: {
        normal: "Quicksand-Regular",
        italic: "Quicksand-Light",
      },
      400: {
        normal: "Quicksand-Regular",
        italic: "Quicksand-Light",
      },
      500: {
        normal: "Quicksand-Medium",
      },
      600: {
        normal: "Quicksand-Medium",
        italic: "Quicksand-Light",
      },
      700: {
        normal: "Quicksand-Bold",
        italic: "Quicksand-Bold",
      },
      800: {
        normal: "Quicksand-Bold",
      },
      900: {
        normal: "Quicksand-Bold",
        italic: "Quicksand-Bold",
      },
    },
  },
  fonts: {
    heading: "Quicksand",
    body: "Quicksand",
    mono: "Quicksand",
  },
  config: {
    useSystemColorMode: true,
  },
});

const NavStack = createNativeStackNavigator();

const App = () => {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);

  React.useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await AsyncStorage.getItem("userToken");
      } catch (e) {
        console.log(e);
      }

      dispatch(saveToken(userToken));
    };

    bootstrapAsync();
  }, [dispatch]);

  return (
    <SSRProvider>
      <NativeBaseProvider theme={theme}>
        <NavigationContainer>
          <NavStack.Navigator
            initialRouteName={"Login"}
            screenOptions={{ headerShown: false }}>
            {auth.token === null ? (
              <NavStack.Screen
                name={"Login"}
                component={Login}
                options={{
                  animationTypeForReplace: auth.token === null ? "pop" : "push",
                }}
              />
            ) : (
              <>
                <NavStack.Screen name={"Home"} component={Home} />
                <NavStack.Screen name={"ClientProfile"} component={ClientProfile} />
                <NavStack.Screen name={"ClientDetails"} component={ClientDetails} />
                <NavStack.Screen
                  name={"ProgramDetails"}
                  component={ProgramDetails}
                />
                <NavStack.Screen
                  name={"ProgramPricing"}
                  component={ProgramPricing}
                />
              </>
            )}
          </NavStack.Navigator>
        </NavigationContainer>
      </NativeBaseProvider>
    </SSRProvider>
  );
};
export default App;
