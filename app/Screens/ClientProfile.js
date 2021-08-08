// // Library Imports
import React from 'react';
import { ScrollView, View, Text, KeyboardAvoidingView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
// import { API_URL } from 'react-native-dotenv';
// import PropTypes from 'prop-types';
import { Button, Divider } from 'react-native-elements';
// import Toast from 'react-native-easy-toast';
import Info from '../Components/Info';
import ContactTable from '../Modules/ContactTable.module';
// import UpdateClient from '../Modules/UpdateClient.module';
import ClientActions from '../Components/ClientActions.component';
// import Email from '../Components/Email.component';
import AddContact from '../Modules/AddContact.module';
// import List from './List.module';
// import Clients from '../api/Clients';
// import axios from 'axios';
import Toolbar from '../Components/Toolbar';
import { reset, signOut } from '../features/user/userSlice';
import deleteObject from '../Realm/deleteObject';
import readMultiples from '../Realm/readMultiples';
import { styles } from './Styles/ClientProfile.style';
import Clients from '../api/Clients';
import Contacts from '../api/Contacts';
import Addresses from '../api/Addresses';
import { FAB, Snackbar } from 'react-native-paper';
import { StatusBar } from 'react-native';
// import { ClientInfo, TileProgram, WoodProgram, CarpetProgram, CountertopProgram, CabinetProgram } from '../Form/Values.form';

// Class Component that will show the Client Profile Information
function ClientProfile(props) {
  let userId = useSelector((state) => state.user.id);
  const dispatch = useDispatch( );
  const [ client, setClient ] = React.useState(props.route.params.client);
  const [ addresses, setAddresses ] = React.useState(null);
  const [ contacts, setContacts ] = React.useState(null);
  const [ addContactView, setAddContactView ] = React.useState(false);
  const [ visible, setVisible ] = React.useState(false);
  const [ snackMessage, setSnackMessage ] = React.useState(null);
  
  // State
//   state = {
//     update: false,
//     files: [ ],               // REDUX
//     contacts: [ ],            // REDUX
//     address: [ ],             // REDUX
//     addContact: false,
//     contactID: '',      
//     info: null,                // REDUX
//     carpet: [ ],              // REDUX
//     granite: [ ],             // REDUX
//     tile: [ ],                // REDUX
//     wood: [ ],                // REDUX
//     tileProgram: null,        // REDUX
//     woodProgram: null,
//     carpetProgram: null,
//     countertopProgram: null,
//     cabinetProgram: null,
//     emailOverlay: false,
//     loading: false,
//     pushToSageDisabled: true,
//     submitForApprovalDisabled: false,
//     denied: false
//   };

  React.useEffect(( ) => {
    const getContacts = async( ) => {
      setContacts(await Contacts.getAll(userId, client.id));
    }
    
    const getAddresses = async( ) => {
      setAddresses(await Addresses.getAll(userId, client.id));
    }
    
    getContacts( );
    getAddresses( );
  }, [ ]);

    // axios.get(`${API_URL}/employee/${user.recnum}/clients/${client.id}/approved`)
    //   .then((response) => {
    //     let managers = response.data[0];

    //     // If denied, reset submit and disable push to Sage
    //     Object.values(managers).map((value) => {
    //       if (value === 2) { 
    //         this.setState({ denied: true });
    //         this.setState({ pushToSageDisabled: true });
    //         this.setState({ submitForApprovalDisabled: false });
    //       }
    //     });
        
    //     // If approved, enable Push to Sage and disable submit
    //     if (managers.lisak === 1 && managers.heathera === 1 && managers.kimn === 1) {
    //       this.setState({ pushToSageDisabled : false });
    //       // If already pushed to Sage
    //       if (managers.pushedToSage === 1) {
    //         this.setState({ pushToSageDisabled: true });
    //       }

    //       if (managers.pushedToSage === 0) {
    //         this.setState({ submitForApprovalDisabled: true });
    //       }
    //     }
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   })
//   }

