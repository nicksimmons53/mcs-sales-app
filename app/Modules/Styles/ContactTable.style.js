// Library Imports
import { StyleSheet } from 'react-native';
import colors from '../../Library/Colors';

const styles = StyleSheet.create({
  addRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 3,
    borderBottomColor: colors.white
  },
  inputContainer: {
    paddingHorizontal: 0,
    paddingVertical: 5
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 0,
    marginHorizontal: 0
  },
  modal: {
    width: '30%',
    borderRadius: 5,
    backgroundColor: colors.white
  },
  form: {
    flex: 1,
  }
});

export {
  styles,
  colors
};
