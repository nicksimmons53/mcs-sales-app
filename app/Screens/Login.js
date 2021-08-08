// Imports
import React from 'react';
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
import axios from 'axios';
import auth0 from '../auth/Auth';
import { useDispatch } from 'react-redux';
import { restoreToken, restoreId } from '../features/user/userSlice';
import { Button } from 'react-native-elements';
import styles from './Styles/Login.style';
import colors from '../Library/Colors'
import { alert } from '../Components/Alert.component';
import createObject from '../Realm/createObject';

function Login( ) {
  const dispatch = useDispatch( );
  
  handleLogin = ( ) => {
    auth0.webAuth
      .authorize({ scope: 'openid email profile' }, { ephemeralSession: true })
      .then(credentials => {
        auth0
          .auth
          .userInfo({ token: credentials.accessToken })
          .then(user => {
            axios.get(`${API_URL}/email_login?email=${user.email}`)
              .then((response) => {
                let user = response.data[0];

                createObject("user", {
                  id: user.id,
                  email: user.e_mail,
                  firstName: user.fstnme,
                  lastName: user.lstnme,
                  phone: user.cllphn,
                  sageUserId: user.recnum,
                  sagePassword: user.sagePass,
                  recnum: user.recnum,
                  token: credentials.accessToken 
                });

                dispatch(restoreId(user.recnum));
                dispatch(restoreToken(credentials.accessToken));
              });
          });
      })
      .catch(error => {
        console.log(error);
      });
  }

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

Login.propTypes = {
  navigation: PropTypes.object
}

export default Login;
