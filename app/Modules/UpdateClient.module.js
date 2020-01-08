// Library Imports
import React, { Component } from 'react';
import { View, Text, Switch } from 'react-native';
import { Icon, Divider, Input, Button } from 'react-native-elements';
import { Formik } from 'formik';
import { UpdateClientValues } from '../Form/Values.form';
import Toast from 'react-native-easy-toast';
import Firebase from '../../config/Firebase';
import styles from './Styles/Form.style';

// Class Component to show Update Client Form
class UpdateClient extends Component {
  client = this.props.client;

  _saveClientInfo = async(values) => {
    console.log(this.client.corpAddr);
    const clientRef = Firebase.firestore( )
      .collection('clients')
      .doc(Firebase.auth( ).currentUser.uid)
      .collection('clients')
      .doc(this.client.uid);

    await clientRef.set(values, { merge: true });
  }

  render( ) {
    return (
      <View style={styles.background}>
        <Formik
          initialValues={UpdateClientValues}
          onSubmit={(values, actions) => {
            console.log('Updated Client Info');
            setTimeout(( ) => {
              actions.setSubmitting(false);
            }, 1000);

            this._saveClientInfo(values);
            this.props.cancel( );
          }}>
        {formikProps => (
        <View style={styles.form}>
          <View style={styles.header}>
            <Text style={styles.label}>Update Client Information</Text>
            <Icon
              name='download'
              type='font-awesome'
              size={30}
              onPress={formikProps.handleSubmit} />
          </View>

          <Divider />

          <View style={styles.textRow}>
            <Text style={styles.label}>Contact Name</Text>
            <Input
              onChangeText={formikProps.handleChange('contactName')}
              onBlur={formikProps.handleBlur('contactName')}
              value={formikProps.values.contactName}
              autoCapitalize='words'
              textContentType='name'
              blurOnSubmit={false}
              containerStyle={styles.mediumInput}
              inputContainerStyle={styles.inputContainer} />
          </View>

          <View style={styles.textRow}>
            <Text style={styles.label}>Title</Text>
            <Input
              onChangeText={formikProps.handleChange('contactTitle')}
              onBlur={formikProps.handleBlur('contactTitle')}
              value={formikProps.values.contactTitle}
              autoCapitalize='words'
              textContentType='jobTitle'
              blurOnSubmit={false}
              containerStyle={styles.smallInput}
              inputContainerStyle={styles.inputContainer} />
          </View>

          <View style={styles.textRow}>
            <Text style={styles.label}>Phone</Text>
            <Input
              onChangeText={formikProps.handleChange('contactPhone')}
              onBlur={formikProps.handleBlur('contactPhone')}
              value={formikProps.values.contactPhone}
              keyboardType='phone-pad'
              textContentType='telephoneNumber'
              blurOnSubmit={false}
              containerStyle={styles.smallInput}
              inputContainerStyle={styles.inputContainer} />
          </View>

          <View style={styles.textRow}>
            <Text style={styles.label}>Email</Text>
            <Input
              onChangeText={formikProps.handleChange('contactEmail')}
              onBlur={formikProps.handleBlur('contactEmail')}
              value={formikProps.values.contactEmail}
              keyboardType='email-address'
              textContentType='emailAddress'
              blurOnSubmit={false}
              containerStyle={styles.mediumInput}
              inputContainerStyle={styles.inputContainer} />
          </View>

          <View style={styles.textRow}>
            <Text style={styles.label}>Street Address</Text>
            <Input
              onChangeText={formikProps.handleChange('corpAddr')}
              onBlur={formikProps.handleBlur('corpAddr')}
              value={formikProps.values.corpAddr}
              autoCapitalize='words'
              textContentType='streetAddressLine1'
              blurOnSubmit={false}
              containerStyle={styles.mediumInput}
              inputContainerStyle={styles.inputContainer} />
          </View>

          <View style={styles.textRow}>
            <Text style={styles.label}>City</Text>
            <Input
              onChangeText={formikProps.handleChange('corpCity')}
              onBlur={formikProps.handleBlur('corpCity')}
              value={formikProps.values.corpCity}
              autoCapitalize='words'
              textContentType='addressCity'
              blurOnSubmit={false}
              containerStyle={styles.mediumInput}
              inputContainerStyle={styles.inputContainer} />
          </View>
          <View style={styles.textRow}>
            <Text style={styles.label}>State</Text>
            <Input
              onChangeText={formikProps.handleChange('corpState')}
              onBlur={formikProps.handleBlur('corpState')}
              value={formikProps.values.corpState}
              autoCapitalize='characters'
              textContentType='addressState'
              blurOnSubmit={false}
              containerStyle={styles.xSmallInput}
              inputContainerStyle={styles.inputContainer} />
          </View>
          <View style={styles.textRow}>
            <Text style={styles.label}>Zip</Text>
            <Input
              onChangeText={formikProps.handleChange('corpZip')}
              onBlur={formikProps.handleBlur('corpZip')}
              value={formikProps.values.corpZip}
              keyboardType='number-pad'
              textContentType='postalCode'
              blurOnSubmit={false}
              containerStyle={styles.smallInput}
              inputContainerStyle={styles.inputContainer} />
          </View>

          <View style={styles.billingAddr}>
          <Divider />
          <View style={styles.textRow}>
            <Text style={styles.label}>Add Billing Address</Text>
            <Switch
              onChange={( ) => formikProps.setFieldValue('billingAddrToggle', !formikProps.values.billingAddrToggle)}
              value={formikProps.values.billingAddrToggle} />
          </View>
          </View>

          {formikProps.values.billingAddrToggle ?
            <View>
              <View style={styles.textRow}>
                <Text style={styles.label}>Street Address</Text>
                <Input
                  onChangeText={formikProps.handleChange('billingAddr')}
                  onBlur={formikProps.handleBlur('billingAddr')}
                  value={formikProps.values.billingAddr}
                  autoCapitalize='words'
                  textContentType='streetAddressLine1'
                  blurOnSubmit={false}
                  containerStyle={styles.mediumInput}
                  inputContainerStyle={styles.inputContainer} />
              </View>
              <View style={styles.textRow}>
                <Text style={styles.label}>City</Text>
                <Input
                  onChangeText={formikProps.handleChange('billingCity')}
                  onBlur={formikProps.handleBlur('billingCity')}
                  value={formikProps.values.billingCity}
                  autoCapitalize='words'
                  textContentType='addressCity'
                  blurOnSubmit={false}
                  containerStyle={styles.mediumInput}
                  inputContainerStyle={styles.inputContainer} />
              </View>
              <View style={styles.textRow}>
                <Text style={styles.label}>State</Text>
                <Input
                  onChangeText={formikProps.handleChange('billingState')}
                  onBlur={formikProps.handleBlur('billingState')}
                  value={formikProps.values.billingState}
                  autoCapitalize='characters'
                  textContentType='addressState'
                  blurOnSubmit={false}
                  containerStyle={styles.xSmallInput}
                  inputContainerStyle={styles.inputContainer} />
              </View>
              <View style={styles.textRow}>
                <Text style={styles.label}>Zip</Text>
                <Input
                  onChangeText={formikProps.handleChange('billingZip')}
                  onBlur={formikProps.handleBlur('billingZip')}
                  value={formikProps.values.billingZip}
                  keyboardType='number-pad'
                  textContentType='postalCode'
                  blurOnSubmit={false}
                  containerStyle={styles.smallInput}
                  inputContainerStyle={styles.inputContainer} />
              </View>
            </View>
          : null }

          <View style={styles.shippingAddr}>
          <Divider />
          <View style={styles.textRow}>
            <Text style={styles.label}>Add Shipping Address</Text>
            <Switch
              onChange={( ) => formikProps.setFieldValue('shippingAddrToggle', !formikProps.values.shippingAddrToggle)}
              value={formikProps.values.shippingAddrToggle} />
          </View>
          </View>

          {formikProps.values.shippingAddrToggle ?
            <View>
              <View style={styles.textRow}>
                <Text style={styles.label}>Street Address</Text>
                <Input
                  onChangeText={formikProps.handleChange('shippingAddr')}
                  onBlur={formikProps.handleBlur('shippingAddr')}
                  value={formikProps.values.shippingAddr}
                  autoCapitalize='words'
                  textContentType='streetAddressLine1'
                  blurOnSubmit={false}
                  containerStyle={styles.mediumInput}
                  inputContainerStyle={styles.inputContainer} />
              </View>
              <View style={styles.textRow}>
                <Text style={styles.label}>City</Text>
                <Input
                  onChangeText={formikProps.handleChange('shippingCity')}
                  onBlur={formikProps.handleBlur('shippingCity')}
                  value={formikProps.values.shippingCity}
                  autoCapitalize='words'
                  textContentType='addressCity'
                  blurOnSubmit={false}
                  containerStyle={styles.mediumInput}
                  inputContainerStyle={styles.inputContainer} />
              </View>
              <View style={styles.textRow}>
                <Text style={styles.label}>State</Text>
                <Input
                  onChangeText={formikProps.handleChange('shippingState')}
                  onBlur={formikProps.handleBlur('shippingState')}
                  value={formikProps.values.shippingState}
                  autoCapitalize='characters'
                  textContentType='addressState'
                  blurOnSubmit={false}
                  containerStyle={styles.xSmallInput}
                  inputContainerStyle={styles.inputContainer} />
              </View>
              <View style={styles.textRow}>
                <Text style={styles.label}>Zip</Text>
                <Input
                  onChangeText={formikProps.handleChange('shippingZip')}
                  onBlur={formikProps.handleBlur('shippingZip')}
                  value={formikProps.values.shippingZip}
                  keyboardType='number-pad'
                  textContentType='postalCode'
                  blurOnSubmit={false}
                  containerStyle={styles.smallInput}
                  inputContainerStyle={styles.inputContainer} />
              </View>
            </View>
          : null}

          <Button
            title='Cancel'
            buttonStyle={styles.cancel}
            onPress={this.props.cancel} />
      </View>
      )}
      </Formik>

      <Toast ref='toast' position='center' style={styles.toast} />
    </View>
    );
  }
};

export default UpdateClient;
