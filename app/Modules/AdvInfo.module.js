// Library Imports
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import { Divider, Input, Button, Icon, CheckBox } from 'react-native-elements';
import * as DocumentPicker from 'expo-document-picker';
import DropDownPicker from 'react-native-dropdown-picker';
import Toast from 'react-native-easy-toast';
import { styles, colors } from './Styles/Form.style';

// Class Component for Client Accounting Info
class AcctInfo extends Component {
  state = {
    frequencyOptions: [
      { label: "Weekly", value: "Weekly" },
      { label: "Bi-Weekly", value: "Bi-Weekly" },
      { label: "Monthly", value: "Monthly" }
    ],
    paymentOptions: [
      { label: "Credit-Card", value: "Credit-Card" },
      { label: "Direct Deposit", value: "Direct Deposit" },
      { label: "Check", value: "Check" }
    ],
    submitOptions: [
      { label: "Email", value: "Email" },
      { label: "Mail", value: "Mail" },
      { label: "Drop-Off", value: "Drop-Off" }
    ],
    emailSubmit: false,
    mailSubmit: false,
    dropOffSubmit: false
  };

  filePicker = async( ) => {
    await DocumentPicker.getDocumentAsync({
      copyToCacheDirectory: false
    }).then((result) => {
      if (result.type === 'cancel')
        return;
      else
        return File.uriToBlob(result.uri);
    }).then((blob) => {
      if (blob !== undefined) {
        return File.saveFile(blob, this.props.client);
      }
    }).then(( ) => {
      this.refs.toast.show('File Was Attached Successfully');
    }).catch((error) => {
      throw error;
    });
  }

