// Library Imports
import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { API_URL } from 'react-native-dotenv';
import PropTypes from 'prop-types';
import axios from 'axios';
import { styles, colors } from './Styles/SpreadSheet.style';
import Table from '../Components/Table';

class Tile extends Component {
  state = {
    tables: [
      {
        name: "Floor Tile",
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
        name: "Bathroom Wall Tile",
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
        name: "Backsplash Wall Tile",
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
        name: "Fireplace Wall Tile",
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
        name: "Floor Stone",
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
        name: "Bathroom Wall Stone",
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
        name: "Backsplash Wall Stone",
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
        name: "Fireplace Wall Stone",
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
        name: "Shower Pans - Stone",
        headers: ["Level", "Total"],
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
      },
      {
        name: "Shower Pans - Tile",
        headers: ["Level", "Total"],
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
      },
      {
        name: "Shower Pans - Deco",
        headers: ["Level", "Total"],
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
      },
      {
        name: "Pattern Charges",
        headers: ["Level", "Pattern", "Cost per SqFt"],
        rows: {
          1: {
              level: "",
              pattern: "",
              total: ""
          }
        },
        part: {
          level: "",
          pattern: "",
          total: ""
        }
      },,
      {
        name: "Add-Ons",
        headers: ["Level", "Cost"],
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

    // this.state.tables.map((table, index) => {
    //   let query = `?client=${client.id}&program=tile&table=${table.name}`;
    //   let tables = this.state.tables;

    //   axios.get(`${API_URL}/employee/${user.recnum}/clients/${client.id}/parts/${query}`)
    //     .then((response) => {
    //       response.data.map((row) => {
    //         Object.keys(row).map((key) => {
    //           delete row[key];
    //         });
    //       });

    //       // tables[index].rows = response.data;

    //       // this.setState({ tables: tables });

    //       // let parts = response.data;
          
    //       // if (parts.length === 0) {
    //       //   let part = Part;
    //       //   this.setState({ parts: [...this.state.parts, part] });
    //       //   return;
    //       // }

    //       // this.setState({ parts: [...parts] });
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     });
    // });

    // this.setState({ tables: TilePricing.tables });
  }

  _saveTableData = async(table, values, actions) => {
    let user = this.props.user;
    let client = this.props.client;
    
    this.timeout = setTimeout(( ) => { actions.setSubmitting(false); }, 1000);

    // Object.keys(values).map((index) => {
    //   values[index].client_id = client.id;
    //   values[index].program = "tile";
    //   values[index].programTable = table.name;

    //   axios.post(`${API_URL}/employee/${user.recnum}/clients/${client.id}/parts`, values[index])
    //     .then((response) => {
    //       console.log(response);
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     })
    // });
  }

  autofill = (formik) => {
    let values = formik.values;

    Object.keys(values).map((index) => {
      let materialWithTax = values[index].material * 1.0825;
      let total = parseFloat(materialWithTax) + parseFloat(values[index].labor);

      formik.setFieldValue(`${index}.materialTax`, materialWithTax.toFixed(3));
      formik.setFieldValue(`${index}.total`, total.toFixed(3));
    }); 
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
Tile.propTypes = {
  dropdown: PropTypes.bool,
  addRow: PropTypes.func,
  tables: PropTypes.object
}

export default Tile;
  