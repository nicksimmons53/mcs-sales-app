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
import TileProgramForm from '../Modules/TileProgramForm.module';

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

	save = async(values, actions, program) => {
		let client = this.props.navigation.getParam('client');
        let user = this.props.navigation.getParam('user');

        values.client_id = client.id;
        
		axios.post(`${API_URL}/employee/${user.recnum}/clients/${client.id}/${program}`, values)
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
						<View style={styles.header}>
							<Text style={styles.headerText}>Program Information</Text>
						</View>

						<Divider/>

						<ScrollView style={styles.sv} contentContainerStyle={styles.svContentContainer}>
                            <Formik
                                initialValues={{...this.props.navigation.getParam('tileProgram')}}
                                onSubmit={(values, actions) => { 
                                    this.save(values, actions, "tileProgram");
                                }}>
                                {formikProps => (
                                    <>
                                        <TileProgramForm formik={formikProps}/>
                                            
                                        <View style={styles.buttonView}>
                                            <Button
                                                title='Save'
                                                buttonStyle={styles.save}
                                                containerStyle={styles.saveButtonContainer}
                                                onPress={formikProps.handleSubmit}/>
                                        </View>
                                    </>
                                )}
                            </Formik>
						</ScrollView>
					</View>

					<Toast ref='toast' position='center' style={styles.toast}/>
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