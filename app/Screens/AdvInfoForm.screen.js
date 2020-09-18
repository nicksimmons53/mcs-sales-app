// Library Imports
import React, { Component } from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  View,
  Text,
  AsyncStorage
} from 'react-native';
import { API_URL } from 'react-native-dotenv';
import PropTypes from 'prop-types';
import { Divider, Button } from 'react-native-elements';
import { Formik } from 'formik';
import Toast from 'react-native-easy-toast';
import Toolbar from '../Components/Toolbar.component';
import Header from '../Components/Header';
import { styles } from './Styles/ClientForm.style';
import AdvInfo from '../Modules/AdvInfo.module';
import axios from 'axios';

// Class Component that will display client creation form
class AdvInfoForm extends Component {
	state = {
		client: null,
		user: null,
		info: null,
		tileProgram: false
	}

	timeout = null;
	scrollView = React.createRef( );

	componentDidMount( ) {
		let client = this.props.navigation.getParam('client');
		let user = this.props.navigation.getParam('user');

		this.setState({ client: client });
		this.setState({ user: user });
	}

	componentWillUnmount( ) {
		clearTimeout(this.timeout);
	}

	// Signout Function
	_signOutAsync = async( ) => {
		await AsyncStorage.clear( );
		this.props.navigation.navigate('Auth');
	};

	// Saving Accounting/Expediting Information
	save = async(values, actions) => {
		let client = this.props.navigation.getParam('client');
		let user = this.props.navigation.getParam('user');

		this.timeout = setTimeout(( ) => { actions.setSubmitting(false); }, 1000);

		values.client_id = client.id;

		console.log(values)
		
		axios.post(`${API_URL}/employee/${user.recnum}/clients/${client.id}/advanced-info`, values)
			.then((response) => {
				this.refs.toast.show('Client Information has been saved.');

				this.timeout = setTimeout(( ) => { this.props.navigation.popToTop( ); }, 2000);

				this.props.navigation.popToTop( );
			})
			.catch((error) => {
				console.error(error);
			});
	}

	render( ) {
		return (
			<KeyboardAvoidingView behavior='padding' enabled style={styles.background}>
				<View style={styles.row}>
					<Toolbar
						home={true}
						signOut={true}
						signOutFunc={this._signOutAsync}
						navigation={this.props.navigation} />

					<View style={styles.infoContainer}>
						<Header title="Continue Client"/>

						<Divider/>

						<Formik
							initialValues={{...this.props.navigation.getParam('clientInfo')}}
							onSubmit={(values, actions) => { 
								this.save(values, actions);
							}}>
							{formikProps => (
								<ScrollView style={styles.sv} contentContainerStyle={styles.svContentContainer}>
									<AdvInfo formik={formikProps}/>
										
									<View style={styles.buttonView}>
										<Button
											title='Save'
											buttonStyle={styles.save}
											containerStyle={styles.saveButtonContainer}
											onPress={formikProps.handleSubmit}/>
									</View>
								</ScrollView>
							)}
						</Formik>
					</View>

					<Toast ref='toast' position='center' style={styles.toast} />
				</View>
			</KeyboardAvoidingView>
		)
	}
}

// Props Validation
AdvInfoForm.propTypes = {
  navigation: PropTypes.object
}

export default AdvInfoForm;
