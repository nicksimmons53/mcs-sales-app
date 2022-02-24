// Imports
import React from 'react';
import {
  KeyboardAvoidingView,
  View,
  StatusBar
} from 'react-native';
import PropTypes from 'prop-types';
import auth0 from '../auth/Auth';
import { useDispatch, useSelector } from 'react-redux';
import { getUserBySub } from '../redux/features/user/userThunk';

import styles from '../styles/Screen';
import colors from '../Library/Colors'
import { LargeText, SmallText } from '../components/Text';
import { SuccessButtonLarge } from '../components/Button';
import { setSub } from '../redux/features/user/userSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Login( ) {
  let user = useSelector((state) => state.user.info);
  const dispatch = useDispatch( );
  
  handleLogin = async ( ) => {
    auth0.webAuth
      .authorize({ scope: 'openid email profile' }, { ephemeralSession: true })
      .then(credentials => {
        auth0
          .auth
          .userInfo({ token: credentials.accessToken })
          .then(async (auth0) => {
            await AsyncStorage.setItem("sub", auth0.sub);
            dispatch(setSub(auth0.sub));
            dispatch(getUserBySub(auth0.sub));
          });
      })
      .catch(error => {
        console.log(error);
      });
  }

  return (
    <KeyboardAvoidingView behavior='padding' enabled style={{...styles.background, backgroundColor: colors.black}}>
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
