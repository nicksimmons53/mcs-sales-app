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
  fileModal: {
    borderRadius: 5,
    backgroundColor: colors.green,
  },
  filePreview: {
    flex: 1,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    backgroundColor: colors.light_grey
  },
  toolbar: {
    flexDirection: 'row',
    height: '7%',
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  icon: {
    marginHorizontal: 10
  }
});

export default styles;
