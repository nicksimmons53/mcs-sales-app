// Library Imports
import React, { Component } from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  View,
  Text,
  AsyncStorage
} from 'react-native';
import PropTypes from 'prop-types';
import { Divider, Icon, Button } from 'react-native-elements';
import { Formik } from 'formik';
import { AcctInfoValues, ExpInfoValues } from '../Form/Values.form';
import * as Client from '../Functions/Client';
import Toast from 'react-native-easy-toast';
import Toolbar from '../Components/Toolbar.component';
import styles from './Styles/ClientForm.style';
import Firebase from '../../config/Firebase';
import AcctInfo from '../Modules/AcctInfo.module';
import ExpInfo from '../Modules/ExpInfo.module';

// Class Component that will display client creation form
class AdvInfoForm extends Component {
  state = {
    buttonContinue: true
  }

  timeout = null;
  scrollView = React.createRef( );

  componentWillUnmount( ) {
    clearTimeout(this.timeout);
  }

  // Signout Function
  _signOutAsync = async( ) => {
    await AsyncStorage.clear( );
    Firebase.auth( ).signOut( );
    this.props.navigation.navigate('Auth');
  };

  // Saving Accounting/Expediting Information
  _saveAdvancedInfo = async(values, actions, infoType) => {
    let client = this.props.navigation.getParam('client');
    this.timeout = setTimeout(( ) => { actions.setSubmitting(false); }, 1000);

    Client.saveAdvancedInfo(values, 'clients', client, infoType);

    this.refs.toast.show('Client Information has been saved.');
  }

  continue = (values, actions) => {
    this._saveAdvancedInfo(values, actions, 'acctInfo');
    this.setState({buttonContinue: false});
    this.scrollView.scrollTo({x: 0, y: 0, animated: true});
  }

  save = (values, actions) => {
    this._saveAdvancedInfo(values, actions, 'expInfo');
    this.timeout = setTimeout(( ) => { this.props.navigation.popToTop( ); }, 2000);
  }

  render( ) {
    return (
      <KeyboardAvoidingView behavior='padding' enabled style={styles.background}>
        <View style={styles.row}>
          <Toolbar
            home={true}
            calendar={true}
            reportIssue={true}
            signOut={true}
            signOutFunc={this._signOutAsync}
            showIssue={this.toggleIssue}
            navigation={this.props.navigation} />

          <View style={styles.infoContainer}>
            <View style={styles.header}>
              <Text style={styles.headerText}>Continue Client</Text>
            </View>

            <Divider/>

            {this.state.buttonContinue ? (
              <Formik
                initialValues={AcctInfoValues}
                onSubmit={(values, actions) => { this.continue(values, actions) }}>
              {formikProps => (
                <ScrollView ref={(ref) => { this.scrollView = ref }} style={styles.sv}>
                  <AcctInfo formik={formikProps} />

                  <View style={styles.buttonView}>
                    <Button
                      title='Save & Continue'
                      buttonStyle={styles.save}
                      containerStyle={styles.saveButtonContainer}
                      onPress={formikProps.handleSubmit} />
                  </View>
                </ScrollView>
              )}
              </Formik>
            ) : (
              <Formik
                initialValues={ExpInfoValues}
                onSubmit={(values, actions) => {
                    this.save(values, actions);
                  }
                }>
              {formikProps => (
                <ScrollView ref={(ref) => { this.scrollView = ref }} style={styles.sv}>
                  <ExpInfo formik={formikProps} client={this.props.navigation.getParam('client')}/>

                  <View style={styles.buttonView}>
                    <Button
                      title='Save'
                      buttonStyle={styles.save}
                      containerStyle={styles.saveButtonContainer}
                      onPress={formikProps.handleSubmit} />
                  </View>
                </ScrollView>
              )}
              </Formik>
            )}

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
