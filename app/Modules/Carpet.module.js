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
  
    render( ) {
      return (
        <ScrollView style={styles.sv}>
          <View style={styles.spreadsheet}>
          {this.state.tables.map((tableObj, index) => (
            <Table 
              tableObj={tableObj} 
              key={index} 
              index={index}
              user={this.props.user}
              client={this.props.client}/>
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