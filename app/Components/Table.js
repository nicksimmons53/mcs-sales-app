// Library Imports
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { API_URL } from 'react-native-dotenv';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import axios from 'axios';
import { Divider, Input, Button } from 'react-native-elements';
import { levels } from '../Form/Values.form';
import DropDownPicker from 'react-native-dropdown-picker';
import colors from '../Library/Colors';
import { Pressable } from 'react-native';

class Table extends Component {
  state = {
    units: [
      { label: "", value: "" },
      { label: "SqFt", value: "sqft" },
      { label: "Each", value: "each" },
      { label: "Linear Foot", value: "linear" }
    ],
    levels: levels,
    table: this.props.tableObj
  }

  _saveTableData = async(values, actions) => {
    let user = this.props.user;
    let client = this.props.client;

    this.timeout = setTimeout(( ) => { actions.setSubmitting(false); }, 1000);

    axios.post(`${API_URL}/employee/${user.recnum}/clients/${client.id}/parts/`, values)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      })
  }

  addRow = ( ) => {
    let table = this.state.table;
    let lastIndex = Object.keys(table.rows).length;

    table.rows[lastIndex + 1] = table.part;

    this.setState({ table: table });
  }

  deleteRow = (index) => {
    let table = this.state.table;

    delete table.rows[index];

    this.setState({ table: table });
  }

  tableHeader = ( ) => (
    <View style={styles.row}>
      {this.props.tableObj.headers.map((header, index) => (
        <View key={index} style={{...styles.cell, alignItems: 'center'}}>
          <Text style={styles.columnHeader}>{header}</Text>
        </View>
      ))}
    </View>
  );

  attrCheck = (attr) => {
    switch (attr) {
      case "total":
        return true;
      
      case "materialTax":
        return true;
    
      default:
        return false;
    }
  }
  
  tableRow = (formik, row) => {
    let inverseIndex = Object.keys(formik.initialValues).length;

    return ( 
        <View key={row} style={styles.row} zIndex={inverseIndex - row}>
          {Object.keys(formik.initialValues[row]).map((attr, attrIndex) => 
            (
              attr == "unit" || attr == "level" ?
                <DropDownPicker
                  placeholder={attr == "unit" ? "Unit..." : "Level..."}
                  items={attr == "unit" ? this.state.units : this.state.levels}
                  defaultValue={""}
                  key={attrIndex}
                  containerStyle={styles.cell}
                  labelStyle={styles.dropdownItem}
                  itemStyle={styles.dropdownItem}
                  dropDownStyle={styles.dropdownMenu}/>
                :
                <Input
                  onChangeText={ formik.handleChange(`${row}.${attr}`) }
                  key={attrIndex}
                  disabled={this.attrCheck(attr)}
                  containerStyle={styles.cell}
                  inputContainerStyle={styles.cellContainer}/>
            )
          )}
        </View>
    )
  }
    
  render( ) {
    return (
      <View style={styles.table}>
        <Formik
          initialValues={this.state.table.rows}
          onSubmit={(values, actions) => this._saveTableData(values, actions)}>
          {formikProps => (
            <>
              <View style={{height: 48, width: '100%'}}>
                <Text style={styles.tableHeaderText}>{this.state.table.name}</Text>
                <Divider/>
              </View>
                {this.tableHeader( )}

                {Object.keys(this.state.table.rows).map((row) => (
                  this.tableRow(formikProps, row)
                ))}

                <View style={{...styles.row, justifyContent: 'flex-end'}}>
                  <Button
                    title='Save'
                    buttonStyle={styles.save}
                    containerStyle={styles.saveButtonContainer}
                    onPress={formikProps.handleSubmit}/>
                  <Button
                    title='Add Row'
                    buttonStyle={styles.addRow}
                    containerStyle={styles.saveButtonContainer}
                    onPress={( ) => this.addRow(this.props.index)}/>
                </View>
              </>
            )}
          </Formik>
      </View>
    )
  }
}
  
// Styles
const styles = StyleSheet.create({
    // ScrollView
    sv: {
      flex: 1,
      backgroundColor: colors.white
    },
  
    // Table
    table: {
      width: '95%',
      margin: 50,
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
      borderColor: colors.grey
    },
    selectedCellContainer: {
      height: '100%',
      borderWidth: 1,
      borderRightWidth: 0.5,
      borderLeftWidth: 0.5,
      marginRight: 0,
      paddingRight: 0,
      borderColor: colors.green
    },
    dropdown: {
        width: '37%',
        marginRight: 20
    },
    dropdownMenu: {
        backgroundColor: colors.white,
    },
    dropdownItem: {
        justifyContent: 'flex-start',
        fontSize: 16,
        fontFamily: 'quicksand-reg'
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

export default Table;
  