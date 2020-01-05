// Library Imports
import { StyleSheet } from 'react-native';
import colors from '../../Library/Colors';

const styles = StyleSheet.create({
  // Background
  background: {
    flex: 1,
    paddingTop: 24,
    backgroundColor: colors.black,
  },

  // Row
  row: {
    flex: 1,
    flexDirection: 'row',
  },

  // Info Container
  infoContainer: {
    flex: 1,
    borderTopLeftRadius: 5,
    backgroundColor: colors.white,
  },

  // ScrollView
  sv: {
    flex: 1,
    backgroundColor: colors.light_grey
  },

  // Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 10,
  },
  headerText: {
    fontFamily: 'opensans-bold',
    fontSize: 28,
    color: colors.background,
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
  },

  // Toast
  toast: {
    width: '50%',
    alignItems: 'center'
  }
});

export default styles;
