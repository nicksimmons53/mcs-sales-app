// Library Imports
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import { Divider } from 'react-native-elements';
import * as FileSystem from 'expo-file-system';
import DocumentPicker from 'react-native-document-picker';
import DropdownRow from '../Components/DropdownRow';
import Toast from 'react-native-easy-toast';
import { FieldInfo } from '../form/Values.form';
import { styles, colors } from './Styles/Form.style';
import { SmallInputRow, MediumInputRow } from '../Components/InputRow';
import CheckboxRow from '../Components/CheckboxRow';
import ButtonRow from '../Components/ButtonRow';

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
        console.log(response.status);
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
    let formik = this.props.formik; 
    
    return (
      <View style={styles.background}>
        <View style={styles.form}>
          <Text style={styles.headerText}>Accounting Information</Text>
          <Divider />

          <Text style={styles.sectionHeaderText}>Payment Information</Text>

          <DropdownRow
            title="Payment Frequency"
            choices={this.state.frequencyOptions}
            formik={formik}
            fieldName="payment_freq"
            zIndex={3}
            tooltip={true}
            tooltipHeight={75}
            popover={FieldInfo.paymentFrequency}/>

          <CheckboxRow
            zIndex={0}
            label="Autopay"
            fieldName="autopay"
            formik={this.props.formik}
            defaultValue={values.autopay}
            tooltip={true}
            popover={FieldInfo.autopay}
            tooltipHeight={150}/>

          <DropdownRow
            title="How are Invoices Submitted?"
            choices={this.state.submitOptions}
            formik={formik}
            fieldName="invoice_submit"
            zIndex={2}
            tooltip={true}
            tooltipHeight={90}
            popover={FieldInfo.invoiceSubmit}/>

          { 
            (values.invoice_submit === "Email") ? 
              <SmallInputRow
                zIndex={0}
                fieldName="invoice_email"
                placeholder="Email"
                formik={this.props.formik}
                tooltip={false}/>
            :
              null
          }

          {    
            (values.invoice_submit === "Mail" || values.invoice_submit === "Drop-Off") ?
              <>
                <SmallInputRow
                  zIndex={0}
                  fieldName="invoice_addr"
                  placeholder="Street Address"
                  formik={this.props.formik}
                  tooltip={false}/>
                <SmallInputRow
                  zIndex={0}
                  fieldName="invoice_city"
                  placeholder="City"
                  formik={this.props.formik}
                  tooltip={false}/>
                <SmallInputRow
                  zIndex={0}
                  fieldName="invoice_state"
                  placeholder="State"
                  formik={this.props.formik}
                  tooltip={false}/>
                <SmallInputRow
                  zIndex={0}
                  fieldName="invoice_zip"
                  placeholder="Zip Code"
                  formik={this.props.formik}
                  tooltip={false}/>
              </>
            :
              null
          }

          <DropdownRow
            title="Payment Type"
            choices={this.state.paymentOptions}
            formik={formik}
            fieldName="payment_type"
            zIndex={1}
            tooltip={true}
            tooltipHeight={75}
            popover={FieldInfo.paymentType}/>

          <CheckboxRow
            zIndex={0}
            label="Payment Portal"
            fieldName="payment_portal"
            formik={formik}
            defaultValue={values.payment_portal}
            tooltip={false}/>

          { 
            values.payment_portal ? 
              <MediumInputRow
                zIndex={0}
                fieldName="payment_url"
                placeholder="URL"
                formik={this.props.formik}
                tooltip={true}
                popover={FieldInfo.paymentPortal}
                tooltipHeight={75}/>
			      :
			        null
          }

          <Divider />

          <CheckboxRow
            zIndex={0}
            label="PO's Required"
            fieldName="po_required"
            formik={formik}
            defaultValue={values.po_required}
            tooltip={true}
            popover={FieldInfo.poRequired}
            tooltipHeight={60}/>

          <CheckboxRow
            zIndex={0}
            label="Are PO's Required for Invoice Submittal?"
            fieldName="invoice_req_pos"
            formik={this.props.formik}
            defaultValue={values.invoice_req_pos}
            tooltip={true}
            popover={FieldInfo.poInvoice}
            tooltipHeight={75}/>
          
          <CheckboxRow
            zIndex={0}
            label="Approvals Required?"
            fieldName="approvals_req"
            formik={formik}
            defaultValue={values.approvals_req}
            tooltip={true}
            popover={FieldInfo.approvalsReq}
            tooltipHeight={75}/>

          <Divider/>

          <Text style={styles.sectionHeaderText}>Contact Information</Text>

          <SmallInputRow
            zIndex={0}
            fieldName="acc_cont_name"
            label="Full Name"
            tooltip={false}
            formik={this.props.formik}/>
          <SmallInputRow
            zIndex={0}
            fieldName="acc_cont_phn"
            label="Phone #"
            tooltip={false}
            formik={this.props.formik}/>
          <MediumInputRow
            zIndex={0}
            fieldName="acc_cont_ema"
            label="Email Address"
            tooltip={false}
            formik={this.props.formik}/>
        </View>

        <View style={styles.form}>
          <Text style={styles.headerText}>Expediting Information</Text>

          <Divider />

          <ButtonRow
            label="File Attachment"
            iconName="paperclip"
            title="Attach Files"
            popover={FieldInfo.expFiles}
            tooltip={true}
            tooltipHeight={75}
            onPress={( ) => this.filePicker(this.props.client)}/>
          
          <MediumInputRow
            zIndex={0}
            fieldName="vendor_portal"
            label="Vendor Portal"
            tooltip={false}
            formik={this.props.formik}/>
          <SmallInputRow
            zIndex={0}
            fieldName="vnd_portal_user"
            placeholder="Portal Username"
            tooltip={false}
            formik={this.props.formik}/>
          <SmallInputRow
            zIndex={0}
            fieldName="vnd_portal_pswd"
            placeholder="Portal Password"
            tooltip={false}
            formik={this.props.formik}/>

          <DropdownRow
            title="How are Jobs Released?"
            choices={this.state.releasedOptions}
            formik={formik}
            fieldName="job_release"
            zIndex={1}
            tooltip={true}
            tooltipHeight={60}
            popover={FieldInfo.jobsReleased}/>

          { 
            (values.job_release === "Email") ?
              <MediumInputRow
                zIndex={0}
                fieldName="job_email"
                placeholder="Email"
                tooltip={false}
                formik={this.props.formik}/> 
            :
              null
          }

          <CheckboxRow
            zIndex={0}
            label="PO Correction Handling?"
            fieldName="po_handling"
            formik={formik}
            defaultValue={values.po_handling}
            tooltip={true}
            popover={FieldInfo.poCorrection}
            tooltipHeight={75}/>

          { 
            values.po_handling ?
              <MediumInputRow
                zIndex={0}
                fieldName="po_hndl_email"
                placeholder="Email"
                tooltip={false}
                formik={this.props.formik}/>
			      :
			        null
          }

          <SmallInputRow
            zIndex={0}
            label="Expected Start Date"
            fieldName="exp_start_date"
            tooltip={false}
            formik={this.props.formik}/>
          
          <SmallInputRow
            zIndex={0}
            label="Estimated Number of Homes?"
            fieldName="est_num_homes"
            tooltip={false}
            formik={this.props.formik}/>

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