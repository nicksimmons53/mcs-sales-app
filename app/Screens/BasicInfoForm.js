// Library Imports
import React from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  View
} from 'react-native';
import PropTypes from 'prop-types';
import { Divider } from 'native-base';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { createClient } from '../features/clients/clientsSlice';
import Header from '../components/Header';
import Snack from '../components/Snack';
import schema from '../form/yup/schema';
import { styles } from './Styles/ClientForm.style';
import { BasicInfo } from '../Modules/Forms';
import FloatingButton from '../components/FloatingButton';
import S3 from '../helpers/S3';

// Class Component that will display client creation form
function ClientForm({ navigation }) {
  const dispatch = useDispatch( );
  let user = useSelector((state) => state.user.info);

  const [ visible, setVisible ] = React.useState(false);
  const [ snackMessage, setSnackMessage ] = React.useState(null);
  const [ disableSave, setDisableSave ] = React.useState(false); 
  const [ error, setError ] = React.useState(false);
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema.basicInfo)
  });

  const onSubmit = async(data) => {
    setDisableSave(true);

    await S3.createEmptyObject(user.sageUserId + "-" + user.sageEmployeeNumber, data.info.name);
    
    data.info.employeeNumber = user.sageEmployeeNumber;
    data.info.userId = user.id;
    let response = await dispatch(createClient(data));

    if (response.payload >= 200 && response.payload <= 299) {
      setSnackMessage(`${data.info.name} was created successfully.`);
    } else {
      setError(true);
      setSnackMessage("There was an error creating your client. Please try again.");
      setDisableSave(false);
    }

    setVisible(true);
  }

  function findAllByKey(obj, keyToFind) {
    return Object.entries(obj)
      .reduce((acc, [key, value]) => (key === keyToFind)
        ? acc.concat(value)
        : (typeof value === 'object')
        ? acc.concat(findAllByKey(value, keyToFind))
        : acc
      , [])
  }
  
  const onErrors = errors => {
    let errorMessage = findAllByKey(errors, 'message').join('\n');

    setDisableSave(true);

    setSnackMessage(errorMessage);

    setError(true);

    setVisible(true);

    setDisableSave(false);
  }

  const snackbarDismiss = ( ) => {
    setVisible(false);

    if (error === false) {
      navigation.pop(1);
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
          <BasicInfo 
            control={control} 
            errors={errors} 
            handleSubmit={handleSubmit}
            disableSave={disableSave}
            onSubmit={onSubmit}
            onErrors={onErrors}/>
        </ScrollView>
      </View>

      <FloatingButton action={( ) => navigation.popToTop( )} icon="home"/>
      <Snack visible={visible} action={( ) => snackbarDismiss( )} message={snackMessage}/>
    </KeyboardAvoidingView>
  );
}

// Props Validation
ClientForm.propTypes = {
  navigation: PropTypes.object
}

export default ClientForm;
