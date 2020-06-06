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
import { Divider, Button } from 'react-native-elements';
import { Formik } from 'formik';
import { Client, ContinueClientValues } from '../Form/Values.form';
import axios from 'axios';
import Toast from 'react-native-easy-toast';
import Toolbar from '../Components/Toolbar.component';
import BasicInfo from '../Modules/BasicInfo.module';
import styles from './Styles/ClientForm.style';
import AcctInfo from '../Modules/AcctInfo.module';
import ExpInfo from '../Modules/ExpInfo.module';

// Class Component that will display client creation form
class ClientForm extends Component {
  timeout1 = null;
  timeout2 = null;

  componentWillUnmount( ) {
    clearTimeout(this.timeout1);
    clearTimeout(this.timeout2);
  }

  // Signout Function
  _signOutAsync = async( ) => {
    await AsyncStorage.clear( );
    this.props.navigation.navigate('Auth');
  };

  // Saving Basic Client Info
  _saveBasicInfo = async(values, actions) => {
    let user = this.props.navigation.getParam('user');
    let refresh = this.props.navigation.getParam('refresh');

    // Set User Specific Values
    values.empnum = user.recnum;

    this.timeout1 = setTimeout(( ) => { actions.setSubmitting(false); }, 1000);

    axios.post(`https://ga3xyasima.execute-api.us-east-1.amazonaws.com/dev/employee/${user.recnum}/clients`, values)
      .then((response) => {
        refresh(user);
        
        this.refs.toast.show(values.clnnme + ' has been saved.');

        this.timeout2 = setTimeout(( ) => {
          this.props.navigation.popToTop( );
        }, 2000);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  // Saving Accounting/Expediting Information
  _saveAdvancedInfo = async(values, actions) => {
    let client = this.props.navigation.getParam('client');
    let user = this.props.navigation.getParam('user');
    
    this.timeout1 = setTimeout(( ) => { actions.setSubmitting(false); }, 1000);

    axios.put(`https://ga3xyasima.execute-api.us-east-1.amazonaws.com/dev/employee/${user.recnum}/clients/${client.id}`, values)
      .then((response) => {
        this.refs.toast.show('Client Information has been saved.');
        this.timeout2 = setTimeout(( ) => { this.props.navigation.popToTop( ); }, 2000);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  // Continue
  continue = (values, actions) => {
    this._saveAdvancedInfo(values, actions);
    return <ExpInfo />;
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
                  Client
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
                    <AcctInfo formik={formikProps}/>
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
  navigation: PropTypes.object,
  refresh: PropTypes.func
}

export default ClientForm;
