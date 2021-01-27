// Library Imports
import React, { Component } from 'react';
import { ScrollView, View, Text, KeyboardAvoidingView } from 'react-native';
import { API_URL } from 'react-native-dotenv';
import PropTypes from 'prop-types';
import { Button, Icon } from 'react-native-elements';
import Toast from 'react-native-easy-toast';
import Info from '../Components/Info.component';
import ContactTable from '../Modules/ContactTable.module';
import UpdateClient from '../Modules/UpdateClient.module';
import ClientActions from '../Components/ClientActions.component';
import Email from '../Components/Email.component';
import AddContact from './AddContact.module';
import List from './List.module';
import axios from 'axios';
import { styles, colors } from './Styles/ClientProfile.style';
import { ClientInfo, TileProgram, WoodProgram, CarpetProgram, CountertopProgram, CabinetProgram } from '../Form/Values.form';
import { Pressable } from 'react-native';

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
    woodProgram: null,
    carpetProgram: null,
    countertopProgram: null,
    cabinetProgram: null,
    emailOverlay: false,
    loading: false,
    pushToSageDisabled: true,
    submitForApprovalDisabled: false,
    denied: false
  };

  componentDidMount( ) {
    let user = this.props.user;
    let client = this.props.client;
    let clientName = client.clnnme.replace(/\s/g, "_");

    axios.get(`${API_URL}/employee/${user.recnum}/clients/${client.id}/contacts`)
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
        if (response.data.length === 0) 
            this.setState({ info: ClientInfo });
        else    
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
  
    axios.get(`${API_URL}/employee/${user.recnum}/clients/${client.id}/program/tileProgram`)
      .then((response) => {
          if (response.data.length === 0)
              this.setState({ tileProgram: TileProgram});
          else 
              this.setState({ tileProgram: response.data[0] });
      })
      .catch((error) => {
        console.error(error)
      });

    axios.get(`${API_URL}/employee/${user.recnum}/clients/${client.id}/program/woodProgram`)
      .then((response) => {
          if (response.data.length === 0)
              this.setState({ woodProgram: WoodProgram});
          else 
              this.setState({ woodProgram: response.data[0] });
      })
      .catch((error) => {
        console.error(error)
      });
    
    
    axios.get(`${API_URL}/employee/${user.recnum}/clients/${client.id}/program/carpetProgram`)
      .then((response) => {
          if (response.data.length === 0)
              this.setState({ carpetProgram: CarpetProgram});
          else 
              this.setState({ carpetProgram: response.data[0] });
      })
      .catch((error) => {
        console.error(error)
      });

            
    axios.get(`${API_URL}/employee/${user.recnum}/clients/${client.id}/program/countertopProgram`)
      .then((response) => {
          if (response.data.length === 0)
              this.setState({ countertopProgram: CountertopProgram});
          else 
              this.setState({ countertopProgram: response.data[0] });
      })
      .catch((error) => {
        console.error(error)
      });
      
            
    axios.get(`${API_URL}/employee/${user.recnum}/clients/${client.id}/program/cabinetProgram`)
      .then((response) => {
          if (response.data.length === 0)
              this.setState({ cabinetProgram: CabinetProgram});
          else 
              this.setState({ cabinetProgram: response.data[0] });
      })
      .catch((error) => {
        console.error(error)
      });

    axios.get(`${API_URL}/employee/${user.recnum}/clients/${client.id}/approved`)
      .then((response) => {
        let managers = response.data[0];

        // If denied, reset submit and disable push to Sage
        Object.values(managers).map((value) => {
          if (value === 2) { 
            this.setState({ denied: true });
            this.setState({ pushToSageDisabled: true });
            this.setState({ submitForApprovalDisabled: false });
          }
        });
        
        // If approved, enable Push to Sage and disable submit
        if (managers.lisak === 1 && managers.heathera === 1 && managers.kimn === 1) {
          this.setState({ pushToSageDisabled : false });
          // If already pushed to Sage
          if (managers.pushedToSage === 1) {
            this.setState({ pushToSageDisabled: true });
          }

          if (managers.pushedToSage === 0) {
            this.setState({ submitForApprovalDisabled: true });
          }
        }
      })
      .catch((error) => {
        console.error(error);
      })
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

    axios.get(`${API_URL}/employee/${user.recnum}/clients/${client.id}/contacts`)
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

    axios.delete(`${API_URL}/employee/${user.recnum}/clients/${client.id}/contacts/${contactID}`)
        .then((response) => {
            this.refresh( );
        })
        .catch((error) => {
            console.error(error);
        });
  }

  loading = ( ) => {
    this.setState({ loading: !this.state.loading });
  }

  submitClient = async( ) => {
    let user = this.props.user;
    let client = this.props.client;
    let parts = {
      tile: null,
      wood: null,
      carpet: null,
      vinyl: null,
      countertops: null
    };
    
    this.loading( );

    await axios.get(`${API_URL}/employee/${user.recnum}/clients/${client.id}/parts/tile-program`)
      .then((response) => {
        parts.tile = {
          floorTile: [...response.data[0]],
          bathroomWallTile: [...response.data[1]],
          backsplashWallTile: [...response.data[2]],
          fireplaceWallTile: [...response.data[3]],
          floorStone: [...response.data[4]],
          bathroomWallStone: [...response.data[5]],
          backsplashWallStone: [...response.data[6]],
          fireplaceWallStone: [...response.data[7]],
          showerPansStone: [...response.data[8]],
          showerPansTile: [...response.data[9]],
          showerPansDeco: [...response.data[10]],
          underlayment: [...response.data[11]],
          patternCharges: [...response.data[12]],
          accents: [...response.data[13]],
          showerSeats: [...response.data[14]],
          addOns: [...response.data[15]]
        };
      })
      .catch((error) => {
        console.error(error);
      });


    await axios.get(`${API_URL}/employee/${user.recnum}/clients/${client.id}/parts/wood-program`)
      .then((response) => {
        parts.wood = {
          woodFlooring: [...response.data[0]],
          underlayment: [...response.data[1]]
        };
      })
      .catch((error) => {
        console.error(error);
      });

    
    await axios.get(`${API_URL}/employee/${user.recnum}/clients/${client.id}/parts/carpet-program`)
      .then((response) => {
        parts.carpet = {
          carpetFlooring: [...response.data[0]],
          carpetPad: [...response.data[1]]
        };
      })
      .catch((error) => {
        console.error(error);
      });

    await axios.get(`${API_URL}/employee/${user.recnum}/clients/${client.id}/parts/vinyl-program`)
      .then((response) => {
        parts.vinyl = {
          vinylPlank: [...response.data[0]],
          vinylSheet: [...response.data[1]],
        };
      })
      .catch((error) => {
        console.error(error);
      });

    
    await axios.get(`${API_URL}/employee/${user.recnum}/clients/${client.id}/parts/countertops-program`)
      .then((response) => {
        parts.countertops = {
          edges: [...response.data[0]],
          sinks: [...response.data[1]],
          level1: [...response.data[2]],
          level2: [...response.data[3]],
          level3: [...response.data[4]],
          level4: [...response.data[5]],
          level5: [...response.data[6]],
          level6: [...response.data[7]],
          level7: [...response.data[8]],
          level8: [...response.data[9]],
          level9: [...response.data[10]],
          level10: [...response.data[11]]
        };
      })
      .catch((error) => {
        console.error(error);
      });

    await axios.get(`${API_URL}/employee/${user.recnum}/clients/${client.id}/client-data`)
      .then((response) => {
        axios.post(`${API_URL}/submit-client`, { 
            user: this.props.user,
            client: this.props.client, 
            tileProgramInfo: response.data.tileProgram, 
            woodProgramInfo: response.data.woodProgram,
            carpetProgramInfo: response.data.carpetProgram,
            countertopProgramInfo: response.data.countertopProgram,
            cabinetProgramInfo: response.data.cabinetProgram,
            advancedInfo: response.data.clientInfo, 
            contacts: response.data.contacts,
            program: parts 
          })
          .then((response) => {
            this.showSubmitToast( );
            this.setState({ submitForApprovalDisabled: true });
            this.setState({ pushToSageDisabled: true });
            axios.put(`${API_URL}/employee/${user.recnum}/clients/${client.id}/manager-approvals`, {
              'lisak': 0,
              'heathera': 0,
              'kimn': 0
            })
            .then((response) => {
              console.log(response)
            })
            .catch((error) => {
              console.error(error);
            })
          })
          .catch((error) => {
            console.error(error);
          });
      })
      .catch((error) => {
        console.error(error);
      });
      
    this.loading( );
  }

  pushToSage = async( ) => {
    let user = this.props.user;
    let client = this.props.client;
    let contacts = [ ];
    let parts = {
      tile: null,
      wood: null,
      carpet: null,
      vinyl: null,
      countertops: null
    };

    await axios.get(`${API_URL}/employee/${user.recnum}/clients/${client.id}/parts/tile-program`)
      .then((response) => {
        parts.tile = {
          floorTile: [...response.data[0]],
          bathroomWallTile: [...response.data[1]],
          backsplashWallTile: [...response.data[2]],
          fireplaceWallTile: [...response.data[3]],
          floorStone: [...response.data[4]],
          bathroomWallStone: [...response.data[5]],
          backsplashWallStone: [...response.data[6]],
          fireplaceWallStone: [...response.data[7]],
          showerPansStone: [...response.data[8]],
          showerPansTile: [...response.data[9]],
          showerPansDeco: [...response.data[10]],
          underlayment: [...response.data[11]],
          patternCharges: [...response.data[12]],
          accents: [...response.data[13]],
          showerSeats: [...response.data[14]],
          addOns: [...response.data[15]]
        };
      })
      .catch((error) => {
        console.error(error);
      });


    await axios.get(`${API_URL}/employee/${user.recnum}/clients/${client.id}/parts/wood-program`)
      .then((response) => {
        parts.wood = {
          woodFlooring: [...response.data[0]],
          underlayment: [...response.data[1]]
        };
      })
      .catch((error) => {
        console.error(error);
      });

    
    await axios.get(`${API_URL}/employee/${user.recnum}/clients/${client.id}/parts/carpet-program`)
      .then((response) => {
        parts.carpet = {
          carpetFlooring: [...response.data[0]],
          carpetPad: [...response.data[1]]
        };
      })
      .catch((error) => {
        console.error(error);
      });

    await axios.get(`${API_URL}/employee/${user.recnum}/clients/${client.id}/parts/vinyl-program`)
      .then((response) => {
        parts.vinyl = {
          vinylPlank: [...response.data[0]],
          vinylSheet: [...response.data[1]],
        };
      })
      .catch((error) => {
        console.error(error);
      });

    
    await axios.get(`${API_URL}/employee/${user.recnum}/clients/${client.id}/parts/countertops-program`)
      .then((response) => {
        parts.countertops = {
          edges: [...response.data[0]],
          sinks: [...response.data[1]],
          level1: [...response.data[2]],
          level2: [...response.data[3]],
          level3: [...response.data[4]],
          level4: [...response.data[5]],
          level5: [...response.data[6]],
          level6: [...response.data[7]],
          level7: [...response.data[8]],
          level8: [...response.data[9]],
          level9: [...response.data[10]],
          level10: [...response.data[11]]
        };
      })
      .catch((error) => {
        console.error(error);
      });
      
    axios.post(`${API_URL}/employee/${user.recnum}/clients/${client.id}/push-to-sage`, { 
        user: this.props.user,
        client: this.props.client, 
        contacts: this.state.contacts,
        program: parts 
      })
      .then((res) => {
        // Set pushed to Sage
        axios.put(`${API_URL}/employee/${user.recnum}/clients/${client.id}/manager-approvals`, {
            pushedToSage: true
          })
          .then(( ) => {
            this.setState({ pushToSageDisabled: true });
          })
          .catch((error) => {
            console.error(error);
          })
      })
      .catch((error) => {
        console.error(error);
      });
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
            <Button 
              title="Push To Sage"
              disabled={this.state.pushToSageDisabled}
              buttonStyle={styles.pushToSageButton}
              containerStyle={styles.pushToSageButtonContainer}
              onPress={
                this.pushToSage}/>
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
                woodProgram={this.state.woodProgram}
                carpetProgram={this.state.carpetProgram}
                countertopProgram={this.state.countertopProgram}
                cabinetProgram={this.state.cabinetProgram}
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
                disabled={this.state.submitForApprovalDisabled}
                containerStyle={styles.submitButtonContainer}
                buttonStyle={styles.submitButton}
                onPress={this.submitClient}/>
            </View>

            <Toast ref='toast' position='bottom' style={styles.toast} />
            <Toast ref='toast2' position='bottom' style={styles.toast} />
            <Toast ref='toast3' position='center' style={styles.toast} />
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
