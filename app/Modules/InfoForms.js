// Library Imports
import React from 'react';
import {
  Text,
  View
} from 'react-native';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import { Divider } from 'native-base';
import { DetailInfo } from '../form/tooltip/values';
import Input from '../components/Input';
import Dropdown from '../components/Dropdown';
import DateModal from '../components/DateModal';
import ChipInput from '../components/ChipInput';
import { 
  states, 
  territories, 
  yesOrNo, 
  jobReleaseChoices,
  paymentFrequency,
  paymentType
} from '../form/dropdown/values';
import ToolTip from '../components/ToolTip';
import colors from '../Library/Colors';

let zIndex = 100000;

export const BasicInfo = (props) => {
  let info;
  let addresses = {};

  if (typeof props.defaultValues !== "undefined") {
    info = props.defaultValues.client;
    addresses = props.defaultValues.addresses.reduce(
      (object, item) => Object.assign(object, { [item.type]: item }), {}
    );
  } else {
    addresses.Corporate;
    addresses.Billing;
    addresses.Shipping;
  }

  return (
    <View style={styles.formRoot}>
      <View style={styles.form}>
        <Text style={styles.label}>Legal Name</Text>

        <Divider/>
        
        <Input 
          label="Client Name" 
          control={props.control} 
          field="info.name" 
          defaultValue={typeof info !== "undefined" ? info.name : ""}
          errors={props.errors}/>
      </View>

      <View style={{...styles.form, zIndex: 4}}>
        <Text style={styles.label}>Territory</Text>

        <Divider/>
        
        <Dropdown 
          label="Regional City" 
          items={territories} 
          control={props.control} 
          field="info.territory" 
          defaultValue={typeof info !== "undefined" ? info.territory : ""}
          errors={props.errors} 
          zIndex={zIndex-=1}/>
      </View>

      <View style={{...styles.form, zIndex: 3}}>
        <Text style={styles.label}>Corporate Address</Text>

        <Divider/>

        <Input 
          label="Address 1" 
          control={props.control} 
          field="addresses.Corporate.address1" 
          defaultValue={typeof addresses.Corporate !== "undefined" ? addresses.Corporate.address1 : ""}
          errors={props.errors}/>
        <Input 
          label="Address 2" 
          control={props.control} 
          field="addresses.Corporate.address2" 
          defaultValue={typeof addresses.Corporate !== "undefined" ? addresses.Corporate.address2 : ""}
          errors={props.errors}/>
        <View style={{ flexDirection: 'row'}}>
          <Input 
            label="City" 
            control={props.control} 
            field="addresses.Corporate.city" 
            defaultValue={typeof addresses.Corporate !== "undefined" ? addresses.Corporate.city : ""}
            errors={props.errors}/>
          <View style={{ width: '15%'}}>
            <Dropdown 
              label="State" items={states} 
              control={props.control} 
              field="addresses.Corporate.state" 
              defaultValue={typeof addresses.Corporate !== "undefined" ? addresses.Corporate.state : ""}
              errors={props.errors} 
              zIndex={zIndex-=1}/>
          </View>
          <Input 
            label="Zip" 
            control={props.control} 
            field="addresses.Corporate.zip" 
            defaultValue={typeof addresses.Corporate !== "undefined" ? addresses.Corporate.zip : ""}
            errors={props.errors}/>
        </View>
      </View>

      <View style={{...styles.form, zIndex: 2}}>
        <Text style={styles.label}>Billing Address</Text>

        <Divider/>
        
        <Input 
          label="Address 1" 
          control={props.control} 
          field="addresses.Billing.address1" 
          defaultValue={typeof addresses.Billing !== "undefined" ? addresses.Billing.address1 : ""}
          errors={props.errors}/>
        <Input 
          label="Address 2" 
          control={props.control} 
          field="addresses.Billing.address2" 
          defaultValue={typeof addresses.Billing !== "undefined" ? addresses.Billing.address2 : ""}
          errors={props.errors}/>
        <View style={{ flexDirection: 'row' }}>
          <Input 
            label="City" 
            control={props.control} 
            field="addresses.Billing.city" 
            defaultValue={typeof addresses.Billing !== "undefined" ? addresses.Billing.city : ""}
            errors={props.errors}/>
          <View style={{ width: '15%'}}>
            <Dropdown 
              label="State" 
              items={states} 
              control={props.control} 
              field="addresses.Billing.state" 
              defaultValue={typeof addresses.Billing !== "undefined" ? addresses.Billing.zip : ""}
              errors={props.errors} 
              zIndex={zIndex-=1}/>
          </View>
          <Input 
            label="Zip" 
            control={props.control} 
            field="addresses.Billing.zip" 
            defaultValue={typeof addresses.Billing !== "undefined" ? addresses.Billing.state : ""}
            defaultValue="" 
            errors={props.errors}/>
        </View>
      </View>

      <View style={{...styles.form, zIndex: 1}}>
        <Text style={styles.label}>Shipping Address</Text>

        <Divider/>
        
        <Input 
          label="Address 1" 
          control={props.control} 
          field="addresses.Shipping.address1" 
          defaultValue={typeof addresses.Shipping !== "undefined" ? addresses.Shipping.address1 : ""}
          errors={props.errors}/>
        <Input 
        label="Address 2" 
        control={props.control} 
        field="addresses.Shipping.address2" 
        defaultValue={typeof addresses.Shipping !== "undefined" ? addresses.Shipping.address2 : ""}
        errors={props.errors}/>
        <View style={{ flexDirection: 'row' }}>
          <Input 
            label="City" 
            control={props.control} 
            field="addresses.Shipping.city" 
            defaultValue={typeof addresses.Shipping !== "undefined" ? addresses.Shipping.city : ""}
            errors={props.errors}/>
          <View style={{ width: '15%'}}>
            <Dropdown 
              label="State" 
              items={states} 
              control={props.control} 
              field="addresses.Shipping.state" 
              defaultValue={typeof addresses.Shipping !== "undefined" ? addresses.Shipping.state : ""}
              errors={props.errors} 
              zIndex={zIndex-=1}/>
          </View>
          <Input 
            label="Zip" 
            control={props.control} 
            field="addresses.Shipping.zip" 
            defaultValue={typeof addresses.Shipping !== "undefined" ? addresses.Shipping.zip : ""}
            errors={props.errors}/>
        </View>
      </View>

      <View style={{...styles.buttonView, zIndex: 0}}>
        <Button
          title='SAVE'
          disabled={props.disableSave}
          buttonStyle={styles.save}
          containerStyle={styles.saveButtonContainer}
          onPress={props.handleSubmit(props.onSubmit, props.onErrors)}/>
      </View>
    </View>
  )
};

