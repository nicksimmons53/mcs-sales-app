// Library Imports
import React from 'react';
import { ThemeProvider } from 'react-native-elements';
import { NativeBaseProvider } from 'native-base';
import { configureFonts, DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { useFonts }from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { store, persistor } from '../redux/store';
import { PersistGate } from 'redux-persist/integration/react'
import { Provider, useDispatch, useSelector } from 'react-redux';
import { setSub } from '../redux/features/user/userSlice';
import theme from '../Library/ThemeProvider';
import Login from '../screens/Login';
import Profile from '../screens/Profile';
import ClientTakeoff from '../screens/ClientTakeoff';
import ClientForm from '../screens/BasicInfoForm';
import ClientProfile from '../screens/ClientProfile';
import AdvInfoForm from '../screens/AdvInfoForm';
import Program from '../screens/Program';
import Pricing from '../screens/Pricing';
import colors from '../Library/Colors';
import Snack from '../components/Snack';
import AnimatedLoader from 'react-native-animated-loader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUserBySub } from '../redux/features/user/userThunk';
import { getClientsByUser } from '../redux/features/clients/clientsThunk';

const defaultTheme = {
  ...DefaultTheme,
  colors: { 
    ...DefaultTheme.colors,
    primary: colors.green,
    background: colors.white,
    error: colors.red,
    text: colors.black
  },
  fonts: configureFonts({
    ios: {
      regular: {
        fontFamily: 'Quicksand',
        fontWeight: 'normal'
      }
    }
  })
};

const AppWrapper = ( ) => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App/>
    </PersistGate>
  </Provider>
);

// Main Application Class
function App( ) {
  const dispatch = useDispatch( );
  const [ fontsLoaded ] = useFonts({
    Quicksand   : require('../../assets/Fonts/Quicksand.ttf'),
    OpenSans    : require('../../assets/Fonts/OpenSans.ttf'),
    SourceSerif : require('../../assets/Fonts/SourceSerif.ttf')
  });

  let sub = useSelector((state) => state.user.sub);
  let signout = useSelector((state) => state.user.isSigningOut);
  let userId = useSelector((state) => state.user.id);
  
  // Check if user is logged in
  React.useEffect(( ) => {
    const fetchSub = async( ) => {
      let token = await AsyncStorage.getItem("sub");
      dispatch(setSub(token));
      dispatch(getUserBySub(token));
    }

    const fetchClients = ( ) => {
      dispatch(getClientsByUser(userId));
    }

    fetchSub( );
    fetchClients( );
  }, [ ]);

  // Wait for fonts to load
  if (!fontsLoaded) {
    return null;
  }

  // Create Navigation Stacks
  const Stack = createStackNavigator( );

  return (
    <NavigationContainer>
      {
        <NativeBaseProvider>
          <PaperProvider theme={defaultTheme}>
            <ThemeProvider theme={theme}>
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                  { sub === null ? 
                    <>
                      <Stack.Screen 
                        name="Login" 
                        component={Login}
                        options={{
                          animationTypeForReplace: signout ? 'pop' : 'push'
                        }}/>
                    </>
                    :
                    <>
                      <Stack.Screen name="Profile" component={Profile}/>
                      <Stack.Screen name="ClientTakeoff" component={ClientTakeoff}/>
                      <Stack.Screen name="ClientForm" component={ClientForm}/>
                      <Stack.Screen name="ClientProfile" component={ClientProfile}/>
                      <Stack.Screen name="ClientDetails" component={AdvInfoForm}/>
                      <Stack.Screen name="ClientPrograms" component={Program}/>
                      <Stack.Screen name="ClientPricing" component={Pricing}/>
                    </>
                  }
                </Stack.Navigator>
                
                <Snack/>
            </ThemeProvider>
          </PaperProvider>
        </NativeBaseProvider>
      }
    </NavigationContainer>
  );
};

export default AppWrapper;
