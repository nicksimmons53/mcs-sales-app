// Library Imports
import React, { Component } from 'react';
import { View, StatusBar, AsyncStorage, ActivityIndicator, Dimensions } from 'react-native';
import Modal from 'react-native-modal';
import NetInfo from '@react-native-community/netinfo';
import ClientList from '../Modules/ClientList.module';
import ClientProfile from '../Modules/ClientProfile.module';
import Toolbar from '../Components/Toolbar.component';
import { networkALert } from '../Components/Alert.component';
import * as Client from '../Functions/Client';
import Firebase from '../../config/Firebase';
import styles from './Styles/Profile.style';
import colors from '../Library/Colors';

// Profile.js
// Purpose: This class will display the profile home page and show the list of
// clients. It is the main navigator for the application.
export default class Profile extends Component {
  constructor( ) {
    super( );
    const isPortrait = ( ) => {
      const dim = Dimensions.get('screen');
      return dim.height >= dim.width;
    }

    // Initial State
    this.state = {
      clientUID: null,
      client: null,
      loading: false,
      refresh: false,
      clientModal: false,
      portrait: isPortrait( ) ? true : false
    };

    Dimensions.addEventListener('change', ( ) => {
      this.setState({
        portrait: isPortrait( ) ? true : false
      });
    });
  }

  // Sets the UID when a client is selected for viewing
  setClientUID = (uid) => {
    this.setState({ clientUID: uid })
    this.setState({ loading: true });

    let client = Client.retrieveInfo(uid);

    this.setState({clientModal: true});
    this.setState({ client: client });
    this.setState({ loading: false });
  }

  // User Sign Out (clears AsyncStorage and Firebase)
  _signOutAsync = async( ) => {
    Firebase.auth( ).signOut( );
    await AsyncStorage.clear( );
    this.props.navigation.navigate('Auth');
  };

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
                signOut={this._signOutAsync} />

              <ClientList setClientUID={this.setClientUID} />
            </View>

            <View style={styles.profile}>
              {
                this.state.loading ?
                  <ActivityIndicator size='large' color={colors.black} style={{paddingTop: 200}} />
                :
                  <ClientProfile
                    nav={this.props.navigation}
                    client={this.state.client}
                    loading={this.toggleLoading}
                    toggleModal={this.toggleModal} />
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
                showIssue={this.toggleIssue}
                signOut={this._signOutAsync} />

              <ClientList setClientUID={this.setClientUID} />
            </View>
          </View>

          <Modal
            isVisible={this.state.clientModal}
            onBackdropPress={( ) => this.setState({clientModal: false})}
            style={{alignItems: 'center'}}>
            {
              this.state.loading ?
                <ActivityIndicator size='large' color={colors.black} style={{paddingTop: 200}} />
              :
                <ClientProfile
                  nav={this.props.navigation}
                  client={this.state.client}
                  loading={this.toggleLoading}
                  isPortrait={true}
                  toggleModal={this.toggleModal} />
            }
          </Modal>
        </View>
      )
    }
  }
};
