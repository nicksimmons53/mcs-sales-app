// Library Imports
import React from 'react';
import { ThemeProvider } from 'react-native-elements';
import { NativeBaseProvider } from 'native-base';
import { Provider as PaperProvider } from 'react-native-paper';
import { useFonts }from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { store } from '../app/store';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { restoreToken } from '../features/user/userSlice';
import theme from '../Library/ThemeProvider';
import Login from '../screens/Login';
import Profile from '../screens/Profile';
import ClientForm from '../screens/ClientForm';
import readMultiples from '../Realm/readMultiples';
import ClientProfile from '../screens/ClientProfile';
import AdvInfoForm from '../screens/AdvInfoForm';
import Program from '../screens/Program';
import Pricing from '../screens/Pricing';

const AppWrapper = ( ) => (
  <Provider store={store}>
    <App/>
  </Provider>
);

// Main Application Class
function App( ) {
  let token = useSelector((state) => state.user.accessToken);
  let signout = useSelector((state) => state.user.isSigningOut);
  const dispatch = useDispatch( );
  const [ loaded ] = useFonts({
    Quicksand   : require('../../assets/Fonts/Quicksand.ttf'),
    OpenSans    : require('../../assets/Fonts/OpenSans.ttf'),
    SourceSerif : require('../../assets/Fonts/SourceSerif.ttf')
  });

  // Check if user is logged in
  React.useEffect(( ) => {
    const fetchToken = async( ) => {
      await readMultiples("user")
        .then((objects) => {
          if (objects.length !== 0) {
            dispatch(restoreToken(objects[0].sageUserId));
            dispatch(restoreToken(objects[0].token));
          }
        });
    }
    
    fetchToken( );
  }, [ ]);

  // Wait for fonts to load
  if (!loaded) {
    return null;
  }

  // Create Navigation Stacks
  const Stack = createStackNavigator( );

  return (
    <Provider store={store}>
      <NavigationContainer>
        {
          <NativeBaseProvider>
            <PaperProvider>
              <ThemeProvider theme={theme}>
                  <Stack.Navigator screenOptions={{ headerShown: false }}>
                    { token === null ? 
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
                        <Stack.Screen name="ClientForm" component={ClientForm}/>
                        <Stack.Screen name="ClientProfile" component={ClientProfile}/>
                        <Stack.Screen name="ClientDetails" component={AdvInfoForm}/>
                        <Stack.Screen name="ClientPrograms" component={Program}/>
                        <Stack.Screen name="ClientPricing" component={Pricing}/>
                      </>
                    }
                  </Stack.Navigator>
              </ThemeProvider>
            </PaperProvider>
          </NativeBaseProvider>
        }
      </NavigationContainer>
    </Provider>
  );
};

export default AppWrapper;
