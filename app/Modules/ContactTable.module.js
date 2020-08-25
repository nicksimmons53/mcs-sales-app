// Library Imports
import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import { DataTable } from 'react-native-paper';
import colors from '../Library/Colors';

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

                    {this.props.contacts.map((contact, index) => (
                        <DataTable.Row key={index}>
                            <DataTable.Cell>{contact.name}</DataTable.Cell>
                            <DataTable.Cell>{contact.title}</DataTable.Cell>
                            <DataTable.Cell>{contact.phone}</DataTable.Cell>
                            <DataTable.Cell>{contact.email}</DataTable.Cell>
                        </DataTable.Row>
                    ))}

                    <DataTable.Row style={styles.addRow}>
                        <Icon
                            name='plus-square'
                            type='font-awesome'
                            size={30}
                            color={colors.green}
                            onPress={( ) => this.props.toggleAddContact( )}/>
                    </DataTable.Row>
                </DataTable>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    addRow: {
        padding: 10,
        justifyContent: 'center'
    },
});

export default ContactTable;
