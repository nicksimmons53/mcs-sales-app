// Library Imports
import React from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  View,
  Text
} from 'react-native';
import { Divider, Button } from 'react-native-elements';
import { Formik } from 'formik';
import { useSelector } from 'react-redux';
import Header from '../Components/Header';
import { styles } from './Styles/ClientForm.style';
import AdvInfo from '../Modules/AdvInfo.module';
import Contacts from '../api/Contacts';
import Clients from '../api/Clients';
import { StatusBar } from 'react-native';
import { Snackbar } from 'react-native-paper';

// Class Component that will display client creation form
function AdvInfoForm(navigation) {
	let userId = useSelector((state) => state.user.id);
	const [ client, setClient ] = React.useState(navigation.route.params.client);
	const [ snackMessage, setSnackMessage ] = React.useState(null);
	const [ details, setDetails ] = React.useState(null);
	const [ visible, setVisible ] = React.useState(false);
	const [ disableSave, setDisableSave ] = React.useState(false);
	const [ error, setError ] = React.useState(false);
	
	React.useEffect(( ) => {
		const getDetails = async( ) => {
			setDetails(await Clients.getDetails(userId, client.id));
		}
		
		getDetails( );
	}, [ ]);

	// Saving Accounting/Expediting Information
	const save = async(values, actions) => {
		setDisableSave(true);

		values.client_id = client.id;

		let contactValues = {
			clientId: values.client_id,
			name: values.acc_cont_name,
			title: "Accounting",
			phone: values.acc_cont_phn,
			email: values.acc_cont_ema
		}

		let status = await Clients.createDetails(userId, client.id, values);
		status = await Contacts.createNew(userId, client.id, contactValues);

		if (status >= 200 && status <= 299) {
		  setSnackMessage(`Client Details were saved successfully.`);
		} else {
		  setError(true);
		  setSnackMessage("There was an error saving Client Details. Please try again.");
		  setDisableSave(false);
		}
	
		setVisible(true);
	}

	const snackbarDismiss = ( ) => {
		setVisible(false);

		if (error === false) {
			navigation.navigation.pop(1);
		} else {
			setError(false);
		}
	}

	return details !== null && (
		<KeyboardAvoidingView behavior='padding' enabled style={styles.background}>
			<StatusBar barStyle="light-content"/>

			<View style={styles.row}>
				<View style={styles.infoContainer}>
					<Header title="Save Client Details"/>

					<Divider/>

					<Formik
						initialValues={details[0]}
						onSubmit={(values, actions) => { 
							save(values, actions);
						}}>
						{formikProps => (
							<ScrollView style={styles.sv} contentContainerStyle={styles.svContentContainer}>
								<AdvInfo formik={formikProps}/>
									
								<View style={styles.buttonView}>
									<Button
										title='Save'
										disabled={disableSave}
										buttonStyle={styles.save}
										containerStyle={styles.saveButtonContainer}
										onPress={formikProps.handleSubmit}/>
								</View>
							</ScrollView>
						)}
					</Formik>
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

export default AdvInfoForm;
