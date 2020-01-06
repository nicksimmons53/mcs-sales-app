// Library Imports
import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Divider, Icon, Input, Button } from 'react-native-elements';
import { DataTable } from 'react-native-paper';
import { styles, colors } from './Styles/SpreadSheet.style';

class SpreadSheet extends Component {
  handleInputChange = (tables, tableIndex, rowIndex, targetValue, newValue) => {
    let row = tables[tableIndex].rows[rowIndex];
    row[targetValue] = newValue;
    console.log(targetValue);
    console.log(row[targetValue])
  }

  row = (tables, tableIndex, rowObj, rowIndex) => {
    const keys = Object.keys(tables[tableIndex].newRow);
    console.log(keys);
    keys.map((i) => {
      console.log(i);
    })

    return (
      <DataTable.Row key={rowIndex}>
        <View style={styles.tableRow}>
          {keys.map((index) => (
            <Input
              key={index}
              onChangeText={(value) => this.handleInputChange(tables, tableIndex, rowIndex, keys[index], value)}
              autoCapitalize='characters'
              textContentType='none'
              blurOnSubmit={false}
              inputStyle={styles.inputText}
              containerStyle={styles.inputContainer}
              inputContainerStyle={styles.noBottomBorder}/>
          ))}
        </View>
      </DataTable.Row>
    )
  }

  table = (tables) => {
    return (
      <>
        {Object.keys(tables).map((tableIndex) => (
          <View key={tableIndex} style={styles.table}>
            <View style={styles.tableHeader}>
              <Text style={styles.tableHeaderText}>{tables[tableIndex].name}</Text>
            </View>
            <Divider />
            <DataTable>
              <DataTable.Header>
                {tables[tableIndex].columnHeaders.map((title, index) => (
                  <DataTable.Title key={index} style={styles.columnTitle}>{title}</DataTable.Title>
                ))}
              </DataTable.Header>

              {tables[tableIndex].rows.map((rowObj, rowIndex) => (
                this.row(tables, tableIndex, rowObj, rowIndex)
              ))}

              <DataTable.Row style={styles.addRow}>
                <Icon
                  name='plus-square'
                  type='font-awesome'
                  size={30}
                  color={colors.green}
                  onPress={( ) => this.props.addRow(tables, tableIndex)}/>
              </DataTable.Row>
            </DataTable>
          </View>
        ))}
      </>
    );
  }

  render( ) {
    return (
      <ScrollView style={styles.sv}>
        <View style={styles.spreadsheet}>
          {this.table(this.props.tables)}
        </View>

        <View style={styles.buttonView}>
          <Button
            title='Save'
            buttonStyle={styles.save}
            containerStyle={styles.saveButtonContainer}
            onPress={this.props.formikProps.handleSubmit}/>
        </View>
      </ScrollView>
    );
  }
}

export default SpreadSheet;
