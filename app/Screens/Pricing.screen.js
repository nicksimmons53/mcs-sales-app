// Library Imports
import React, { Component } from 'react';
import { View, StatusBar, KeyboardAvoidingView, Text } from 'react-native';
import PropTypes from 'prop-types';
import { Divider, Icon, ButtonGroup } from 'react-native-elements';
import Toast from 'react-native-easy-toast';
import { Formik } from 'formik';
import * as Program from '../Functions/Program';
import SpreadSheet from '../Modules/SpreadSheet.module';
import { styles, colors } from './Styles/Pricing.style';

export default class Pricing extends Component {
  state = {
    selectedSpreadsheet: 0,
    tableName: '',
    buttonGroup: ['Tile', 'Wood', 'Carpet', 'Vinyl', 'Granite'],
    Tile: {
      0: {
        program: 'Tile',
        parent: 'Tile Table',
        name: 'Floor Tile',
        columnHeaders: ['Item', 'Description', 'Material', 'Material w/ Tax', 'Labor', 'Total SqFt'],
        rows: [{item: '', description: '', material: '', materialWithTax: '', labor: '', total: ''}],
        newRow: {item: '', description: '', material: '', materialWithTax: '', labor: '', total: ''}
      },
      1: {
        program: 'Tile',
        parent: 'Tile Table',
        name: 'Bathroom Wall Tile',
        columnHeaders: ['Item', 'Description', 'Material', 'Material w/ Tax', 'Labor', 'Total SqFt'],
        rows: [{item: '', description: '', material: '', materialWithTax: '', labor: '', total: ''}],
        newRow: {item: '', description: '', material: '', materialWithTax: '', labor: '', total: ''}
      },
      2: {
        program: 'Tile',
        parent: 'Tile Table',
        name: 'Backsplash Wall Tile',
        columnHeaders: ['Item', 'Description', 'Material', 'Material w/ Tax', 'Labor', 'Total SqFt'],
        rows: [{item: '', description: '', material: '', materialWithTax: '', labor: '', total: ''}],
        newRow: {item: '', description: '', material: '', materialWithTax: '', labor: '', total: ''}
      },
      3: {
        program: 'Tile',
        parent: 'Tile Table',
        name: 'Fireplace Wall Tile',
        columnHeaders: ['Item', 'Description', 'Material', 'Material w/ Tax', 'Labor', 'Total SqFt'],
        rows: [{item: '', description: '', material: '', materialWithTax: '', labor: '', total: ''}],
        newRow: {item: '', description: '', material: '', materialWithTax: '', labor: '', total: ''}
      },
      4: {
        program: 'Tile',
        parent: 'Tile Table',
        name: 'Deco Tile Add-On',
        columnHeaders: ['Item', 'Description', 'Material', 'Material w/ Tax', 'Labor', 'Total SqFt'],
        rows: [{item: '', description: '', material: '', materialWithTax: '', labor: '', total: ''}],
        newRow: {item: '', description: '', material: '', materialWithTax: '', labor: '', total: ''}
      },
      5: {
        program: 'Tile',
        parent: 'Tile Table',
        name: 'Floor Stone',
        columnHeaders: ['Item', 'Description', 'Material', 'Material w/ Tax', 'Labor', 'Total SqFt'],
        rows: [{item: '', description: '', material: '', materialWithTax: '', labor: '', total: ''}],
        newRow: {item: '', description: '', material: '', materialWithTax: '', labor: '', total: ''}
      },
      6: {
        program: 'Tile',
        parent: 'Tile Table',
        name: 'Bathroom Wall Stone',
        columnHeaders: ['Item', 'Description', 'Material', 'Material w/ Tax', 'Labor', 'Total SqFt'],
        rows: [{item: '', description: '', material: '', materialWithTax: '', labor: '', total: ''}],
        newRow: {item: '', description: '', material: '', materialWithTax: '', labor: '', total: ''}
      },
      7: {
        program: 'Tile',
        parent: 'Tile Table',
        name: 'Backsplash Wall Stone',
        columnHeaders: ['Item', 'Description', 'Material', 'Material w/ Tax', 'Labor', 'Total SqFt'],
        rows: [{item: '', description: '', material: '', materialWithTax: '', labor: '', total: ''}],
        newRow: {item: '', description: '', material: '', materialWithTax: '', labor: '', total: ''}
      },
      8: {
        program: 'Tile',
        parent: 'Tile Table',
        name: 'Fireplace Wall Stone',
        columnHeaders: ['Item', 'Description', 'Material', 'Material w/ Tax', 'Labor', 'Total SqFt'],
        rows: [{item: '', description: '', material: '', materialWithTax: '', labor: '', total: ''}],
        newRow: {item: '', description: '', material: '', materialWithTax: '', labor: '', total: ''}
      },
      9: {
        program: 'Tile',
        parent: 'Tile Table',
        name: 'Pattern Charges',
        columnHeaders: ['Item', 'Pattern', 'Cost per SqFt'],
        rows: [{item: '', pattern: '', costPerSqft: ''}],
        newRow: {item: '', pattern: '', costPerSqft: ''}
      },
      10: {
        program: 'Tile',
        parent: 'Tile Table',
        name: 'Shower Pans - Stone',
        columnHeaders: ['Item', 'Total'],
        rows: [{item: '', total: ''}],
        newRow: {item: '', total: ''}
      },
      11: {
        program: 'Tile',
        parent: 'Tile Table',
        name: 'Shower Pans - Tile',
        columnHeaders: ['Item', 'Total'],
        rows: [{item: '', total: ''}],
        newRow: {item: '', total: ''}
      },
      12: {
        program: 'Tile',
        parent: 'Tile Table',
        name: 'Shower Pans - Deco',
        columnHeaders: ['Item', 'Total'],
        rows: [{item: '', total: ''}],
        newRow: {item: '', total: ''}
      },
      13: {
        program: 'Tile',
        parent: 'Tile Table',
        name: 'Miscellaneous',
        columnHeaders: ['Item', 'Total'],
        rows: [{item: '', total: ''}],
        newRow: {item: '', total: ''}
      },
      14: {
        program: 'Tile',
        parent: 'Tile Table',
        name: 'Grout Types',
        columnHeaders: ['Item'],
        rows: [{item: ''}],
        newRow: {item: ''}
      },
      15: {
        program: 'Tile',
        parent: 'Tile Table',
        name: 'Thinset Types',
        columnHeaders: ['Item'],
        rows: [{item: ''}],
        newRow: {item: ''}
      },
      16: {
        program: 'Tile',
        parent: 'Tile Table',
        name: 'Water Proofing',
        columnHeaders: ['Item'],
        rows: [{item: ''}],
        newRow: {item: ''}
      }
    },
    Wood: {
      0: {
        program: 'Wood',
        parent: 'Wood Table',
        name: 'Wood',
        columnHeaders: ['Style #', 'Name', 'Species', 'Width', 'Description', 'Core', 'Level', 'Price'],
        rows: [{style: '', name: '', species: '', width: '', desc: '', core: '', level: '', price: ''}],
        newRow: {style: '', name: '', species: '', width: '', desc: '', core: '', level: '', price: ''}
      },
      1: {
        program: 'Wood',
        parent: 'Wood Table',
        name: 'Miscellaneous',
        columnHeaders: ['Item', 'Price'],
        rows: [{item: '', total: ''}],
        newRow: {item: '', total: ''}
      },
      2: {
        program: 'Wood',
        parent: 'Wood Table',
        name: 'Wood Extras',
        columnHeaders: ['Item', 'Price'],
        rows: [{item: '', total: ''}],
        newRow: {item: '', total: ''}
      }
    },
    Carpet: {
      0: {
        program: 'Carpet',
        parent: 'Carpet Table',
        name: 'Carpet',
        columnHeaders: ['Style', 'Level', 'Price'],
        rows: [{style: '', level: '', price: ''}],
        newRow: {style: '', level: '', price: ''}
      },
      1: {
        program: 'Carpet',
        parent: 'Carpet Table',
        name: 'Pads',
        columnHeaders: ['Pads', 'Price'],
        rows: [{pads: '', price: ''}],
        newRow: {pads: '', price: ''}
      }
    },
    Vinyl: {
      0: {
        program: 'Vinyl',
        parent: 'Vinyl Table',
        name: 'LVP',
        columnHeaders: ['Item', 'Price per Ln. Ft.'],
        rows: [{item: '', cost: ''}],
        newRow: {item: '', cost: ''}
      },
      1: {
        program: 'Vinyl',
        parent: 'Vinyl Table',
        name: 'Miscellaneous',
        columnHeaders: ['Item', 'Total'],
        rows: [{item: '', total: ''}],
        newRow: {item: '', total: ''}
      }
    },
    Granite: {
      0: {
        program: 'Granite',
        parent: 'Granite Table',
        name: 'Level 1',
        columnHeaders: ['Colors', 'Thickness', 'Price'],
        rows: [{color: '', thickness: '', price: ''}],
        newRow: {color: '', thickness: '', price: ''}
      },
      1: {
        program: 'Granite',
        parent: 'Granite Table',
        name: 'Level 2',
        columnHeaders: ['Colors', 'Thickness', 'Price'],
        rows: [{color: '', thickness: '', price: ''}],
        newRow: {color: '', thickness: '', price: ''}
      },
      2: {
        program: 'Granite',
        parent: 'Granite Table',
        name: 'Level 3',
        columnHeaders: ['Colors', 'Thickness', 'Price'],
        rows: [{color: '', thickness: '', price: ''}],
        newRow: {color: '', thickness: '', price: ''}
      },
      3: {
        program: 'Granite',
        parent: 'Granite Table',
        name: 'Level 4',
        columnHeaders: ['Colors', 'Thickness', 'Price'],
        rows: [{color: '', thickness: '', price: ''}],
        newRow: {color: '', thickness: '', price: ''}
      },
      4: {
        program: 'Granite',
        parent: 'Granite Table',
        name: 'Level 5',
        columnHeaders: ['Colors', 'Thickness', 'Price'],
        rows: [{color: '', thickness: '', price: ''}],
        newRow: {color: '', thickness: '', price: ''}
      },
      5: {
        program: 'Granite',
        parent: 'Granite Table',
        name: 'Level 6',
        columnHeaders: ['Colors', 'Thickness', 'Price'],
        rows: [{color: '', thickness: '', price: ''}],
        newRow: {color: '', thickness: '', price: ''}
      },
      6: {
        program: 'Granite',
        parent: 'Granite Table',
        name: 'Level 7',
        columnHeaders: ['Colors', 'Thickness', 'Price'],
        rows: [{color: '', thickness: '', price: ''}],
        newRow: {color: '', thickness: '', price: ''}
      },
    }
  };

