// Library Imports
import { StyleSheet } from 'react-native';
import colors from '../Library/Colors';

// StyleSheet for all components on the login page
const styles = StyleSheet.create({
  // Background View
  background: {
    flex: 1
  },

  center: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    margin: 20
  },

  centeredContent: {
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 10,
    justifyContent: 'center',
    padding: 20
  },

  row: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 24
  },

  rowNoMargin: {
    alignItems: 'flex-start',
    flex: 1,
    flexDirection: 'row'
  },

  grid: {
    backgroundColor: colors.light_grey,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    flex: 1
  }
});

export default styles;