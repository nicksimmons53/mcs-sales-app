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
import PropTypes from 'prop-types';
import auth0 from '../auth/Auth';
import { useDispatch } from 'react-redux';
import { restoreToken, restoreId, restoreUser } from '../features/user/userSlice';
import { Button } from 'react-native-elements';

import styles from './Styles/Login.style';
import colors from '../Library/Colors'
import Users from '../api/Users';
import { alert } from '../components/Alert.component';
import createObject from '../realm/createObject';
import S3 from '../helpers/S3';

function Login( ) {
  const dispatch = useDispatch( );
  
  handleLogin = async ( ) => {
    auth0.webAuth
      .authorize({ scope: 'openid email profile' }, { ephemeralSession: true })
      .then(credentials => {
        auth0
          .auth
          .userInfo({ token: credentials.accessToken })
          .then(async (user) => {
            let apiRes = await Users.getByEmail(user.email);
            let localUser = apiRes.users[0];
            
            createObject("user", { ...localUser, token: credentials.accessToken });
            
            await S3.createBucket(localUser.sageUserId + "-" + localUser.sageEmployeeNumber);
            dispatch(restoreId(localUser.id));
            dispatch(restoreUser(localUser));
            dispatch(restoreToken(credentials.accessToken));
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
