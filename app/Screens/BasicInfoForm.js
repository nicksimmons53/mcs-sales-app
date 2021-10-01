// Library Imports
import React from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  StatusBar,
  View
} from 'react-native';
import PropTypes from 'prop-types';
import { Divider } from 'native-base';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { createClient } from '../redux/features/clients/clientsThunk';
import { createClientAddresses } from '../redux/features/addresses/addressThunk';
import Header from '../components/Header';
import schema from '../form/yup/schema';
import styles from '../styles/Screen';
import { BasicInfo } from '../Modules/InfoForms';
import FloatingButton from '../components/FloatingButton';
import S3 from '../helpers/S3';
import { show, setMessage } from '../redux/features/snackbar/snackbarSlice';

// Class Component that will display client creation form
function ClientForm({ navigation }) {
  const dispatch = useDispatch( );
  let user = useSelector((state) => state.user.info);

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
    data.info.shortName = data.info.name;

    // Address Data Cleanup
    data.addresses.Corporate.type = "Corporate";
    data.addresses.Billing.type = "Billing";
    data.addresses.Shipping.type = "Shipping";
    
    let response = await dispatch(createClient(data.info));
    
    data.addresses.Corporate.clientId = response.payload.data.insertId;
    data.addresses.Billing.clientId = response.payload.data.insertId;
    data.addresses.Shipping.clientId = response.payload.data.insertId;
    if (response.payload.data.status < 200 && response.payload.data.status > 299) {
      setError(true);
      dispatch(setMessage("There was an error creating your client. Please try again."));
      setDisableSave(false);
    } else {
      let addresses = [
        Object.values(data.addresses.Corporate), 
        Object.values(data.addresses.Billing),
        Object.values(data.addresses.Shipping)
      ];

      response = await dispatch(createClientAddresses(addresses));
    }

    if (response.payload >= 200 && response.payload <= 299) {
      dispatch(setMessage(`${data.info.name} was created successfully.`));
    } else {
      setError(true);
      dispatch(setMessage("There was an error creating your client. Please try again."));
      setDisableSave(false);
    }

    dispatch(show( ));

    navigation.popToTop();
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
    dispatch(setMessage(errorMessage));
    setError(true);
    dispatch(show( ));
    setDisableSave(false);
  }

  return (
    <KeyboardAvoidingView behavior='padding' style={styles.background}>
      <StatusBar barStyle="dark-content"/>
      
      <View style={styles.grid}>
        <Header title="Create a New Client"/>
        
        <Divider />

        <ScrollView>
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
    </KeyboardAvoidingView>
  );
}

// Props Validation
ClientForm.propTypes = {
  navigation: PropTypes.object
}

export default ClientForm;
