// Library Imports
import React, { Component } from 'react';
import { ScrollView, Text, View, RefreshControl, ActivityIndicator } from 'react-native';
import { Divider, Icon } from 'react-native-elements';
import Client from '../Functions/Client';
import ListObject from '../Components/ListObject.component';
import styles from './Styles/ClientList.style';
import colors from '../Library/Colors';

// Class Component that will show the list of Clients
class ClientList extends Component {
  state = {
    refreshing: false,
    clients: [ ],
    loading: true
  };

  // Retrieve All Clients from the Firestore DB
  async componentDidMount( ) {
    this.setState({ clients: Client.retrieveAll('clients') });
    this.setState({ loading: false });
  }

  // Refresh List
  _refreshList( ) {
    this.setState({ refreshing: true });
    Client.retrieveAll('clients');
    setTimeout(( ) => { this.setState({ refreshing: false }); }, 2000);
  }

  render( ) {
    return (
      <View style={styles.background}>
        <View style={styles.row}>
          <Text style={styles.text}>Client List</Text>
          <Icon
            name='search'
            type='font-awesome'
            color={colors.background}
            iconStyle={{paddingRight: 10}} />
        </View>

        <Divider />

        <ScrollView style={styles.sv}>
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={( ) => this._refreshList( )} />
          {
            this.state.loading && (
              <ActivityIndicator size='large' color={colors.black} style={{paddingTop: 200}} />
            )
          }
          {
            this.state.clients.map((client, index) => (
              <ListObject
                client={client}
                key={index}
                index={index}
                setClientUID={this.props.setClientUID}
              />
            ))
          }
        </ScrollView>
      </View>
    );
  }
};

export default ClientList;
