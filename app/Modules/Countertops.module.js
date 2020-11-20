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
  state = {
    parts: [ ],
    tables: [
      {
        name: "Edges",
        headers: ["Type", "Total"],
        rows: {
          1: {
              type: "",
              total: ""
          }
        },
        part: {
          type: "",
          total: ""
        }
      },
      {
        name: "Sinks/Shape",
        headers: ["SKU", "Description", "Installed Price"],
        rows: {
          1: {
              sku: "",
              description: "",
              total: "",
              altered: false
          }
        },
        part: {
          sku: "",
          description: "",
          total: ""
        }
      },
      {
        name: "Level 1",
        headers: ["Color", "Type", "Total"],
        rows: {
          1: {
              color: "",
              type: "",
              total: ""
          }
        },
        part: {
          color: "",
          type: "",
          total: ""
        }
      },
    ]
  }

  componentDidMount( ) {
    const client = this.props.client;
    const user = this.props.user;

    // axios.get(`${API_URL}/employee/${user.recnum}/clients/${client.id}/parts/5`)
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
    values.prgrm_ = 5;

    axios.post(`${API_URL}/employee/${user.recnum}/clients/${client.id}/parts/`, values)
      .then((response) => {
        console.log(response.status);
      })
      .catch((error) => {
        console.log(error);
      })
  }

  addTable = ( ) => {
    let tables = this.state.tables;
    let lastIndex = this.state.tables.length + 1;

    tables.push({
      name: `Level ${lastIndex - 2}`,
      headers: ["Color", "Type", "Total"],
      rows: {
        1: {
            color: "",
            type: "",
            total: ""
        }
      },
      part: {
        color: "",
        type: "",
        total: ""
      }
    });

    this.setState({ tables: tables });
  }
  
  render( ) {
    return (
      <ScrollView style={styles.sv}>
        <View style={styles.spreadsheet}>
          <Text style={styles.subtext}>Samples of countertops should be shown due to variance.</Text>

          {this.state.tables.map((tableObj, index) => (
            <Table 
              tableObj={tableObj} 
              product="ctops"
              key={index} 
              index={index}
              user={this.props.user}
              client={this.props.client}/>
          ))}

          <Button
            title="Add Level Table"
            onPress={( ) => this.addTable( )}
            buttonStyle={styles.addTable}
            containerStyle={styles.buttonContainer}/>
        </View>
      </ScrollView>
    );
  }
}
  
  // Props Valdidation
  Countertops.propTypes = {
    dropdown: PropTypes.bool,
    addRow: PropTypes.func,
    tables: PropTypes.object
  }
  
  export default Countertops;