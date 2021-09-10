// Imports
import React from 'react';
import {
  KeyboardAvoidingView,
  View,
  StatusBar
} from 'react-native';
import PropTypes from 'prop-types';
import auth0 from '../auth/Auth';
import { useDispatch } from 'react-redux';
import { restoreToken, restoreId, restoreUser } from '../features/user/userSlice';

import styles from '../styles/Screen';
import colors from '../Library/Colors'
import Users from '../api/Users';
import createObject from '../realm/createObject';
import S3 from '../helpers/S3';
import { LargeText, SmallText } from '../components/Text';
import { SuccessButtonLarge } from '../components/Button';

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
    <KeyboardAvoidingView behavior='padding' enabled style={styles.background}>
      <StatusBar barStyle="light-content"/>

      <View style={styles.center}>
        <View style={styles.centeredContent}>
          <LargeText>OnBoard</LargeText>
          <SmallText>by MC Surfaces</SmallText>

          <SuccessButtonLarge title="Log In" action={handleLogin}/>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

Login.propTypes = {
  navigation: PropTypes.object
}

export default Login;
