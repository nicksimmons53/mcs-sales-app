// Library Imports
import React from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  View
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Divider } from 'react-native-elements';
import { Snackbar } from 'react-native-paper';
import { styles } from './Styles/ClientForm.style';
import Header from '../Components/Header';
import TileProgramForm from '../Modules/TileProgramForm';
import WoodProgramForm from '../Modules/WoodProgramForm';
import CarpetProgramForm from '../Modules/CarpetProgramForm';
import CountertopProgramForm from '../Modules/CountertopProgramForm';
import CabinetProgramForm from '../Modules/CabinetProgramForm';
import { StatusBar } from 'react-native';
import Programs from '../api/Programs';

// Class Component that will display client creation form
function Program(navigation) {
    const dispatch = useDispatch( );
    let userId = useSelector((state) => state.user.id);
	const [ client, setClient ] = React.useState(navigation.route.params.client);
    const [ visible, setVisible ] = React.useState(false);
    const [ snackMessage, setSnackMessage ] = React.useState(null);
    const [ disableSave, setDisableSave ] = React.useState(null);
    const [ error, setError ] = React.useState(false);

	// Saving Accounting/Expediting Information
	const save = async(values, program) => {
		setDisableSave(program);

		values.client_id = client.id;

		let status = await Programs.createNew(userId, client.id, program, values);

		if (status >= 200 && status <= 299) {
		  setSnackMessage(`Client Program was saved successfully.`);
		} else {
		  setError(true);
		  setSnackMessage("There was an error saving Program Details. Please try again.");
		  setDisableSave(null);
		}
	
		setVisible(true);
	}

	const snackbarDismiss = ( ) => {
		setVisible(false);

		if (error === true) {
			setError(false);
		}
	}
    
    return (
        <KeyboardAvoidingView behavior='padding' enabled style={styles.background}>
            <StatusBar barStyle="light-content"/>

            <View style={styles.row}>
                <View style={styles.infoContainer}>
                    <Header title="Client Program Details"/>

                    <Divider/>

                    <ScrollView style={styles.sv} contentContainerStyle={styles.svContentContainer}>
                        <TileProgramForm 
                            userId={userId} 
                            clientId={client.id} 
                            save={save} 
                            disabled={false}/>
                        
                        <WoodProgramForm 
                            userId={userId} 
                            clientId={client.id} 
                            save={save} 
                            disabled={false}/>

                        <CountertopProgramForm 
                            userId={userId} 
                            clientId={client.id} 
                            save={save} 
                            disabled={disableSave}/>

                        <CarpetProgramForm
                            userId={userId} 
                            clientId={client.id} 
                            save={save} 
                            disabled={disableSave}/>

                        <CabinetProgramForm
                            userId={userId} 
                            clientId={client.id} 
                            save={save} 
                            disabled={disableSave}/>
                    </ScrollView>
                </View>
            </View>

            <Snackbar 
                visible={visible} 
                onDismiss={( ) => snackbarDismiss( )} 
                style={{width: '30%'}}>
                {snackMessage}
            </Snackbar>
        </KeyboardAvoidingView>
    );
}

export default Program;