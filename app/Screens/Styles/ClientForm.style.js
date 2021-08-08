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
    flex: 1
  },

  // Form
  form: {
    backgroundColor: colors.white,
    borderRadius: 3,
    flex: 1,
    margin: 10,
    padding: 20,
  },

  // ScrollView
  sv: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.light_grey,
    flex: 1,
    padding: 100
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
