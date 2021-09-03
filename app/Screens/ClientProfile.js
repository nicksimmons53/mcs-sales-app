// // Library Imports
import React from 'react';
import { ScrollView, View, Text, KeyboardAvoidingView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'react-native-elements';
import ClientActions from '../components/ClientActions';
import { styles } from './Styles/ClientProfile.style';
import { StatusBar } from 'react-native';
import Snack from '../components/Snack';
import { 
  getClientAddresses, 
  getClientApprovals, 
  getClientContacts, 
  getClientDetails,
  getProgramsByClient
} from '../features/clients/clientsSlice';
import { useForm } from 'react-hook-form';
import ClientStatusBar from '../components/ClientStatusBar';
import DataGrid from '../components/DataGrid';
import FloatingButtonGroup from '../components/FloatingButtonGroup';
import QuickForm from '../components/QuickForm';
import { Slide } from 'native-base';
import { BasicInfo } from '../Modules/Forms';
import S3 from '../helpers/S3';

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
  const [ showForm, setShowForm ] = React.useState(false);
  const [ snackMessage, setSnackMessage ] = React.useState(null);
  const [ formTitle, setFormTitle ] = React.useState("");

  React.useEffect(( ) => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      dispatch(getClientDetails(client.id));
      dispatch(getProgramsByClient(client.id));
    });

    return unsubscribe;
  }, [ props.navigation ]);

  React.useEffect(( ) => {
    const getFiles = async( ) => {
      let response = await S3.getObjects(user.sageUserId + "-" + user.sageEmployeeNumber, client.name);
      if (typeof response.Contents === "undefined")
        return;

      response.Contents.forEach(file => {
        file.Name = file.Key.split("/")[1];
        file.LastModified = new Date(file.LastModified).toLocaleString("en-us");
      });
      
      setFiles(response.Contents);
    }

    dispatch(getClientAddresses(client.id));
    dispatch(getClientContacts(client.id));
    dispatch(getProgramsByClient(client.id));
    dispatch(getClientApprovals(client.id));
    getFiles( );
  }, [ ]);

  console.log(approvals)

  const deleteContact = async(contactID) => {
    // let status = await Contacts.deleteById(user.id, client.id, contactID);

    // if (status >= 200 && status <= 299) {
    //   setContacts(await Contacts.getAll(user.id, client.id));
    //   setSnackMessage("Contact was successfully deleted.");
    // } else {
    //   setSnackMessage("There was an error deleting the selected contact.");
    // }

    // setVisible(true);
  }

  const saveContact = async(values) => {
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

  const formatPrograms = (object) => {
    let tempArr = [];

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

    Object.keys(object).forEach(approval => {
      if (approval === "clientId")
        return;

      if (approval === "firstSubmittedAt" || approval === "lastSubmittedAt")
        return;

      if (approval === "timesSubmitted")
        return;

      let firstName = approval.charAt(0).toUpperCase( ).concat(approval.substring(1, approval.length-1));
      let lastName =  approval.charAt(approval.length-1).toUpperCase( );
      let status = object[approval] === 1 && "Approved";
      status = object[approval] === 0 ? "Declined" : "No Response";

      tempArr.push({
        name: firstName + " " + lastName,
        status: status
      });
    });
    
    return tempArr;
  }

  const buttonIcons = [
    { icon: 'folder', label: 'Edit Program Choices', onPress: ( ) => console.log("PRESSED") },
    { icon: 'file-upload', label: 'Upload File', onPress: ( ) => console.log("PRESSED") },
    { icon: 'account-edit', label: 'Add Contact',  onPress: ( ) => { 
      setShowForm(!showForm); 
      setFormTitle("Add a Contact");
    }},
    { icon: 'pencil', label: 'Edit Client', onPress: ( ) => { 
      setShowForm(!showForm); 
      setFormTitle("Edit Client Information");
    }},
    { icon: 'home', label: 'Home', onPress: ( ) => { setFiles([ ]); props.navigation.popToTop( )} },
  ];

  return (
    <KeyboardAvoidingView enabled behavior='padding' style={styles.background}>
      <StatusBar barStyle="dark-content"/>
      
      <View style={styles.header}>
        <Text style={styles.headerText}>{client.name}</Text>
        <Button 
          title="Push To Sage"
          disabled={client.status !== "Approved"}
          buttonStyle={styles.pushToSageButton}
          containerStyle={styles.pushToSageButtonContainer}/>
      </View>

      <ScrollView style={styles.form}>
        <ClientStatusBar status={client.status}/>

        <View style={{ flexDirection: 'row', width: '100%' }}>
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

        <View style={{ flexDirection: 'row', width: '100%' }}>
          { contacts !== null &&
            <DataGrid
              title="Contacts"
              header={["Name", "Title", "Phone", "Email"]}
              fieldsNeeded={["name", "title", "phone", "email"]}
              rows={contacts}
              columnStyle={{flex: [1.5, 1.5, 1, 2]}}
              flex={3}/>
          }
        </View>

        <View style={{ flexDirection: 'row', width: '100%' }}>
          { files !== null && 
            <DataGrid
              title="Files"
              header={["Name", "Last Modified"]}
              fieldsNeeded={["Name", "LastModified"]}
              rows={files}
              flex={2}/>
          } 

          { programs !== null &&
            <DataGrid
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

        <View style={styles.lists}>
          <ClientActions user={user.id} client={client}/>
        </View>

         <View style={styles.footer}>
            <Button
              title='Submit for Approval'
              disabled={client.status === "Queued" || client.status === "Approved"}
              raised
              containerStyle={styles.submitButtonContainer}
              buttonStyle={styles.submitButton}
              onPress={S3.createBucket}/>
         </View>
        </ScrollView>
      
      <Slide in={showForm}>
        <QuickForm 
          title={formTitle}
          setIsVisible={( ) => setShowForm(!showForm)}>
        </QuickForm> 
      </Slide>

      <FloatingButtonGroup actions={buttonIcons}/>
      <Snack visible={visible} action={( ) => snackbarDismiss( )} message={snackMessage}/>
    </KeyboardAvoidingView>
  );
}

export default ClientProfile;
