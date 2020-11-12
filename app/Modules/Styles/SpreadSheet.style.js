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
    width: '95%',
    margin: 10,
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

  columnHeader: {
    fontFamily: 'opensans-reg',
    fontSize: 16,
    padding: 10,
    color: colors.black
  },

  cell: {
    flex: 1,
    marginLeft: 0,
    paddingLeft: 0,
    marginRight: 0,
    paddingRight: 0,
  },  
  cellContainer: {
    height: '100%',
    borderWidth: 1,
    borderRightWidth: 0.5,
    borderLeftWidth: 0.5,
    marginRight: 0,
    paddingRight: 0,
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
    width: '20%',
    height: 75,
    justifyContent: 'center',
    margin: 10,
  },
  inHouseProgramButton: {
    width: '30%',
    height: 75,
    justifyContent: 'center'
  },
  save: {
    backgroundColor: colors.green,
  },
  addRow: {
    backgroundColor: colors.orange,
  },

  // Misc
  row: {
    height: 48, 
    width: '100%', 
    flexDirection: 'row', 
    alignItems:'center'
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
