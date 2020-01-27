// Library Imports
import React, { Component } from 'react';
import { View, Text, Switch } from 'react-native';
import PropTypes from 'prop-types';
import { Input } from 'react-native-elements';
import styles from './Styles/Form.style';
import colors from '../Library/Colors';

// Class Component that will display Client Basic Info
class BasicInfo extends Component {
  render( ) {
    return (
      <View style={styles.background}>

        <View style={styles.form}>
          <View style={styles.textRow}>
            <Text style={styles.label}>Client Name</Text>
            <Input
              onChangeText={this.props.formik.handleChange('clientName')}
              onBlur={this.props.formik.handleBlur('clientName')}
              autoCapitalize='words'
              textContentType='organizationName'
              blurOnSubmit={false}
              inputStyle={styles.userInput}
              containerStyle={styles.mediumInput}
              inputContainerStyle={styles.inputContainer} />
          </View>
        </View>

        <View style={styles.form}>
          <Text style={styles.sectionHeaderText}>Corporate Address</Text>
          <View style={styles.textRow}>
            <Text style={styles.label}>Street Address</Text>
            <Input
              onChangeText={this.props.formik.handleChange('corpAddr')}
              onBlur={this.props.formik.handleBlur('corpAddr')}
              autoCapitalize='words'
              textContentType='streetAddressLine1'
              blurOnSubmit={false}
              inputStyle={styles.userInput}
              containerStyle={styles.mediumInput}
              inputContainerStyle={styles.inputContainer} />
          </View>

          <View style={styles.textRow}>
            <Text style={styles.label}>Street Address 2</Text>
            <Input
              onChangeText={this.props.formik.handleChange('corpAddr2')}
              onBlur={this.props.formik.handleBlur('corpAddr2')}
              autoCapitalize='words'
              textContentType='streetAddressLine2'
              blurOnSubmit={false}
              inputStyle={styles.userInput}
              containerStyle={styles.mediumInput}
              inputContainerStyle={styles.inputContainer} />
          </View>

          <View style={styles.textRow}>
            <Text style={styles.label}>City</Text>
            <Input
              onChangeText={this.props.formik.handleChange('corpCity')}
              onBlur={this.props.formik.handleBlur('corpCity')}
              autoCapitalize='words'
              textContentType='addressCity'
              blurOnSubmit={false}
              inputStyle={styles.userInput}
              containerStyle={styles.mediumInput}
              inputContainerStyle={styles.inputContainer} />
          </View>
          <View style={styles.textRow}>
            <Text style={styles.label}>State</Text>
            <Input
              onChangeText={this.props.formik.handleChange('corpState')}
              onBlur={this.props.formik.handleBlur('corpState')}
              autoCapitalize='characters'
              textContentType='addressState'
              blurOnSubmit={false}
              inputStyle={styles.userInput}
              containerStyle={styles.xSmallInput}
              inputContainerStyle={styles.inputContainer} />
          </View>
          <View style={styles.textRow}>
            <Text style={styles.label}>Zip</Text>
            <Input
              onChangeText={this.props.formik.handleChange('corpZip')}
              onBlur={this.props.formik.handleBlur('corpZip')}
              keyboardType='number-pad'
              textContentType='postalCode'
              blurOnSubmit={false}
              inputStyle={styles.userInput}
              containerStyle={styles.smallInput}
              inputContainerStyle={styles.inputContainer} />
          </View>
        </View>

        <View style={styles.form}>
          <Text style={styles.sectionHeaderText}>Client Contact</Text>
          <View style={styles.textRow}>
            <Text style={styles.label}>Contact Name</Text>
            <Input
              onChangeText={this.props.formik.handleChange('contactName')}
              onBlur={this.props.formik.handleBlur('contactName')}
              autoCapitalize='words'
              textContentType='name'
              blurOnSubmit={false}
              inputStyle={styles.userInput}
              containerStyle={styles.mediumInput}
              inputContainerStyle={styles.inputContainer} />
          </View>

          <View style={styles.textRow}>
            <Text style={styles.label}>Title</Text>
            <Input
              onChangeText={this.props.formik.handleChange('contactTitle')}
              onBlur={this.props.formik.handleBlur('contactTitle')}
              autoCapitalize='words'
              textContentType='jobTitle'
              blurOnSubmit={false}
              inputStyle={styles.userInput}
              containerStyle={styles.mediumInput}
              inputContainerStyle={styles.inputContainer} />
          </View>

          <View style={styles.textRow}>
            <Text style={styles.label}>Phone</Text>
            <Input
              onChangeText={this.props.formik.handleChange('contactPhone')}
              onBlur={this.props.formik.handleBlur('contactPhone')}
              keyboardType='phone-pad'
              textContentType='telephoneNumber'
              blurOnSubmit={false}
              inputStyle={styles.userInput}
              containerStyle={styles.mediumInput}
              inputContainerStyle={styles.inputContainer} />
          </View>

          <View style={styles.textRow}>
            <Text style={styles.label}>Email</Text>
            <Input
              onChangeText={this.props.formik.handleChange('contactEmail')}
              onBlur={this.props.formik.handleBlur('contactEmail')}
              keyboardType='email-address'
              textContentType='jobTitle'
              autoCapitalize='none'
              blurOnSubmit={false}
              inputStyle={styles.userInput}
              containerStyle={styles.mediumInput}
              inputContainerStyle={styles.inputContainer} />
          </View>
        </View>

        <View style={styles.form}>
          <View style={styles.textRow}>
            <Text style={styles.label}>Add Billing Address</Text>
            <Switch
              onChange={( ) => this.props.formik.setFieldValue('billingAddrToggle', !this.props.formik.values.billingAddrToggle)}
              value={this.props.formik.values.billingAddrToggle}
              trackColor={{true: colors.green}} />
          </View>
        </View>

        {this.props.formik.values.billingAddrToggle ?
          <View style={styles.form}>
            <View style={styles.textRow}>
              <Text style={styles.label}>Street Address</Text>
              <Input
                onChangeText={this.props.formik.handleChange('billingAddr')}
                onBlur={this.props.formik.handleBlur('billingAddr')}
                autoCapitalize='words'
                textContentType='streetAddressLine1'
                blurOnSubmit={false}
                inputStyle={styles.userInput}
                containerStyle={styles.mediumInput}
                inputContainerStyle={styles.inputContainer} />
            </View>
            <View style={styles.textRow}>
              <Text style={styles.label}>City</Text>
              <Input
                onChangeText={this.props.formik.handleChange('billingCity')}
                onBlur={this.props.formik.handleBlur('billingCity')}
                autoCapitalize='words'
                textContentType='addressCity'
                blurOnSubmit={false}
                inputStyle={styles.userInput}
                containerStyle={styles.mediumInput}
                inputContainerStyle={styles.inputContainer} />
            </View>
            <View style={styles.textRow}>
              <Text style={styles.label}>State</Text>
              <Input
                onChangeText={this.props.formik.handleChange('billingState')}
                onBlur={this.props.formik.handleBlur('billingState')}
                autoCapitalize='characters'
                textContentType='addressState'
                blurOnSubmit={false}
                inputStyle={styles.userInput}
                containerStyle={styles.xSmallInput}
                inputContainerStyle={styles.inputContainer} />
            </View>
            <View style={styles.textRow}>
              <Text style={styles.label}>Zip</Text>
              <Input
                onChangeText={this.props.formik.handleChange('billingZip')}
                onBlur={this.props.formik.handleBlur('billingZip')}
                keyboardType='number-pad'
                textContentType='postalCode'
                blurOnSubmit={false}
                inputStyle={styles.userInput}
                containerStyle={styles.smallInput}
                inputContainerStyle={styles.inputContainer} />
            </View>
          </View>
        : null}

        <View style={styles.form}>
          <View style={styles.textRow}>
            <Text style={styles.label}>Add Shipping Address</Text>
            <Switch
              onChange={( ) => this.props.formik.setFieldValue('shippingAddrToggle', !this.props.formik.values.shippingAddrToggle)}
              value={this.props.formik.values.shippingAddrToggle}
              trackColor={{true: colors.green}} />
          </View>
        </View>

        {this.props.formik.values.shippingAddrToggle ?
          <View style={styles.form}>
            <View style={styles.textRow}>
              <Text style={styles.label}>Street Address</Text>
              <Input
                onChangeText={this.props.formik.handleChange('shippingAddr')}
                onBlur={this.props.formik.handleBlur('shippingAddr')}
                autoCapitalize='words'
                textContentType='streetAddressLine1'
                blurOnSubmit={false}
                inputStyle={styles.userInput}
                containerStyle={styles.mediumInput}
                inputContainerStyle={styles.inputContainer} />
            </View>
            <View style={styles.textRow}>
              <Text style={styles.label}>City</Text>
              <Input
                onChangeText={this.props.formik.handleChange('shippingCity')}
                onBlur={this.props.formik.handleBlur('shippingCity')}
                autoCapitalize='words'
                textContentType='addressCity'
                blurOnSubmit={false}
                inputStyle={styles.userInput}
                containerStyle={styles.mediumInput}
                inputContainerStyle={styles.inputContainer} />
            </View>
            <View style={styles.textRow}>
              <Text style={styles.label}>State</Text>
              <Input
                onChangeText={this.props.formik.handleChange('shippingState')}
                onBlur={this.props.formik.handleBlur('shippingState')}
                autoCapitalize='characters'
                textContentType='addressState'
                blurOnSubmit={false}
                inputStyle={styles.userInput}
                containerStyle={styles.xSmallInput}
                inputContainerStyle={styles.inputContainer} />
            </View>
            <View style={styles.textRow}>
              <Text style={styles.label}>Zip</Text>
              <Input
                onChangeText={this.props.formik.handleChange('shippingZip')}
                onBlur={this.props.formik.handleBlur('shippingZip')}
                keyboardType='number-pad'
                textContentType='postalCode'
                blurOnSubmit={false}
                inputStyle={styles.userInput}
                containerStyle={styles.smallInput}
                inputContainerStyle={styles.inputContainer} />
            </View>
          </View>
        : null}
      </View>
    );
  }
}

// Props Valdidation
BasicInfo.propTypes = {
  formik: PropTypes.object
}

export default BasicInfo;
