// Library Imports
import { StyleSheet } from 'react-native';
import colors from '../../Library/Colors';

const styles = StyleSheet.create({
  // Background
  background: {
    backgroundColor: colors.black,
    flex: 1,
    paddingTop: 24
  },

  // Content
  content: {
    flex: 1,
    flexDirection: 'row'
  },

  // Client List & Toolbar
  list: {
    borderColor: colors.light_grey,
    borderRightWidth: 1,
    flex: 2,
    flexDirection: 'row'
  },

  // Profile Background
  profile: {
    backgroundColor: colors.light_grey,
    flex: 3
  }, 
});

export {
  styles,
  colors
};