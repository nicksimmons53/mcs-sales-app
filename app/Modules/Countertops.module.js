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
        headers: ["Description", "Price", "Install", "Total"],
        rows: {
          1: {
              sku: "TMC 011 50/50 ",
							price: "344.000",
              install: "",
              total: "",
              altered: false
          },
          2: {
              sku: "TMC 022 60/40 ",
							price: "344.000",
							install: "",
              total: "",
              altered: false
          },
          3: {
              sku: "TMC 044 SINGLE BOWL",
							price: "344.000",
							install: "",
              total: "",
              altered: false
          },
          4: {
              sku: "TMC 133 OVAL WHITE ",
							price: "186.000",
							install: "",
              total: "",
              altered: false
          },
          5: {
              sku: "TMC 144 BISQUE OVAL",
							price: "206.000",
							install: "",
              total: "",
              altered: false
          },
          6: {
              sku: "TMC 221 W RECTANGLE",
							price: "206.000",
							install: "",
              total: "",
              altered: false
          },
          7: {
              sku: "TMC 222 B RECTANGLE",
							price: "219.000",
							install: "",
              total: "",
              altered: false
          },
          8: {
              sku: "TMC 188 - Bar",
							price: "473.000",
							install: "",
              total: "",
              altered: false
          },
          9: {
              sku: "TMC 177 - Bar",
							price: "301.000",
							install: "",
              total: "",
              altered: false
          },
          10: {
              sku: "TMC 166 - Bar",
							price: "224.000",
							install: "",
              total: "",
              altered: false
          },
          11: {
              sku: "TMCP 3321 - Single",
							price: "824.000",
							install: "",
              total: "",
              altered: false
          },
        },
        part: {
          sku: "",
          price: "",
          install: "",
          total: "",
          altered: ""
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

    // this.timeout = setTimeout(( ) => { actions.setSubmitting(false); }, 1000);

    // values.clntid = client.id;
    // values.prgrm_ = 5;

    // axios.post(`${API_URL}/employee/${user.recnum}/clients/${client.id}/parts/`, values)
    //   .then((response) => {
    //     console.log(response.status);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   })

    console.log(values)
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
  
  autofill = (formik, table) => {
    let values = formik.values;

    if (table.name.match(/Level.*$/)) {
      let total = parseFloat(values[1].total).toFixed(3);

      formik.setFieldValue(`1.total`, total);

      Object.keys(values).map((index) => {
        formik.setFieldValue(`${index}.total`, total);
      });

      return;
    }

    if (table.name === "Edges") {
      Object.keys(values).map((index) => {
        let totalWithTax = values[index].total * 1.0825;
  
        formik.setFieldValue(`${index}.total`, totalWithTax.toFixed(3));
      });

      return;
    }

    if (table.name === "Sinks/Shape") {
      Object.keys(values).map((index) => {
        let totalWithTax = values[index].price * 1.0825;

        formik.setFieldValue(`${index}.total`, totalWithTax.toFixed(3));
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

          {this.state.tables.map((tableObj, index) => (
            <Table 
              tableObj={tableObj} 
              save={this._saveTableData}
              product="ctops"
              key={index} 
              index={index}
              user={this.props.user}
              client={this.props.client}
              autofill={this.autofill}/>
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