export const ClientDetails = (props) => (
  <>
  <View style={styles.formRoot}>
      <View style={{...styles.form, width: '80%'}}>
      <Text style={styles.label}>Accounting Information</Text>

      <Divider/>

      <View style={{ flex: 1, flexDirection: 'row', zIndex: 100 }}>
        <View style={{ flex: 1, flexDirection: 'column' }}>
          <Dropdown 
            label="Payment Frequency" 
            items={paymentFrequency} 
            control={props.control} 
            field="accounting.paymentFrequency" 
            defaultValue={props.details.accounting_details.paymentFrequency || ""} 
            errors={props.errors}
            zIndex={zIndex-=1}
            rightIcon={<ToolTip popover={DetailInfo.paymentFrequency} height={75} width={325}/>}/>
          <Dropdown 
            label="Auto Pay" 
            items={yesOrNo} 
            control={props.control} 
            field="accounting.autopay" 
            defaultValue={props.details.accounting_details.autopay || null}
            errors={props.errors}
            zIndex={zIndex-=1}
            rightIcon={<ToolTip popover={DetailInfo.autopay} height={125} width={525}/>}/>
          <View style={{ flex: 1, width: '100%'}}>
            <Input 
              label="Email for Submitting Invoices" 
              control={props.control} 
              field="accounting.invoiceEmailAddress" 
              defaultValue={props.details.accounting_details.invoiceEmailAddress || ""}
              errors={props.errors}
              zIndex={zIndex-=1}
              options={{ autoCapitalize: 'none', keyboardType: 'email-address' }}/>
          </View>
          <Dropdown 
            label="Payment Type" 
            items={paymentType} 
            control={props.control} 
            field="accounting.paymentType" 
            defaultValue={props.details.accounting_details.paymentType || ""}
            errors={props.errors}
            zIndex={zIndex-=1}
            rightIcon={<ToolTip popover={DetailInfo.paymentType} height={75} width={400}/>}/>
          <Dropdown 
            label="Payment Portal" 
            items={yesOrNo} 
            control={props.control} 
            field="accounting.paymentPortal" 
            defaultValue={props.details.accounting_details.paymentPortal || null}
            errors={props.errors}
            zIndex={zIndex-=1}/>

          <View style={{ flex: 1, width: 300 }}>
            <Input 
              label="Portal URL" 
              control={props.control} 
              field="accounting.paymentURL" 
              defaultValue={props.details.accounting_details.paymentURL || ""}
              errors={props.errors}
              mutliline={true}
              zIndex={zIndex-=1}
              options={{ autoCapitalize: 'none', keyboardType: 'url' }}/>
          </View>
        </View>

        <Divider orientation="vertical" style={{ margin: 10 }}/>

        <View style={{ flex: 1, flexDirection: 'column' }}>
          <Dropdown 
            label="PO's Required" 
            items={yesOrNo} 
            control={props.control} 
            field="accounting.poRequired" 
            defaultValue={props.details.accounting_details.poRequired || null}
            errors={props.errors}
            zIndex={zIndex-=1}
            rightIcon={<ToolTip popover={DetailInfo.poRequired} height={50} width={325}/>}/>
          <Dropdown 
            label="PO's Required for Invoices" 
            items={yesOrNo} 
            control={props.control} 
            field="accounting.poInvoiceRequired" 
            defaultValue={props.details.accounting_details.poInvoiceRequired || null}
            errors={props.errors}
            zIndex={zIndex-=1}
            rightIcon={<ToolTip popover={DetailInfo.poInvoiceRequired} height={75} width={350}/>}/>
          <Dropdown 
            label="Approval's Required?" 
            items={yesOrNo} 
            control={props.control} 
            field="accounting.approvalsRequired" 
            defaultValue={props.details.accounting_details.approvalsRequired || null}
            errors={props.errors}
            zIndex={zIndex-=1}
            rightIcon={<ToolTip popover={DetailInfo.approvalsRequired} height={75} width={425}/>}/>
          <Dropdown 
            label="Have you attached the contract?" 
            items={yesOrNo} 
            control={props.control} 
            field="accounting.contractAttached" 
            defaultValue={props.details.accounting_details.contractAttached || null}
            errors={props.errors}
            zIndex={zIndex-=1}/>
        </View>
      </View>
      
      <Divider style={{ marginVertical: 20, zIndex: 99 }}/>
      
      <Text style={styles.label}>Accounting Contact Details</Text>

      <Divider style={{ marginBottom: 10 }}/>

      <View style={{ flexDirection: 'row', width: '100%', zIndex: 99 }}>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <Input 
            label="Contact Name" 
            control={props.control} field="accounting.contactName" 
            defaultValue={props.details.accounting_details.contactName || ""}
            errors={props.errors}
            options={{ autoCapitalize: 'words' }}/>
          <Input 
            label="Contact Phone" 
            control={props.control} field="accounting.contactPhone" 
            defaultValue={props.details.accounting_details.contactPhone || ""}
            errors={props.errors}
            options={{ keyboardType: 'phone-pad' }}/>
          <Input 
            label="Contact Email" 
            control={props.control} 
            field="accounting.contactEmail" 
            defaultValue={props.details.accounting_details.contactEmail || ""}
            errors={props.errors}
            options={{ autoCapitalize: 'none', keyboardType: 'email-address' }}/>
        </View>
      </View>
    
      <Divider style={{ marginVertical: 20 }}/>
      
      <Text style={styles.label}>Accounting Files</Text>

      <Divider style={{ marginBottom: 10 }}/>

      <View style={{ alignItems: 'center', width: '100%' }}>
        <Button
          title='Attach Files'
          containerStyle={styles.attachButtonContainer}
          buttonStyle={styles.attach}
          containerStyle={styles.saveButtonContainer}
          onPress={( ) => props.addFile( )}/>
      </View>
      
      <Divider style={{ marginVertical: 20 }}/>
      
      <Text style={styles.label}>Accounting General Information</Text>

      <Divider style={{ marginBottom: 10 }}/>

      <View style={{ flexDirection: 'row', width: '100%' }}>
        <Input 
          label="Notes" 
          control={props.control} 
          field="accounting.notes" 
          defaultValue={props.details.accounting_details.notes || ""}
          errors={props.errors}
          mutliline={true}
          zIndex={zIndex-=1}
          options= {{ maxLength: 250 }}/>
      </View>
    </View>
  </View>

  <View style={styles.formRoot}>
      <View style={{...styles.form, width: '80%', zIndex: 3}}>
        
      <Text style={styles.label}>Expediting Information</Text>

      <Divider/>

      <View style={{ flex: 1, flexDirection: 'row' }}>
        <View style={{ flex: 1, flexDirection: 'column' }}>
          <Dropdown 
            label="Is there a Vendor Portal?" 
            items={yesOrNo} 
            control={props.control} 
            field="expediting.vendorPortal" 
            defaultValue={props.details.expediting_details.vendorPortal || null} 
            errors={props.errors}
            zIndex={zIndex-=1}/>
          <Input 
            label="Vendor Portal URL" 
            control={props.control} 
            field="expediting.vendorPortalURL" 
            defaultValue={props.details.expediting_details.vendorPortalURL || ""}
            errors={props.errors}
            mutliline={true}
            zIndex={zIndex-=1}
            options={{ autoCapitalize: 'none', keyboardType: 'url' }}/>
          <Dropdown 
            label="Has the Vendor Portal Account been created?" 
            items={yesOrNo} 
            control={props.control} 
            field="expediting.portalAccountCreated" 
            defaultValue={props.details.expediting_details.portalAccountCreated || null}
            errors={props.errors}
            zIndex={zIndex-=1}/>
          <Input 
            label="Portal Username" 
            control={props.control} 
            field="expediting.portalUsername" 
            defaultValue={props.details.expediting_details.portalUsername || null}
            errors={props.errors}
            mutliline={true}
            zIndex={zIndex-=1}
            options={{ autoCapitalize: 'none' }}/>
          <Input 
            label="Portal Password" 
            control={props.control} 
            field="expediting.portalPassword" 
            defaultValue={props.details.expediting_details.portalPassword || ""}
            errors={props.errors}
            mutliline={true}
            zIndex={zIndex-=1}
            options={{ autoCapitalize: 'none' }}/>
        </View>

        <Divider orientation="vertical" style={{ margin: 10 }}/>

        <View style={{ flex: 1, flexDirection: 'column' }}>
          <Dropdown 
            label="How are jobs released?" 
            items={jobReleaseChoices} 
            control={props.control} 
            field="expediting.jobReleaseMethod" 
            defaultValue={props.details.expediting_details.jobReleaseMethod || ""}
            errors={props.errors}
            zIndex={zIndex-=1}
            rightIcon={<ToolTip popover={DetailInfo.jobReleaseMethod} height={50} width={400}/>}/>
          <Dropdown 
            label="PO Correction Handling?" 
            items={yesOrNo} 
            control={props.control} 
            field="expediting.poErrorHandling" 
            defaultValue={props.details.expediting_details.poErrorHandling || null}
            errors={props.errors}
            zIndex={zIndex-=1}
            rightIcon={<ToolTip popover={DetailInfo.poErrorHandling} height={75} width={450}/>}/>
          <Input 
            label="Estimated Number of Homes per Year" 
            control={props.control} 
            field="expediting.estimatedHomes"
            defaultValue={props.details.expediting_details.estimatedHomes || null}
            errors={props.errors}
            zIndex={zIndex-=1}
            options={{ keyboardType: 'numeric' }}/>
          <DateModal
            control={props.control}
            defaultValue={props.details.expediting_details.estimatedStartDate || null}
            field="expediting.estimatedStartDate"/>
        </View>
      </View>
      
      <Divider style={{ marginVertical: 20 }}/>
      
      <Text style={styles.label}>Programs Selected</Text>

      <Divider style={{ marginBottom: 10 }}/>

      <View style={{ flexDirection: 'row', flexWrap: 'wrap', width: '100%', height: 75 }}>
        <ChipInput 
          title="Cabinets"
          control={props.control}
          field="programs.cabinets"
          defaultValue={props.programs.cabinets || 0}/>
        <ChipInput 
          title="Carpet"
          control={props.control}
          field="programs.carpet"
          defaultValue={props.programs.carpet || 0}/>
        <ChipInput 
          title="Countertops"
          control={props.control}
          field="programs.countertops"
          defaultValue={props.programs.countertops || 0}/>
        <ChipInput 
          title="Tile"
          control={props.control}
          field="programs.tile"
          defaultValue={props.programs.tile || 0}/>
        <ChipInput 
          title="Vinyl"
          control={props.control}
          field="programs.vinyl"
          defaultValue={props.programs.vinyl || 0}/>
        <ChipInput 
          title="Wood"
          control={props.control}
          field="programs.wood"
          defaultValue={props.programs.wood || 0}/>
      </View>
      
      <Divider style={{ marginVertical: 20 }}/>
      
      <Text style={styles.label}>Expediting Files</Text>

      <Divider style={{ marginBottom: 10 }}/>

      <View style={{ alignItems: 'center', width: '100%'}}>
        <Button
          title='Attach Files'
          containerStyle={styles.attachButtonContainer}
          buttonStyle={styles.attach}
          containerStyle={styles.saveButtonContainer}
          onPress={( ) => props.addFile( )}/>
      </View>
      
      <Divider style={{ marginVertical: 20 }}/>
      
      <Text style={styles.label}>Expediting General Information</Text>

      <Divider style={{ marginBottom: 10 }}/>

      <View style={{ flexDirection: 'row', width: '100%' }}>
        <Input 
          label="Notes" 
          control={props.control}
          field="expediting.notes" 
          defaultValue={props.details.expediting_details.notes || ""}
          errors={props.errors}
          mutliline={true}
          zIndex={zIndex-=1}
          options={{ maxLength: 250 }}/>
      </View> 
    </View>
	
    <View style={{...styles.buttonView, zIndex: 0}}>
      <Button
        title='SAVE'
        disabled={props.disableSave}
        buttonStyle={styles.save}
        containerStyle={styles.saveButtonContainer}
        onPress={props.handleSubmit(props.onSubmit, props.onErrors)}/>
    </View>
  </View>
  </>
);

const styles = StyleSheet.create({
  // Background
  background: {
    backgroundColor: colors.black,
    flex: 1,
    paddingTop: 25,
    width: '100%'
  },

  // Row
  row: {
    flex: 1,
    flexDirection: 'row'
  },

  // Info Container
  infoContainer: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    height: '100%',
    width: '100%',
  },

  // form
  formRoot: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  form: {
    backgroundColor: colors.white,
    borderRadius: 3,
    margin: 10,
    padding: 20,
    width: '75%'
  },
  label: {
    fontFamily: 'OpenSans',
    flex: 1,
    fontSize: 18,
    paddingRight: 30,
    color: colors.black
  },

  // ScrollView
  sv: {
    backgroundColor: colors.light_grey,
  },

  // Buttons
  buttonView: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  attachButtonContainer: {
    height: 100,
    width: 150,
  },
  attach: {
    backgroundColor: colors.black,  
  },
  saveButtonContainer: {
    width: 350,
    margin: 40,
    marginTop: 20,
  },
  save: {
    backgroundColor: colors.green,
  }
});