  timeout = null;

  componentWillUnmount( ) {
    clearTimeout(this.timeout);
  }

  updateIndex = (selected) => {
    this.setState({selectedSpreadsheet: selected});
  }

  _saveTableData = async(values, actions, client, index) => {
    let docName = this.state.buttonGroup[index];
    this.timout = setTimeout(( ) => { actions.setSubmitting(false); }, 1000);

    Program.saveTable(values, docName, 'clients', client);

    this.refs.toast.show('Client Program Saved');
  }

  addRow = (tables, tableIndex) => {
    let table = tables[tableIndex];

    let newRow = {...table.newRow};
    let newTableObj = {
      'name': table.name,
      'rows': table.rows.push(newRow)
    };

    this.setState(prevState => ({
      ...prevState[table.parent],
      table: {
        name: table.name,
        rows: [...tables[tableIndex].rows, newTableObj]
      }
    }))
  }

  render( ) {
    const client = this.props.navigation.getParam('client');
    const selectedIndex = this.state.selectedSpreadsheet;

    return (
      <KeyboardAvoidingView enabled behavior='padding' style={styles.background}>
        <StatusBar barStyle='light-content' />
        <View style={styles.row}>
          <Formik
            enableReinitialize={true}
            initialValues={this.state}
            onSubmit={(values, actions) => this._saveTableData(values, actions, client, selectedIndex)}>
            {formikProps => (
              <View style={styles.infoContainer}>
                <View style={styles.header}>
                  <Text style={styles.text}>Level Builder</Text>
                  <View style={{flexDirection: 'row'}}>
                    <Icon
                      name='download'
                      type='font-awesome'
                      size={30}
                      color={colors.green}
                      onPress={formikProps.handleSubmit}/>
                  </View>
                </View>

                <Divider />

                <ButtonGroup
                  onPress={this.updateIndex}
                  selectedIndex={selectedIndex}
                  buttons={this.state.buttonGroup}
                  selectedButtonStyle={styles.selected}
                  containerStyle={styles.buttonGroup} />

                {selectedIndex === 0 ?
                  <SpreadSheet
                    formikProps={formikProps}
                    client={client}
                    tableName='Tile'
                    addRow={this.addRow}
                    tables={this.state.Tile}/>
                :
                  null
                }

                {selectedIndex === 1 ?
                  <SpreadSheet
                    formikProps={formikProps}
                    client={client}
                    tableName='Wood'
                    addRow={this.addRow}
                    tables={this.state.Wood}/>
                :
                  null
                }

                {selectedIndex === 2 ?
                  <SpreadSheet
                    formikProps={formikProps}
                    client={client}
                    tableName='Carpet'
                    addRow={this.addRow}
                    tables={this.state.Carpet}/>
                :
                  null
                }

                {selectedIndex === 3 ?
                  <SpreadSheet
                    formikProps={formikProps}
                    client={client}
                    tableName='Vinyl'
                    addRow={this.addRow}
                    tables={this.state.Vinyl}/>
                :
                  null
                }

                {selectedIndex === 4 ?
                  <SpreadSheet
                    formikProps={formikProps}
                    client={client}
                    tableName='Granite'
                    addRow={this.addRow}
                    tables={this.state.Granite}
                    dropdown={true}/>
                :
                  null
                }

              </View>
              )}
            </Formik>

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
