// Library Imports
import { StyleSheet } from 'react-native';
import colors from '../../Library/Colors';

// Styles
const styles = StyleSheet.create({
  // Background
  background: {
    minHeight: 100,
    borderRadius: 3,
    backgroundColor: colors.white,
  },

  // Header
  header: {
    fontFamily: 'opensans-reg',
    fontSize: 18,
    padding: 10,
    color: colors.background,
  },

  // Text
  text: {
    fontFamily: 'opensans-reg',
    fontSize: 14,
    padding: 10,
  },

  // List Item
  listItemTitle: {
    fontSize: 14,
    color: colors.background
  },

  // File Preview
  filePreview: {
    flex: 1,
    borderRadius: 3,
    backgroundColor: colors.light_grey
  },

  // File Share Button
  fileShare: {
    margin: 20,
  }
});

export default styles;