  render( ) {
    let values = this.props.formik.values;
    
    return (
      <View style={styles.background}>
        <View style={styles.form}>
          <Text style={styles.headerText}>Accounting Information</Text>
          <Divider />

          <Text style={styles.sectionHeaderText}>Payment Information</Text>
          <View style={styles.textRow} zIndex={3}>
            <Text style={styles.label}>Payment Frequency</Text>
            <DropDownPicker
              placeholder="Choose..."
              items={this.state.frequencyOptions}
              defaultValue={values.pmtfrq}
              containerStyle={styles.dropdown}
              dropDownStyle={styles.dropdownMenu}
              labelStyle={styles.dropdownItem}
              itemStyle={styles.dropdownItem}
              onChangeItem={item => this.props.formik.setFieldValue('pmtfrq', item.value)}/>
            <Icon name="info-circle" type="font-awesome" color={colors.black}/>
          </View>
          <View style={styles.textRow} zIndex={0}>
            <Text style={styles.label}>Autopay</Text>
            <CheckBox 
              checked={!values.atopay}
              onPress={( ) => this.props.formik.setFieldValue('atopay', !values.atopay)}
              size={36}
              containerStyle={styles.checkbox}
              checkedColor={colors.green}/>
            <Icon name="info-circle" type="font-awesome" color={colors.black}/>
          </View>
          <View style={styles.textRow} zIndex={2}>
            <Text style={styles.label}>How to submit invoices?</Text>
            <DropDownPicker
              placeholder="Choose..."
              items={this.state.submitOptions}
              defaultValue={values.invsbm}
              containerStyle={styles.dropdown}
              dropDownStyle={styles.dropdownMenu}
              labelStyle={styles.dropdownItem}
              itemStyle={styles.dropdownItem}
              onChangeItem={item => this.props.formik.setFieldValue('invsbm', item.value)}/>
            <Icon name="info-circle" type="font-awesome" color={colors.black}/>
          </View>

          { 
            (values.invsbm === "Email") ? 
              <View style={styles.textRow} zIndex={0}>
                <Text style={styles.label}></Text>
                <Input
                  onChangeText={this.props.formik.handleChange('invema')}
                  onBlur={this.props.formik.handleBlur('invema')}
                  value={values.invema}
                  placeholder="Email"
                  blurOnSubmit={false}
                  containerStyle={styles.smallInput}
                  inputContainerStyle={styles.inputContainer}/>
                <Icon name="info-circle" type="font-awesome" color={colors.white}/>
              </View>
            :
              null
          }

          {    
            (values.invsbm === "Mail" || values.invsbm === "Drop-Off") ?
              <>
                <View style={styles.textRow} zIndex={0}>
                  <Text style={styles.label}></Text>
                  <Input
                    onChangeText={this.props.formik.handleChange('invadr')}
                    onBlur={this.props.formik.handleBlur('invadr')}
                    value={values.invadr}
                    placeholder="Street Address"
                    blurOnSubmit={false}
                    containerStyle={styles.smallInput}
                    inputContainerStyle={styles.inputContainer}/>
                  <Icon name="info-circle" type="font-awesome" color={colors.white}/>
                </View>
                <View style={styles.textRow} zIndex={0}>
                  <Text style={styles.label}></Text>
                  <Input
                    onChangeText={this.props.formik.handleChange('invcty')}
                    onBlur={this.props.formik.handleBlur('invcty')}
                    value={values.invcty}
                    placeholder="City"
                    blurOnSubmit={false}
                    containerStyle={styles.smallInput}
                    inputContainerStyle={styles.inputContainer}/>
                  <Icon name="info-circle" type="font-awesome" color={colors.white}/>
                </View>
                <View style={styles.textRow} zIndex={0}>
                  <Text style={styles.label}></Text>
                  <Input
                    onChangeText={this.props.formik.handleChange('invste')}
                    onBlur={this.props.formik.handleBlur('invste')}
                    value={values.invste}
                    placeholder="State"
                    blurOnSubmit={false}
                    containerStyle={styles.smallInput}
                    inputContainerStyle={styles.inputContainer}/>
                  <Icon name="info-circle" type="font-awesome" color={colors.white}/>
                </View>
                <View style={styles.textRow} zIndex={0}>
                  <Text style={styles.label}></Text>
                  <Input
                    onChangeText={this.props.formik.handleChange('invzip')}
                    onBlur={this.props.formik.handleBlur('invzip')}
                    value={values.invzip}
                    placeholder="Zip Code"
                    blurOnSubmit={false}
                    containerStyle={styles.smallInput}
                    inputContainerStyle={styles.inputContainer}/>
                  <Icon name="info-circle" type="font-awesome" color={colors.white}/>
                </View>
              </>
            :
              null
          }

          <View style={styles.textRow} zIndex={1}>
            <Text style={styles.label}>Payment Type</Text>
            <DropDownPicker
              placeholder="Choose..."
              items={this.state.paymentOptions}
              defaultValue={values.pmttyp}
              containerStyle={styles.dropdown}
              dropDownStyle={styles.dropdownMenu}
              zIndex={1}
              itemStyle={styles.dropdownItem}
              onChangeItem={item => this.props.formik.setFieldValue('pmttyp', item.value)}/>
            <Icon name="info-circle" type="font-awesome" color={colors.black}/>
          </View>
          <View style={styles.textRow} zIndex={0}>
            <Text style={styles.label}>Payment Portal</Text>
            <CheckBox 
              checked={!values.pmtprt}
              onPress={( ) => this.props.formik.setFieldValue('pmtprt', !values.pmtprt)}
              size={36}
              containerStyle={styles.checkbox}
              checkedColor={colors.green}/>
            <Icon name="info-circle" type="font-awesome" color={colors.white}/>
          </View>

          { 
            values.pmtprt ? 
              null
            :
              <View style={styles.textRow} zIndex={0}>
                <Text style={styles.label}></Text>
                <Input
                  onChangeText={this.props.formik.handleChange('pmturl')}
                  onBlur={this.props.formik.handleBlur('pmturl')}
                  value={values.pmturl}
                  keyboardType='url'
                  textContentType='URL'
                  blurOnSubmit={false}
                  containerStyle={styles.mediumInput}
                  inputContainerStyle={styles.inputContainer}/>
                <Icon name="info-circle" type="font-awesome" color={colors.black}/>
              </View>
          }

          <Divider />

          <Text style={styles.sectionHeaderText}>General Information</Text>
          <View style={styles.textRow}>
            <Text style={styles.label}>{"PO's Required?"}</Text>
            <CheckBox 
              checked={!values.posreq}
              onPress={( ) => this.props.formik.setFieldValue('posreq', !values.posreq)}
              size={36}
              containerStyle={styles.checkbox}
              checkedColor={colors.green}/>
            <Icon name="info-circle" type="font-awesome" color={colors.black}/>
          </View>
          <View style={styles.textRow}>
            <Text style={styles.label}>Are PO's Required for Invoice Submittal?</Text>
            <CheckBox 
              checked={!values.invpos}
              onPress={( ) => this.props.formik.setFieldValue('invpos', !values.invpos)}
              size={36}
              containerStyle={styles.checkbox}
              checkedColor={colors.green}/>
            <Icon name="info-circle" type="font-awesome" color={colors.black}/>
          </View>
          <View style={styles.textRow}>
            <Text style={styles.label}>Approvals Required?</Text>
            <CheckBox 
              checked={!values.aprvls}
              onPress={( ) => this.props.formik.setFieldValue('aprvls', !values.aprvls)}
              size={36}
              containerStyle={styles.checkbox}
              checkedColor={colors.green}/>
            <Icon name="info-circle" type="font-awesome" color={colors.black}/>
          </View>

          <Divider/>

          <Text style={styles.sectionHeaderText}>Contact Information</Text>
          <View style={styles.textRow}>
            <Text style={styles.label}>Full Name</Text>
            <Input
              onChangeText={this.props.formik.handleChange('')}
              autoCapitalize='none'
              blurOnSubmit={false}
              containerStyle={styles.smallInput}
              inputContainerStyle={styles.inputContainer}/>
            <Icon name="info-circle" type="font-awesome" color={colors.white}/>
          </View>
          <View style={styles.textRow}>
            <Text style={styles.label}>Phone #</Text>
            <Input
              onChangeText={this.props.formik.handleChange('')}
              autoCapitalize='none'
              blurOnSubmit={false}
              containerStyle={styles.smallInput}
              inputContainerStyle={styles.inputContainer}/>
            <Icon name="info-circle" type="font-awesome" color={colors.white}/>
          </View>
          <View style={styles.textRow}>
            <Text style={styles.label}>Email Address</Text>
            <Input
              onChangeText={this.props.formik.handleChange('')}
              autoCapitalize='none'
              blurOnSubmit={false}
              containerStyle={styles.mediumInput}
              inputContainerStyle={styles.inputContainer}/>
            <Icon name="info-circle" type="font-awesome" color={colors.white}/>
          </View>
        </View>

        <View style={styles.form}>
          <Text style={styles.headerText}>Expediting Information</Text>

          <Divider />

          <View style={styles.textRow}>
            <Text style={styles.label}>File Attachment</Text>
            <Button
              title='Attach Files'
              icon={{
                name: 'paperclip',
                type: 'font-awesome',
                size: 20,
                color: colors.white,
              }}
              buttonStyle={styles.attach}
              containerStyle={styles.attachButtonContainer}
              onPress={( ) => this.filePicker( )} />
            <Icon name="info-circle" type="font-awesome" color={colors.white}/>
          </View>

          <View style={styles.textRow}>
            <Text style={styles.label}>Vendor Portal</Text>
            <Input
              onChangeText={this.props.formik.handleChange('vndprt')}
              onBlur={this.props.formik.handleBlur('vndprt')}
              value={values.vndprt}
              blurOnSubmit={false}
              containerStyle={styles.mediumInput}
              inputContainerStyle={styles.inputContainer} />
            <Icon name="info-circle" type="font-awesome" color={colors.black}/>
          </View>

          <View style={styles.textRow}>
            <Text style={styles.label}>PO Correction Handling</Text>
            <Input
              onChangeText={this.props.formik.handleChange('pohndl')}
              onBlur={this.props.formik.handleBlur('pohndl')}
              value={values.pohndl}
              keyboardType='url'
              textContentType='URL'
              blurOnSubmit={false}
              containerStyle={styles.smallInput}
              inputContainerStyle={styles.inputContainer} />
            <Icon name="info-circle" type="font-awesome" color={colors.black}/>
          </View>

          <View style={styles.textRow}>
            <Text style={styles.label}>Expected Start Date</Text>
            <Input
              onChangeText={this.props.formik.handleChange('strtdt')}
              onBlur={this.props.formik.handleBlur('strtdt')}
              value={values.strtdt}
              blurOnSubmit={false}
              containerStyle={styles.smallInput}
              inputContainerStyle={styles.inputContainer} />
            <Icon name="info-circle" type="font-awesome" color={colors.black}/>
          </View>

          <Toast ref='toast' position='bottom' style={styles.toast} />
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
