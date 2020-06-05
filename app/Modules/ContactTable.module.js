// Library Imports
import React, { Component } from 'react';
import { View } from 'react-native';
import { DataTable } from 'react-native-paper';

class ContactTable extends Component {
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

          <DataTable.Row onPress={( ) => this.props.toggleAddContact(1)}>
            <DataTable.Cell>{this.props.contacts.contct}</DataTable.Cell>
            <DataTable.Cell>{this.props.contacts.cntds1}</DataTable.Cell>
            <DataTable.Cell>{this.props.contacts.cllphn}</DataTable.Cell>
            <DataTable.Cell>{this.props.contacts.e_mail}</DataTable.Cell>
          </DataTable.Row>

          <DataTable.Row onPress={( ) => this.props.toggleAddContact(2)}>
            <DataTable.Cell>{this.props.contacts.contc2}</DataTable.Cell>
            <DataTable.Cell>{this.props.contacts.cntds2}</DataTable.Cell>
            <DataTable.Cell>{this.props.contacts.cell02}</DataTable.Cell>
            <DataTable.Cell>{this.props.contacts.email2}</DataTable.Cell>
          </DataTable.Row>

          <DataTable.Row onPress={( ) => this.props.toggleAddContact(3)}>
            <DataTable.Cell>{this.props.contacts.contc3}</DataTable.Cell>
            <DataTable.Cell>{this.props.contacts.cntds3}</DataTable.Cell>
            <DataTable.Cell>{this.props.contacts.cell03}</DataTable.Cell>
            <DataTable.Cell>{this.props.contacts.email3}</DataTable.Cell>
          </DataTable.Row>
        </DataTable>
      </View>
    )
  }
}

export default ContactTable;
