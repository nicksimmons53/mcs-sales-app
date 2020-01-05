// Library Imports
import React, { Component } from 'react';
import { Alert, ScrollView, View, Text, KeyboardAvoidingView } from 'react-native';
import { Button, Divider } from 'react-native-elements';
import Firebase from '../../config/Firebase';
import Toast from 'react-native-easy-toast';
import UpdateClient from '../Modules/UpdateClient.module';
import ClientActions from '../Components/ClientActions.component';
import List from './List.module';
import sendEmail from '../Components/Email.component';
import styles from './Styles/ClientProfile.style';

// Class Component that will show the Client Profile Information
class ClientProfile extends Component {
  // State
  state = {
    update: false,
    client: null,
    files: [ ]
  };

  // Inactivate the Currently Selected Client
  _inactivateClient = async( ) => {
    let programs = [ ];

    // New Client Location (inactivate clients)
    const clientRef = Firebase.firestore( )
      .collection('inactiveClients')
      .doc(Firebase.auth( ).currentUser.uid)
      .collection('clients')
      .doc(this.props.client.uid);

    clientRef.set(this.props.client);

    // Client Programs
    const programRef = await Firebase.firestore( )
      .collection('clients')
      .doc(Firebase.auth( ).currentUser.uid)
      .collection('clients')
      .doc(this.props.client.uid)
      .collection('programs')
      .get( )
      .then((snapshot) => {
        snapshot.docs.forEach(function(doc) {
          clientRef.collection('programs').doc(doc.data( )[0].program).set(doc.data( ));
          doc.ref.delete( );
        });
      });

    let deleteClient = Firebase.firestore( )
      .collection('clients')
      .doc(Firebase.auth( ).currentUser.uid)
      .collection('clients')
      .doc(this.props.client.uid)
      .delete( );

    this.refs.toast.show(this.props.client.clientName + ' has been inactivated.');
    this.props.loading( );
    // this.props.toggleModal( );
  }

  // Toggle Update Feature
  toggleUpdate = ( ) => {
    this.setState({ update: !this.state.update });
  };

  // Toggle Inactivation Alert
  toggleInactivate = ( ) => {
    Alert.alert(
      'Inactivate Client',
      'Are you sure you want to continue? This client will be removed from view.',
      [
        {text: 'Continue', onPress: ( ) => this._inactivateClient( )},
        {text: 'Cancel', style: 'cancel'}
      ],
      {cancelable: true},
    )
  }

  // Show File Submission Toast
  showToast = ( ) => {
    this.refs.toast2.show('File Was Attached Successfully');
  }

  render( ) {
    let headerStyle = { };
    if (this.props.portrait === true) {
      headerStyle = styles.headerPort;
    } else {
      headerStyle = styles.header;
    }

    // Display a shown client or null if none
    if (this.props.client != null) {
      let client = this.props.client;
      console.log("Client is Being Displayed");

      return (
        <KeyboardAvoidingView enabled behavior='padding' style={styles.background}>
          <View style={headerStyle}>
            <Text style={styles.headerText}>{client.clientName}</Text>
          </View>

          <ScrollView style={styles.form}>
            {this.state.update ?
              <UpdateClient
                client={this.props.client}
                save={this.toggleUpdate}
                cancel={this.toggleUpdate}/>
            :
              <View style={styles.row}>
                <Text>{client.contactTitle}</Text>
                <Divider />
                <View style={styles.variables}>
                  <Text style={styles.text}>Contact Name</Text>
                  <Text style={styles.text}>Contact Phone</Text>
                  <Text style={styles.text}>Contact Email</Text>
                  <Text style={styles.text}>Address</Text>
                </View>

                <View style={styles.values}>
                  <Text style={styles.text}>{client.contactName}</Text>
                  <Text style={styles.text}>{client.contactPhone}</Text>
                  <Text style={styles.text}>{client.contactEmail}</Text>
                  <Text style={styles.text}>{client.billingAddr}</Text>
                </View>
              </View>
            }
            <View style={styles.lists}>
              <ClientActions
                update={this.toggleUpdate}
                nav={this.props.nav}
                client={this.props.client}
                inactivate={this.toggleInactivate}
                showToast={this.showToast}
                toggleModal={this.props.toggleModal} />
            </View>

            <View style={styles.lists}>
              <List title='Client Notifications' client={this.props.client} />
            </View>

            <View style={styles.lists}>
              <List title='Client Files' client={this.props.client} files={true}/>
            </View>

            <View style={styles.footer}>
              <Button
                title='Submit for Approval'
                raised
                containerStyle={styles.submitButtonContainer}
                buttonStyle={styles.submitButton}
                onPress={sendEmail}/>
            </View>
          </ScrollView>

          <Toast ref='toast' position='bottom' style={styles.toast} />
          <Toast ref='toast2' position='bottom' style={styles.toast} />

        </KeyboardAvoidingView>
      );
    } else {
      return null;
    }
  }
};

export default ClientProfile;
