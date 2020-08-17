// Library Imports
import { StyleSheet } from 'react-native';
import colors from '../../Library/Colors';

const styles = StyleSheet.create({
  // Background
  background: {
    width: '100%',
    paddingTop: 15,
    paddingLeft: 15,
    paddingRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },

  // Form
  form: {
    height: 'auto',
    width: '95%',
    margin: 10,
    borderRadius: 3,
    backgroundColor: colors.white,
  },

  // Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 10,
  },
  headerText: {
    fontFamily: 'opensans-reg',
    fontSize: 20,
    padding: 10,
    color: colors.background,
  },
  sectionHeaderText: {
    fontFamily: 'opensans-reg',
    flex: 1,
    fontSize: 18,
    padding: 10,
    paddingBottom: 5,
    color: colors.background,
  },

  // Text Input
  textRow: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
    zIndex: 20
  },
  label: {
    fontFamily: 'opensans-reg',
    flex: 1,
    fontSize: 16,
    paddingRight: 30,
    color: colors.background
  },
  inputContainer: {
    flex: 3,
    paddingLeft: 5,
    marginRight: 10,
    borderWidth: 1,
    borderRadius: 3,
    borderColor: colors.light_grey,
  },
  mediumInput: {
    width: '65%',
  },
  smallInput: {
    width: '40%',
  },
  xSmallInput: {
    width: '20%',
  },
  dropdown: {
    width: '37%',
    marginRight: 20
  },
  dropdownMenu: {
    backgroundColor: colors.white,
  },
  dropdownLabel: {
    fontFamily: 'opensans-reg',
    justifyContent: 'flex-start'
  },
  dropdownItem: {
    justifyContent: 'flex-start',
    fontSize: 16,
    fontFamily: 'quicksand-reg'
  },

  // Button
  attachButtonContainer: {
    width: 200,
    margin: 10,
    marginRight: 20
  },
  attach: {
    backgroundColor: colors.black,
  },
  submit: {
    width: '40%',
    alignSelf: 'center',
    margin: 10,
    backgroundColor: colors.green,
  },
  program: {
    backgroundColor: colors.orange
  },

  // Switch
  checkbox: {
    marginRight: 10,
    paddingRight: 5,
    paddingVertical: 0
  },

  // File Attachments
  files: {
    margin: 10,
    marginTop: 0,
  },

  // Toast
  toast: {
    width: '60%',
    alignItems: 'center'
  },
  promptText: {
    color: colors.white,
    fontSize: 18,
    fontFamily: 'quicksand-reg'
  }
});

export {
  styles,
  colors
};
