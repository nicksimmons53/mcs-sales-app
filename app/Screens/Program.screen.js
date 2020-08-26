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
import { styles } from './Styles/ClientForm.style';
import axios from 'axios';
import TileProgramForm from '../Modules/TileProgram.module';

// Class Component that will display client creation form
class Program extends Component {
    state = {
        client: null,
        user: null,
        tileProgram: false
    }

    timeout = null;
    scrollView = React.createRef( );

	componentDidMount( ) {
		let client = this.props.navigation.getParam('client');
		let user = this.props.navigation.getParam('user');
		let clientInfo = this.props.navigation.getParam('clientInfo');

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

	saveProgram = async(values, actions, program) => {
		console.log(values)
		// axios.post(`${API_URL}/employee/${user.recnum}/clients/${client.id}/${program}`, values)
		// 	.then((response) => {
		// 		console.log(response);
		// 	})
		// 	.catch((error) => {
		// 		console.error(error);
		// 	});
	}

	toggleTile = ( ) => {
		this.setState({ tileProgram: true });
	}

	render( ) {
		let tileProgram = {...this.props.navigation.getParam('tileProgram')};

		return (
			<KeyboardAvoidingView behavior='padding' enabled style={styles.background}>
				<View style={styles.row}>
					<Toolbar
						home={true}
						signOut={true}
						signOutFunc={this._signOutAsync}
						navigation={this.props.navigation} />

					<View style={styles.infoContainer}>
						<View style={styles.header}>
							<Text style={styles.headerText}>Program Information</Text>
						</View>

						<Divider/>

						<Formik
							initialValues={{...tileProgram}}
							onSubmit={(values, actions) => { 
								this.saveProgram(values, actions);
							}}>
							{formikProps => (
								<ScrollView style={styles.sv} contentContainerStyle={styles.svContentContainer}>
									<TileProgramForm formik={formikProps}/>
										
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
Program.propTypes = {
  navigation: PropTypes.object
}

export default Program;