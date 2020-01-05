// Library Imports
import React, { Component } from 'react';
import { ScrollView, Text, View, RefreshControl, ActivityIndicator } from 'react-native';
import { Divider, Icon } from 'react-native-elements';
import * as Progress from 'react-native-progress';
import ListObject from '../Components/ListObject.component';
import Firebase from '../../config/Firebase';
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
    this._retrieveClients( );
  }

  // Retrieve All Clients from the Firestore DB
  async _retrieveClients( ) {
    let clients = [ ];

    await Firebase.firestore( )
      .collection('clients')
      .doc(Firebase.auth( ).currentUser.uid)
      .collection('clients')
      .get( ).then(function(querySnap) {
        querySnap.forEach(function(doc) {
          clients.push(doc.data( ))
          console.log('Retrieved Client: ' + doc.id);
        })
      });

    this.setState({ clients: [...clients] })
    this.setState({ loading: false });
  }

  // Refresh List
  _refreshList( ) {
    this.setState({ refreshing: true });
    this._retrieveClients( );
    setTimeout(( ) => {
      this.setState({ refreshing: false });
    }, 2000);
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
