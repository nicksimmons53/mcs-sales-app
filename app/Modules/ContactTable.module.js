// Library Imports
import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import { DataTable } from 'react-native-paper';
import { deleteContact } from '../Components/Alert.component';
import colors from '../Library/Colors';

class ContactTable extends Component {
    render( ) {
        return (
            <DataTable style={styles.background}>
                <DataTable.Header>
                    <DataTable.Title>Name</DataTable.Title>
                    <DataTable.Title>Title</DataTable.Title>
                    <DataTable.Title>Phone</DataTable.Title>
                    <DataTable.Title>Email</DataTable.Title>
                </DataTable.Header>

                {this.props.contacts.map((contact, index) => (
                    <DataTable.Row key={index} onPress={( ) => deleteContact(contact.id, this.props.deleteContact)}>
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
        )
    }
}

const styles = StyleSheet.create({
    background: {
        minHeight: 75,
        margin: 10,
        borderRadius: 3,
        backgroundColor: colors.white,
        flex: 1
    },
    addRow: {
        padding: 10,
        justifyContent: 'center'
    },
});

export default ContactTable;
