// Library Imports
import React, { Component } from 'react';
import { ScrollView, View, Text, KeyboardAvoidingView } from 'react-native';
import { API_URL } from 'react-native-dotenv';
import PropTypes from 'prop-types';
import { Button, Switch } from 'react-native-elements';
import Toast from 'react-native-easy-toast';
import Info from '../Components/Info.component';
import ContactTable from '../Modules/ContactTable.module';
import UpdateClient from '../Modules/UpdateClient.module';
import ClientActions from '../Components/ClientActions.component';
import Email from '../Components/Email.component';
import AddContact from './AddContact.module';
import List from './List.module';
import axios from 'axios';
import { styles } from './Styles/ClientProfile.style';
import { ClientInfo } from '../Form/Values.form';

// Class Component that will show the Client Profile Information
class ClientProfile extends Component {
  // State
  state = {
    update: false,
    files: [ ],               // REDUX
    contacts: [ ],            // REDUX
    address: [ ],             // REDUX
    addContact: false,
    contactID: '',      
    info: null,                // REDUX
    carpet: [ ],              // REDUX
    granite: [ ],             // REDUX
    tile: [ ],                // REDUX
    wood: [ ],                // REDUX
    tileProgram: null,        // REDUX
    emailOverlay: false
  };

  componentDidMount( ) {
    let user = this.props.user;
    let client = this.props.client;
    let clientName = client.clnnme.replace(/\s/g, "_");

    axios.get(`${API_URL}/employee/${user.recnum}/clients/${client.id}/client-contacts`)
      .then((response) => {
        this.setState({ contacts: response.data });
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

    axios.get(`${API_URL}/employee/${user.recnum}/clients/${client.id}/advanced-info`)
      .then((response) => {
        console.log(response.data[0])
        this.setState({ info: response.data[0] });
      })
      .catch((error) => {
        console.error(error);
      });

    axios.get(`${API_URL}/list-files/${clientName}`)
      .then((response) => {
        this.setState({ files: response.data.file.Contents });
      })
      .catch((error) => {
        console.error(error);
      });
    
      axios.get(`${API_URL}/employee/${user.recnum}/clients/${client.id}/tileProgram`)
        .then((response) => {
          this.setState({ tileProgram: response.data[0] })
        })
        .catch((error) => {
          console.error(error)
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
    this.refs.toast.show(this.props.client.clnnme + ' has been inactivated.');
  }

  // Show Inactivated Client
  showSubmitToast = ( ) => {
    this.refs.toast3.show(this.props.client.clnnme + ' has been submitted for review.');
  }
  
  refresh = ( ) => {
    let user = this.props.user;
    let client = this.props.client;

    axios.get(`${API_URL}/employee/${user.recnum}/clients/${client.id}/client-contacts`)
      .then((response) => {
        this.setState({ contacts: response.data });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  refreshInfo = ( ) => {
    let user = this.props.user;
    let client = this.props.client;

    axios.get(`${API_URL}/employee/${user.recnum}/clients/${client.id}/advanced-info`)
      .then((response) => {
        this.setState({ info: response.data[0] });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  refreshFiles = ( ) => {
    let client = this.props.client;
    let clientName = client.clnnme.replace(/\s/g, "_");

    axios.get(`${API_URL}/list-files/${clientName}`)
      .then((response) => {
        this.setState({ files: response.data.file.Contents });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  toggleEmailOverlay = ( ) => {
    this.setState({ emailOverlay: !this.state.emailOverlay });
  }

  deleteContact = (contactID) => {
    let client = this.props.client;
    let user = this.props.user;

    axios.delete(`${API_URL}/employee/${user.recnum}/clients/${client.id}/client-contacts/${contactID}`)
        .then((response) => {
            console.log(response);
            this.refresh( );
        })
        .catch((error) => {
            console.error(error);
        });
  }

  submitClient = async( ) => {
    let user = this.props.user;
    let client = this.props.client;
    let parts = [ ];

    await axios.get(`${API_URL}/employee/${user.recnum}/clients/${client.id}/parts/1`)
      .then((response) => {
        response.data.map((object, index) => {
          parts.push(object);
        });
      })
      .catch((error) => {
        console.error(error);
      });
    
    await axios.get(`${API_URL}/employee/${user.recnum}/clients/${client.id}/parts/2`)
      .then((response) => {
        response.data.map((object, index) => {
          parts.push(object);
        });
      })
      .catch((error) => {
        console.error(error);
      });

    await axios.get(`${API_URL}/employee/${user.recnum}/clients/${client.id}/parts/3`)
      .then((response) => {
        response.data.map((object, index) => {
          parts.push(object);
        });
      })
      .catch((error) => {
        console.error(error);
      });

    await axios.get(`${API_URL}/employee/${user.recnum}/clients/${client.id}/parts/4`)
      .then((response) => {
        response.data.map((object, index) => {
          parts.push(object);
        });
      })
      .catch((error) => {
        console.error(error);
      });

    await axios.get(`${API_URL}/employee/${user.recnum}/clients/${client.id}/parts/5`)
      .then((response) => {
        response.data.map((object, index) => {
          parts.push(object);
        });
      })
      .catch((error) => {
        console.error(error);
      });

    await axios.get(`${API_URL}/employee/${user.recnum}/clients/${client.id}/advanced-info`)
      .then((response) => {
        client = {...client, ...response.data[0]};
        console.log(client);
      })
      .catch((error) => {
        console.error(error);
      });

    // axios.post(`${API_URL}/submit-client`, { client: this.props.client, parts: parts})
    //   .then((response) => {
    //     console.log(response.status);
    //     this.showSubmitToast( );
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });
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
                contacts={this.state.contacts}
                deleteContact={this.deleteContact}
                toggleAddContact={this.toggleAddContact} />
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
                  refreshInfo={this.refreshInfo}/>
              :
                null
            }

            {
              this.state.emailOverlay ?
                <Email 
                  client={this.props.client}
                  user={this.props.user}
                  to="lisak@mcsurfacesinc.com"
                  subject="COI Request"
                  isVisible={this.state.emailOverlay}
                  toggleEmailOverlay={this.toggleEmailOverlay}/>
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
                tileProgram={this.state.tileProgram}
                refreshInfo={this.refreshInfo}
                refreshFiles={this.refreshFiles}
                loading={this.props.loading}
                isPortrait={this.props.isPortrait}
                toggleModal={this.props.toggleModal}
                showFileToast={this.showFileToast}
                toggleEmailOverlay={this.toggleEmailOverlay}
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

            <Toast ref='toast' position='bottom' style={styles.toast} />
            <Toast ref='toast2' position='bottom' style={styles.toast} />
            <Toast ref='toast3' position='bottom' style={styles.toast} />
          </ScrollView>
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
