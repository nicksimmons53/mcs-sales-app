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
import { createClientContact, updateClient, updateClientAddresses } from '../features/clients/clientsSlice';

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

  const onSubmit = (data) => {
    data = data.contacts.map(contact => Object.values(contact));
    let object = { id: client.id, values: data };

    dispatch(createClientContact(object));
  }

  const Row = (props) => (
    <View style={{ alignContent: "center", flexDirection: "row", justifyContent: "center"}}>
      <Input
        label="Name"
        control={control}
        errors={errors}
        field={`contacts.${props.index}.name`}
        defaultValue=""
        options={{ autoCapitalize: 'words' }}/>
      <Input
        label="Title"
        control={control}
        errors={errors}
        field={`contacts.${props.index}.title`}
        defaultValue=""
        options={{ autoCapitalize: 'words' }}/>
      <Input
        label="Phone"
        control={control}
        errors={errors}
        field={`contacts.${props.index}.phone`}
        defaultValue=""
        options={{ keyboardType: 'phone-pad' }}/>
      <Input
        label="Email"
        control={control}
        errors={errors}
        field={`contacts.${props.index}.email`}
        defaultValue=""
        options={{ autoCapitalize: 'none', keyboardType: 'email-address' }}/>
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
  let addresses = useSelector((state) => state.clients.addresses);
  
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

    setValue("address.Corporate", corporate);
    setValue("address.Billing", typeof billing === "undefined" ? {
      address1: "",
      address2: "",
      city: "",
      clientId: client.id,
      state: "",
      type: "Billing",
      zip: ""
    } : billing);
    setValue("address.Shipping", typeof shipping === "undefined" ? {
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
    
    // Client Address Cleanup
    Object.keys(data.address).map(key => {
      if (typeof data.address[key] === "undefined") {
        delete data.address[key];
        return;
      };

      if (data.address[key].address1 === "") {
        delete data.address[key];
        return;
      }

      delete data.address[key].address;
      dispatch(updateClientAddresses(data.address[key]));
    });

    dispatch(updateClient(data.client));
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
        <Input
          label="Address 1"
          control={control}
          errors={errors}
          field="address.Corporate.address1"
          defaultValue=""/>
        <Input
          label="Address 2"
          control={control}
          errors={errors}
          field="address.Corporate.address2"
          defaultValue=""/>
        <Input
          label="City"
          control={control}
          errors={errors}
          field="address.Corporate.city"
          defaultValue=""/>
        <View style={{ width: '15%' }}>
          <Dropdown
            label="State"
            control={control}
            items={states}
            defaultValue=""
            errors={errors}
            field="address.Corporate.state"
            zIndex={99}/>
        </View>
        <Input
          label="Zip"
          control={control}
          errors={errors}
          field="address.Corporate.zip"
          defaultValue=""/>
      </View>
        
      <Divider style={{ margin: 10 }}/>

      <SmallText>Billing Address</SmallText>
      <View style={{ flexDirection: 'row', zIndex: 98 }}>
        <Input
          label="Address 1"
          control={control}
          errors={errors}
          field="address.Billing.address1"
          defaultValue=""/>
        <Input
          label="Address 2"
          control={control}
          errors={errors}
          field="address.Billing.address2"
          defaultValue=""/>
        <Input
          label="City"
          control={control}
          errors={errors}
          field="address.Billing.city"
          defaultValue=""/>
        <View style={{ width: '15%' }}>
          <Dropdown
            label="State"
            control={control}
            items={states}
            field="address.Billing.state"
            errors={errors}
            defaultValue=""
            zIndex={99}/>
        </View>
        <Input
          label="Zip"
          control={control}
          errors={errors}
          defaultValue=""
          field="address.Billing.zip"/>
      </View>

      <Divider style={{ margin: 10 }}/>

      <SmallText>Shipping Address</SmallText>
      <View style={{ flexDirection: 'row', zIndex: 97 }}>
        <Input
          label="Address 1"
          control={control}
          errors={errors}
          field="address.Shipping.address1"
          defaultValue=""/>
        <Input
          label="Address 2"
          control={control}
          errors={errors}
          field="address.Shipping.address2"
          defaultValue=""/>
        <Input
          label="City"
          control={control}
          errors={errors}
          field="address.Shipping.city"
          defaultValue=""/>
        <View style={{ width: '15%' }}>
          <Dropdown
            label="State"
            control={control}
            items={states}
            defaultValue=""
            errors={errors}
            field="address.Shipping.state"
            zIndex={99}/>
        </View>
        <Input
          label="Zip"
          control={control}
          errors={errors}
          field="address.Shipping.zip"
          defaultValue=""/>
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