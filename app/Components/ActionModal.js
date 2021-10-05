import React from 'react';
import { Modal } from 'native-base';
import Input from './Input';
import { useFieldArray, useForm } from 'react-hook-form';
import { Divider } from 'react-native-elements/dist/divider/Divider';
import { ScrollView, View } from 'react-native';
import { SuccessButtonLarge } from './Button';
import Dropdown from './Dropdown';
import { states, territories } from '../form/dropdown/values';
import { MediumText, SmallText } from './Text';
import { IconButton } from 'react-native-paper';
import colors from '../Library/Colors';
import { useDispatch, useSelector } from 'react-redux';
import { createClientContact, getClientContacts } from '../redux/features/contacts/contactsThunk';
import { updateClient } from '../redux/features/clients/clientsThunk';
import { getClientAddresses, updateClientAddresses } from '../redux/features/addresses/addressThunk';
import { setUpdated } from '../redux/features/clients/clientsSlice';
import { unwrapResult } from '@reduxjs/toolkit';

const AddContacts = ( ) => {
  const { control, handleSubmit, formState: { errors } } = useForm( );
  const { fields, append, remove } = useFieldArray({
    control,
    name: "contacts"
  });
  const dispatch = useDispatch( );
  let client = useSelector((state) => state.clients.selected);
  let newContact = {
    clientId: client.id,
    name: "", 
    title: "" , 
    phone: "", 
    email: "" 
  }

  React.useEffect(( ) => {
    if (fields.length === 0) {
      append(newContact);
    }
  }, [ ]);

  const onSubmit = async (data) => {
    data = data.contacts.map(contact => Object.values(contact));
    let object = { id: client.id, values: data };
    
    dispatch(createClientContact(object));
    await dispatch(getClientContacts(client.id));
  }

  const Row = (props) => (
    <View style={{ alignContent: "center", flexDirection: "row", justifyContent: "center"}}>
      <View style={{ flex: 1 }}>
        <Input
          label="Name"
          control={control}
          errors={errors}
          field={`contacts.${props.index}.name`}
          defaultValue=""
          options={{ autoCapitalize: 'words' }}/>
      </View>
      <View style={{ flex: 1 }}>
        <Input
          label="Title"
          control={control}
          errors={errors}
          field={`contacts.${props.index}.title`}
          defaultValue=""
          options={{ autoCapitalize: 'words' }}/>
      </View>
      <View style={{ flex: 1 }}>
        <Input
          label="Phone"
          control={control}
          errors={errors}
          field={`contacts.${props.index}.phone`}
          defaultValue=""
          options={{ keyboardType: 'phone-pad' }}/>
      </View>
      <View style={{ flex: 1 }}>
        <Input
          label="Email"
          control={control}
          errors={errors}
          field={`contacts.${props.index}.email`}
          defaultValue=""
          options={{ autoCapitalize: 'none', keyboardType: 'email-address' }}/>
      </View>
      <IconButton 
        color={colors.red} 
        icon="minus-box" 
        onPress={( ) => remove(props.index)}
        size={40} 
        style={{ margin: 0, padding: 0 }}/>
    </View>  
  )

  return (
    <Modal.Body>
      <Modal.Header>
        <MediumText>Add Client Contacts</MediumText>
      </Modal.Header>

      <Divider/>

      { fields.map((field, index) => (
        <Row key={index} index={index}/>
      ))}

      <Divider/>

      <View style={{ alignItems: 'center', flexDirection: 'row' }}>
        <IconButton 
          color={colors.green} 
          icon="plus-box" 
          onPress={( ) => append(newContact)}
          size={40} 
          style={{margin: 0, padding: 0 }}/>
        <SmallText>Add a Row</SmallText>
      </View>

      <Divider/>

      <Modal.Footer alignItems="center" justifyContent="center" flexDirection="row">
        <SuccessButtonLarge title="Save" action={handleSubmit(onSubmit)}/>
      </Modal.Footer>
    </Modal.Body>
  );
}

