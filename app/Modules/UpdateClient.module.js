// Library Imports
import React, { Component } from 'react';
import { View, Text, Switch } from 'react-native';
import PropTypes from 'prop-types';
import { Icon, Divider, Input, Button } from 'react-native-elements';
import { Formik } from 'formik';
import { UpdateClientValues } from '../Form/Values.form';
import * as Client from '../Functions/Client';
import Toast from 'react-native-easy-toast';
import { styles, colors } from './Styles/Form.style';

// Class Component to show Update Client Form
class UpdateClient extends Component {
  state = {
    client: this.props.client
  }

  _updateClient = (values, actions) => {
    setTimeout(( ) => { actions.setSubmitting(false); }, 1000);

    Client.updateInfo(values, 'clients', this.state.client);
    this.props.cancel( );
  }

  render( ) {
    return (
      <View style={styles.background}>
        <Formik
          initialValues={{...this.state.client}}
          onSubmit={(values, actions) => this._updateClient(values, actions)}>
        {formikProps => (
        <View style={styles.form}>
          <View style={styles.header}>
            <Text style={styles.label}>Update Client Information</Text>
            <Icon
              name='download'
              type='font-awesome'
              color={colors.green}
              size={30}
              onPress={formikProps.handleSubmit} />
          </View>

          <Divider />

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
            <Text style={styles.label}>Update Billing Address</Text>
            <Switch
              onChange={( ) => formikProps.setFieldValue('billingAddrToggle', !formikProps.values.billingAddrToggle)}
              value={formikProps.values.billingAddrToggle}
              trackColor={{true: colors.green}} />
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
            <Text style={styles.label}>Update Shipping Address</Text>
            <Switch
              onChange={( ) => formikProps.setFieldValue('shippingAddrToggle', !formikProps.values.shippingAddrToggle)}
              value={formikProps.values.shippingAddrToggle}
              trackColor={{true: colors.green}}/>
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
}

// Props Valdidation
UpdateClient.propTypes = {
  formikProps: PropTypes.object,
  client: PropTypes.object,
  cancel: PropTypes.func
}

export default UpdateClient;
