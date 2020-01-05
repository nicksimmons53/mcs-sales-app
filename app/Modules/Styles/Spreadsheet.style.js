// Library Imports
import { StyleSheet } from 'react-native';
import colors from '../../Library/Colors';

const styles = StyleSheet.create({
  // ScrollView
  sv: {
    flex: 1,
    backgroundColor: colors.white
  },

  // Table
  table: {
    width: '90%',
    margin: 20,
    borderWidth: 1,
    borderRadius: 3,
    borderColor: colors.grey,
    backgroundColor: colors.white
  },
  tableHeader: {
    width: '100%',
    height: 40,
    justifyContent: 'center',
    borderTopStartRadius: 3,
    borderTopEndRadius: 3,
    backgroundColor: colors.white
  },
  tableHeaderText: {
    fontFamily: 'opensans-reg',
    fontSize: 20,
    padding: 10,
    color: colors.black
  },
  columnTitle: {
    marginLeft: 5
  },
  addRow: {
    padding: 10,
    justifyContent: 'center'
  },
  tableRow: {
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: 0
  },
  inputContainer: {
    flex: 1,
    paddingHorizontal: 0,
    paddingVertical: 5
  },
  inputText: {
    color: colors.background
  },
  noBottomBorder: {
    borderBottomWidth: 0
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

  // Misc
  row: {
    flexDirection: 'row'
  },
  spreadsheet: {
    flex: 1,
    alignItems: 'center'
  }
});

export {
  styles,
  colors
};
