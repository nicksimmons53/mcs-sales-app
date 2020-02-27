// Library Imports
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import { Button, Input, Divider } from 'react-native-elements';
import * as Contact from '../Functions/Contact';
import { ContactValues } from '../Form/Values.form';
import { styles, colors } from './Styles/AddContact.style';

class AddContact extends Component {
  timeout = null;

  componentWillUnmount( ) {
    clearTimeout(this.timeout);
  }

  // Handle Submit
  _saveContactInfo = async(values, actions) => {
    let contact = values;
    this.timeout = setTimeout(( ) => { actions.setSubmitting(false); }, 1000);
    
    Contact.saveInfo(contact, this.props.client);
    this.props.toggle( ); 
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

          <Formik
            initialValues={ContactValues}
            onSubmit={(values, actions) => {this._saveContactInfo(values, actions)}
          }>
            {formikProps => (
              <>
              {this.input('Name', 'name', formikProps)}
              {this.input('Title', 'title', formikProps)}
              {this.input('Phone', 'phone', formikProps)}
              {this.input('Email', 'email', formikProps)}

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
        </View>
      </View>
    )
  }
}

AddContact.propTypes = {
  toggle: PropTypes.func
}

export default AddContact;