//   // Toggle Update Feature
//   toggleUpdate = ( ) => {
//     this.setState({ update: !this.state.update });
//   }

  toggleAddContact = ( ) => {
    setAddContactView(!addContactView);
  }

//   refreshInfo = ( ) => {
//     let user = this.props.user;
//     let client = this.props.client;

//     axios.get(`${API_URL}/employee/${user.recnum}/clients/${client.id}/advanced-info`)
//       .then((response) => {
//         this.setState({ info: response.data[0] });
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }

//   refreshFiles = ( ) => {
//     let client = this.props.client;
//     let clientName = client.clnnme.replace(/\s/g, "_");

//     axios.get(`${API_URL}/list-files/${clientName}`)
//       .then((response) => {
//         this.setState({ files: response.data.file.Contents });
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }

//   toggleEmailOverlay = ( ) => {
//     this.setState({ emailOverlay: !this.state.emailOverlay });
//   }

  const deleteContact = async(contactID) => {
    let status = await Contacts.deleteById(userId, client.id, contactID);

    if (status >= 200 && status <= 299) {
      setContacts(await Contacts.getAll(userId, client.id));
      setSnackMessage("Contact was successfully deleted.");
    } else {
      setSnackMessage("There was an error deleting the selected contact.");
    }

    setVisible(true);
  }

  const saveContact = async(values) => {
    let status = await Clients.createContact(userId, client.id, values);

    if (status >= 200 && status <= 299) {
      setContacts(await Contacts.getAll(userId, client.id));
      setSnackMessage("Contact was successfully created.");
      toggleAddContact( );
    } else {
      setSnackMessage("There was an error creating the new contact.");
    }

    setVisible(true);
  }

  toggleAddContact = ( ) => {
    setAddContactView(!addContactView);
  }

//   loading = ( ) => {
//     this.setState({ loading: !this.state.loading });
//   }

//   submitClient = async( ) => {
//     let user = this.props.user;
//     let client = this.props.client;
//     let parts = {
//       tile: null,
//       wood: null,
//       carpet: null,
//       vinyl: null,
//       countertops: null
//     };
    
//     this.loading( );

//     await axios.get(`${API_URL}/employee/${user.recnum}/clients/${client.id}/parts/tile-program`)
//       .then((response) => {
//         parts.tile = {
//           floorTile: [...response.data[0]],
//           bathroomWallTile: [...response.data[1]],
//           backsplashWallTile: [...response.data[2]],
//           fireplaceWallTile: [...response.data[3]],
//           floorStone: [...response.data[4]],
//           bathroomWallStone: [...response.data[5]],
//           backsplashWallStone: [...response.data[6]],
//           fireplaceWallStone: [...response.data[7]],
//           showerPansStone: [...response.data[8]],
//           showerPansTile: [...response.data[9]],
//           showerPansDeco: [...response.data[10]],
//           underlayment: [...response.data[11]],
//           patternCharges: [...response.data[12]],
//           accents: [...response.data[13]],
//           showerSeats: [...response.data[14]],
//           addOns: [...response.data[15]]
//         };
//       })
//       .catch((error) => {
//         console.log(error);
//       });


//     await axios.get(`${API_URL}/employee/${user.recnum}/clients/${client.id}/parts/wood-program`)
//       .then((response) => {
//         parts.wood = {
//           woodFlooring: [...response.data[0]],
//           underlayment: [...response.data[1]]
//         };
//       })
//       .catch((error) => {
//         console.log(error);
//       });

    
//     await axios.get(`${API_URL}/employee/${user.recnum}/clients/${client.id}/parts/carpet-program`)
//       .then((response) => {
//         parts.carpet = {
//           carpetFlooring: [...response.data[0]],
//           carpetPad: [...response.data[1]]
//         };
//       })
//       .catch((error) => {
//         console.log(error);
//       });

