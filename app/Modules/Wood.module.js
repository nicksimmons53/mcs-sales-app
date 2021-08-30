// Library Imports
import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { API_URL } from 'react-native-dotenv';
import PropTypes from 'prop-types';
import axios from 'axios';
import { styles, colors } from './Styles/SpreadSheet.style';
import Table from '../components/Table';

class Wood extends Component {
  _saveTableData = async(formik, tableName) => {
    let rows = formik.form.values.rows;
    let user = this.props.user;
    let client = this.props.client;

    rows.map((row, index) => {
      if (row.total === "" || row.total == "NaN") {
        formik.remove(index);
      } else {
        row.client_id = client.id;
        row.program = "wood";
        row.programTable = tableName;

        axios.post(`${API_URL}/employee/${user.recnum}/clients/${client.id}/parts`, row)
          .then((response) => {
            console.log(response.status);

            this.props.savedTableNoti(tableName);
          })
          .catch((error) => {
            console.log(error);
          })
      }
    });
  }

  autofill = (arrayHelpers) => {
    let values = arrayHelpers.form.values.rows;

    values.map((row, index) => {
      let materialWithTax = row.material * 1.0825;
      let total = parseFloat(materialWithTax) + parseFloat(row.labor);

      arrayHelpers.form.setFieldValue(`rows.${index}.materialTax`, materialWithTax.toFixed(3));
      arrayHelpers.form.setFieldValue(`rows.${index}.total`, total.toFixed(3));
    }); 
  }
  
  render( ) {
    return (
      <ScrollView style={styles.sv}>
        <View style={styles.spreadsheet}>
        {this.props.tables.map((tableObj, index) => (
          <Table 
            tableObj={tableObj} 
            key={index} 
            save={this._saveTableData}
            index={index}
            user={this.props.user}
            client={this.props.client}
            autofill={this.autofill}/>
        ))}
        </View>
      </ScrollView>
    )
  }
}
  
  // Props Valdidation
  Wood.propTypes = {
    dropdown: PropTypes.bool,
    addRow: PropTypes.func,
    tables: PropTypes.array
  }
  
  export default Wood;
  