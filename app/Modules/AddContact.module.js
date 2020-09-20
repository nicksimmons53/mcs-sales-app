// Library Imports
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { API_URL } from 'react-native-dotenv';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import { Button, Input, Divider, Icon } from 'react-native-elements';
import { Contact } from '../Form/Values.form';
import axios from 'axios';
import { styles, colors } from './Styles/AddContact.style';

class AddContact extends Component {

  // Handle Submit
  _saveContactInfo = (values, actions) => {
    let user = this.props.user;
    let client = this.props.client;

    values.clientId = client.id;

    axios.post(`${API_URL}/employee/${user.recnum}/clients/${client.id}/contacts`, values)
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
        autoCapitalize='none'
        blurOnSubmit={false}
        containerStyle={styles.mediumInput}
        inputContainerStyle={styles.inputContainer}/>
    </View>
  )

  render( ) {
    return (
        <View style={styles.background}>
            <View style={styles.form}>
                <View style={styles.header}>
                    <Text style={styles.label}>Add Client Contact</Text>
                    <Icon
                        name="times"
                        type="font-awesome"
                        size={36}
                        color={colors.red}
                        iconStyle={styles.icon}
                        onPress={this.props.toggle}/>
                </View>

                <Divider/>

                <Formik
                    initialValues={Contact}
                    onSubmit={(values, actions) => {this._saveContactInfo(values, actions)}}>
                    {formikProps => (
                        <>
                            {this.input('Name', 'name', formikProps)}
                            {this.input('Title', 'title', formikProps)}
                            {this.input('Phone', 'phone', formikProps)}
                            {this.input('Email', 'email', formikProps)}

                            <Divider/>

                            <Button
                                title='Save'
                                buttonStyle={styles.save}
                                onPress={formikProps.handleSubmit}/>
                        </>
                    )}
                </Formik>
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
