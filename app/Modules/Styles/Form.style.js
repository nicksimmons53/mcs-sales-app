// Library Imports
import { StyleSheet } from 'react-native';
import colors from '../../Library/Colors';

const styles = StyleSheet.create({
  // Background
  background: {
    paddingTop: 15,
    paddingLeft: 15,
    alignItems: 'center',
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

  // Button
  attachButtonContainer: {
    width: 200,
    margin: 10
  },
  attach: {
    backgroundColor: colors.black,
  },
  cancel: {
    width: '40%',
    alignSelf: 'center',
    margin: 10,
    backgroundColor: colors.red,
  },

  // Switch
  switch: {
    marginRight: 10,
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
  }
});

export default styles;
