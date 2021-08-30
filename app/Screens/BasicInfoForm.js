// Library Imports
import React from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  Text,
  View
} from 'react-native';
import PropTypes from 'prop-types';
import { Button } from 'react-native-elements';
import { Divider } from 'native-base';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { createClient } from '../features/clients/clientsSlice';
import Input from '../components/Input';
import Dropdown from '../components/Dropdown';
import Header from '../components/Header';
import Snack from '../components/Snack';
import schema from '../form/yup/schema';
import { states, territories } from '../form/dropdown/values';
import { styles } from './Styles/ClientForm.style';
import FloatingButton from '../components/FloatingButton';

let zIndex = 1000;

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
  
  const BasicInfo = ( ) => (
    <View style={styles.formRoot}>
      <View style={styles.form}>
        <Text style={styles.label}>Legal Name</Text>

        <Divider/>
        
        <Input label="Client Name" control={control} field="info.name" defaultValue="" errors={errors}/>
      </View>

      <View style={{...styles.form, zIndex: 4}}>
        <Text style={styles.label}>Territory</Text>

        <Divider/>
        
        <Dropdown label="Regional City" items={territories} control={control} field="info.territory" errors={errors} zIndex={zIndex-=1}/>
      </View>

      <View style={{...styles.form, zIndex: 3}}>
        <Text style={styles.label}>Corporate Address</Text>

        <Divider/>

        <Input label="Address 1" control={control} field="addresses.Corporate.address1" defaultValue="" errors={errors}/>
        <Input label="Address 2" control={control} field="addresses.Corporate.address2" defaultValue="" errors={errors}/>
        <View style={{ flexDirection: 'row'}}>
          <Input label="City" control={control} field="addresses.Corporate.city" defaultValue="" errors={errors}/>
          <View style={{ width: '15%'}}>
            <Dropdown label="State" items={states} control={control} field="addresses.Corporate.state" errors={errors} zIndex={zIndex-=1}/>
          </View>
          <Input label="Zip" control={control} field="addresses.Corporate.zip" defaultValue="" errors={errors}/>
        </View>
      </View>

      <View style={{...styles.form, zIndex: 2}}>
        <Text style={styles.label}>Billing Address</Text>

        <Divider/>
        
        <Input label="Address 1" control={control} field="addresses.Billing.address1" defaultValue="" errors={errors}/>
        <Input label="Address 2" control={control} field="addresses.Billing.address2" defaultValue="" errors={errors}/>
        <View style={{ flexDirection: 'row' }}>
          <Input label="City" control={control} field="addresses.Billing.city" defaultValue="" errors={errors}/>
          <View style={{ width: '15%'}}>
            <Dropdown label="State" items={states} control={control} field="addresses.Billing.state" errors={errors} zIndex={zIndex-=1}/>
          </View>
          <Input label="Zip" control={control} field="addresses.Billing.zip" defaultValue="" errors={errors}/>
        </View>
      </View>

      <View style={{...styles.form, zIndex: 1}}>
        <Text style={styles.label}>Shipping Address</Text>

        <Divider/>
        
        <Input label="Address 1" control={control} field="addresses.Shipping.address1" defaultValue="" errors={errors}/>
        <Input label="Address 2" control={control} field="addresses.Shipping.address2" defaultValue="" errors={errors}/>
        <View style={{ flexDirection: 'row' }}>
          <Input label="City" control={control} field="addresses.Shipping.city" defaultValue="" errors={errors}/>
          <View style={{ width: '15%'}}>
            <Dropdown label="State" items={states} control={control} field="addresses.Shipping.state" errors={errors} zIndex={zIndex-=1}/>
          </View>
          <Input label="Zip" control={control} field="addresses.Shipping.zip" defaultValue="" errors={errors}/>
        </View>
      </View>

      <View style={{...styles.buttonView, zIndex: 0}}>
        <Button
          title='SAVE'
          disabled={disableSave}
          buttonStyle={styles.save}
          containerStyle={styles.saveButtonContainer}
          onPress={handleSubmit(onSubmit, onErrors)}/>
      </View>
    </View>
  );

  return (
    <KeyboardAvoidingView behavior='padding' enabled style={styles.background}>
      <View style={styles.infoContainer}>
        <Header title="Create a New Client"/>
        
        <Divider />

        <ScrollView contentContainerStyle={styles.sv}>
          <BasicInfo/>
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
