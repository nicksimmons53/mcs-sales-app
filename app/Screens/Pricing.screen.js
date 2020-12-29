// Library Imports
import React, { Component } from 'react';
import { View, StatusBar, KeyboardAvoidingView, Text } from 'react-native';
import PropTypes from 'prop-types';
import { Divider, ButtonGroup } from 'react-native-elements';
import axios from 'axios';
import { API_URL } from 'react-native-dotenv';
import Toast, { DURATION } from 'react-native-easy-toast';
import Wood from '../Modules/Wood.module';
import Tile from '../Modules/Tile.module';
import Carpet from '../Modules/Carpet.module';
import Vinyl from '../Modules/Vinyl.module';
import Countertops from '../Modules/Countertops.module';
import Header from '../Components/Header';
import { styles, colors } from './Styles/Pricing.style';

export default class Pricing extends Component {
  state = {
    selectedSpreadsheet: 0,
    buttonGroup: ['Tile', 'Wood', 'Carpet', 'Vinyl', 'Countertops'],
    tileTables: [
      {
        name: "Floor Tile",
        headers: ["Level", "Unit", "Material", "Material w/ Tax", "Labor", "Total"],
        rows: [
          {
            id: "",
            level: "",
            unit: "",
            material: "",
            materialTax: "",
            labor: "",
            total: ""
          }
        ],
        part: {
          id: "",
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
        rows: [
          {
            id: "",
            level: "",
            unit: "",
            material: "",
            materialTax: "",
            labor: "",
            total: ""
          }
        ],
        part: {
          id: "",
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
        rows: [
          {
            id: "",
            level: "",
            unit: "",
            material: "",
            materialTax: "",
            labor: "",
            total: ""
          }
        ],
        part: {
          id: "",
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
        rows: [
          {
            id: "",
            level: "",
            unit: "",
            material: "",
            materialTax: "",
            labor: "",
            total: ""
          }
        ],
        part: {
          id: "",
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
        rows: [
          {
            id: "",
            level: "",
            unit: "",
            material: "",
            materialTax: "",
            labor: "",
            total: ""
          }
        ],
        part: {
          id: "",
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
        rows: [
          {
            id: "",
            level: "",
            unit: "",
            material: "",
            materialTax: "",
            labor: "",
            total: ""
          }
        ],
        part: {
          id: "",
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
        rows: [
          {
            id: "",
            level: "",
            unit: "",
            material: "",
            materialTax: "",
            labor: "",
            total: ""
          }
        ],
        part: {
          id: "",
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
        rows: [
          {
            id: "",
            level: "",
            unit: "",
            material: "",
            materialTax: "",
            labor: "",
            total: ""
          }
        ],
        part: {
          id: "",
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
        rows:[
          {
            id: "",
            level: "",
            total: ""
          }
        ],
        part: {
          id: "",
          level: "",
          total: ""
        }
      },
      {
        name: "Shower Pans - Tile",
        headers: ["Level", "Total"],
        rows:[
          {
            id: "",
            level: "",
            total: ""
          }
        ],
        part: {
          id: "",
          level: "",
          total: ""
        }
      },
      {
        name: "Shower Pans - Deco",
        headers: ["Level", "Total"],
        rows:[
          {
            id: "",
            level: "",
            total: ""
          }
        ],
        part: {
          id: "",
          level: "",
          total: ""
        }
      },
      {
        name: "Underlayment",
        headers: ["Description", "Cost per SqFt"],
        rows:[
          {
            id: "",
            description: "",
            total: ""
          }
        ],
        part: {
          id: "",
          description: "",
          total: ""
        }
      },
      {
        name: "Pattern Charges",
        headers: ["Pattern", "Cost per SqFt"],
        rows:[
          {
            id: "",
            description: "",
            total: ""
          }
        ],
        part: {
          id: "",
          description: "",
          total: ""
        }
      },
      {
        name: "Accents",
        headers: ["Pattern", "Cost per SqFt"],
        rows:[
          {
            id: "",
            description: "",
            total: ""
          }
        ],
        part: {
          id: "",
          description: "",
          total: ""
        }
      },
      {
        name: "Shower Seats",
        headers: ["Description", "Unit", "Cost"],
        rows:[
          {
            id: "",
            description: "",
            unit: "",
            total: ""
          }
        ],
        part: {
          id: "",
          description: "",
          unit: "",
          total: ""
        }
      },
      {
        name: "Add-Ons",
        headers: ["Description", "Unit", "Cost"],
        rows:[
          {
            id: "",
            description: "",
            unit: "",
            total: ""
          }
        ],
        part: {
          id: "",
          description: "",
          unit: "",
          total: ""
        }
      },
    ],
    woodTables: [
      {
        name: "Wood Flooring",
        headers: ["Level", "Unit", "Material", "Material w/ Tax", "Labor", "Total"],
        rows: [
          {
            id: "",
            level: "",
            unit: "",
            material: "",
            materialTax: "",
            labor: "",
            total: ""
          }
        ],
        part: {
          id: "",
          level: "",
          unit: "",
          material: "",
          materialTax: "",
          labor: "",
          total: ""
        }
      },
      {
        name: "Underlayment",
        headers: ["Description", "Cost per SqFt"],
        rows:[
          {
            id: "",
            description: "",
            total: ""
          }
        ],
        part: {
          id: "",
          description: "",
          total: ""
        }
      },
    ],
    carpetTables: [
      {
        name: "Carpet Flooring",
        headers: ["Level", "Unit", "Material", "Material w/ Tax", "Labor", "Total"],
        rows: [
          {
            id: "",
            level: "",
            unit: "",
            material: "",
            materialTax: "",
            labor: "",
            total: ""
          }
        ],
        part: {
          id: "",
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
        rows: [
          {
            id: "",
            level: "",
            unit: "",
            total: ""
          }
        ],
        part: {
          id: "",
          level: "",
          unit: "",
          total: ""
        }
      },
    ],
    vinylTables: [
      {
        name: "Vinyl Plank",
        headers: ["Level", "Unit", "Material", "Material w/ Tax", "Labor", "Total"],
        rows: [
          {
            id: "",
            level: "",
            unit: "",
            material: "",
            materialTax: "",
            labor: "",
            total: ""
          }
        ],
        part: {
          id: "",
          level: "",
          unit: "",
          material: "",
          materialTax: "",
          labor: "",
          total: ""
        }
      },
      {
        name: "Vinyl Sheet",
        headers: ["Level"],
        headers: ["Level", "Unit", "Material", "Material w/ Tax", "Labor", "Total"],
        rows: [
          {
            level: "",
            unit: "",
            material: "",
            materialTax: "",
            labor: "",
            total: ""
          }
        ],
        part: {
          level: "",
          unit: "",
          material: "",
          materialTax: "",
          labor: "",
          total: ""
        }
      },
    ],
    countertopTables: [
      {
        name: "Edges",
        headers: ["Type", "Total"],
        rows: [
          {
            id: "",
            type: "",
            total: ""
          }
        ],
        part: {
          id: "",
          type: "",
          total: ""
        }
      },
      {
        name: "Sinks/Shape",
        headers: ["Description", "Total"],
        rows: [
          {
						id:"",
            sku: "TMC 011 50/50 ",
            price: "344.000",
            altered: false
          },
          {
						id:"",
            sku: "TMC 022 60/40 ",
            price: "344.000",
            altered: false
          },
          {
						id:"",
            sku: "TMC 044 SINGLE BOWL",
            price: "344.000",
            altered: false
          },
          {
						id:"",
            sku: "TMC 133 OVAL WHITE ",
            price: "186.000",
            altered: false
          },
          {
						id:"",
            sku: "TMC 144 BISQUE OVAL",
            price: "206.000",
            altered: false
          },
          {
						id:"",
            sku: "TMC 221 W RECTANGLE",
            price: "206.000",
            altered: false
          },
          {
						id:"",
            sku: "TMC 222 B RECTANGLE",
            price: "219.000",
            altered: false
          },
          {
						id:"",
            sku: "TMC 188 - Bar",
            price: "473.000",
            altered: false
          },
          {
						id:"",
            sku: "TMC 177 - Bar",
            price: "301.000",
            altered: false
          },
          {
						id:"",
            sku: "TMC 166 - Bar",
            price: "224.000",
            altered: false
          },
          {
						id:"",
            sku: "TMCP 3321 - Single",
            price: "824.000",
            altered: false
          },
        ],
        part: {
          id: "",
          sku: "",
          price: "",
          altered: ""
        }
      },
      {
        name: "Level 1",
        headers: ["Type", "Color", "Total"],
        rows: [
          {
            id: "",
            type: "",
            color: "",
            total: ""
          }
        ],
        part: {
          id: "",
          type: "",
          color: "",
          total: ""
        }
      },
      {
        name: "Level 2",
        headers: ["Type", "Color", "Total"],
        rows: [
          {
            id: "",
            type: "",
            color: "",
            total: ""
          }
        ],
        part: {
          id: "",
          type: "",
          color: "",
          total: ""
        }
      },
      {
        name: "Level 3",
        headers: ["Type", "Color", "Total"],
        rows: [
          {
            id: "",
            type: "",
            color: "",
            total: ""
          }
        ],
        part: {
          id: "",
          type: "",
          color: "",
          total: ""
        }
      },
      {
        name: "Level 4",
        headers: ["Type", "Color", "Total"],
        rows: [
          {
            id: "",
            type: "",
            color: "",
            total: ""
          }
        ],
        part: {
          id: "",
          type: "",
          color: "",
          total: ""
        }
      },
      {
        name: "Level 5",
        headers: ["Type", "Color", "Total"],
        rows: [
          {
            id: "",
            type: "",
            color: "",
            total: ""
          }
        ],
        part: {
          id: "",
          type: "",
          color: "",
          total: ""
        }
      },
      {
        name: "Level 6",
        headers: ["Type", "Color", "Total"],
        rows: [
          {
            id: "",
            type: "",
            color: "",
            total: ""
          }
        ],
        part: {
          id: "",
          type: "",
          color: "",
          total: ""
        }
      },
      {
        name: "Level 7",
        headers: ["Type", "Color", "Total"],
        rows: [
          {
            id: "",
            type: "",
            color: "",
            total: ""
          }
        ],
        part: {
          id: "",
          type: "",
          color: "",
          total: ""
        }
      },
      {
        name: "Level 8",
        headers: ["Type", "Color", "Total"],
        rows: [
          {
            id: "",
            type: "",
            color: "",
            total: ""
          }
        ],
        part: {
          id: "",
          type: "",
          color: "",
          total: ""
        }
      },
      {
        name: "Level 9",
        headers: ["Type", "Color", "Total"],
        rows: [
          {
            id: "",
            type: "",
            color: "",
            total: ""
          }
        ],
        part: {
          id: "",
          type: "",
          color: "",
          total: ""
        }
      },
      {
        name: "Level 10",
        headers: ["Type", "Color", "Total"],
        rows: [
          {
            id: "",
            type: "",
            color: "",
            total: ""
          }
        ],
        part: {
          id: "",
          type: "",
          color: "",
          total: ""
        }
      },
    ]
  };

  timeout = null;

  componentWillUnmount( ) {
    clearTimeout(this.timeout);
  }

  updateIndex = (selected) => {
    this.setState({selectedSpreadsheet: selected});
  }

  componentDidMount( ) {
    const client = this.props.navigation.getParam('client');
    const user = this.props.navigation.getParam('user');
    
    // Retrieve Tile Tables
    this.state.tileTables.map((table, index) => {
      let query = `?client=${client.id}&program=tile&table=${table.name}`;

      axios.get(`${API_URL}/employee/${user.recnum}/clients/${client.id}/parts/${query}`)
        .then((response) => {
          if (response.data.length != 0) {
            let tables = [...this.state.tileTables];
            tables[index].rows.pop();

            response.data.map((row, rowIndex) => {
              for (var key in row) {
                if (!table.part.hasOwnProperty(key))
                  delete response.data[rowIndex][key];
              }

              tables[index].rows.push(row);
            });

            this.setState({ tileTables: tables });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    });

    // Retrieve Wood Tables
    this.state.woodTables.map((table, index) => {
      let query = `?client=${client.id}&program=wood&table=${table.name}`;

      axios.get(`${API_URL}/employee/${user.recnum}/clients/${client.id}/parts/${query}`)
        .then((response) => {
          if (response.data.length != 0) {
            let tables = [...this.state.woodTables];
            tables[index].rows.pop();

            response.data.map((row, rowIndex) => {
              for (var key in row) {
                if (!table.part.hasOwnProperty(key))
                  delete response.data[rowIndex][key];
              }

              tables[index].rows.push(row);
            });

            this.setState({ woodTables: tables });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    });

    // Retrieve Carpet Tables
    this.state.carpetTables.map((table, index) => {
      let query = `?client=${client.id}&program=carpet&table=${table.name}`;

      axios.get(`${API_URL}/employee/${user.recnum}/clients/${client.id}/parts/${query}`)
        .then((response) => {
          if (response.data.length != 0) {
            let tables = [...this.state.carpetTables];
            tables[index].rows.pop();

            response.data.map((row, rowIndex) => {
              for (var key in row) {
                if (!table.part.hasOwnProperty(key))
                  delete response.data[rowIndex][key];
              }

              tables[index].rows.push(row);
            });

            this.setState({ carpetTables: tables });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    });

    // Retrieve Vinyl Tables
    this.state.vinylTables.map((table, index) => {
      let query = `?client=${client.id}&program=vinyl&table=${table.name}`;

      axios.get(`${API_URL}/employee/${user.recnum}/clients/${client.id}/parts/${query}`)
        .then((response) => {
          if (response.data.length != 0) {
            let tables = [...this.state.vinylTables];
            tables[index].rows.pop();

            response.data.map((row, rowIndex) => {
              for (var key in row) {
                if (!table.part.hasOwnProperty(key))
                  delete response.data[rowIndex][key];
              }

              tables[index].rows.push(row);
            });

            this.setState({ vinylTables: tables });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    });

    // Retrieve Countertop Tables
    this.state.countertopTables.map((table, index) => {
      let query = `?client=${client.id}&program=countertops&table=${table.name}`;

      axios.get(`${API_URL}/employee/${user.recnum}/clients/${client.id}/parts/${query}`)
        .then((response) => {
          if (response.data.length != 0) {
            let tables = [...this.state.countertopTables];
            tables[index].rows.pop();

            response.data.map((row, rowIndex) => {
              for (var key in row) {
                if (!table.part.hasOwnProperty(key))
                  delete response.data[rowIndex][key];
              }

              
              let newPart = {...tables[index].part};
              Object.keys(tables[index].part).map((key) => {
                newPart[key] = row[key];
              });

              tables[index].rows.push(newPart);
            });
            
            this.setState({ countertopTables: tables });
          }
        })
        .catch((error) => {
          console.log(error);
        });
      });
  }

  showTableSavedToast = (tableName) => {
    this.refs.toast.show(`${tableName} has been saved.`, 500);
  }

  render( ) {
    const client = this.props.navigation.getParam('client');
    const user = this.props.navigation.getParam('user');
    const selectedIndex = this.state.selectedSpreadsheet;

    return (
      <KeyboardAvoidingView enabled behavior='padding' style={styles.background}>
        <StatusBar barStyle='light-content' />
        <View style={styles.row}>
          <View style={styles.infoContainer}>
            <Header title="Level Builder"/>

            <Divider />

            <ButtonGroup
              onPress={this.updateIndex}
              selectedIndex={selectedIndex}
              buttons={this.state.buttonGroup}
              selectedButtonStyle={styles.selected}
              containerStyle={styles.buttonGroup}/>

            { selectedIndex === 0 ? <Tile client={client} user={user} tables={this.state.tileTables} savedTableNoti={this.showTableSavedToast}/> : null }

            { selectedIndex === 1 ? <Wood client={client} user={user} tables={this.state.woodTables} savedTableNoti={this.showTableSavedToast}/> : null }

            { selectedIndex === 2 ? <Carpet client={client} user={user} tables={this.state.carpetTables} savedTableNoti={this.showTableSavedToast}/> : null }

            { selectedIndex === 3 ? <Vinyl client={client} user={user} tables={this.state.vinylTables} savedTableNoti={this.showTableSavedToast}/> : null } 

            { selectedIndex === 4 ? <Countertops client={client} user={user} tables={this.state.countertopTables} savedTableNoti={this.showTableSavedToast}/> : null }

          </View>

        <Toast ref='toast' position='center' style={styles.toast} />
        
        </View>
      </KeyboardAvoidingView>
    )
  }
}

// Props Validation
Pricing.propTypes = {
  navigation: PropTypes.object
}