const EditClient = ( ) => {
  const { control, handleSubmit, setValue, formState: { errors } } = useForm( );
  const dispatch = useDispatch( );
  let client = useSelector((state) => state.clients.selected);
  let addresses = useSelector((state) => state.addresses.entities);
  
  React.useEffect(( ) => {
    let corporate = addresses.find(address => address.type === "Corporate");
    let billing = addresses.find(address => address.type === "Billing");
    let shipping = addresses.find(address => address.type === "Shipping");
    
    setValue("client", {
      id: client.id,
      name: client.name,
      shortName: client.shortName,
      territory: client.territory,
      updatedAt: client.updatedAt
    });

    setValue("addresses.Corporate", corporate);
    setValue("addresses.Billing", typeof billing === "undefined" ? {
      address1: "",
      address2: "",
      city: "",
      clientId: client.id,
      state: "",
      type: "Billing",
      zip: ""
    } : billing);
    setValue("addresses.Shipping", typeof shipping === "undefined" ? {
      address1: "",
      address2: "",
      city: "",
      clientId: client.id,
      state: "",
      type: "Shipping",
      zip: ""
    } : shipping);
  }, [ ]);

  const onSubmit = (data) => {
    // Client info cleanup
    data.client.shortName = data.client.name;
    delete data.addresses.Corporate.address;
    delete data.addresses.Billing.address;
    delete data.addresses.Shipping.address;

    dispatch(updateClientAddresses(data.addresses.Corporate));
    dispatch(updateClientAddresses(data.addresses.Billing));
    dispatch(updateClientAddresses(data.addresses.Shipping));
    dispatch(updateClient(data.client));

    dispatch(setUpdated(data.client));
    dispatch(getClientAddresses(data.client.id));
  }

  return (
    <Modal.Body>
      <MediumText>Edit Client Information</MediumText>

      <Divider style={{ margin: 10 }}/>

      <View style={{ flexDirection: 'row', zIndex: 100 }}>
        <View style={{ flex: 1 }}>
          <SmallText>Legal Name</SmallText>
          <Input
            label="Client Name"
            control={control}
            errors={errors}
            field="client.name"
            defaultValue=""/>
        </View>

        <Divider orientation="vertical" style={{ marginHorizontal: 10 }}/>

        <View style={{ flex: 1 }}>
          <SmallText>Region</SmallText>
          <Dropdown
            label="Territory"
            control={control}
            items={territories}
            defaultValue=""
            errors={errors}
            field="client.territory"
            zIndex={100}/>
        </View>
      </View>
        
      <Divider style={{ margin: 10 }}/>

      <SmallText>Corporate Address</SmallText>
      <View style={{ flexDirection: 'row', zIndex: 99 }}>
        <View style={{ flex: 1 }}>
          <Input
            label="Address 1"
            control={control}
            errors={errors}
            field="addresses.Corporate.address1"
            defaultValue=""/>
        </View>
        <View style={{ flex: 1 }}>
          <Input
            label="Address 2"
            control={control}
            errors={errors}
            field="addresses.Corporate.address2"
            defaultValue=""/>
        </View>
        <View style={{ flex: 1 }}>
          <Input
            label="City"
            control={control}
            errors={errors}
            field="addresses.Corporate.city"
            defaultValue=""/>
        </View>
        <View style={{ flex: 1 }}>
          <Dropdown
            label="State"
            control={control}
            items={states}
            defaultValue=""
            errors={errors}
            field="addresses.Corporate.state"
            zIndex={99}/>
        </View>
        <View style={{ flex: 1 }}>
          <Input
            label="Zip"
            control={control}
            errors={errors}
            field="addresses.Corporate.zip"
            defaultValue=""/>
        </View>
      </View>
        
      <Divider style={{ margin: 10 }}/>

      <SmallText>Billing Address</SmallText>
      <View style={{ flexDirection: 'row', zIndex: 99 }}>
        <View style={{ flex: 1 }}>
          <Input
            label="Address 1"
            control={control}
            errors={errors}
            field="addresses.Billing.address1"
            defaultValue=""/>
        </View>
        <View style={{ flex: 1 }}>
          <Input
            label="Address 2"
            control={control}
            errors={errors}
            field="addresses.Billing.address2"
            defaultValue=""/>
        </View>
        <View style={{ flex: 1 }}>
          <Input
            label="City"
            control={control}
            errors={errors}
            field="addresses.Billing.city"
            defaultValue=""/>
        </View>
        <View style={{ flex: 1 }}>
          <Dropdown
            label="State"
            control={control}
            items={states}
            defaultValue=""
            errors={errors}
            field="addresses.Billing.state"
            zIndex={99}/>
        </View>
        <View style={{ flex: 1 }}>
          <Input
            label="Zip"
            control={control}
            errors={errors}
            field="addresses.Billing.zip"
            defaultValue=""/>
        </View>
      </View>

      <Divider style={{ margin: 10 }}/>

      <SmallText>Shipping Address</SmallText>
      <View style={{ flexDirection: 'row', zIndex: 99 }}>
        <View style={{ flex: 1 }}>
          <Input
            label="Address 1"
            control={control}
            errors={errors}
            field="addresses.Shipping.address1"
            defaultValue=""/>
        </View>
        <View style={{ flex: 1 }}>
          <Input
            label="Address 2"
            control={control}
            errors={errors}
            field="addresses.Shipping.address2"
            defaultValue=""/>
        </View>
        <View style={{ flex: 1 }}>
          <Input
            label="City"
            control={control}
            errors={errors}
            field="addresses.Shipping.city"
            defaultValue=""/>
        </View>
        <View style={{ flex: 1 }}>
          <Dropdown
            label="State"
            control={control}
            items={states}
            defaultValue=""
            errors={errors}
            field="addresses.Shipping.state"
            zIndex={99}/>
        </View>
        <View style={{ flex: 1 }}>
          <Input
            label="Zip"
            control={control}
            errors={errors}
            field="address.Shipping.zip"
            defaultValue=""/>
        </View>
      </View>

      <Divider style={{ margin: 10 }}/>

      <Modal.Footer alignItems="center" justifyContent="center">
        <SuccessButtonLarge title="Save" action={handleSubmit(onSubmit)}/>
      </Modal.Footer>
    </Modal.Body>
  )
}

const ActionModal = (props) => {
  return (
    <Modal 
      isOpen={props.visible} 
      onClose={( ) => props.setVisible(!props.visible)}
      backdropVisible
      overlayVisible>
        <Modal.Content>
          <Modal.CloseButton/>

          <ScrollView>
            { props.form === "Edit Client" && <EditClient/> }
            { props.form === "Add Contacts" && <AddContacts/> }
          </ScrollView>
        </Modal.Content>
    </Modal>
  )
}

export default ActionModal;