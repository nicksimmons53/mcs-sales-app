// // Library Imports
import React from 'react';
import { ScrollView, View, KeyboardAvoidingView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import ClientActions from '../components/ClientActions';
import styles from '../styles/Screen';
import { StatusBar } from 'react-native';
import Header from '../components/Header';
import { useIsFocused } from '@react-navigation/native';
import { getClientContacts, deleteClientContact } from '../redux/features/contacts/contactsThunk';
import { getClientApprovals } from '../redux/features/clients/clientsThunk';
import { getClientAddresses } from '../redux/features/addresses/addressThunk';
import { getProgramsByClient } from '../redux/features/programs/programsThunk';
import { setMessage, show } from '../redux/features/snackbar/snackbarSlice';
import ClientStatusBar from '../components/ClientStatusBar';
import { DataGrid, DataGridHorizontal } from '../components/DataGrid';
import FloatingButtonGroup from '../components/FloatingButtonGroup';
import { deleteContactAlert } from '../components/Alert';
import S3 from '../helpers/S3';
import AnimatedLoader from 'react-native-animated-loader';
import { ActionButtonMedium, SuccessButtonLarge } from '../components/Button';
import ActionModal from '../components/ActionModal';

function ClientProfile(props) {
  const isFocused = useIsFocused( ); 
  const dispatch = useDispatch( );
  let user = useSelector((state) => state.user.info);
  let client = useSelector((state) => state.clients.selected);
  let addresses = useSelector((state) => state.addresses.entities);
  let contacts = useSelector((state) => state.contacts.entities)
  let programs = useSelector((state) => state.programs.entities)
  let approvals = useSelector((state) => state.clients.approvals);

  const [ visible, setVisible ] = React.useState(true);
  const [ files, setFiles ] = React.useState([ ]);
  const [ showEditClientModal, setShowEditClientModal ] = React.useState(false);
  const [ showAddContactModal, setShowAddContactModal ] = React.useState(false);

  React.useEffect(( ) => {
    setInterval(( ) => {
      setVisible(false);
    }, 2750);
  }, [ ]);

  React.useEffect(( ) => {
    const getFiles = async( ) => setFiles(await S3.getFiles(user, client.name));

    dispatch(getClientAddresses(client.id));
    dispatch(getClientContacts(client.id));    
    dispatch(getProgramsByClient(client.id));
    dispatch(getClientApprovals(client.id));

    getFiles( );
  }, [ isFocused ]);

  const deleteContact = (row) => {
    const action = async(row) => {
      let response = await dispatch(deleteClientContact({ id: row.id, clientId: client.id }));
      let status = response.payload;
  
      if (status >= 200 && status <= 299) {
        dispatch(getClientContacts(client.id));
        dispatch(setMessage("Contact was successfully deleted."));
      } else {
        dispatch(setMessage("There was an error deleting the selected contact."));
      }
  
      dispatch(show( ));
    }

    deleteContactAlert(( ) => action(row));
  }

  const addFile = async ( ) => {
    const res = await S3.putObject(user, client.name);
    if (res === "File Uploaded Successfully.") {
      setFiles(await S3.getFiles(user, client.name));
      dispatch(setMessage("File was successfully uploaded."));
    } else if (res === "Canceled") {
      dispatch(setMessage("File Upload was canceled."));
    } else {
      dispatch(setMessage("There was an error uploading the selected file."));
    }
    
    dispatch(show( ));
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
  
  const buttonIcons = [
    { icon: 'file-upload', label: 'Upload File', onPress: ( ) => addFile( ) },
    { icon: 'account-edit', label: 'Add Contact',  onPress: ( ) => setShowAddContactModal(!showAddContactModal) },
    { icon: 'pencil', label: 'Edit Client', onPress: ( ) => setShowEditClientModal(!showEditClientModal) },
    { icon: 'home', label: 'Home', onPress: ( ) => { setFiles([ ]); props.navigation.popToTop( )} },
  ];

  return (
    <KeyboardAvoidingView enabled behavior='padding' style={styles.grid}>
      <AnimatedLoader
        visible={visible}
        animationStyle={{ height: 200, width: 200 }}
        speed={1}
        source={require("../../assets/7899-loading.json")}/>

      <StatusBar barStyle="dark-content"/>

      <Header title={client.name}>
        <ActionButtonMedium title="Push To Sage" disabled={client.status !== "Approved"}/>
      </Header>

      <ScrollView>
        <ClientStatusBar status={client.status}/>

        <View style={styles.rowNoMargin}>
          <DataGrid
            title="Addresses"
            header={["Type", "Address", "City", "State", "Zip"]}
            fieldsNeeded={["type", "address", "city", "state", "zip"]}
            rows={addresses}
            columnStyle={{flex: [2, 3.5, 1.5, 1, 1]}}
            flex={3}/>
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
              itemsPerPage={5}
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
              rows={approvals.timesSubmitted !== 0 ? formatApprovals(approvals) : [ ]}/>
          }
        </View>

        <ClientActions user={user.id} client={client}/>

        <View style={styles.center}>
          <SuccessButtonLarge 
            title="Submit for Approval" 
            action={( ) => dispatch(show( ))}
            disabled={client.status === "Queued" || client.status === "Approved"}/>
        </View>
      </ScrollView>

      <FloatingButtonGroup actions={buttonIcons}/>
      <ActionModal visible={showEditClientModal} setVisible={setShowEditClientModal} form="Edit Client"/>
      <ActionModal visible={showAddContactModal} setVisible={setShowAddContactModal} form="Add Contacts"/>
    </KeyboardAvoidingView>
  );
}

export default ClientProfile;
