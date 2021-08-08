// Library Imports
import { StyleSheet } from 'react-native';
import colors from '../../Library/Colors';

const styles = StyleSheet.create({
  // Background
  background: {
    height: '100%',
    width: '100%',
    borderRadius: 5,
    backgroundColor: colors.light_grey,
  },

  // Header
  header: {
    flexDirection: 'row',
    paddingTop: 25,
    paddingLeft: 25,
    paddingBottom: 15,
    paddingRight: 25,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.light_grey,
    backgroundColor: colors.white,
  },
  headerPort: {
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 5,
    borderBottomWidth: 1,
    borderBottomColor: colors.light_grey,
    backgroundColor: colors.white,
  },
  headerText: {
    fontFamily: 'OpenSans',
    fontSize: 28,
    color: colors.background,
  },
  pushToSageButtonContainer: {
    width: 250,
  },
  pushToSageButton: {
    backgroundColor: colors.orange
  },

  // ScrollView
  form: {
    height: '100%',
    flexDirection: 'column'
  },

  // Row View
  table: {
    margin: 10,
    marginBottom: 5,
    borderWidth: 1,
    borderRadius: 3,
    borderColor: colors.light_grey,
    backgroundColor:colors.white,
  },

  // Variables
  variables: {
    height: 'auto',
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 5,
    borderRightWidth: 1,
    borderTopLeftRadius: 3,
    borderBottomLeftRadius: 3,
    borderColor: colors.light_grey,
    backgroundColor: colors.white,
  },

  // Values
  values: {
    height: 'auto',
    paddingTop: 10,
    paddingLeft: 10,
    borderTopRightRadius: 3,
    borderBottomRightRadius: 3,
    backgroundColor: colors.white,
    flexShrink: 1,
  },

  // Text
  text: {
    fontFamily: 'OpenSans',
    fontSize: 18,
    paddingBottom: 10,
    color: colors.background,
  },

  // Lists
  lists: {
    margin: 10,
    marginTop: 5,
  },

  // Footer
  footer: {
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10,
  },

  // Buttons
  submitButtonContainer: {
    width: 300,
    margin: 10,
  },
  submitButton: {
    backgroundColor: colors.green,
  },

  // Toast
  toast: {
    width: '80%',
    alignItems: 'center'
  },

  centerAlign: {
    alignItems: 'center'
  }
});

export {
  styles,
  colors
};
