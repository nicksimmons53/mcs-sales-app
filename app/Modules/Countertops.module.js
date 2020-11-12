// Library Imports
import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
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
        name: "Level One",
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
      {
        name: "Level Two",
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
      {
        name: "Level Three",
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
      {
        name: "Level Four",
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
      {
        name: "Level Five",
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
      {
        name: "Level Six",
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
      {
        name: "Level Seven",
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
      {
        name: "Level Eight",
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
              total: ""
          }
        },
        part: {
          sku: "",
          description: "",
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