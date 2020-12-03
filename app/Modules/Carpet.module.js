// Library Imports
import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { API_URL } from 'react-native-dotenv';
import PropTypes from 'prop-types';
import axios from 'axios';
import { styles, colors } from './Styles/SpreadSheet.style';
import Table from '../Components/Table';

class Carpet extends Component {
  state = {
    parts: [ ],
    tables: [
      {
        name: "Carpet Flooring",
        headers: ["Level", "Unit", "Material", "Material w/ Tax", "Labor", "Total"],
        rows: {
          1: {
            level: "",
            unit: "",
            material: "",
            materialTax: "",
            labor: "",
            total: ""
          }
        },
        part: {
          level: "",
          unit: "",
          material: "",
          materialTax: "",
          labor: "",
          total: ""
        }
      },
      {
        name: "Carpet Pad",
        headers: ["Level", "Unit", "Total"],
        rows: {
          1: {
            level: "",
            unit: "",
            total: ""
          }
        },
        part: {
          level: "",
          unit: "",
          total: ""
        }
      },
    ]
  }

  componentDidMount( ) {
    const client = this.props.client;
    const user = this.props.user;

    // axios.get(`${API_URL}/employee/${user.recnum}/clients/${client.id}/parts/3`)
    //     .then((response) => {
    //       let parts = response.data;
          
    //       if (parts.length === 0) {
    //         let part = Part;
    //         this.setState({ parts: [...this.state.parts, part] });
    //         return;
    //       }
          
    //       this.setState({ parts: [...parts] });
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     });
  }

  _saveTableData = async(values, actions) => {
    // let user = this.props.user;
    // let client = this.props.client;

    // this.timeout = setTimeout(( ) => { actions.setSubmitting(false); }, 1000);

    // values.clntid = client.id;
    // values.prgrm_ = 1;

    // axios.post(`${API_URL}/employee/${user.recnum}/clients/${client.id}/parts/`, values)
    //   .then((response) => {
    //     console.log(response.status);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   })

    console.log(values);
  }
  
  autofill = (formik) => {
    let values = formik.values;

    if ("material" in values) {
      Object.keys(values).map((index) => {
        let materialWithTax = values[index].material * 1.0825;
        let total = parseFloat(materialWithTax) + parseFloat(values[index].labor);
  
        formik.setFieldValue(`${index}.materialTax`, materialWithTax.toFixed(3));
        formik.setFieldValue(`${index}.total`, total.toFixed(3));
      });
      
      return;
    }

    Object.keys(values).map((index) => {
      let totalWithTax = values[index].total * 1.0825;

      formik.setFieldValue(`${index}.total`, totalWithTax.toFixed(3));
    });
    
    return;
  }
  
  render( ) {
    return (
      <ScrollView style={styles.sv}>
        <View style={styles.spreadsheet}>
        {this.state.tables.map((tableObj, index) => (
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
  Carpet.propTypes = {
    dropdown: PropTypes.bool,
    addRow: PropTypes.func,
    tables: PropTypes.object
  }
  
  export default Carpet;