//     await axios.get(`${API_URL}/employee/${user.recnum}/clients/${client.id}/parts/vinyl-program`)
//       .then((response) => {
//         parts.vinyl = {
//           vinylPlank: [...response.data[0]],
//           vinylSheet: [...response.data[1]],
//         };
//       })
//       .catch((error) => {
//         console.log(error);
//       });

    
//     await axios.get(`${API_URL}/employee/${user.recnum}/clients/${client.id}/parts/countertops-program`)
//       .then((response) => {
//         parts.countertops = {
//           edges: [...response.data[0]],
//           sinks: [...response.data[1]],
//           level1: [...response.data[2]],
//           level2: [...response.data[3]],
//           level3: [...response.data[4]],
//           level4: [...response.data[5]],
//           level5: [...response.data[6]],
//           level6: [...response.data[7]],
//           level7: [...response.data[8]],
//           level8: [...response.data[9]],
//           level9: [...response.data[10]],
//           level10: [...response.data[11]]
//         };
//       })
//       .catch((error) => {
//         console.log(error);
//       });

//     await axios.get(`${API_URL}/employee/${user.recnum}/clients/${client.id}/client-data`)
//       .then((response) => {
//         axios.post(`${API_URL}/submit-client`, { 
//             user: this.props.user,
//             client: this.props.client, 
//             tileProgramInfo: response.data.tileProgram, 
//             woodProgramInfo: response.data.woodProgram,
//             carpetProgramInfo: response.data.carpetProgram,
//             countertopProgramInfo: response.data.countertopProgram,
//             cabinetProgramInfo: response.data.cabinetProgram,
//             advancedInfo: response.data.clientInfo, 
//             contacts: response.data.contacts,
//             program: parts 
//           })
//           .then((response) => {
//             this.showSubmitToast( );
//             this.setState({ submitForApprovalDisabled: true });
//             this.setState({ pushToSageDisabled: true });
//             axios.put(`${API_URL}/employee/${user.recnum}/clients/${client.id}/manager-approvals`, {
//               'lisak': 0,
//               'heathera': 0,
//               'kimn': 0
//             })
//             .then((response) => {
//               console.log(response.staus)
//             })
//             .catch((error) => {
//               console.log(error);
//             })
//           })
//           .catch((error) => {
//             console.log(error);
//           });
//       })
//       .catch((error) => {
//         console.log(error);
//       });
      
//     this.loading( );
//   }

//   pushToSage = async( ) => {
//     let user = this.props.user;
//     let client = this.props.client;
//     let contacts = [ ];
//     let parts = {
//       tile: null,
//       wood: null,
//       carpet: null,
//       vinyl: null,
//       countertops: null
//     };

//     await axios.get(`${API_URL}/employee/${user.recnum}/clients/${client.id}/parts/tile-program`)
//       .then((response) => {
//         parts.tile = {
//           floorTile: [...response.data[0]],
//           bathroomWallTile: [...response.data[1]],
//           backsplashWallTile: [...response.data[2]],
//           fireplaceWallTile: [...response.data[3]],
//           floorStone: [...response.data[4]],
//           bathroomWallStone: [...response.data[5]],
//           backsplashWallStone: [...response.data[6]],
//           fireplaceWallStone: [...response.data[7]],
//           showerPansStone: [...response.data[8]],
//           showerPansTile: [...response.data[9]],
//           showerPansDeco: [...response.data[10]],
//           underlayment: [...response.data[11]],
//           patternCharges: [...response.data[12]],
//           accents: [...response.data[13]],
//           showerSeats: [...response.data[14]],
//           addOns: [...response.data[15]]
//         };
//       })
//       .catch((error) => {
//         console.log(error);
//       });


//     await axios.get(`${API_URL}/employee/${user.recnum}/clients/${client.id}/parts/wood-program`)
//       .then((response) => {
//         parts.wood = {
//           woodFlooring: [...response.data[0]],
//           underlayment: [...response.data[1]]
//         };
//       })
//       .catch((error) => {
//         console.log(error);
//       });

    
//     await axios.get(`${API_URL}/employee/${user.recnum}/clients/${client.id}/parts/carpet-program`)
//       .then((response) => {
//         parts.carpet = {
//           carpetFlooring: [...response.data[0]],
//           carpetPad: [...response.data[1]]
//         };
//       })
//       .catch((error) => {
//         console.log(error);
//       });

