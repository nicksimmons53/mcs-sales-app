// Library Imports
import React, { Component } from 'react';
import { View, StatusBar, AsyncStorage, ActivityIndicator, Dimensions } from 'react-native';
import axios from 'axios';
import PropTypes from 'prop-types';
import Modal from 'react-native-modal';
import NetInfo from '@react-native-community/netinfo';
import ClientList from '../Modules/ClientList.module';
import ClientProfile from '../Modules/ClientProfile.module';
import Toolbar from '../Components/Toolbar.component';
import { networkALert } from '../Components/Alert.component';
import { styles, colors } from './Styles/Profile.style';

// Profile.js
// Purpose: This class will display the profile home page and show the list of
// clients. It is the main navigator for the application.
class Profile extends Component {
  constructor( ) {
    super( );
    const isPortrait = ( ) => {
      const dim = Dimensions.get('screen');
      return dim.height >= dim.width;
    }

    // Initial State
    this.state = {
      client: null,
      clients: [ ],
      loading: false,
      refresh: false,
      clientModal: false,
      user: null,
      portrait: isPortrait( ) ? true : false
    };

    Dimensions.addEventListener('change', ( ) => {
      this.setState({
        portrait: isPortrait( ) ? true : false
      });
    });
  }

  componentDidMount( ) {
    let user = this.props.navigation.state.params.user[0];
    this.setState({ user: user });

    axios.get(`https://ga3xyasima.execute-api.us-east-1.amazonaws.com/dev/employee/${user.recnum}/clients`)
      .then((response) => {
        this.setState({ clients: response.data });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  // Update state when client is added
  refresh = (user) => {
    axios.get(`https://ga3xyasima.execute-api.us-east-1.amazonaws.com/dev/employee/${user.recnum}/clients`)
      .then((response) => {
        this.setState({ clients: response.data });
      })
      .catch((error) => {
        console.error(error);
      });
  }
  
  removeClientFromState = (removedClient) => {
    let clients = this.state.clients;
    clients.map((client, i) => {
      if (client.uid === removedClient.uid) 
        clients.splice(i, 1);
    });
  }

  // Sets the UID when a client is selected for viewing
  setClientUID = async(uid) => {
    this.state.clients.map((client) => {
      if (client.id === uid) {
        this.setState({ client: client });
      }
    });
    
    this.setState({ loading: true });

    this.setState({ clientModal: true });
    this.setState({ loading: false });
  }

  // User Sign Out (clears AsyncStorage and Firebase)
  _signOutAsync = async( ) => {
    await AsyncStorage.clear( );
    this.props.navigation.navigate('Auth');
  }

  // Force Update
  toggleLoading = ( ) => {
    this.setState({loading: true});
  }

  getNetworkInfo = ( ) => {
    NetInfo.fetch( ).then(state => {
      if (state.isConnected === false) {
        return {networkALert};
      }
    })
  }

  toggleModal = ( ) => {
    this.setState({ clientModal: false });
  }

  render( ) {
    if (this.state.portrait === false) {
      return (
        <View style={styles.background}>
          <StatusBar barStyle='light-content' />

          <View style={styles.content}>
            <View style={styles.list}>
              <Toolbar
                home={true}
                createClient={true}
                signOut={true}
                navigation={this.props.navigation}
                signOutFunc={this._signOutAsync}
                refresh={this.refresh}
                user={this.state.user}/>

              <ClientList setClientUID={this.setClientUID} clients={this.state.clients}/>
            </View>

            <View style={styles.profile}>
              {
                this.state.loading ?
                  <ActivityIndicator size='large' color={colors.black} style={{paddingTop: 200}} />
                :
                  <ClientProfile
                    user={this.state.user}
                    nav={this.props.navigation}
                    client={this.state.client}
                    loading={this.toggleLoading}
                    portraitBool={this.state.portrait}
                    toggleModal={this.toggleModal}/>
              }
            </View>
          </View>
        </View>
      )
    } else {
      return (
        <View style={styles.background}>
          <StatusBar barStyle='light-content' />

          <View style={styles.content}>
            <View style={styles.list}>
              <Toolbar
                home={true}
                createClient={true}
                reportIssue={true}
                signOut={true}
                navigation={this.props.navigation}
                signOutFunc={this._signOutAsync}
                refresh={this.refresh}
                user={this.state.user}/>

              <ClientList setClientUID={this.setClientUID} clients={this.state.clients}/>
            </View>
          </View>

          <Modal
            isVisible={this.state.clientModal}
            onBackdropPress={( ) => this.toggleModal( )}
            style={{alignItems: 'center'}}>
            {
              this.state.loading ?
                <ActivityIndicator size='large' color={colors.black} style={{paddingTop: 200}} />
              :
                <ClientProfile
                  user={this.state.user}
                  nav={this.props.navigation}
                  client={this.state.client}
                  loading={this.toggleLoading}
                  isPortrait={true}
                  toggleModal={this.toggleModal}
                  removeClientFromState={this.removeClientFromState}/>
            }
          </Modal>
        </View>
      )
    }
  }
}

// Prop Validation
Profile.propTypes = {
  navigation: PropTypes.object
}

export default Profile;
