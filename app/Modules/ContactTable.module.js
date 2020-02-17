// Library Imports
import React, { Component } from 'react';
import { View } from 'react-native';
import { Icon } from 'react-native-elements';
import { DataTable } from 'react-native-paper';
import { styles, colors } from './Styles/ContactTable.style';

class ContactTable extends Component {
  state = {
    rows: []
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

          {this.state.rows.map((contact, index) => {
            <DataTable.Row key={index}>
              <DataTable.Cell>{ contact.name }</DataTable.Cell>
              <DataTable.Cell>{ contact.title }</DataTable.Cell>
              <DataTable.Cell>{ contact.phone }</DataTable.Cell>
              <DataTable.Cell>{ contact.email }</DataTable.Cell>
            </DataTable.Row>
          })}

        </DataTable>
      </View>
    )
  }
}

export default ContactTable;
