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
import { getClientDetails, updateClientDetails } from '../redux/features/details/detailsThunk';
import { reset } from '../redux/features/details/detailsSlice';
import { getProgramsByClient, updatePrograms } from '../redux/features/programs/programsThunk';
import { ClientDetails } from '../Modules/InfoForms';
import S3 from '../helpers/S3';
import { setMessage, show } from '../redux/features/snackbar/snackbarSlice';
import { unwrapResult } from '@reduxjs/toolkit';

let zIndex = 5000;

// Class Component that will display client creation form
function AdvInfoForm(navigation) {
	const dispatch = useDispatch( );
	let user = useSelector((state) => state.user.info);
	let client = useSelector((state) => state.clients.selected);
	
	const [ disableSave, setDisableSave ] = React.useState(false);
	const [ error, setError ] = React.useState(false);
	const { control, handleSubmit, setValue, formState: { errors } } = useForm({
		resolver: yupResolver(schema.advancedInfo)
	});

	React.useEffect(( ) => {
		const getClientData = async ( ) => {
			let resultAction = await dispatch(getClientDetails(client.id));
			setValue("accounting_details", unwrapResult(resultAction).accounting_details);
			setValue("expediting_details", unwrapResult(resultAction).expediting_details);

			// ISSUE RIGHT HERE
			resultAction = await dispatch(getProgramsByClient(client.id));
			setValue("programs", unwrapResult(resultAction));
		}
		
		getClientData( );
	}, [ ]);

	// Saving Accounting/Expediting Information
	const onSubmit = async(data) => {
		setDisableSave(true);

		data.id = client.id;
		
		let response = await dispatch(updateClientDetails(data));
		if (response.payload >= 200 && response.payload <= 299) {
			response = await dispatch(updatePrograms({id: data.id, programs: data.programs}));
		}

    if (response.payload >= 200 && response.payload <= 299) {
      dispatch(setMessage(`Client Details were saved successfully.`));
    } else {
      setError(true);
      dispatch(setMessage("There was an error saving Client Details. Please try again."));
      setDisableSave(false);
    }
	
		dispatch(show( ));
		setDisableSave(false);
	}

  function findAllByKey(obj, keyToFind) {
		if (obj === null || typeof(obj) === "undefined")
			return;

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
    dispatch(setMessage(errorMessage));
    setError(true);
    dispatch(show( ));
    setDisableSave(false);
	}

	const addFile = async( ) => {
    const res = await S3.putObject(user, client.name);
    if (res === "File Uploaded Successfully.") {
      dispatch(setMessage("File was successfully uploaded."));
		} else if (res === "Canceled") {
			dispatch(setMessage("File Upload was canceled."));
		} else {
			dispatch(setMessage("There was an error uploading the selected file."));
		}
    
		dispatch(show( ));
	}

	return (
		<KeyboardAvoidingView behavior='padding' enabled style={styles.background}>
			<StatusBar barStyle="light-content"/>

			<View style={styles.grid}>
				<Header title="Save Client Details"/>

				<Divider/>

				<ScrollView>
					<ClientDetails  
						control={control} 
						errors={errors}
						handleSubmit={handleSubmit}
						disableSave={disableSave}
						onSubmit={onSubmit}
						onErrors={onErrors}
						addFile={addFile}/>
				</ScrollView>
			</View> 

			<FloatingButton action={( ) => { navigation.navigation.pop(1); reset( ); }} icon="arrow-left"/>
		</KeyboardAvoidingView>
	);
}

export default AdvInfoForm;
 