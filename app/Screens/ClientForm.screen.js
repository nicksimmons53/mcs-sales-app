// Library Imports
import React, { Component } from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  View,
  Text,
  AsyncStorage
} from 'react-native';
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
    console.log('Logging Out: ' + Firebase.auth( ).currentUser.email);
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

    Client.saveInfo(values, 'clients', client.uid);

    this.refs.toast.show('Client Information has been saved.');
    setTimeout(( ) => { this.props.navigation.popToTop( ); }, 2000);
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
            signOut={this._signOutAsync}
            showIssue={this.toggleIssue}
            navigation={this.props.navigation} />

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
                  this._saveAdvancedInfo(values, actions)}}
            >

              {formikProps => (
                <View style={styles.infoContainer}>
                  <View style={styles.header}>
                    <Text style={styles.headerText}>{this.props.navigation.getParam('headerText')}</Text>
                    <View style={{flexDirection: 'row'}}>
                      <Icon
                        name='download'
                        type='font-awesome'
                        size={30}
                        onPress={formikProps.handleSubmit}
                        color={colors.green} />
                    </View>
                  </View>

                  <Divider />

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
                </View>
              )}
            </Formik>

            <Toast ref='toast' position='center' style={styles.toast} />
        </View>
      </KeyboardAvoidingView>
    )
  }
}

export default ClientForm;
