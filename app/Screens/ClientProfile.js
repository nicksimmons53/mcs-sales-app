// // Library Imports
import React from 'react';
import { ScrollView, View, Text, KeyboardAvoidingView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'react-native-elements';
import ClientActions from '../components/ClientActions.component';
import { styles } from './Styles/ClientProfile.style';
import { StatusBar } from 'react-native';
import FloatingButton from '../components/FloatingButton';
import Snack from '../components/Snack';
import { 
  getClientAddresses, 
  getClientContacts, 
  getClientDetails,
  getProgramsByClient
} from '../features/clients/clientsSlice';
import DataGrid from '../components/DataGrid';

function ClientProfile(props) {
  const dispatch = useDispatch( );
  let userId = useSelector((state) => state.user.id);
  let client = useSelector((state) => state.clients.selected);
  let addresses = useSelector((state) => state.clients.addresses);
  let contacts = useSelector((state) => state.clients.contacts);
  let programs = useSelector((state) => state.clients.programs.entities);

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
    dispatch(getClientAddresses(client.id));
    dispatch(getClientContacts(client.id));
    dispatch(getProgramsByClient(client.id));
  }, [ ]);

  const deleteContact = async(contactID) => {
    // let status = await Contacts.deleteById(userId, client.id, contactID);

    // if (status >= 200 && status <= 299) {
    //   setContacts(await Contacts.getAll(userId, client.id));
    //   setSnackMessage("Contact was successfully deleted.");
    // } else {
    //   setSnackMessage("There was an error deleting the selected contact.");
    // }

    // setVisible(true);
  }

  const saveContact = async(values) => {
    // let status = await Clients.createContact(userId, client.id, values);

    // if (status >= 200 && status <= 299) {
    //   setContacts(await Contacts.getAll(userId, client.id));
    //   setSnackMessage("Contact was successfully created.");
    //   toggleAddContact( );
    // } else {
    //   setSnackMessage("There was an error creating the new contact.");
    // }

    // setVisible(true);
  }

  const formatPrograms = (array) => {
    let tempArr = [];

    Object.keys(array).forEach(program => {
      if (program === "clientId")
        return;
        
      if (array[program] === 1) {
        tempArr.push(program[0].toUpperCase( ) + program.slice(1).toLowerCase( ));
      }
    });

    return tempArr;
  }

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
        <View style={{ flexDirection: 'row', width: '100%' }}>
          { addresses !== null && 
            <DataGrid
              title="Addresses"
              header={["Type", "Address", "City", "State", "Zip"]}
              rows={addresses}/>
          }
        </View>

        <View style={{ flexDirection: 'row', width: '100%' }}>
          { contacts !== null &&
            <DataGrid
              title="Contacts"
              header={["Name", "Title", "Phone", "Email"]}
              rows={contacts}
              flex={3}/>
          }

          { programs !== null &&
            <DataGrid
              title="Selected Programs"
              header={["Selections"]}
              rows={formatPrograms(programs)}
              orientation="horizontal"/>
          }
        </View>

        <View style={styles.lists}>
          <ClientActions user={userId} client={client}/>
        </View>

         <View style={styles.footer}>
            <Button
              title='Submit for Approval'
              disabled={client.status === "Queued" || client.status === "Approved"}
              raised
              containerStyle={styles.submitButtonContainer}
              buttonStyle={styles.submitButton}/>
         </View>
        </ScrollView>
      
      <FloatingButton action={( ) => props.navigation.popToTop( )} icon="home"/>
      <Snack visible={visible} action={( ) => snackbarDismiss( )} message={snackMessage}/>
    </KeyboardAvoidingView>
  );
}

export default ClientProfile;
