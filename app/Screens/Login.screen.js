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
import { Button, CheckBox, Input, Icon } from 'react-native-elements';
import { Formik } from 'formik';
import { User } from '../Form/Values.form';
import NetInfo from '@react-native-community/netinfo';
import styles from './Styles/Login.style';
import colors from '../Library/Colors'
import { requestAccess, networkALert } from '../Components/Alert.component';

// Class component that will display a general login screen with a request
// access alert.
class Login extends Component {
  state = {
    hidden: true,
    error: false
  };

  timeout = null;

  componentWillUnmount( ) {
    clearTimeout(this.timeout);
  }

  componentDidMount( ) {
      SplashScreen.hide( );
  }

  _signIn = (values, actions) => {
    this.timeout = setTimeout(( ) => {
      actions.setSubmitting(false);
    }, 1000);

    axios.post(`${API_URL}/employee/login`, {
      e_mail: values.e_mail,
      passwd: values.passwd
      }).then((response) => {
        if (response.data.code === 200) {
          this.props.navigation.navigate('Profile', { user: response.data.result });
          return;
        }
        
        this.setState({ error: true });
      });
  }

  getNetworkInfo = ( ) => {
    NetInfo.fetch( ).then(state => {
      if (state.isConnected === false) {
        return {networkALert};
      }
    })
  }

  render( ) {
    this.getNetworkInfo( );

    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior='padding'
        enabled
        style={styles.background}>
        <StatusBar backgroundColor={colors.backgroundColor} barStyle="light-content" />

        <Formik
          initialValues={ User }
          onSubmit={(values, actions) => this._signIn(values, actions)}>

          {formikProps => (
          <View style={styles.form}>
            <View style={styles.logo}>
              <Text style={styles.logoText}>MC Surfaces</Text>
            </View>

            <Input
              onChangeText={formikProps.handleChange('e_mail')}
              onBlur={formikProps.handleBlur('e_mail')}
              autoCapitalize='none'
              placeholder='Username'
              placeholderTextColor={colors.grey}
              selectionColor={colors.green}
              inputContainerStyle={styles.inputContainer}
              containerStyle={styles.inputItem}
            />

            <Input
              onChangeText={formikProps.handleChange('passwd')}
              onBlur={formikProps.handleBlur('passwd')}
              autoCapitalize='none'
              placeholder='Password'
              placeholderTextColor={colors.grey}
              secureTextEntry={this.state.hidden}
              rightIcon={this.state.hidden ?
                <Icon
                  type='material'
                  name='visibility-off'
                  color={colors.black}
                  iconStyle={{paddingRight:10}}
                  onPress={( ) => this.setState({ hidden: !this.state.hidden })}
                />
                :
                <Icon
                  type='material'
                  name='visibility'
                  color={colors.black}
                  iconStyle={{paddingRight:10}}
                  onPress={( ) => this.setState({ hidden: !this.state.hidden })}
                />
              }
              selectionColor={colors.green}
              inputContainerStyle={styles.inputContainer}
              containerStyle={styles.inputItem}
            />
            {this.state.error ?
              <Text style={styles.error}>Whoops, something doesn't look right</Text>
              :
              null
            }
            <View style={styles.buttons}>
              <Button
                title='Log In'
                type='solid'
                buttonStyle={styles.login}
                titleStyle={styles.loginTitle}
                onPress={formikProps.handleSubmit} />
              <CheckBox
                checked={formikProps.values.checked}
                title='Remember Me'
                checkedColor={colors.green}
                containerStyle={styles.checkbox}
                textStyle={styles.checkboxTitle}
                onPress={( ) => formikProps.setFieldValue('checked', !formikProps.values.checked)} />
              <Button
                title='Need Help?'
                type='clear'
                buttonStyle={styles.needHelp}
                titleStyle={styles.needHelpTitle}
                onPress={requestAccess} />
            </View>
          </View>
          )}
        </Formik>
      </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    );
  }
}

Login.propTypes = {
  navigation: PropTypes.object
}

export default Login;
