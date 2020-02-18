// Library Imports
import React, { Component } from 'react';
import { View, Text, Switch } from 'react-native';
import { Formik } from 'formik';
import PropTypes from 'prop-types';
import { Divider, Input } from 'react-native-elements';
import { styles, colors } from './Styles/Form.style';

// Class Component for Client Accounting Info
class AcctInfo extends Component {
  render( ) {
    return (
      <View style={styles.background}>
        <View style={styles.form}>
          <Text style={styles.headerText}>Accounting Information</Text>
          <Divider />

          <Text style={styles.sectionHeaderText}>Purchasing Contact</Text>
          <View style={styles.textRow}>
            <Text style={styles.label}>Contact Name</Text>
            <Input
              onChangeText={this.props.formik.handleChange('acctContactName')}
              onBlur={this.props.formik.handleBlur('acctContactName')}
              autoCapitalize='words'
              textContentType='name'
              blurOnSubmit={false}
              containerStyle={styles.mediumInput}
              inputContainerStyle={styles.inputContainer} />
          </View>
          <View style={styles.textRow}>
            <Text style={styles.label}>Title</Text>
            <Input
              onChangeText={this.props.formik.handleChange('acctContactTitle')}
              onBlur={this.props.formik.handleBlur('acctContactTitle')}
              autoCapitalize='words'
              textContentType='jobTitle'
              blurOnSubmit={false}
              containerStyle={styles.mediumInput}
              inputContainerStyle={styles.inputContainer} />
          </View>
          <View style={styles.textRow}>
            <Text style={styles.label}>Phone</Text>
            <Input
              onChangeText={this.props.formik.handleChange('acctContactPhone')}
              onBlur={this.props.formik.handleBlur('acctContactPhone')}
              keyboardType='phone-pad'
              textContentType='telephoneNumber'
              blurOnSubmit={false}
              containerStyle={styles.smallInput}
              inputContainerStyle={styles.inputContainer} />
          </View>
          <View style={styles.textRow}>
            <Text style={styles.label}>Email</Text>
            <Input
              onChangeText={this.props.formik.handleChange('acctContactEmail')}
              onBlur={this.props.formik.handleBlur('acctContactEmail')}
              keyboardType='email-address'
              textContentType='emailAddress'
              autoCapitalize='none'
              blurOnSubmit={false}
              containerStyle={styles.mediumInput}
              inputContainerStyle={styles.inputContainer} />
          </View>

          <Divider />

          <View style={styles.textRow}>
            <Text style={styles.label}>Tax ID #</Text>
            <Input
              onChangeText={this.props.formik.handleChange('taxID')}
              onBlur={this.props.formik.handleBlur('taxID')}
              keyboardType='number-pad'
              textContentType='none'
              blurOnSubmit={false}
              containerStyle={styles.mediumInput}
              inputContainerStyle={styles.inputContainer} />
          </View>

          <Divider />

          <Text style={styles.sectionHeaderText}>Payment Information</Text>
          <View style={styles.textRow}>
            <Text style={styles.label}>Payment Day</Text>
            <Input
              onChangeText={this.props.formik.handleChange('paymentDay')}
              onBlur={this.props.formik.handleBlur('paymentDay')}
              keyboardType='default'
              textContentType='none'
              blurOnSubmit={false}
              containerStyle={styles.smallInput}
              inputContainerStyle={styles.inputContainer} />
          </View>
          <View style={styles.textRow}>
            <Text style={styles.label}>Payment Frequency</Text>
            <Input
              onChangeText={this.props.formik.handleChange('paymentFreq')}
              onBlur={this.props.formik.handleBlur('paymentFreq')}
              keyboardType='default'
              textContentType='none'
              blurOnSubmit={false}
              containerStyle={styles.smallInput}
              inputContainerStyle={styles.inputContainer} />
          </View>
          <View style={styles.textRow}>
            <Text style={styles.label}>Autopay</Text>
            <Switch
              onChange={( ) => this.props.formik.setFieldValue('autopayToggle', !this.props.formik.values.autopayToggle)}
              value={this.props.formik.values.autopayToggle}
              style={styles.switch}
              trackColor={{true: colors.green}} />
          </View>
          <View style={styles.textRow}>
            <Text style={styles.label}>Invoice Submit Deadline</Text>
            <Input
              onChangeText={this.props.formik.handleChange('invSubmitDeadline')}
              onBlur={this.props.formik.handleBlur('invSubmitDeadline')}
              keyboardType='default'
              textContentType='none'
              blurOnSubmit={false}
              containerStyle={styles.smallInput}
              inputContainerStyle={styles.inputContainer} />
          </View>
          <View style={styles.textRow}>
            <Text style={styles.label}>Payment Type</Text>
            <Input
              onChangeText={this.props.formik.handleChange('paymentType')}
              onBlur={this.props.formik.handleBlur('paymentType')}
              keyboardType='default'
              textContentType='none'
              blurOnSubmit={false}
              containerStyle={styles.smallInput}
              inputContainerStyle={styles.inputContainer} />
          </View>
          <View style={styles.textRow}>
            <Text style={styles.label}>Check Pick Up?</Text>
            <Switch
              onChange={( ) => this.props.formik.setFieldValue('checkPUToggle', !this.props.formik.values.checkPUToggle)}
              value={this.props.formik.values.checkPUToggle}
              style={styles.switch}
              trackColor={{true: colors.green}} />
          </View>
          <View style={styles.textRow}>
            <Text style={styles.label}>Payment Portal</Text>
            <Switch
              onChange={( ) => this.props.formik.setFieldValue('portalToggle', !this.props.formik.values.portalToggle)}
              value={this.props.formik.values.portalToggle}
              style={styles.switch}
              trackColor={{true: colors.green}} />
          </View>
          {this.props.formik.values.portalToggle ?
            <View style={styles.textRow}>
              <Text style={styles.label}> </Text>
              <Input
                onChangeText={this.props.formik.handleChange('paymentPortal')}
                onBlur={this.props.formik.handleBlur('paymentPortal')}
                keyboardType='url'
                textContentType='URL'
                blurOnSubmit={false}
                containerStyle={styles.smallInput}
                inputContainerStyle={styles.inputContainer} />
            </View>
          : null}

          <Divider />

          <Text style={styles.sectionHeaderText}>General Information</Text>
          <View style={styles.textRow}>
            <Text style={styles.label}>Vendor ID Required?</Text>
            <Switch
              onChange={( ) => this.props.formik.setFieldValue('vendorIDToggle', !this.props.formik.values.vendorIDToggle)}
              value={this.props.formik.values.vendorIDToggle}
              style={styles.switch}
              trackColor={{true: colors.green}} />
          </View>
          <View style={styles.textRow}>
            <Text style={styles.label}>PO&aposs Required?</Text>
            <Switch
              onChange={( ) => this.props.formik.setFieldValue('POToggle', !this.props.formik.values.POToggle)}
              value={this.props.formik.values.POToggle}
              style={styles.switch}
              trackColor={{true: colors.green}} />
          </View>
          <View style={styles.textRow}>
            <Text style={styles.label}>Approvals Required?</Text>
            <Switch
              onChange={( ) => this.props.formik.setFieldValue('approvalsToggle', !this.props.formik.values.approvalsToggle)}
              value={this.props.formik.values.approvalsToggle}
              style={styles.switch}
              trackColor={{true: colors.green}} />
          </View>

          <Divider />

          <Text style={styles.sectionHeaderText}>Miscellaneous</Text>
          <Input
            onChangeText={this.props.formik.handleChange('acctMisc')}
            onBlur={this.props.formik.handleBlur('acctMisc')}
            autoCapitalize='sentences'
            multiline={true}
            max={300}
            blurOnSubmit={false}
            containerStyle={{flex: 1, marginBottom: 30}}
            inputContainerStyle={styles.inputContainer} />
        </View>
      </View>
    );
  }
}

// Props Valdidation
AcctInfo.propTypes = {
  formik: PropTypes.object
}

export default AcctInfo;
