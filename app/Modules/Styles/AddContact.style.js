// Library Imports
import { StyleSheet } from 'react-native';
import colors from '../../Library/Colors';

const styles = StyleSheet.create({
  // Background
  background: {
    alignItems: 'center',
  },
  // form
  form: {
    height: 'auto',
    width: '95%',
    margin: 10,
    borderRadius: 3,
    backgroundColor: colors.white,
  },
  // Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 10,
  },
  label: {
    fontFamily: 'OpenSans',
    flex: 1,
    fontSize: 16,
    paddingRight: 30,
    color: colors.background
  },
  // Text Input
  textRow: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 10,
  },
  inputContainer: {
    flex: 3,
    paddingLeft: 5,
    borderWidth: 1,
    borderRadius: 3,
    borderColor: colors.light_grey,
  },
  mediumInput: {
    width: '65%',
  },
    save: {
        alignSelf: 'center',
        width: '60%',
        marginVertical: 20,
        backgroundColor: colors.green,
    },
  picker: {
    height: 75
  }
});

export {
  styles,
  colors
}
