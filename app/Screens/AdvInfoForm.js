// Library Imports
import React from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  View
} from 'react-native';
import { Divider } from 'native-base';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import schema from '../form/yup/schema';

import Header from '../components/Header';
import styles from '../styles/Screen';
import { StatusBar } from 'react-native';
import FloatingButton from '../components/FloatingButton';
import Snack from '../components/Snack';
import { updateClientDetails, resetDetails, updateClientPrograms } from '../features/clients/clientsSlice';
import { ClientDetails } from '../Modules/InfoForms';
import S3 from '../helpers/S3';

let zIndex = 5000;

// Class Component that will display client creation form
function AdvInfoForm(navigation) {
	const dispatch = useDispatch( );
	let user = useSelector((state) => state.user.info);
	let client = useSelector((state) => state.clients.selected);
	let details = useSelector((state) => state.clients.details);
	let programs = useSelector((state) => state.clients.programs.entities);

	const [ snackMessage, setSnackMessage ] = React.useState(null);
	const [ visible, setVisible ] = React.useState(false);
	const [ disableSave, setDisableSave ] = React.useState(false);
	const [ error, setError ] = React.useState(false);
	const { control, handleSubmit, formState: { errors } } = useForm({
		resolver: yupResolver(schema.advancedInfo)
	});

	// Saving Accounting/Expediting Information
	const onSubmit = async(values, actions) => {
		setDisableSave(true);
		
		let responses = [];
		let queryValues = { type: "accounting", id: client.id, values: values.accounting };
		responses.push(await dispatch(updateClientDetails(queryValues)));

		values.expediting.estimatedStartDate = values.expediting.estimatedStartDate.toISOString( ).slice(0, 19).replace('T', ' ');
		queryValues = { type: "expediting", id: client.id, values: values.expediting};
		responses.push(await dispatch(updateClientDetails(queryValues)));

		queryValues = { values: values.programs, clientId: client.id };
		responses.push(await dispatch(updateClientPrograms(queryValues)));

		console.log(responses)
		responses.forEach((response) => {
			if (response.payload < 200 || response.payload > 299) {
				setError(true);
				setSnackMessage("There was an error saving Client Details. Please try again.");
				setDisableSave(false);

				return;
			}
		});

		if (error !== true) {
			setSnackMessage(`Client Details were saved successfully.`);
		}
	
		setVisible(true);
	}

  function findAllByKey(obj, keyToFind) {
    return Object.entries(obj)
      .reduce((acc, [key, value]) => (key === keyToFind)
        ? acc.concat(value)
        : (typeof value === 'object')
        ? acc.concat(findAllByKey(value, keyToFind))
        : acc
      , [])
  }

	const onErrors = errors => {
    let errorMessage = findAllByKey(errors, 'message').join('\n');

    setDisableSave(true);

    setSnackMessage(errorMessage);

    setError(true);

    setVisible(true);

    setDisableSave(false);
	}

	const snackbarDismiss = ( ) => {
		setVisible(false);

		if (error === false) {
			setDisableSave(false);
		} else {
			setError(false);
		}
	}

	const addFile = async( ) => {
    const res = await S3.putObject(user, client.name);
    if (res === "File Uploaded Successfully.") {
      setSnackMessage("File was successfully uploaded.");
		} else if (res === "Canceled") {
			setSnackMessage("File Upload was canceled.");
		} else {
			setSnackMessage("There was an error uploading the selected file.");
		}
    
    setVisible(true);
	}

	return details !== null && (
		<KeyboardAvoidingView behavior='padding' enabled style={styles.background}>
			<StatusBar barStyle="light-content"/>

			<View style={styles.grid}>
				<Header title="Save Client Details"/>

				<Divider/>

				<ScrollView>
					<ClientDetails 
						details={details} 
						programs={programs}
						control={control} 
						errors={errors}
						handleSubmit={handleSubmit}
						disableSave={disableSave}
						onSubmit={onSubmit}
						onErrors={onErrors}
						addFile={addFile}/>
				</ScrollView>
			</View> 

			<FloatingButton action={( ) => { navigation.navigation.pop(1); resetDetails( ); }} icon="arrow-left"/>
			<Snack visible={visible} action={( ) => snackbarDismiss( )} message={snackMessage}/>
		</KeyboardAvoidingView>
	);
}

export default AdvInfoForm;
 