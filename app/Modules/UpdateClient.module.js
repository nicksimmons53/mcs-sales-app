// Library Imports
import React, { Component } from 'react';
import { View, Text, Switch } from 'react-native';
import { API_URL } from 'react-native-dotenv';
import PropTypes from 'prop-types';
import { Icon, Divider, Input, Button } from 'react-native-elements';
import { Formik } from 'formik';
import axios from 'axios';
import Toast from 'react-native-easy-toast';
import { styles, colors } from './Styles/Form.style';

// Class Component to show Update Client Form
class UpdateClient extends Component {
  state = {
    address: this.props.address
  }

  timeout = null;

  componentWillUnmount( ) {
    clearTimeout(this.timeout);
  }

  updateClient = (values, actions) => {
    let user = this.props.user;
    let client = this.props.client;

    this.timeout = setTimeout(( ) => { actions.setSubmitting(false); }, 1000);
    
    axios.put(`${API_URL}/employee/${user.recnum}/clients/${client.id}`, values)
      .then((response) => {
        this.props.refreshAddr( );
        this.props.cancel( );
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render( ) {
    return (
      <View style={styles.background}>
        <Formik
          initialValues={{...this.props.address}}
          onSubmit={(values, actions) => this.updateClient(values, actions)}>
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
              onChangeText={formikProps.handleChange('addrs1')}
              onBlur={formikProps.handleBlur('addrs1')}
              value={formikProps.values.addrs1}
              autoCapitalize='words'
              textContentType='streetAddressLine1'
              blurOnSubmit={false}
              containerStyle={styles.mediumInput}
              inputContainerStyle={styles.inputContainer} />
          </View>

          <View style={styles.textRow}>
            <Text style={styles.label}>City</Text>
            <Input
              onChangeText={formikProps.handleChange('ctynme')}
              onBlur={formikProps.handleBlur('ctynme')}
              value={formikProps.values.ctynme}
              autoCapitalize='words'
              textContentType='addressCity'
              blurOnSubmit={false}
              containerStyle={styles.mediumInput}
              inputContainerStyle={styles.inputContainer} />
          </View>
          <View style={styles.textRow}>
            <Text style={styles.label}>State</Text>
            <Input
              onChangeText={formikProps.handleChange('state_')}
              onBlur={formikProps.handleBlur('state_')}
              value={formikProps.values.state_}
              autoCapitalize='characters'
              textContentType='addressState'
              blurOnSubmit={false}
              containerStyle={styles.xSmallInput}
              inputContainerStyle={styles.inputContainer} />
          </View>
          <View style={styles.textRow}>
            <Text style={styles.label}>Zip</Text>
            <Input
              onChangeText={formikProps.handleChange('zipcde')}
              onBlur={formikProps.handleBlur('zipcde')}
              value={formikProps.values.zipcde}
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
                  onChangeText={formikProps.handleChange('bilad1')}
                  onBlur={formikProps.handleBlur('bilad1')}
                  value={formikProps.values.bilad1}
                  autoCapitalize='words'
                  textContentType='streetAddressLine1'
                  blurOnSubmit={false}
                  containerStyle={styles.mediumInput}
                  inputContainerStyle={styles.inputContainer} />
              </View>
              <View style={styles.textRow}>
                <Text style={styles.label}>City</Text>
                <Input
                  onChangeText={formikProps.handleChange('bilcty')}
                  onBlur={formikProps.handleBlur('bilcty')}
                  value={formikProps.values.bilcty}
                  autoCapitalize='words'
                  textContentType='addressCity'
                  blurOnSubmit={false}
                  containerStyle={styles.mediumInput}
                  inputContainerStyle={styles.inputContainer} />
              </View>
              <View style={styles.textRow}>
                <Text style={styles.label}>State</Text>
                <Input
                  onChangeText={formikProps.handleChange('bilste')}
                  onBlur={formikProps.handleBlur('bilste')}
                  value={formikProps.values.bilste}
                  autoCapitalize='characters'
                  textContentType='addressState'
                  blurOnSubmit={false}
                  containerStyle={styles.xSmallInput}
                  inputContainerStyle={styles.inputContainer} />
              </View>
              <View style={styles.textRow}>
                <Text style={styles.label}>Zip</Text>
                <Input
                  onChangeText={formikProps.handleChange('bilzip')}
                  onBlur={formikProps.handleBlur('bilzip')}
                  value={formikProps.values.bilzip}
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
                  onChangeText={formikProps.handleChange('shpad1')}
                  onBlur={formikProps.handleBlur('shpad1')}
                  value={formikProps.values.shpad1}
                  autoCapitalize='words'
                  textContentType='streetAddressLine1'
                  blurOnSubmit={false}
                  containerStyle={styles.mediumInput}
                  inputContainerStyle={styles.inputContainer} />
              </View>
              <View style={styles.textRow}>
                <Text style={styles.label}>City</Text>
                <Input
                  onChangeText={formikProps.handleChange('shpcty')}
                  onBlur={formikProps.handleBlur('shpcty')}
                  value={formikProps.values.shpcty}
                  autoCapitalize='words'
                  textContentType='addressCity'
                  blurOnSubmit={false}
                  containerStyle={styles.mediumInput}
                  inputContainerStyle={styles.inputContainer} />
              </View>
              <View style={styles.textRow}>
                <Text style={styles.label}>State</Text>
                <Input
                  onChangeText={formikProps.handleChange('shpste')}
                  onBlur={formikProps.handleBlur('shpste')}
                  value={formikProps.values.shpste}
                  autoCapitalize='characters'
                  textContentType='addressState'
                  blurOnSubmit={false}
                  containerStyle={styles.xSmallInput}
                  inputContainerStyle={styles.inputContainer} />
              </View>
              <View style={styles.textRow}>
                <Text style={styles.label}>Zip</Text>
                <Input
                  onChangeText={formikProps.handleChange('shpzip')}
                  onBlur={formikProps.handleBlur('shpzip')}
                  value={formikProps.values.shpzip}
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
