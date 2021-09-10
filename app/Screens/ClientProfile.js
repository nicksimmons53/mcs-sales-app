// // Library Imports
import React from 'react';
import { ScrollView, View, KeyboardAvoidingView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import ClientActions from '../components/ClientActions';
import styles from '../styles/Screen';
import { StatusBar } from 'react-native';
import Snack from '../components/Snack';
import Header from '../components/Header';
import { 
  deleteClientContact,
  getClientAddresses, 
  getClientApprovals, 
  getClientContacts, 
  getClientDetails,
  getProgramsByClient
} from '../features/clients/clientsSlice';
import ClientStatusBar from '../components/ClientStatusBar';
import { DataGrid, DataGridHorizontal } from '../components/DataGrid';
import FloatingButtonGroup from '../components/FloatingButtonGroup';
import { deleteContactAlert, deleteFileAlert  } from '../components/Alert';
import S3 from '../helpers/S3';
import { ActionButtonMedium, SuccessButtonLarge } from '../components/Button';

function ClientProfile(props) {
  const dispatch = useDispatch( );
  let user = useSelector((state) => state.user.info);
  let client = useSelector((state) => state.clients.selected);
  let addresses = useSelector((state) => state.clients.addresses);
  let contacts = useSelector((state) => state.clients.contacts);
  let programs = useSelector((state) => state.clients.programs.entities);
  let approvals = useSelector((state) => state.clients.approvals);

  const [ files, setFiles ] = React.useState([ ]);
  const [ visible, setVisible ] = React.useState(false);
  const [ snackMessage, setSnackMessage ] = React.useState(null);

  React.useEffect(( ) => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      dispatch(getClientDetails(client.id));
      dispatch(getProgramsByClient(client.id));
    });

    return unsubscribe;
  }, [ props.navigation ]);

  React.useEffect(( ) => {
    const getFiles = async( ) => setFiles(await S3.getFiles(user, client.name));

    dispatch(getClientAddresses(client.id));
    dispatch(getClientContacts(client.id));
    dispatch(getProgramsByClient(client.id));
    dispatch(getClientApprovals(client.id));
    getFiles( );
  }, [ ]);

  const deleteContact = (row) => {
    const action = async(row) => {
      let response = await dispatch(deleteClientContact({ id: row.id, clientId: client.id }));
      let status = response.payload;
  
      if (status >= 200 && status <= 299) {
        dispatch(getClientContacts(client.id));
        setSnackMessage("Contact was successfully deleted.");
      } else {
        setSnackMessage("There was an error deleting the selected contact.");
      }
  
      setVisible(true);
    }

    deleteContactAlert(( ) => action(row));
  }

  const saveContact = async (values) => {
    // let status = await Clients.createContact(user.id, client.id, values);

    // if (status >= 200 && status <= 299) {
    //   setContacts(await Contacts.getAll(user.id, client.id));
    //   setSnackMessage("Contact was successfully created.");
    //   toggleAddContact( );
    // } else {
    //   setSnackMessage("There was an error creating the new contact.");
    // }

    // setVisible(true);
  }

  const addFile = async ( ) => {
    const res = await S3.putObject(user, client.name);
    if (res === "File Uploaded Successfully.") {
      setFiles(await S3.getFiles(user, client.name));
      setSnackMessage("File was successfully uploaded.");
    } else {
      setSnackMessage("There was an error uploading the selected file.");
    }
    
    setVisible(true);
  }

  const deleteFile = async (fileToDelete) => {
    const action = async (file) => {
      let response = await S3.deleteObject(user.sageUserId + "-" + user.sageEmployeeNumber, fileToDelete.Key);
  
      if (response === "Object Deleted") {
        setFiles(await S3.getFiles(user, client.name));
        setSnackMessage("File was successfully deleted.");
      } else {
        setSnackMessage("There was an error deleting the selected file.");
      }
  
      setVisible(true);
    }

    deleteFileAlert(( ) => action(fileToDelete));
  }

  const formatPrograms = (object) => {
    let tempArr = [];

    if (typeof object === "undefined")
      return tempArr;

    Object.keys(object).forEach(program => {
      if (program === "clientId")
        return;

      if (object[program] === 1) { 
        tempArr.push(program[0].toUpperCase( ) + program.slice(1).toLowerCase( ));
      }
    });

    return tempArr;
  };

  const formatApprovals = (object) => {
    let tempArr = [];

    if (typeof object === "undefined")
      return tempArr;
    
    Object.keys(object).forEach(approval => {
      if (approval === "clientId")
        return;

      if (approval === "firstSubmittedAt" || approval === "lastSubmittedAt")
        return;

      if (approval === "timesSubmitted")
        return;

      let firstName = approval.charAt(0).toUpperCase( ).concat(approval.substring(1, approval.length-1));
      let lastName =  approval.charAt(approval.length-1).toUpperCase( );
      let status = object[approval] === 1 ? "Approved" : object[approval] === 0 ? "Declined" : "No Response";

      tempArr.push({
        name: firstName + " " + lastName,
        status: status
      });
    });
    
    return tempArr;
  }

  const snackbarDismiss = ( ) => setVisible(false)
  
  const buttonIcons = [
    { icon: 'folder', label: 'Edit Program Choices', onPress: ( ) => console.log("PRESSED") },
    { icon: 'file-upload', label: 'Upload File', onPress: ( ) => addFile( ) },
    { icon: 'account-edit', label: 'Add Contact',  onPress: ( ) => console.log("PRESSED") },
    { icon: 'pencil', label: 'Edit Client', onPress: ( ) => console.log("PRESSED") },
    { icon: 'home', label: 'Home', onPress: ( ) => { setFiles([ ]); props.navigation.popToTop( )} },
  ];

  return (
    <KeyboardAvoidingView enabled behavior='padding' style={styles.grid}>
      <StatusBar barStyle="dark-content"/>

      <Header title={client.name}>
        <ActionButtonMedium
          title="Push To Sage"
          disabled={client.status !== "Approved"}/>
      </Header>

      <ScrollView>
        <ClientStatusBar status={client.status}/>

        <View style={styles.rowNoMargin}>
          { addresses !== null && 
            <DataGrid
              title="Addresses"
              header={["Type", "Address", "City", "State", "Zip"]}
              fieldsNeeded={["type", "address", "city", "state", "zip"]}
              rows={addresses}
              columnStyle={{flex: [2, 3.5, 1.5, 1, 1]}}
              flex={3}/>
          }
        </View>

        <View style={styles.rowNoMargin}>
          { contacts !== null &&
            <DataGrid
              title="Contacts"
              header={["Name", "Title", "Phone", "Email"]}
              fieldsNeeded={["name", "title", "phone", "email"]}
              rows={contacts}
              columnStyle={{flex: [1.5, 1.5, 1, 2]}}
              flex={3}
              pagination={true}
              itemsPerPage={5}
              action={deleteContact}/>
          }
        </View>

        <View style={styles.rowNoMargin}>
          { files !== null && 
            <DataGrid
              title="Files"
              header={["Name", "Last Modified"]}
              fieldsNeeded={["Name", "LastModified"]}
              rows={files}
              columnStyle={{flex: [6, 2.5, 1]}}
              flex={2}
              pagination={true}
              action={S3.viewObject}/>
          } 

          { programs !== null &&
            <DataGridHorizontal
              title="Selected Programs"
              rows={formatPrograms(programs)}
              orientation="horizontal"/>
          }

          { approvals !== null &&
            <DataGrid
              title="Approvals"
              header={["Name", "Status"]}
              fieldsNeeded={["name", "status"]}
              rows={formatApprovals(approvals)}/>
          }
        </View>

        <ClientActions user={user.id} client={client}/>

        <View style={styles.center}>
          <SuccessButtonLarge 
            title="Submit for Approval" 
            action={( ) => S3.viewObject("nicks-9995", "Test1/Accounts.txt")}
            disabled={client.status === "Queued" || client.status === "Approved"}/>
        </View>
      </ScrollView>

      <FloatingButtonGroup actions={buttonIcons}/>
      <Snack visible={visible} action={( ) => snackbarDismiss( )} message={snackMessage}/>
    </KeyboardAvoidingView>
  );
}

export default ClientProfile;
