// Library Imports
import { StyleSheet } from 'react-native';
import colors from '../../Library/Colors';

// StyleSheet for all components on the login page
const styles = StyleSheet.create({
  // Background View
  background: {
    alignItems: 'center',
    backgroundColor: colors.black,
    flex: 1,
    justifyContent: 'center'
  },

  // Form View
  form: {
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 10,
    justifyContent: 'center'
  },

  // Logo
  logo: {
    alignItems: 'center',
    borderColor: colors.green,
    marginTop: 50,
    margin: 50,
    marginBottom: 45,
    width: 350
  },
  logoText: {
    color: colors.black,
    fontSize: 50,
    fontFamily: 'quicksand-reg',
    paddingLeft: 10,
    textAlign: 'center'
  },

  // Login Button
  buttons: {
    alignItems: 'center',
  },
  login: {
    backgroundColor: colors.green,
    borderRadius: 5,
    height: 50,
    width: 350
  },
  signUp: {
    backgroundColor: colors.blue,
    borderRadius: 5,
    height: 50,
    margin: 20,
    width: 350
  },
  loginTitle: {
    fontSize: 20,
  },

  // Need Help Button
  needHelp: {
    marginBottom: 20,
    marginTop: 10,
    width: 350
  },
  needHelpTitle: {
    color: colors.black,
    fontFamily: 'quicksand-reg'
  }
});

export default styles;
