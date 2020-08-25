// Library Imports
import React, { Component } from 'react';
import { View } from 'react-native';
import { ThemeProvider } from 'react-native-elements';
import { Provider as PaperProvider } from 'react-native-paper';
import * as Font from 'expo-font';
import AppContainer from './AppNavigator';
import theme from '../Library/ThemeProvider';

// Main Application Class
export default class App extends Component {
  // State
  state = {
    fontLoaded: false,
  };

  // Custom Font Loading for Entire Application
  async componentDidMount( ) {
    await Font.loadAsync({
      'quicksand-reg' : require('../../assets/Fonts/Quicksand-Regular.ttf'),
      'quicksand-bold': require('../../assets/Fonts/Quicksand-Bold.ttf'),
      'opensans-reg'  : require('../../assets/Fonts/OpenSans-Regular.ttf'),
      'opensans-bold' : require('../../assets/Fonts/OpenSans-Bold.ttf'),
      'sourceserifpro-bold': require('../../assets/Fonts/SourceSerifPro-Bold.ttf')
    });

    this.setState({ fontLoaded: true });
  }

  render( ) {
    return (
      <PaperProvider>
        <View flex={1}>
            {this.state.fontLoaded ?
            <ThemeProvider theme={theme}>
                <AppContainer />
            </ThemeProvider>
            : null}
        </View>
      </PaperProvider>
    );
  }
}
