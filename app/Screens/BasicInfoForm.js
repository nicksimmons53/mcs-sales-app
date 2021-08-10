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
import { FAB } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Input from '../Components/Input';
import Dropdown from '../Components/Dropdown';
import Clients from '../api/Clients';
import Header from '../Components/Header';
import Snack from '../Components/Snack';
import schema from '../form/yup/schema';
import { states } from '../form/dropdown/values';
import { styles, colors } from './Styles/ClientForm.style';
import FloatingButton from '../Components/FloatingButton';

// Class Component that will display client creation form
function ClientForm({ navigation }) {
  let userId = useSelector((state) => state.user.id);
  const [ visible, setVisible ] = React.useState(false);
  const [ snackMessage, setSnackMessage ] = React.useState(null);
  const [ disableSave, setDisableSave ] = React.useState(false);
  const [ error, setError ] = React.useState(false);
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema.address)
  });

  const onSubmit = async(data) => {
    setDisableSave(true);

    let status = await Clients.createNew(userId, data);
    if (status >= 200 && status <= 299) {
      setSnackMessage(`${data.clnnme} was created successfully`);
    } else {
      setError(true);
      setSnackMessage("There was an error creating your client. Please try again.");
      setDisableSave(false);
    }

    setVisible(true);
  }
  
  const onErrors = errors => {
    setDisableSave(true);

    setSnackMessage(Object.keys(errors).map((error) => `${errors[error].message}\n`));

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
        
        <Input label="Client Name" control={control} field="clnnme" defaultValue="" errors={errors}/>
      </View>

      <View style={{...styles.form, zIndex: 3}}>
        <Text style={styles.label}>Corporate Address</Text>

        <Divider/>

        <Input label="Address 1" control={control} field="addrs1" defaultValue="" errors={errors}/>
        <Input label="Address 2" control={control} field="addrs2" defaultValue="" errors={errors}/>
        <Input label="City" control={control} field="ctynme" defaultValue="" errors={errors}/>
        <View style={{ alignItems: 'center', flexDirection: 'row' }}>
          <Dropdown label="State" items={states} control={control} field="state_" errors={errors}/>
          <Input label="Zip" control={control} field="zipcde" defaultValue="" errors={errors}/>
        </View>
      </View>

      <View style={{...styles.form, zIndex: 2}}>
        <Text style={styles.label}>Billing Address</Text>

        <Divider/>
        
        <Input label="Address 1" control={control} field="bilad1" defaultValue="" errors={errors}/>
        <Input label="Address 2" control={control} field="bilad2" defaultValue="" errors={errors}/>
        <Input label="City" control={control} field="bilcty" defaultValue="" errors={errors}/>
        <View style={{ flexDirection: 'row' }}>
          <Dropdown label="State" items={states} control={control} field="bilste" errors={errors}/>
          <Input label="Zip" control={control} field="bilzip" defaultValue="" errors={errors}/>
        </View>
      </View>

      <View style={{...styles.form, zIndex: 1}}>
        <Text style={styles.label}>Shipping Address</Text>

        <Divider/>
        
        <Input label="Address 1" control={control} field="shpad1" defaultValue="" errors={errors}/>
        <Input label="Address 2" control={control} field="shpad2" defaultValue="" errors={errors}/>
        <Input label="City" control={control} field="shpcty" defaultValue="" errors={errors}/>
        <View style={{ flexDirection: 'row' }}>
          <Dropdown label="State" items={states} control={control} field="shpste" errors={errors}/>
          <Input label="Zip" control={control} field="shpzip" defaultValue="" errors={errors}/>
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
