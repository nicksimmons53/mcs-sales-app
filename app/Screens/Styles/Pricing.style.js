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

  // Background
  infoContainer: {
    flex: 1,
    borderTopStartRadius: 5,
    backgroundColor: colors.white,
  },

  // Content
  row: {
    flex: 1,
    flexDirection: 'row',
  },

  // Row
  header: {
    flexDirection: 'row',
    margin: 10,
    alignItems: 'center',
    justifyContent: 'space-between'
  },

  // Header
  text: {
    fontFamily: 'OpenSans',
    fontSize: 28,
    color: colors.black,
  },

  // ButtonGroup
  buttonGroup: {
    height: 35,
    alignSelf: 'center',
    width: '95%'
  },
  selected: {
    backgroundColor: colors.black
  },
  button: {
    backgroundColor: colors.green
  },

  // Toast
  toast: {
    width: '50%',
    alignItems: 'center'
  }
});

export {
  styles,
  colors
};
