// Library Imports
import React, { Component } from 'react';
import { View } from 'react-native';
import { Icon, Input, Text } from 'react-native-elements';
import { DataTable } from 'react-native-paper';
import Modal from 'react-native-modal';
import { styles, colors } from './Styles/ContactTable.style';

class ContactTable extends Component {
  state = {
    rows: [],
    addContact: false
  }

  componentDidMount( ) {

  }

  addRow = ( ) => {
    let newRow = {
      name: '',
      title: '',
      phone: '',
      email: ''
    }

    // this.setState({rows: [...this.state.rows, newRow]});
  }

  render( ) {
    return (
      <View>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>Name</DataTable.Title>
            <DataTable.Title>Title</DataTable.Title>
            <DataTable.Title>Phone</DataTable.Title>
            <DataTable.Title>Email</DataTable.Title>
          </DataTable.Header>

          {this.state.rows.map((contact, index) => (
            <DataTable.Row key={index}>
            </DataTable.Row>
          ))}

          <DataTable.Row style={styles.addRow}>
            <Icon
              name='plus-square'
              type='font-awesome'
              size={32}
              color={colors.green}
              onPress={( ) => this.props.toggleAddContact( )}/>
          </DataTable.Row>
        </DataTable>
      </View>
    )
  }
}

export default ContactTable;
