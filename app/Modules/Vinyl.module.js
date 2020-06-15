// Library Imports
import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { API_URL } from 'react-native-dotenv';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import { Part } from '../Form/Values.form';
import axios from 'axios';
import { Divider, Icon, Input, Button } from 'react-native-elements';
import { DataTable } from 'react-native-paper';
import { styles, colors } from './Styles/SpreadSheet.style';

class Vinyl extends Component {
  state = {
    parts: [ ]
  }

  componentDidMount( ) {
    const client = this.props.client;
    const user = this.props.user;

    axios.get(`${API_URL}/employee/${user.recnum}/clients/${client.id}/parts/4`)
        .then((response) => {
          let parts = Array(50).fill(Part);
          response.data.map((part, index) => {
            parts.unshift(response.data[index]);
          });
          this.setState({ parts: [...parts] });
        })
        .catch((error) => {
          console.log(error);
        });
  }

    _saveTableData = async(values, actions) => {
      let user = this.props.user;
      let client = this.props.client;

      this.timeout = setTimeout(( ) => { actions.setSubmitting(false); }, 1000);

      values.clntid = client.id;
      values.prgrm_ = 4;

      axios.post(`${API_URL}/employee/${user.recnum}/clients/${client.id}/parts/`, values)
        .then((response) => {
          console.log(response.status);
        })
        .catch((error) => {
          console.log(error);
        })
    }

    addRow = (table, index, targetValue, newValue) => {
    }
  
    row = (rowObj, rowIndex, formikProps) => {
      let billingCost = "";
      if (rowObj.prtbil !==  null) {
        billingCost = rowObj.prtbil.toFixed(2);
      }

      return (
        <DataTable.Row key={rowIndex}>
          <View style={styles.tableRow}>
            <Input
              onChangeText={formikProps.handleChange('prtnme')}
              autoCapitalize='characters'
              textContentType='none'
              placeholder={rowObj.prtnme}
              placeholderTextColor="#000000"
              blurOnSubmit={false}
              inputStyle={styles.inputText}
              containerStyle={styles.inputContainer}
              inputContainerStyle={styles.noBottomBorder}/>
            <Input
              onChangeText={formikProps.handleChange('tblnme')}
              autoCapitalize='characters'
              textContentType='none'
              placeholder={rowObj.tblnme}
              placeholderTextColor="#000000"
              blurOnSubmit={false}
              inputStyle={styles.inputText}
              containerStyle={styles.inputContainer}
              inputContainerStyle={styles.noBottomBorder}/>
            <Input
              onChangeText={formikProps.handleChange('prtbil')}
              autoCapitalize='characters'
              textContentType='none'
              placeholder={billingCost}
              placeholderTextColor="#000000"
              blurOnSubmit={false}
              inputStyle={styles.inputText}
              containerStyle={styles.inputContainer}
              inputContainerStyle={styles.noBottomBorder}/>
            <Button
              title='Save'
              buttonStyle={styles.save}
              containerStyle={styles.saveButtonContainer}
              onPress={formikProps.handleSubmit}/>
          </View>
        </DataTable.Row>
      )
    }
  
    render( ) {
      if (this.state.parts.length === 0) {
        return <View></View>;
      }
      
      return (
        <ScrollView style={styles.sv}>
          <View style={styles.spreadsheet}>
            <View style={styles.table}>
              <View style={styles.tableHeader}>
                <Text style={styles.tableHeaderText}>Vinyl Program</Text>
              </View>
              <Divider />
              <DataTable>
                <DataTable.Header>
                  <DataTable.Title style={styles.columnTitle}>Part Name</DataTable.Title>
                  <DataTable.Title style={styles.columnTitle}>Description</DataTable.Title>
                  <DataTable.Title style={styles.columnTitle}>Billing Amount</DataTable.Title>
                  <DataTable.Title style={styles.columnTitle}></DataTable.Title>
                </DataTable.Header>

                {this.state.parts.map((rowObj, rowIndex) => (
                  <Formik 
                    key={rowIndex}
                    initialValues={rowObj}
                    onSubmit={(values, actions) => this._saveTableData(values, actions)}>
                    {formikProps => (
                      this.row(rowObj, rowIndex, formikProps)
                    )}
                  </Formik>
                ))}
  
                <DataTable.Row style={styles.addRow}>
                  <Icon
                    name='plus-square'
                    type='font-awesome'
                    size={30}
                    color={colors.green}
                    onPress={( ) => this.addRow(this.state.one, "one")}/>
                </DataTable.Row>
              </DataTable>
            </View>
          </View>
        </ScrollView>
      );
    }
  }
  
  // Props Valdidation
  Vinyl.propTypes = {
    dropdown: PropTypes.bool,
    addRow: PropTypes.func,
    tables: PropTypes.object
  }
  
  export default Vinyl;