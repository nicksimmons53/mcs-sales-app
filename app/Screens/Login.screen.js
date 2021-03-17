// Imports
import React, { Component } from 'react';
import {
  KeyboardAvoidingView,
  View,
  Text,
  StatusBar,
  Keyboard,
  TouchableWithoutFeedback
} from 'react-native';
import { API_URL } from 'react-native-dotenv';
import PropTypes from 'prop-types';
import SplashScreen from 'react-native-splash-screen';
import axios from 'axios';
import Auth0 from 'react-native-auth0';
import { Button, Divider } from 'react-native-elements';
import NetInfo from '@react-native-community/netinfo';
import styles from './Styles/Login.style';
import colors from '../Library/Colors'
import { networkALert, alert } from '../Components/Alert.component';

// Class component that will display a general login screen with a request
// access alert.
const auth0 = new Auth0({
  domain: 'dev-hfkkr2g4.auth0.com',
  clientId: 'dNZJDpWtXjY0IZZmze3UhEyG74azV5vK'
});

class Login extends Component {
  state = {
    hidden: true,
    error: false,
    accessToken: ''
  };

  componentDidMount( ) {
      SplashScreen.hide( );
  }

  handleLogin = ( ) => {
    auth0
      .webAuth
      .authorize({ scope: 'openid profile email' })
      .then(credentials => {
        this.setState({ accessToken: credentials.accessToken });

        auth0
          .auth
          .userInfo({ token: credentials.accessToken })
          .then(user => {
            axios.get(`${API_URL}/email_login?email=${user.email}`)
              .then((response) => {
                this.props.navigation.navigate('Profile', { 
                  user: response.data[0],
                  clearAccessToken: this.clearAccessToken
                });
                
                this.setState({ error: true });
              });
          });
      })
      .catch(error => {
        console.log(error);
      });
  }

  getNetworkInfo = ( ) => {
    NetInfo.fetch( ).then(state => {
      if (state.isConnected === false) {
        return alert({
          title: 'Network Connection',
          message: 'This device isn\'t connected to the network. Any work will be lost if not reconnected',
          buttons: [
            { text: 'Okay', style: 'cancel' }
          ]
        });
      }
    })
  }

  clearAccessToken = ( ) => {
    this.setState({ accessToken: null });
  }

  render( ) {
    // this.getNetworkInfo( ); 

    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          behavior='padding'
          enabled
          style={styles.background}>

          <StatusBar backgroundColor={colors.backgroundColor} barStyle="light-content"/>

          <View style={styles.form}>
            <View style={styles.logo}>
              <Text style={styles.logoText}>MC Surfaces</Text>
            </View>
            
            <View style={styles.buttons}>
              <Button
                title='Log In'
                type='solid'
                buttonStyle={styles.login}
                titleStyle={styles.loginTitle}
                onPress={( ) => this.handleLogin()}/>
              <Button
                title='Need Help?'
                type='clear'
                buttonStyle={styles.needHelp}
                titleStyle={styles.needHelpTitle}
                onPress={( ) => alert({
                  title: 'Request Access',
                  message: 'If you do not have an account, please sign up using your desired credentials.',
                  buttons: [
                    { text: 'Cancel', style: 'cancel' }
                  ]
                })}/>
            </View>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    );
  }
}

Login.propTypes = {
  navigation: PropTypes.object
}

export default Login;
