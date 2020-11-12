// Library Imports
import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { API_URL } from 'react-native-dotenv';
import PropTypes from 'prop-types';
import axios from 'axios';
import { styles, colors } from './Styles/SpreadSheet.style';
import Table from '../Components/Table';

class Wood extends Component {
  state = {
    parts: [ ],
    tables: [
      {
        name: "Wood Flooring",
        headers: ["Level", "Retail per SqFt"],
        rows: {
          1: {
              level: "",
              total: ""
          }
        },
        part: {
          level: "",
          total: ""
        }
      }
    ]
  }

  componentDidMount( ) {
    const client = this.props.client;
    const user = this.props.user;

    // axios.get(`${API_URL}/employee/${user.recnum}/clients/${client.id}/parts/2`)
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
      let user = this.props.user;
      let client = this.props.client;

      this.timeout = setTimeout(( ) => { actions.setSubmitting(false); }, 1000);

      values.clntid = client.id;
      values.prgrm_ = 2;

      axios.post(`${API_URL}/employee/${user.recnum}/clients/${client.id}/parts/`, values)
        .then((response) => {
          console.log(response.status);
        })
        .catch((error) => {
          console.log(error);
        })
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
  Wood.propTypes = {
    dropdown: PropTypes.bool,
    addRow: PropTypes.func,
    tables: PropTypes.object
  }
  
  export default Wood;
  