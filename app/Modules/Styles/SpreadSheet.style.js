// Library Imports
import { StyleSheet } from 'react-native';
import colors from '../../Library/Colors';

const styles = StyleSheet.create({
  // ScrollView
  sv: {
    flex: 1,
    backgroundColor: colors.light_grey
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
    fontFamily: 'OpenSans',
    fontSize: 20,
    padding: 10,
    color: colors.black
  },

  columnHeader: {
    fontFamily: 'OpenSans',
    fontSize: 16,
    padding: 10,
    color: colors.black
  },
  subtext: {
    fontFamily: 'Quicksand',
    fontSize: 16,
    paddingTop: 20,
    color: colors.grey
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
  buttonContainer: {
    width: '20%',
    height: 75,
    justifyContent: 'center',
    marginTop: -50,
    marginBottom: 50
  },
  addTable: {
    backgroundColor: colors.orange
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
    alignItems: 'center',
    marginBottom: 100
  }
});

export {
  styles,
  colors
};
