// Library Imports
import { StyleSheet } from 'react-native';
import colors from '../../Library/Colors';

const styles = StyleSheet.create({
  // Background
  background: {
    flex: 1,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    backgroundColor: colors.white,
  },

  // ScrollView
  sv: {
    width: '100%',
  },

  // Header
  text: {
    fontFamily: 'OpenSans',
    fontSize: 28,
    color: colors.black,
  },

  // Row
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10
  },

  // Item
  listItem: {
    height: 50,
  },

  // Title
  title: {
    fontFamily: 'OpenSans',
    fontSize: 14,
    paddingTop: 5,
    paddingBottom: 5,
    color: colors.background,
  },

  // Subtitle
  subtitle: {
    fontFamily: 'OpenSans',
    color: colors.blue,
  },
});

export {
  styles,
  colors
};