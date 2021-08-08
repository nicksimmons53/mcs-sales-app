// Library Imports
import React from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  Text,
  View
} from 'react-native';
import PropTypes from 'prop-types';
import { Divider, Button } from 'react-native-elements';
import { Input } from 'native-base';
import { Formik } from 'formik';
import { useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';

import { NewClient } from '../Form/Values.form';
import Clients from '../api/Clients';
import BasicInfo from '../Modules/BasicInfo';
import Header from '../Components/Header';
import Snack from '../Components/Snack';
import { colors, styles } from './Styles/ClientForm.style';

// Class Component that will display client creation form
function ClientForm({ navigation }) {
  let userId = useSelector((state) => state.user.id);
  const [ visible, setVisible ] = React.useState(false);
  const [ snackMessage, setSnackMessage ] = React.useState(null);
  const [ disableSave, setDisableSave ] = React.useState(false);
  const [ error, setError ] = React.useState(false);
  const { control, handleSubmit, formState: { errors } } = useForm( );

  console.log(NewClient);

  const saveData = async(userId, values) => {
    setDisableSave(true);

    let status = await Clients.createNew(userId, values);
    if (status >= 200 && status <= 299) {
      setSnackMessage(`${values.clnnme} was created successfully`);
    } else {
      setError(true);
      setSnackMessage("There was an error creating your client. Please try again.");
      setDisableSave(false);
    }

    setVisible(true);
  }

  const snackbarDismiss = ( ) => {
    setVisible(false);
    if (error === false) {
      navigation.popToTop( );
    } else {
      setError(false);
    }
  }

  return (
    <KeyboardAvoidingView behavior='padding' enabled style={styles.background}>
      <View style={styles.infoContainer}>
        <Header title="Create a New Client"/>
        
        <Divider />

        <ScrollView contentContainerStyle={styles.sv}>
          <View style={{...styles.form, width: '100%'}}>
            <Input placeholder="Client Name" size="sm"/>
          </View>

          <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignContent: 'flex-start' ,justifyContent: 'flex-start' }}>
            <View style={styles.form}>
              <Input placeholder="Address 1" size="sm"/>
              <Input placeholder="Address 1" size="sm"/>
              <Input placeholder="City" size="sm"/>
              <Input placeholder="State" size="sm"/>
              <Input placeholder="Zip Code" size="sm"/>
            </View>
            <View style={styles.form}>
              <Input placeholder="Client Name" size="sm"/>
            </View>
            <View style={styles.form}>
              <Input placeholder="Client Name" size="sm"/>
            </View>
          </View>

          <View style={styles.buttonView}>
            <Button
              title='SAVE'
              disabled={disableSave}
              buttonStyle={styles.save}
              containerStyle={styles.saveButtonContainer}/>
          </View>
        </ScrollView>

        {/* <Formik
          initialValues={NewClient}
          onSubmit={(values) => saveData(userId, values) }>
          {formikProps => (
            <ScrollView style={styles.sv}>
              <BasicInfo formik={formikProps}/>

              <View style={styles.buttonView}>
                <Button
                  title='SAVE'
                  disabled={disableSave}
                  buttonStyle={styles.save}
                  containerStyle={styles.saveButtonContainer}
                  onPress={formikProps.handleSubmit} />
              </View>
            </ScrollView>
          )}
        </Formik> */}
      </View>

      <Snack visible={visible} action={( ) => snackbarDismiss( )} message={snackMessage}/>
    </KeyboardAvoidingView>
  );
}

// Props Validation
ClientForm.propTypes = {
  navigation: PropTypes.object
}

export default ClientForm;
