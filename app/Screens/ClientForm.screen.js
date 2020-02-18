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
import { CreateClientValues, ContinueClientValues } from '../Form/Values.form';
import * as Client from '../Functions/Client';
import Toast from 'react-native-easy-toast';
import Toolbar from '../Components/Toolbar.component';
import BasicInfo from '../Modules/BasicInfo.module';
import styles from './Styles/ClientForm.style';
import Firebase from '../../config/Firebase';
import AcctInfo from '../Modules/AcctInfo.module';
import ExpInfo from '../Modules/ExpInfo.module';
import colors from '../Library/Colors';

// Class Component that will display client creation form
class ClientForm extends Component {
  // Signout Function
  _signOutAsync = async( ) => {
    await AsyncStorage.clear( );
    Firebase.auth( ).signOut( );
    this.props.navigation.navigate('Auth');
  };

  // Saving Basic Client Info
  _saveBasicInfo = async(values, actions) => {
    setTimeout(( ) => { actions.setSubmitting(false); }, 1000);

    Client.saveInfo(values, 'clients');

    this.refs.toast.show(values.clientName + ' has been saved.');
    setTimeout(( ) => { this.props.navigation.popToTop( ); }, 2000);
  }

  // Saving Accounting/Expediting Information
  _saveAdvancedInfo = async(values, actions) => {
    let client = this.props.navigation.getParam('client');
    setTimeout(( ) => { actions.setSubmitting(false); }, 1000);

    Client.saveAdvancedInfo(values, 'clients', client, 'acctInfo');

    this.refs.toast.show('Client Information has been saved.');
    setTimeout(( ) => { this.props.navigation.popToTop( ); }, 2000);
  }

  // Continue
  continue = (values, actions) => {
    this._saveAdvancedInfo(values, actions);
    return <ExpInfo />
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
              <Text style={styles.headerText}>{this.props.navigation.getParam('headerText')}</Text>
            </View>

            <Divider />


            <Formik
              initialValues={
                this.props.navigation.getParam('createClient') ?
                  CreateClientValues
                  :
                  ContinueClientValues
              }
              onSubmit={(values, actions) =>
                {this.props.navigation.getParam('createClient') ?
                  this._saveBasicInfo(values, actions)
                  :
                  this._saveAdvancedInfo(values, actions)
                }
              }>
            {formikProps => (
              <ScrollView style={styles.sv}>
                {this.props.navigation.getParam('createClient') ?
                  <BasicInfo formik={formikProps} />
                  :
                  <>
                    <AcctInfo formik={formikProps} />
                    <ExpInfo formik={formikProps} client={this.props.navigation.getParam('client')}/>
                  </>
                }

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
          </View>

          <Toast ref='toast' position='center' style={styles.toast} />
        </View>
      </KeyboardAvoidingView>
    )
  }
}

// Props Validation
ClientForm.propTypes = {
  navigation: PropTypes.object
}

export default ClientForm;
