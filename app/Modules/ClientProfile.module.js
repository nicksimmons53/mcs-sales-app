// Library Imports
import React, { Component } from 'react';
import { ScrollView, View, Text, KeyboardAvoidingView } from 'react-native';
import PropTypes from 'prop-types';
import { Button } from 'react-native-elements';
import Toast from 'react-native-easy-toast';
import * as File from '../Functions/File';
import * as Contact from '../Functions/Contact';
import ContactTable from '../Modules/ContactTable.module';
import UpdateClient from '../Modules/UpdateClient.module';
import ClientActions from '../Components/ClientActions.component';
import AddContact from './AddContact.module';
import List from './List.module';
import sendEmail from '../Components/Email.component';
import styles from './Styles/ClientProfile.style';

// Class Component that will show the Client Profile Information
class ClientProfile extends Component {
  // State
  state = {
    update: false,
    files: [ ],
    contacts: [ ],
    addContact: false
  };

  componentDidMount( ) {
    File.retrieveAll(this.props.client).then((res) => {
      this.setState({files: [...res]});
    });

    Contact.retrieveAll(this.props.client).then((res) => {
      this.setState({contacts: [...res]});
    });
  }

  // Toggle Update Feature
  toggleUpdate = ( ) => {
    this.setState({ update: !this.state.update });
  }

  toggleAddContact = ( ) => {
    this.setState({ addContact: !this.state.addContact });
  }

  // Show File Submission Toast
  showFileToast = ( ) => {
    this.refs.toast2.show('File Was Attached Successfully');
  }

  // Show Inactivated Client
  showInactivationToast = ( ) => {
    this.refs.toast.show(this.props.client.clientName + ' has been inactivated.');
  }

  render( ) {
    let headerStyle = { };

    if (this.props.isPortrait === true) {
      headerStyle = styles.headerPort;
    } else {
      headerStyle = styles.header;
    }

    // Display a shown client or null if none
    if (this.props.client != null) {
      let client = this.props.client;

      return (
        <KeyboardAvoidingView enabled behavior='padding' style={styles.background}>
          <View style={headerStyle}>
            <Text style={styles.headerText}>{client.clientName}</Text>
          </View>

          <ScrollView style={styles.form}>
            <View style={styles.table}>
              <ContactTable
                toggleAddContact={this.toggleAddContact} 
                contacts={this.state.contacts}/>
            </View>

            {
              this.state.addContact ?
                <View style={styles.centerAlign}>
                  <AddContact 
                    toggle={this.toggleAddContact} 
                    client={this.props.client}/>
                </View>
              :
                null
            }

            {
              this.state.update ?
                <UpdateClient
                  client={client}
                  save={this.toggleUpdate}
                  cancel={this.toggleUpdate}/>
              :
                null
            }

            <View style={styles.lists}>
              <ClientActions
                refs={this.refs}
                update={this.toggleUpdate}
                nav={this.props.nav}
                client={this.props.client}
                loading={this.props.loading}
                isPortrait={this.props.isPortrait}
                toggleModal={this.props.toggleModal}
                showFileToast={this.showFileToast}
                showInactivationToast={this.showInactivationToast}
                addFileToState={this.addFileToState}
                removeClientFromState={this.props.removeClientFromState}/>
            </View>

            <View style={styles.lists}>
              <List
                title='Client Files'
                client={this.props.client}
                files={this.state.files}/>
            </View>

            <View style={styles.footer}>
              <Button
                title='Submit for Approval'
                raised
                containerStyle={styles.submitButtonContainer}
                buttonStyle={styles.submitButton}
                onPress={( ) => sendEmail(client, true)}/>
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
}

// Props Valdidation
ClientProfile.propTypes = {
  nav: PropTypes.object,
  client: PropTypes.object,
  loading: PropTypes.func,
  toggleModal: PropTypes.func,
  isPortrait: PropTypes.bool
}

export default ClientProfile;
