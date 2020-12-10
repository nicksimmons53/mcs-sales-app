// Library Imports
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { API_URL } from 'react-native-dotenv';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import axios from 'axios';
import { Divider, Input, Icon, Button } from 'react-native-elements';
import { levels, units, countertopTypes, countertopColors } from '../Form/Values.form';
import DropDownPicker from 'react-native-dropdown-picker';
import colors from '../Library/Colors';

class Table extends Component {
  state = {
    units: units,
    levels: levels,
    countertopTypes: countertopTypes,
    countertopColors: countertopColors,
    table: this.props.tableObj
  }

  addRow = ( ) => {
    let table = this.state.table;
    let lastIndex = Object.keys(table.rows).length;

    table.rows[lastIndex + 1] = table.part;

    this.setState({ table: table });

    console.log(table)
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
      <View style={{...styles.deleteCell, alignItems: 'center'}}>
        <Text style={styles.columnHeader}></Text>
      </View>
    </View>
  );

  attrCheck = (attr) => {
    switch (attr) {
      case "total":
        if (this.props.product === "ctops")
          return false;
        if (this.props.tableObj.name === "Carpet Pad")
          return false;
        if (this.props.tableObj.name === "Pattern Charges")
          return false;
        if (this.props.tableObj.name === "Shower Pans - Stone")
          return false;

        return true;
      
      case "materialTax":
        return true;
    
      default:
        return false;
    }
  }

  columnOptions = (attr) => {
    switch (attr) {
      case "unit":
        return { placeholder: "Unit...", choices: this.state.units};

      case "level":
        return { placeholder: "Level...", choices: this.state.levels};
      
      case "type":
        return { placeholder: "Type...", choices: this.state.countertopTypes};
      
      case "color":
        return { placeholder: "Color...", choices: this.state.countertopColors};
    }
  }

  dropdown = (formik, row, attr, attrIndex, cellStyle) => {
    let column = this.columnOptions(attr);
    
    return (
      <DropDownPicker
        placeholder={column.placeholder}
        defaultValue={""}
        items={column.choices}
        key={attrIndex}
        containerStyle={cellStyle}
        labelStyle={styles.dropdownItem}
        itemStyle={styles.dropdownItem}
        dropDownStyle={styles.dropdownMenu}
        onChangeItem={item => formik.setFieldValue(`${row}.${attr}`, item)}/>
    );
  }

  input = (formik, attr, row, attrIndex, cellStyle) => {
    const altered = ( ) => {
      if (this.props.tableObj.name === "Sinks/Shape")
        formik.setFieldValue(`${row}.altered`, true);
    };
    
    return (
      <Input
        onChangeText={ formik.handleChange(`${row}.${attr}`) }
        key={attrIndex}
        onBlur={( ) => altered( )}
        defaultValue={formik.values[row][attr].toString( ) === null ? "" : formik.values[row][attr].toString( )}
        disabled={this.attrCheck(attr)}
        containerStyle={cellStyle}
        inputContainerStyle={styles.cellContainer}/>
    );
  }

  cell = (formik, attr, attrIndex, row, cellStyle) => {
    switch (attr) {
      case "altered":
        return;

      case "unit":
        return this.dropdown(formik, row, attr, attrIndex, cellStyle);
      
      case "level":
        return this.dropdown(formik, row, attr, attrIndex, cellStyle);
      
      case "type":
        return this.dropdown(formik, row, attr, attrIndex, cellStyle);
      
      case "color":
        return this.dropdown(formik, row, attr, attrIndex, cellStyle);
    
      default:
        return this.input(formik, attr, row, attrIndex, cellStyle);
    }
  }
  
  tableRow = (formik, row) => {
    let inverseIndex = Object.keys(formik.initialValues).length;
    let cellStyle = styles.cell;

    if ("altered" in formik.values[row] && formik.values[row]["altered"] === true)
      cellStyle = {...cellStyle, backgroundColor: colors.red}

    return ( 
      <View style={styles.row} zIndex={inverseIndex - row}>
        {Object.keys(formik.initialValues[row]).map((attr, attrIndex) => 
          (
            this.cell(formik, attr, attrIndex, row, cellStyle)
          )
        )}
        <Icon 
          name='minus-square' 
          type='font-awesome' 
          color={colors.red}
          containerStyle={styles.deleteCell}
          onPress ={( ) => this.deleteRow(row)}/>
      </View>
    )
  }
    
  render( ) {
    return (
      <View style={styles.table}>
        <Formik
          initialValues={this.state.table.rows}
          onSubmit={(values, actions) => this.props.save(this.props.tableObj, values, actions)}>
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

              <View style={{...styles.row, justifyContent: 'flex-start'}} zIndex={-1}>
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
                <Button
                  title='Autofill'
                  buttonStyle={styles.autofill}
                  containerStyle={styles.saveButtonContainer}
                  onPress={( ) => this.props.autofill(formikProps, this.props.tableObj)}/>
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
      flex: 5,
      marginLeft: 0,
      paddingLeft: 0,
      marginRight: 0,
      paddingRight: 0,
    }, 
    deleteCell: {
      flex: 1,
      marginLeft: 0,
      marginRight: 0,
      paddingLeft: 0,
      paddingRight: 0
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
      backgroundColor: colors.blue,
    },
    autofill: {
      backgroundColor: colors.black
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
  