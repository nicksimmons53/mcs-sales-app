// Library Imports
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import { Button, Input, Divider } from 'react-native-elements';
import { Contact1, Contact2, Contact3 } from '../Form/Values.form';
import axios from 'axios';
import { styles } from './Styles/AddContact.style';

class AddContact extends Component {
  timeout = null;

  componentWillUnmount( ) {
    clearTimeout(this.timeout);
  }

  // Handle Submit
  _saveContactInfo = (values, actions) => {
    let user = this.props.user;
    let client = this.props.client;

    axios.put(`https://ga3xyasima.execute-api.us-east-1.amazonaws.com/dev/employee/${user.recnum}/clients/${client.id}/contacts`, values)
      .then((response) => {
        this.props.refresh( );
        this.props.toggle( ); 
      })
      .catch((error) => {
        console.error(error);
      });
  }

  // Text Input Component
  input = (label, value, formik) => (
    <View style={styles.textRow}>
      <Text style={styles.label}>{label}</Text>
      <Input
        onChangeText={formik.handleChange(value)}
        autoCapitalize='words'
        blurOnSubmit={false}
        containerStyle={styles.mediumInput}
        inputContainerStyle={styles.inputContainer} />
    </View>
  )

  render( ) {
    return (
      <View style={styles.background}>
        <View style={styles.form}>
          <View style={styles.header}>
            <Text style={styles.label}>Add Client Contact</Text>
          </View>

          <Divider/>

          {this.props.contactID === 1 ? (
            <Formik
              initialValues={Contact1}
              onSubmit={(values, actions) => {this._saveContactInfo(values, actions)}
            }>
              {formikProps => (
                <>
                  {this.input('Name', 'contct', formikProps)}
                  {this.input('Title', 'cntds1', formikProps)}
                  {this.input('Phone', 'cllphn', formikProps)}
                  {this.input('Email', 'e_mail', formikProps)}

                  <View style={{width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                    <Button
                      title='Save'
                      buttonStyle={styles.save}
                      onPress={formikProps.handleSubmit}/>
                    <Button
                      title='Cancel'
                      buttonStyle={styles.cancel}
                      onPress={( ) => this.props.toggle( )}/>
                  </View> 
                </>
              )}
            </Formik>
          ) : null}

          {this.props.contactID === 2 ? (
            <Formik
              initialValues={Contact2}
              onSubmit={(values, actions) => {this._saveContactInfo(values, actions)}
            }>
              {formikProps => (
                <>
                  {this.input('Name', 'contc2', formikProps)}
                  {this.input('Title', 'cntds2', formikProps)}
                  {this.input('Phone', 'cell02', formikProps)}
                  {this.input('Email', 'email2', formikProps)}

                  <View style={{width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                    <Button
                      title='Save'
                      buttonStyle={styles.save}
                      onPress={formikProps.handleSubmit}/>
                    <Button
                      title='Cancel'
                      buttonStyle={styles.cancel}
                      onPress={( ) => this.props.toggle( )}/>
                  </View> 
                </>
              )}
            </Formik>
          ) : null}

          {this.props.contactID === 3 ? (
            <Formik
              initialValues={Contact3}
              onSubmit={(values, actions) => {this._saveContactInfo(values, actions)}
            }>
              {formikProps => (
                <>
                  {this.input('Name', 'contc3', formikProps)}
                  {this.input('Title', 'cntds3', formikProps)}
                  {this.input('Phone', 'cell03', formikProps)}
                  {this.input('Email', 'email3', formikProps)}

                  <View style={{width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                    <Button
                      title='Save'
                      buttonStyle={styles.save}
                      onPress={formikProps.handleSubmit}/>
                    <Button
                      title='Cancel'
                      buttonStyle={styles.cancel}
                      onPress={( ) => this.props.toggle( )}/>
                  </View> 
                </>
              )}
            </Formik>
          ) : null}
        </View>
      </View>
    )
  }
}

AddContact.propTypes = {
  toggle: PropTypes.func,
  refresh: PropTypes.func
}

export default AddContact;