//     await axios.get(`${API_URL}/employee/${user.recnum}/clients/${client.id}/parts/vinyl-program`)
//       .then((response) => {
//         parts.vinyl = {
//           vinylPlank: [...response.data[0]],
//           vinylSheet: [...response.data[1]],
//         };
//       })
//       .catch((error) => {
//         console.log(error);
//       });

    
//     await axios.get(`${API_URL}/employee/${user.recnum}/clients/${client.id}/parts/countertops-program`)
//       .then((response) => {
//         parts.countertops = {
//           edges: [...response.data[0]],
//           sinks: [...response.data[1]],
//           level1: [...response.data[2]],
//           level2: [...response.data[3]],
//           level3: [...response.data[4]],
//           level4: [...response.data[5]],
//           level5: [...response.data[6]],
//           level6: [...response.data[7]],
//           level7: [...response.data[8]],
//           level8: [...response.data[9]],
//           level9: [...response.data[10]],
//           level10: [...response.data[11]]
//         };
//       })
//       .catch((error) => {
//         console.log(error);
//       });
      
//     axios.post(`${API_URL}/employee/${user.recnum}/clients/${client.id}/push-to-sage`, { 
//         user: this.props.user,
//         client: this.props.client, 
//         contacts: this.state.contacts,
//         program: parts 
//       })
//       .then((res) => {
//         // Set pushed to Sage
//         axios.put(`${API_URL}/employee/${user.recnum}/clients/${client.id}/manager-approvals`, {
//             pushedToSage: true
//           })
//           .then(( ) => {
//             this.setState({ pushToSageDisabled: true });
//           })
//           .catch((error) => {
//             console.log(error);
//           })
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }

  return (
    <KeyboardAvoidingView enabled behavior='padding' style={styles.background}>
      <StatusBar barStyle="dark-content"/>
      
      <View style={styles.header}>
        <Text style={styles.headerText}>{client.clnnme}</Text>
        <Button 
          title="Push To Sage"
          disabled
          buttonStyle={styles.pushToSageButton}
          containerStyle={styles.pushToSageButtonContainer}/>
      </View>

      <ScrollView style={styles.form}>
        <View style={{ flexDirection: 'row', width: '100%' }}>
          { addresses !== null && <Info address={addresses}/> }
                
          { contacts !== null &&
              <ContactTable
                contacts={contacts}
                deleteContact={deleteContact}
                toggleAddContact={toggleAddContact}/>
          }
        </View>

         { addContactView &&
            <View style={styles.centerAlign}>
              <AddContact 
                toggle={toggleAddContact} 
                client={client}
                user={userId}
                save={saveContact}/>
            </View>
         }

         {/* {
             this.state.update &&
             <UpdateClient
                 user={this.props.user}
                 address={this.state.address}
                 client={this.props.client}
                 save={this.toggleUpdate}
                 cancel={this.toggleUpdate}
                 refreshInfo={this.refreshInfo}/>
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
         } */}

        <View style={styles.lists}>
          <ClientActions
            user={userId}
            client={client}/>
            {/* toggleEmailOverlay={this.toggleEmailOverlay}/> */}
        </View>

         {/* <View style={styles.lists}>
             <List
             title='Client Files'
             client={this.props.client}
             files={this.state.files}/>
         </View> */}

         <View style={styles.footer}>
            <Button
              title='Submit for Approval'
              raised
              containerStyle={styles.submitButtonContainer}
              buttonStyle={styles.submitButton}/>
         </View>
        </ScrollView>

      <Snackbar 
        visible={visible} 
        onDismiss={( ) => setVisible(false)} 
        style={{width: '30%'}}>
        {snackMessage}
      </Snackbar>
    </KeyboardAvoidingView>
  );
}

export default ClientProfile;
