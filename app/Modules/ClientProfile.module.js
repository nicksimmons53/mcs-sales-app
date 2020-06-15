// Library Imports
import React, { Component } from 'react';
import { ScrollView, View, Text, KeyboardAvoidingView } from 'react-native';
import { API_URL } from 'react-native-dotenv';
import PropTypes from 'prop-types';
import { Button } from 'react-native-elements';
import Toast from 'react-native-easy-toast';
import Info from '../Components/Info.component';
import ContactTable from '../Modules/ContactTable.module';
import UpdateClient from '../Modules/UpdateClient.module';
import ClientActions from '../Components/ClientActions.component';
import AddContact from './AddContact.module';
import List from './List.module';
import axios from 'axios';
import { styles } from './Styles/ClientProfile.style';

// Class Component that will show the Client Profile Information
class ClientProfile extends Component {
  // State
  state = {
    update: false,
    files: [ ],
    contacts: [ ],
    address: [ ],
    addContact: false,
    contactID: '',
    info: [ ]
  };

  componentDidMount( ) {
    let user = this.props.user;
    let client = this.props.client;

    axios.get(`${API_URL}/employee/${user.recnum}/clients/${client.id}/contacts`)
      .then((response) => {
        this.setState({ contacts: response.data[0] });
      })
      .catch((error) => {
        console.error(error);
      });

    axios.get(`${API_URL}/employee/${user.recnum}/clients/${client.id}/address`)
      .then((response) => {
        this.setState({ address: response.data[0] });
      })
      .catch((error) => {
        console.error(error);
      });

    axios.get(`${API_URL}/employee/${user.recnum}/clients/${client.id}/advInfo`)
      .then((response) => {
        this.setState({ info: response.data[0] });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  // Toggle Update Feature
  toggleUpdate = ( ) => {
    this.setState({ update: !this.state.update });
  }

  toggleAddContact = (contactID) => {
    this.setState({ contactID: contactID });
    this.setState({ addContact: !this.state.addContact });
  }

  // Show File Submission Toast
  showFileToast = ( ) => {
    this.refs.toast2.show('File Was Attached Successfully');
  }

  // Show Inactivated Client
  showInactivationToast = ( ) => {
    this.refs.toast.show(this.props.client.clnnme + ' has been inactivated.');
  }
  
  refresh = ( ) => {
    let user = this.props.user;
    let client = this.props.client;

    axios.get(`${API_URL}/employee/${user.recnum}/clients/${client.id}`)
      .then((response) => {
        this.setState({ contacts: response.data[0] });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  refreshAddress = ( ) => {
    let user = this.props.user;
    let client = this.props.client;

    axios.get(`${API_URL}/employee/${user.recnum}/clients/${client.id}/address`)
      .then((response) => {
        this.setState({ address: response.data[0] });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  refreshInfo = ( ) => {
    let user = this.props.user;
    let client = this.props.client;

    axios.get(`${API_URL}/employee/${user.recnum}/clients/${client.id}/advInfo`)
      .then((response) => {
        this.setState({ info: response.data[0] });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  submitClient = ( ) => {
    axios.post(`${API_URL}/submit`)
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
            <Text style={styles.headerText}>{client.clnnme}</Text>
          </View>

          <ScrollView style={styles.form}>

            <Info address={this.state.address}/>
            
            <View style={styles.table}>
              <ContactTable
                toggleAddContact={this.toggleAddContact} 
                contacts={this.state.contacts}
                removeContactFromState={this.removeContactFromState}/>
            </View>

            {
              this.state.addContact ?
                <View style={styles.centerAlign}>
                  <AddContact 
                    contactID={this.state.contactID}
                    toggle={this.toggleAddContact} 
                    client={this.props.client}
                    user={this.props.user}
                    refresh={this.refresh}/>
                </View>
              :
                null
            }

            {
              this.state.update ?
                <UpdateClient
                  user={this.props.user}
                  address={this.state.address}
                  client={this.props.client}
                  save={this.toggleUpdate}
                  cancel={this.toggleUpdate}
                  refreshAddr={this.refreshAddress}/>
              :
                null
            }

            <View style={styles.lists}>
              <ClientActions
                refs={this.refs}
                update={this.toggleUpdate}
                nav={this.props.nav}
                user={this.props.user}
                client={this.props.client}
                info={this.state.info}
                refreshInfo={this.refreshInfo}
                loading={this.props.loading}
                isPortrait={this.props.isPortrait}
                toggleModal={this.props.toggleModal}
                showFileToast={this.showFileToast}
                showInactivationToast={this.showInactivationToast}
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
                onPress={this.submitClient}/>
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
  refresh: PropTypes.func,
  toggleModal: PropTypes.func,
  isPortrait: PropTypes.bool
}

export default ClientProfile;
