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

  // Content
  content: {
    flex: 1,
    flexDirection: 'row',
  },

  // Client List & Toolbar
  list: {
    flex: 2,
    flexDirection: 'row',
    borderRightWidth: 1,
    borderColor: colors.light_grey,
  },

  // Profile Background
  profile: {
    flex: 3,
    backgroundColor: colors.light_grey,
  }, 
});

export {
  styles,
  colors
};