// Library Imports
import React, { Component } from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  View
} from 'react-native';
import Firebase from '../../config/Firebase';

// Class Component that will display loading screen for a user who is already
// logged in.
class AuthLoading extends Component {
  componentDidMount( ) {
    this._bootstrapAsync( );
  }

  _bootstrapAsync = async( ) => {
    const userToken = await AsyncStorage.getItem('userId');

    if (userToken === null || !Firebase.auth( ).uid)
      this.props.navigation.navigate('Login');
    else
      this.props.navigation.navigate('Login');
  };

  render( ) {
    return (
      <View>
        <ActivityIndicator />
        <StatusBar barStyle='light-content' />
      </View>
    )
  }
}

export default AuthLoading;
