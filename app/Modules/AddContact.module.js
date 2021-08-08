// Library Imports
import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import { Button, Input, Divider, Icon } from 'react-native-elements';
import { Contact } from '../Form/Values.form';
import { styles, colors } from './Styles/AddContact.style';

function AddContact(props) {
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
            onPress={props.toggle}/>
        </View>

        <Divider/>

        <Formik
          initialValues={Contact}
          onSubmit={(values, actions) => {props.save(values)}}>
          {formikProps => (
            <>
              {input('Name', 'name', formikProps)}
              {input('Title', 'title', formikProps)}
              {input('Phone', 'phone', formikProps)}
              {input('Email', 'email', formikProps)}

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

AddContact.propTypes = {
  toggle: PropTypes.func,
  refresh: PropTypes.func
}

export default AddContact;
