// Library Imports
import React, { Component } from 'react';
import { View, Text, Switch } from 'react-native';
import { API_URL } from 'react-native-dotenv';
import PropTypes from 'prop-types';
import { Icon, Divider, Input, Button } from 'react-native-elements';
import { TinyInputRow, MediumInputRow, SmallInputRow } from '../components/InputRow';
import { Formik } from 'formik';
import axios from 'axios';
import Toast from 'react-native-easy-toast';
import { styles, colors } from './Styles/Form.style';

// Class Component to show Update Client form
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

    values.shtnme = values.clnnme;

    this.timeout = setTimeout(( ) => { actions.setSubmitting(false); }, 1000);
    
    axios.put(`${API_URL}/employee/${user.recnum}/clients/${client.id}`, values)
      .then((response) => {
        this.props.refreshInfo( );
        this.props.cancel( );
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render( ) {
    return (
      <View style={styles.background}>
        <Formik
          initialValues={{...this.props.address, ...this.props.client}}
          onSubmit={(values, actions) => this.updateClient(values, actions)}>
        {formikProps => (
        <View style={styles.form}>
          <View style={styles.header}>
            <Text style={styles.label}>Update Client Information</Text>
            <Icon
                name="times"
                type="font-awesome"
                size={36}
                color={colors.red}
                iconStyle={styles.icon}
                onPress={this.props.cancel}/>
          </View>

          <Divider />

          <MediumInputRow
            fieldName="clnnme"
            label="Client Name"
            tooltip={false}
            formik={formikProps}/>
          
          <Divider/>

          <MediumInputRow
            fieldName="addrs1"
            label="Street Address"
            tooltip={false}
            formik={formikProps}/>

          <MediumInputRow
            fieldName="addrs2"
            label="Street Address 2"
            tooltip={false}
            formik={formikProps}/>

          <MediumInputRow
            fieldName="ctynme"
            label="City"
            tooltip={false}
            formik={formikProps}/>
          
          <TinyInputRow
            fieldName="state"
            label="State"
            tooltip={false}
            formik={formikProps}/>

          <SmallInputRow
            fieldName="zipcde"
            label="Zip"
            tooltip={false}
            formik={formikProps}/>

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
              <MediumInputRow
                fieldName="bilad1"
                label="Street Address"
                tooltip={false}
                formik={formikProps}/>
    
              <MediumInputRow
                fieldName="bilad2"
                label="Street Address 2"
                tooltip={false}
                formik={formikProps}/>
    
              <MediumInputRow
                fieldName="bilcty"
                label="City"
                tooltip={false}
                formik={formikProps}/>
    
              <TinyInputRow
                fieldName="bilste"
                label="State"
                tooltip={false}
                formik={formikProps}/>
    
              <SmallInputRow
                fieldName="bilzip"
                label="Zip"
                tooltip={false}
                formik={formikProps}/>
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
              <MediumInputRow
                fieldName="shpad1"
                label="Street Address"
                tooltip={false}
                formik={formikProps}/>
    
              <MediumInputRow
                fieldName="shpad2"
                label="Street Address 2"
                tooltip={false}
                formik={formikProps}/>
    
              <MediumInputRow
                fieldName="shpcty"
                label="City"
                tooltip={false}
                formik={formikProps}/>
              
              <TinyInputRow
                fieldName="shpste"
                label="State"
                tooltip={false}
                formik={formikProps}/>
    
              <SmallInputRow
                fieldName="shpzip"
                label="Zip"
                tooltip={false}
                formik={formikProps}/>
            </View>
          : null}

          <Divider/>

          <Button
            title='Save'
            buttonStyle={styles.submit}
            onPress={formikProps.handleSubmit} />
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
