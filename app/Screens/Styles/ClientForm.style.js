// Library Imports
import { StyleSheet } from 'react-native';
import colors from '../../Library/Colors';

const styles = StyleSheet.create({
  // Background
  background: {
    backgroundColor: colors.black,
    flex: 1,
    paddingTop: 25
  },

  // Row
  row: {
    flex: 1,
    flexDirection: 'row'
  },

  // Info Container
  infoContainer: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    height: '100%'
  },

  // form
  formRoot: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  form: {
    backgroundColor: colors.white,
    borderRadius: 3,
    margin: 10,
    padding: 20,
    width: '50%'
  },
  label: {
    fontFamily: 'OpenSans',
    flex: 1,
    fontSize: 18,
    paddingRight: 30,
    color: colors.black
  },

  // ScrollView
  sv: {
    backgroundColor: colors.light_grey,
  },

  // Buttons
  buttonView: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  saveButtonContainer: {
    width: 350,
    margin: 40,
    marginTop: 20,
  },
  save: {
    backgroundColor: colors.green,
  }
});

export {
  styles,
  colors
};
