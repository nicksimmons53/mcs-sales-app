// Library Imports
import React, { Component } from 'react';
import { View, ScrollView, Text } from 'react-native';
import { Button } from 'react-native-elements';
import { API_URL } from 'react-native-dotenv';
import PropTypes from 'prop-types';
import axios from 'axios';
import { styles, colors } from './Styles/SpreadSheet.style';
import Table from '../Components/Table';

class Countertops extends Component {
  _saveTableData = async(formik, tableName) => {
    let rows = formik.form.values.rows;
    let user = this.props.user;
    let client = this.props.client;

    rows.map((row, index) => {
      if (row.total === "" || row.total == "NaN") {
        formik.remove(index);
      } else {
        row.client_id = client.id;
        row.program = "countertops";
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
  
  autofill = (arrayHelpers, table) => {
    let values = arrayHelpers.form.values.rows;

    if (table.name.match(/Level.*$/)) {
      let total = parseFloat(values[0].total).toFixed(3);

      arrayHelpers.form.setFieldValue(`rows.1.total`, total);

      Object.keys(values).map((index) => {
        arrayHelpers.form.setFieldValue(`rows.${index}.total`, total);
      });

      return;
    }
  }
  
  render( ) {
    return (
      <ScrollView style={styles.sv}>
        <View style={styles.spreadsheet}>
          <Text style={styles.subtext}>Samples of countertops should be shown due to variance.</Text>
          <Text style={styles.subtext}>Sink price includes installation/hole cut.</Text>

          {this.props.tables.map((tableObj, index) => (
            <Table 
              zIndex={10}
              tableObj={tableObj} 
              save={this._saveTableData}
              product="ctops"
              key={index} 
              index={index}
              user={this.props.user}
              client={this.props.client}
              autofill={this.autofill}/>
          ))}
        </View>
      </ScrollView>
    );
  }
}
  
// Props Valdidation
Countertops.propTypes = {
  dropdown: PropTypes.bool,
  addRow: PropTypes.func,
  tables: PropTypes.array
}

export default Countertops;