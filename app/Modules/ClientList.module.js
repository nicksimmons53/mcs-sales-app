// Library Imports
import React, { Component } from 'react';
import { ScrollView, Text, View, RefreshControl, ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';
import { Divider, Icon } from 'react-native-elements';
import * as Client from '../Functions/Client';
import ListObject from '../Components/ListObject.component';
import styles from './Styles/ClientList.style';
import colors from '../Library/Colors';

// Class Component that will show the list of Clients
class ClientList extends Component {
  state = {
    refreshing: false,
    clients: [ ],
    loading: true,
  };

  timeout = null;

  // Retrieve All Clients from the Firestore DB
  componentDidMount( ) {
    Client.retrieveAll('clients').then((res) => {
      this.setState({clients: [...res]});
    });

    this.setState({ loading: false });
  }

  componentWillUnmount( ) {
    clearTimeout(this.timeout);
  }

  // Refresh List
  _refreshList( ) {
    this.setState({ refreshing: true });
    Client.retrieveAll('clients').then((res) => {
      this.setState({clients: [...res]});
    });

    this.timeout = setTimeout(( ) => { this.setState({ refreshing: false }); }, 2000);
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
}

// Props Valdidation
ClientList.propTypes = {
  setClientUID: PropTypes.func
}

export default ClientList;
