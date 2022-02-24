import React from 'react';
import { Modal } from 'native-base';
import Input from './Input';
import { useFieldArray, useForm } from 'react-hook-form';
import { Divider } from 'react-native-elements/dist/divider/Divider';
import { Button } from 'react-native-elements';
import LottieView from 'lottie-react-native';
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
import { show, setMessage } from '../redux/features/snackbar/snackbarSlice';

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

    let response = await dispatch(createClientContact(object));

    if (response.payload >= 200 && response.payload <= 299) {
      if (data.length > 1) {
        dispatch(setMessage("Client Contacts were Successfully Added."));
      } else {
        dispatch(setMessage("Client Contact was Successfully Added."));
      }
    } else {
      if (data.length > 1) {
        dispatch(setMessage("There was an issue adding the Client Contacts."));
      } else {
        dispatch(setMessage("There was an issue adding the Client Contact."));
      }
    }

    dispatch(show( ));
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

  const onSubmit = async (data) => {
    // Client info cleanup
    data.client.shortName = data.client.name;
    delete data.addresses.Corporate.address;
    delete data.addresses.Billing.address;
    delete data.addresses.Shipping.address;

    let responses = [];
    let issue = false;
    responses.push(await dispatch(updateClientAddresses(data.addresses.Corporate)));
    responses.push(await dispatch(updateClientAddresses(data.addresses.Billing)));
    responses.push(await dispatch(updateClientAddresses(data.addresses.Shipping)));
    responses.push(await dispatch(updateClient(data.client)));

    responses = responses.filter(response => response.payload < 200 && response.payload > 299);

    if (responses.length === 0) {
      dispatch(setMessage("Client Information was Successfully Saved."));
    } else {
      dispatch(setMessage("There was an issue saving the Client Information."));
    }

    dispatch(show( ));
    await dispatch(setUpdated(data.client));
    await dispatch(getClientAddresses(data.client.id));
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

const PushClient = ( ) => {
  const [ button1Loading, setButton1Loading ] = React.useState(false);
  const [ button2Loading, setButton2Loading ] = React.useState(false);
  const [ button3Loading, setButton3Loading ] = React.useState(false);
  const [ button4Loading, setButton4Loading ] = React.useState(false);

  return (
    <Modal.Body>
      <Modal.Header>
        <MediumText>Pushing Client to Sage 100 Contractor</MediumText>
      </Modal.Header>

      <Divider style={{ margin: 10 }}/>

      <View style={{ alignItems: 'center', borderColor: colors.grey, borderRadius: 5, borderWidth: 1, flexDirection: 'row', justifyContent: 'space-between', marginVertical: 15, paddingLeft: 15 }}>
        <SmallText>Basic Information</SmallText>
        <LottieView
          source={require("../../assets/Lottie/ProcessLoading.json")}
          visible={true}
          autoPlay
          loop
          style={{ height: 150, marginVertical: '-4%', marginRight: -20, marginTop: '-2%', width: 150 }}
        />
      </View>

      <View  style={{ alignItems: 'center', borderColor: colors.grey, borderRadius: 5, borderWidth: 1, flexDirection: 'row', justifyContent: 'space-between', marginVertical: 15, paddingLeft: 15 }}>
        <SmallText>Files</SmallText>
        <LottieView
          source={require("../../assets/Lottie/ProcessLoading.json")}
          visible={true}
          autoPlay
          loop
          style={{ height: 150, marginVertical: '-4%', marginRight: -20, marginTop: '-2%', width: 150 }}
        />
      </View>

      <View  style={{ alignItems: 'center', borderColor: colors.grey, borderRadius: 5, borderWidth: 1, flexDirection: 'row', justifyContent: 'space-between', marginVertical: 15, paddingLeft: 15 }}>
        <SmallText>Billing Part Classes</SmallText>
        <LottieView
          source={require("../../assets/Lottie/ProcessLoading.json")}
          visible={true}
          autoPlay
          loop
          style={{ height: 150, marginVertical: '-4%', marginRight: -20, marginTop: '-2%', width: 150 }}
        />
      </View>

      <View  style={{ alignItems: 'center', borderColor: colors.grey, borderRadius: 5, borderWidth: 1, flexDirection: 'row', justifyContent: 'space-between', marginVertical: 15, paddingLeft: 15 }}>
        <SmallText>Billing Parts</SmallText>
        <LottieView
          source={require("../../assets/Lottie/ProcessLoading.json")}
          visible={true}
          autoPlay
          loop
          style={{ height: 150, marginVertical: '-4%', marginRight: -20, marginTop: '-2%', width: 150 }}
        />
      </View>
    </Modal.Body>
  );
}

const ActionModal = (props) => {
  return (
    <Modal
      isOpen={props.visible}
      onClose={( ) => props.setVisible(!props.visible)}
      backdropVisible
      overlayVisible
      closeOnOverlayClick={false}
      size={props.size || "lg"}>
        <Modal.Content>
          <Modal.CloseButton/>

          <ScrollView>
            { props.form === "Edit Client" && <EditClient/> }
            { props.form === "Add Contacts" && <AddContacts/> }
            { props.form === "Push Client" && <PushClient/>}
          </ScrollView>
        </Modal.Content>
    </Modal>
  )
}

export default ActionModal;