// Library Imports
import { StyleSheet } from 'react-native';
import colors from '../../Library/Colors';

// StyleSheet for all components on the login page
const styles = StyleSheet.create({
  // Background View
  background: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.black,
  },

  // Logo
  logo: {
    width: 350,
    alignItems: 'center',
    margin: 30,
    borderColor: colors.green
  },
  logoText: {
    textAlign: 'center',
    fontSize: 50,
    fontFamily: 'quicksand-reg',
    paddingLeft: 10,
    color: colors.black
  },

  // Form View
  form: {
    width: 500,
    height: 500,
    alignItems: 'center',
    justifyContent: 'flex-end',
    borderRadius: 10,
    backgroundColor: colors.white,
  },

  // User Input
  inputItem: {
    width: 370,
    marginBottom: 10,
  },
  inputContainer: {
    paddingLeft: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.light_grey,
  },

  // Login Button
  buttons: {
    alignItems: 'center',
  },
  login: {
    width: 350,
    height: 50,
    borderRadius: 5,
    backgroundColor: colors.green,
  },
  loginTitle: {
    fontSize: 20,
  },

  // Checkbox
  checkbox: {
    backgroundColor: colors.backgroundColor,
    borderColor: colors.white,
  },
  checkboxTitle: {
    fontFamily: 'quicksand-bold',
    color: colors.black,
  },

  // Need Help Button
  needHelp: {
    width: 350,
    marginTop: 10,
    marginBottom: 20,
  },
  needHelpTitle: {
    fontFamily: 'quicksand-reg',
    color: colors.black,
  },

  // Error Text
  error: {
    paddingBottom: 10,
    color: colors.red,
    fontFamily: 'quicksand-bold'
  }
});

export default styles;
