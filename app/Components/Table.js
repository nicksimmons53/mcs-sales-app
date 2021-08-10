// Library Imports
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { API_URL } from 'react-native-dotenv';
import PropTypes, { array } from 'prop-types';
import { Formik, FieldArray } from 'formik';
import axios from 'axios';
import { Divider, Input, Icon, Button } from 'react-native-elements';
import { levels, units, countertopTypes, countertopColors, edges, patterns } from '../form/Values.form';
import DropDownPicker from 'react-native-dropdown-picker';
import colors from '../Library/Colors';

class Table extends Component {
  state = {
    units: units,
    levels: levels,
    patterns: patterns,
    countertopTypes: countertopTypes,
    countertopColors: countertopColors,
    edges: edges,
    table: this.props.tableObj
  }

  addRow = (arrayHelpers) => {
    arrayHelpers.push(this.props.tableObj.part)
  }

  deleteRow = (arrayHelpers, index) => {
    let user = this.props.user;
    let client = this.props.client;
    
    axios.delete(`${API_URL}/employee/${user.recnum}/clients/${client.id}/parts/${arrayHelpers.form.values.rows[index].id}`)
      .then((response) => {
        arrayHelpers.remove(index);
      })
      .catch((error) => {
        console.log(error);
        arrayHelpers.remove(index);
      });
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
        if (this.props.tableObj.name === "Shower Pans - Tile")
          return false;
        if (this.props.tableObj.name === "Shower Pans - Deco")
          return false;
        if (this.props.tableObj.name === "Underlayment")
          return false;
        if (this.props.tableObj.name === "Pattern Charges")
          return false;
        if (this.props.tableObj.name === "Accents")
          return false;
        if (this.props.tableObj.name === "Shower Seats")
          return false;
        if (this.props.tableObj.name === "Add-Ons")
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
        if (this.state.table.name === "Edges")
          return { placeholder: "Choose...", choices: this.state.edges };

        return { placeholder: "Type...", choices: this.state.countertopTypes};
      
      case "color":
        return { placeholder: "Color...", choices: this.state.countertopColors};
      
      case "description":
        return { placeholder: "Choose...", choices: this.state.patterns }
    }
  }

  dropdown = (formik, attr, row, attrIndex, rowIndex, cellStyle) => {
    let column = this.columnOptions(attr);
    
    return (
      <DropDownPicker
        placeholder={column.placeholder}
        defaultValue={formik.form.values.rows[rowIndex][attr]}
        items={column.choices}
        key={attrIndex}
        containerStyle={cellStyle}
        labelStyle={styles.dropdownItem}
        itemStyle={styles.dropdownItem}
        dropDownStyle={styles.dropdownMenu}
        onChangeItem={item => formik.form.setFieldValue(`rows.${rowIndex}.${attr}`, item.value)}/>
    );
  }

  input = (formik, attr, row, attrIndex, rowIndex, cellStyle) => {
    return (
      <Input
        onChangeText={ formik.form.handleChange(`rows.${rowIndex}.${attr}`) }
        key={attrIndex}
        defaultValue={formik.form.values.rows[rowIndex][attr].toString( )}
        disabled={this.attrCheck(attr)}
        containerStyle={cellStyle}
        inputContainerStyle={styles.cellContainer}/>
    );
  }

  cell = (formik, attr, attrIndex, row, rowIndex, cellStyle) => {
    switch (attr) {
      case "id":
        return;

      case "altered":
        return;

      case "client_id":
        return;
      
      case "program":
        return;
      
      case "programTable":
        return;

      case "unit":
        return this.dropdown(formik, attr, row, attrIndex, rowIndex, cellStyle);
      
      case "level":
        return this.dropdown(formik, attr, row, attrIndex, rowIndex, cellStyle);
      
      case "type":
        return this.dropdown(formik, attr, row, attrIndex, rowIndex, cellStyle);
      
      case "color":
        return this.dropdown(formik, attr, row, attrIndex, rowIndex, cellStyle);
      
      case "description":
        if (this.state.table.name === "Pattern Charges") {
          console.log(row)
          return this.dropdown(formik, attr, row, attrIndex, rowIndex, cellStyle);
        }

        return this.input(formik, attr, row, attrIndex, rowIndex, cellStyle);
    
      default:
        return this.input(formik, attr, row, attrIndex, rowIndex, cellStyle);
    }
  }
  
  tableRow = (arrayHelpers, row, index) => {
    let inverseIndex = Object.keys(arrayHelpers.form.values).length;
    let cellStyle = styles.cell;
    
    return (
        <View style={styles.row} zIndex={100 - index}>
          {Object.keys(row).map((attr, attrIndex) => 
            (
              this.cell(arrayHelpers, attr, attrIndex, row, index, cellStyle)
            )
          )}
          <Icon 
            name='minus-square' 
            type='font-awesome' 
            color={colors.red}
            containerStyle={styles.deleteCell}
            onPress ={( ) => this.deleteRow(arrayHelpers, index)}/>
        </View>
    )
  }

  retrieveData = ( ) => {
    const client = this.props.client;
    const user = this.props.user;

    let query = `?client=${client.id}&program=tile&table=${this.state.table.name}`;

    axios.get(`${API_URL}/employee/${user.recnum}/clients/${client.id}/parts/${query}`)
      .then((response) => {
        if (response.data.length != 0) {
          response.data.map((row, index) => {
            for (var key in row) {
              if (!table.part.hasOwnProperty(key))
                delete response.data[index][key];
            }
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
    
  render( ) {
    let tablesWithoutAutofill = ["Shower Pans - Stone", "Shower Pans - Tile", 
        "Shower Pans - Deco", "Underlayment", "Pattern Charges", "Accents", 
        "Shower Seats", "Add-Ons", "Carpet Pad", "Edges", "Sinks/Shape"];

    return (
      <View style={styles.table}>
        <Formik
          initialValues={{ rows: this.state.table.rows }}
          onSubmit={(formik) => this.props.save(formik, this.props.table)}
          render={( { values } ) => (
              <FieldArray name="rows" render={(arrayHelpers) => {
                return (
                  <>
                    <View style={{height: 48, width: '100%'}}>
                      <Text style={styles.tableHeaderText}>{this.state.table.name}</Text>
                      <Divider/>
                    </View>

                    {this.tableHeader( )}

                    {values.rows.map((row, index) => (
                      this.tableRow(arrayHelpers, row, index)
                    ))}

                    <View style={{...styles.row, justifyContent: 'flex-start'}} zIndex={-1}>
                      <Button
                        title='Save'
                        buttonStyle={styles.save}
                        containerStyle={styles.saveButtonContainer}
                        onPress={ ( ) => this.props.save(arrayHelpers, this.state.table.name) }/>
                      <Button
                        title='Add Row'
                        buttonStyle={styles.addRow}
                        containerStyle={styles.saveButtonContainer}
                        onPress={( ) => this.addRow(arrayHelpers)}/>
                      {
                        tablesWithoutAutofill.includes(this.state.table.name)
                        ?
                        null
                        :
                        <Button
                          title='Autofill'
                          buttonStyle={styles.autofill}
                          containerStyle={styles.saveButtonContainer}
                          onPress={( ) => this.props.autofill(arrayHelpers, this.state.table)}/>
                      }
                    </View>
                  </>
                )}
              }
            />
          )}
        />
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
        fontFamily: 'Quicksand'
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
  