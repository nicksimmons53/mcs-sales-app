// Library Imports
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import { Divider, Input, Button, Icon, CheckBox, Tooltip } from 'react-native-elements';
import * as FileSystem from 'expo-file-system';
import DocumentPicker from 'react-native-document-picker';
import DropDownPicker from 'react-native-dropdown-picker';
import Toast from 'react-native-easy-toast';
import { FieldInfo } from '../Form/Values.form';
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
		{ label: "", value: null },
		{ label: "Email", value: "Email" },
		{ label: "Mail", value: "Mail" },
		{ label: "Drop-Off", value: "Drop-Off" }
    ],
    releasedOptions: [
		{ label: "Email", value: "Email" },
		{ label: "Vendor Portal", value: "Vendor Portal" }
    ],
    emailSubmit: false,
    mailSubmit: false,
    dropOffSubmit: false,
    emailRelease: false
  };
  
  saveFile = (base64, client, fileName) => {
    const clientName = client.clnnme.replace(/\s/g, "_");
    let reqBody = {
      clientName: clientName,
      base64String: base64
    };

    axios.post(`${API_URL}/create-file/${fileName}`, reqBody)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      })
  }

  // Expo Cli Document Picker Component
  filePicker = async( ) => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles]
      });

      let file = {
        name: result.name,
        type: "*",
        uri: result.uri
      };

      const base64 = await FileSystem.readAsStringAsync(file.uri, { encoding: 'base64' });

      props.showFileToast( );

      props.refreshFiles( );

      return saveFile(base64, props.client, file.name);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {

      } else {
        throw err;
      }
    }
  };

  disableSubmitInvoice = ( ) => {
    if (this.props.formik.values.autopay === true) {
      this.props.formik.setFieldValue('invoice_submit', null);
      this.props.formik.setFieldValue('invoice_req_pos', 1);
      this.props.formik.setFieldValue('approvals_req', 1);
    }
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
					defaultValue={values.payment_freq}
					containerStyle={styles.dropdown}
					dropDownStyle={styles.dropdownMenu}
					labelStyle={styles.dropdownItem}
					itemStyle={styles.dropdownItem}
					onChangeItem={item => this.props.formik.setFieldValue('payment_freq', item.value)}/>
				<Tooltip 
					popover={<Text style={styles.promptText}>{FieldInfo.paymentFrequency}</Text>} 
					width={450}
					height={75}
					backgroundColor={colors.black}>
					<Icon name="info-circle" type="font-awesome" color={colors.black}/>
				</Tooltip>
          </View>
          <View style={styles.textRow} zIndex={0}>
				<Text style={styles.label}>Autopay</Text>
				<CheckBox 
					checked={values.autopay}
					onPress={( ) => {
						this.props.formik.setFieldValue('autopay', !values.autopay);
						this.disableSubmitInvoice( );
					}}
					size={36}
					containerStyle={styles.checkbox}
					checkedColor={colors.green}/>
					<Tooltip 
						popover={<Text style={styles.promptText}>{FieldInfo.autopay}</Text>} 
						width={450}
						height={150}
						backgroundColor={colors.black}>
						<Icon name="info-circle" type="font-awesome" color={colors.black}/>
					</Tooltip>
          </View>
          <View style={styles.textRow} zIndex={2}>
            <Text style={styles.label}>How are Invoices Submmited?</Text>
            <DropDownPicker
              placeholder="Choose..."
              items={this.state.submitOptions}
              defaultValue={values.invoice_submit}
              containerStyle={styles.dropdown}
              dropDownStyle={styles.dropdownMenu}
              labelStyle={styles.dropdownItem}
              itemStyle={styles.dropdownItem}
              onChangeItem={item => this.props.formik.setFieldValue('invoice_submit', item.value)}/>
				<Tooltip 
					popover={<Text style={styles.promptText}>{FieldInfo.invoiceSubmit}</Text>} 
					width={450}
					height={90}
					backgroundColor={colors.black}>
					<Icon name="info-circle" type="font-awesome" color={colors.black}/>
				</Tooltip>
          </View>

          { 
            (values.invoice_submit === "Email") ? 
              <View style={styles.textRow} zIndex={0}>
					<Text style={styles.label}></Text>
					<Input
						onChangeText={this.props.formik.handleChange('invoice_email')}
						onBlur={this.props.formik.handleBlur('invoice_email')}
						value={values.invoice_email}
						placeholder="Email"
						blurOnSubmit={false}
						inputStyle={styles.label}
						containerStyle={styles.smallInput}
						inputContainerStyle={styles.inputContainer}/>
					<Icon name="info-circle" type="font-awesome" color={colors.white}/>
              </View>
            :
              null
          }

          {    
            (values.invoice_submit === "Mail" || values.invoice_submit === "Drop-Off") ?
              <>
                <View style={styles.textRow} zIndex={0}>
                  <Text style={styles.label}></Text>
                  <Input
                    onChangeText={this.props.formik.handleChange('invoice_addr')}
                    onBlur={this.props.formik.handleBlur('invoice_addr')}
                    value={values.invoice_addr}
                    placeholder="Street Address"
                    inputStyle={styles.label}
                    blurOnSubmit={false}
                    containerStyle={styles.smallInput}
                    inputContainerStyle={styles.inputContainer}/>
                  <Icon name="info-circle" type="font-awesome" color={colors.white}/>
                </View>
                <View style={styles.textRow} zIndex={0}>
                  <Text style={styles.label}></Text>
                  <Input
                    onChangeText={this.props.formik.handleChange('invoice_city')}
                    onBlur={this.props.formik.handleBlur('invoice_city')}
                    value={values.invoice_city}
                    placeholder="City"
                    inputStyle={styles.label}
                    blurOnSubmit={false}
                    containerStyle={styles.smallInput}
                    inputContainerStyle={styles.inputContainer}/>
                  <Icon name="info-circle" type="font-awesome" color={colors.white}/>
                </View>
                <View style={styles.textRow} zIndex={0}>
                  <Text style={styles.label}></Text>
                  <Input
                    onChangeText={this.props.formik.handleChange('invoice_state')}
                    onBlur={this.props.formik.handleBlur('invoice_state')}
                    value={values.invoice_state}
                    placeholder="State"
                    inputStyle={styles.label}
                    blurOnSubmit={false}
                    containerStyle={styles.smallInput}
                    inputContainerStyle={styles.inputContainer}/>
                  <Icon name="info-circle" type="font-awesome" color={colors.white}/>
                </View>
                <View style={styles.textRow} zIndex={0}>
                  <Text style={styles.label}></Text>
                  <Input
                    onChangeText={this.props.formik.handleChange('invoice_zip')}
                    onBlur={this.props.formik.handleBlur('invoice_zip')}
                    value={values.invoice_zip}
                    placeholder="Zip Code"
                    inputStyle={styles.label}
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
              defaultValue={values.payment_type}
              containerStyle={styles.dropdown}
              dropDownStyle={styles.dropdownMenu}
              labelStyle={styles.dropdownItem}
              zIndex={1}
              itemStyle={styles.dropdownItem}
              onChangeItem={item => this.props.formik.setFieldValue('payment_type', item.value)}/>
			  <Tooltip 
				  popover={<Text style={styles.promptText}>{FieldInfo.paymentType}</Text>} 
				  width={450}
				  height={75}
				  backgroundColor={colors.black}>
				  <Icon name="info-circle" type="font-awesome" color={colors.black}/>
			  </Tooltip>
          </View>
          <View style={styles.textRow} zIndex={0}>
            <Text style={styles.label}>Payment Portal</Text>
            <CheckBox 
              checked={values.payment_portal}
              onPress={( ) => this.props.formik.setFieldValue('payment_portal', !values.payment_portal)}
              size={36}
              containerStyle={styles.checkbox}
              checkedColor={colors.green}/>
            <Icon name="info-circle" type="font-awesome" color={colors.white}/>
          </View>

          { 
            values.payment_portal ? 
              <View style={styles.textRow} zIndex={0}>
                <Text style={styles.label}></Text>
                <Input
                  onChangeText={this.props.formik.handleChange('payment_url')}
                  onBlur={this.props.formik.handleBlur('payment_url')}
                  value={values.payment_url}
                  keyboardType='url'
                  textContentType='URL'
                  inputStyle={styles.label}
                  blurOnSubmit={false}
                  containerStyle={styles.mediumInput}
                  inputContainerStyle={styles.inputContainer}/>
				  <Tooltip 
					  popover={<Text style={styles.promptText}>{FieldInfo.paymentPortal}</Text>} 
					  width={450}
					  height={75}
					  backgroundColor={colors.black}>
					  <Icon name="info-circle" type="font-awesome" color={colors.black}/>
				  </Tooltip>
              </View>
			  :
			  null
          }

          <Divider />

          <Text style={styles.sectionHeaderText}>General Information</Text>
          <View style={styles.textRow}>
            <Text style={styles.label}>{"PO's Required?"}</Text>
            <CheckBox 
              checked={values.po_required}
              onPress={( ) => this.props.formik.setFieldValue('po_required', !values.po_required)}
              size={36}
              containerStyle={styles.checkbox}
              checkedColor={colors.green}/>
			  <Tooltip 
				  popover={<Text style={styles.promptText}>{FieldInfo.poRequired}</Text>} 
				  width={450}
				  height={60}
				  backgroundColor={colors.black}>
				  <Icon name="info-circle" type="font-awesome" color={colors.black}/>
			  </Tooltip>
          </View>
          <View style={styles.textRow}>
            <Text style={styles.label}>Are PO's Required for Invoice Submittal?</Text>
            <CheckBox 
              checked={values.invoice_req_pos}
              onPress={( ) => this.props.formik.setFieldValue('invoice_req_pos', !values.invoice_req_pos)}
              size={36}
              containerStyle={styles.checkbox}
              checkedColor={colors.green}/>
			<Tooltip 
				popover={<Text style={styles.promptText}>{FieldInfo.poInvoice}</Text>} 
				width={450}
				height={75}
				backgroundColor={colors.black}>
				<Icon name="info-circle" type="font-awesome" color={colors.black}/>
			</Tooltip>
          </View>
          <View style={styles.textRow}>
            <Text style={styles.label}>Approvals Required?</Text>
            <CheckBox 
              checked={values.approvals_req}
              onPress={( ) => this.props.formik.setFieldValue('approvals_req', !values.approvals_req)}
              size={36}
              containerStyle={styles.checkbox}
              checkedColor={colors.green}/>
			  <Tooltip 
				  popover={<Text style={styles.promptText}>{FieldInfo.approvalsReq}</Text>} 
				  width={450}
				  height={75}
				  backgroundColor={colors.black}>
				  <Icon name="info-circle" type="font-awesome" color={colors.black}/>
			  </Tooltip>
          </View>

          <Divider/>

          <Text style={styles.sectionHeaderText}>Contact Information</Text>
          <View style={styles.textRow}>
            <Text style={styles.label}>Full Name</Text>
            <Input
              onChangeText={this.props.formik.handleChange('acc_cont_name')}
              autoCapitalize='none'
              blurOnSubmit={false}
              inputStyle={styles.label}
              containerStyle={styles.smallInput}
              inputContainerStyle={styles.inputContainer}/>
            <Icon name="info-circle" type="font-awesome" color={colors.white}/>
          </View>
          <View style={styles.textRow}>
            <Text style={styles.label}>Phone #</Text>
            <Input
              onChangeText={this.props.formik.handleChange('acc_cont_phn')}
              autoCapitalize='none'
              blurOnSubmit={false}
              inputStyle={styles.label}
              containerStyle={styles.smallInput}
              inputContainerStyle={styles.inputContainer}/>
            <Icon name="info-circle" type="font-awesome" color={colors.white}/>
          </View>
          <View style={styles.textRow}>
            <Text style={styles.label}>Email Address</Text>
            <Input
              onChangeText={this.props.formik.handleChange('acc_cont_ema')}
              autoCapitalize='none'
              blurOnSubmit={false}
              inputStyle={styles.label}
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
              onPress={( ) => this.filePicker(this.props.client)} />
            <Tooltip 
              popover={<Text style={styles.promptText}>{FieldInfo.expFiles}</Text>} 
              width={450}
              height={75}
              backgroundColor={colors.black}>
              <Icon name="info-circle" type="font-awesome" color={colors.black}/>
            </Tooltip>
          </View>

          <View style={styles.textRow}>
            <Text style={styles.label}>Vendor Portal</Text>
            <Input
              onChangeText={this.props.formik.handleChange('vendor_portal')}
              onBlur={this.props.formik.handleBlur('vendor_portal')}
              value={values.vendor_portal}
              autoCapitalize='none'
              keyboardType='url'
              textContentType='URL'
              inputStyle={styles.label}
              blurOnSubmit={false}
              containerStyle={styles.mediumInput}
              inputContainerStyle={styles.inputContainer} />
            <Icon name="info-circle" type="font-awesome" color={colors.white}/>
          </View>
          
          <View style={styles.textRow} zIndex={0}>
            <Text style={styles.label}></Text>
            <Input
              onChangeText={this.props.formik.handleChange('vnd_portal_user')}
              onBlur={this.props.formik.handleBlur('vnd_portal_user')}
              value={values.vnd_portal_user}
              placeholder="Portal Username"
              inputStyle={styles.label}
              blurOnSubmit={false}
              containerStyle={styles.smallInput}
              inputContainerStyle={styles.inputContainer}/>
            <Icon name="info-circle" type="font-awesome" color={colors.white}/>
          </View>
          <View style={styles.textRow} zIndex={0}>
            <Text style={styles.label}></Text>
            <Input
              onChangeText={this.props.formik.handleChange('vnd_portal_pswd')}
              onBlur={this.props.formik.handleBlur('vnd_portal_pswd')}
              value={values.vnd_portal_pswd}
              placeholder="Portal Password"
              inputStyle={styles.label}
              blurOnSubmit={false}
              containerStyle={styles.smallInput}
              inputContainerStyle={styles.inputContainer}/>
            <Icon name="info-circle" type="font-awesome" color={colors.white}/>
          </View>

          <View style={styles.textRow} zIndex={1}>
            <Text style={styles.label}>How are jobs released?</Text>
            <DropDownPicker
              placeholder="Choose..."
              items={this.state.releasedOptions}
              defaultValue={values.job_release}
              containerStyle={styles.dropdown}
              dropDownStyle={styles.dropdownMenu}
              labelStyle={styles.dropdownItem}
              zIndex={1}
              itemStyle={styles.dropdownItem}
              onChangeItem={item => this.props.formik.setFieldValue('job_release', item.value)}/>
			  <Tooltip 
				  popover={<Text style={styles.promptText}>{FieldInfo.jobsReleased}</Text>} 
				  width={450}
				  height={60}
				  backgroundColor={colors.black}>
				  <Icon name="info-circle" type="font-awesome" color={colors.black}/>
			  </Tooltip>
          </View>

          { 
            (values.job_release === "Email") ? 
              <View style={styles.textRow} zIndex={0}>
                <Text style={styles.label}></Text>
                <Input
                  onChangeText={this.props.formik.handleChange('job_email')}
                  onBlur={this.props.formik.handleBlur('job_email')}
                  value={values.job_email}
                  placeholder="Email"
                  blurOnSubmit={false}
                  inputStyle={styles.label}
                  containerStyle={styles.mediumInput}
                  inputContainerStyle={styles.inputContainer}/>
                <Icon name="info-circle" type="font-awesome" color={colors.white}/>
              </View>
            :
              null
          }

          
          <View style={styles.textRow} zIndex={0}>
            <Text style={styles.label}>PO Correction Handling?</Text>
            <CheckBox 
              checked={values.po_handling}
              onPress={( ) => this.props.formik.setFieldValue('po_handling', !values.po_handling)}
              size={36}
              containerStyle={styles.checkbox}
              checkedColor={colors.green}/>
			  <Tooltip 
				  popover={<Text style={styles.promptText}>{FieldInfo.poCorrection}</Text>} 
				  width={450}
				  height={75}
				  backgroundColor={colors.black}>
				  <Icon name="info-circle" type="font-awesome" color={colors.black}/>
			  </Tooltip>
          </View>

          { 
            values.po_handling ?
              <View style={styles.textRow} zIndex={0}>
                <Text style={styles.label}></Text>
                <Input
                  onChangeText={this.props.formik.handleChange('po_hndl_email')}
                  onBlur={this.props.formik.handleBlur('po_hndl_email')}
                  value={values.po_hndl_email}
                  placeholder="Email"
                  blurOnSubmit={false}
                  inputStyle={styles.label}
                  containerStyle={styles.mediumInput}
                  inputContainerStyle={styles.inputContainer}/>
                <Icon name="info-circle" type="font-awesome" color={colors.white}/>
              </View>
			  :
			  null
          }

          <View style={styles.textRow} zIndex={0}>
            <Text style={styles.label}>Expected Start Date</Text>
            <Input
              onChangeText={this.props.formik.handleChange('exp_start_date')}
              onBlur={this.props.formik.handleBlur('exp_start_date')}
              value={values.exp_start_date}
              inputStyle={styles.label}
              blurOnSubmit={false}
              zIndex={0}
              containerStyle={styles.smallInput}
              inputContainerStyle={styles.inputContainer} />
            <Icon name="info-circle" type="font-awesome" color={colors.white}/>
          </View>

          <View style={styles.textRow} zIndex={0}>
            <Text style={styles.label}>Estimated Number of Homes?</Text>
            <Input
              onChangeText={this.props.formik.handleChange('est_num_homes')}
              onBlur={this.props.formik.handleBlur('est_num_homes')}
              value={values.est_num_homes}
              inputStyle={styles.label}
              blurOnSubmit={false}
              zIndex={0}
              containerStyle={styles.smallInput}
              inputContainerStyle={styles.inputContainer} />
            <Icon name="info-circle" type="font-awesome" color={colors.white}/>
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