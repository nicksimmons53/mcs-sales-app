// Library Imports
import React from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  Text,
  View
} from 'react-native';
import { Button } from 'react-native-elements';
import { Divider } from 'native-base';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import schema from '../form/yup/schema';

import Header from '../components/Header';
import { styles } from './Styles/ClientForm.style';
import { DetailInfo } from '../form/tooltip/values';
import { StatusBar } from 'react-native';
import FloatingButton from '../components/FloatingButton';
import Snack from '../components/Snack';
import Dropdown from '../components/Dropdown';
import Input from '../components/Input';
import { yesOrNo, paymentFrequency, paymentType, jobReleaseChoices } from '../form/dropdown/values';
import ToolTip from '../components/ToolTip';
import DateModal from '../components/DateModal';
import ChipInput from '../components/ChipInput';
import { updateClientDetails, resetDetails, updateClientPrograms } from '../features/clients/clientsSlice';

let zIndex = 5000;

// Class Component that will display client creation form
function AdvInfoForm(navigation) {
	const dispatch = useDispatch( );
	let clientId = useSelector((state) => state.clients.selected.id);
	let details = useSelector((state) => state.clients.details);
	let programs = useSelector((state) => state.clients.programs.entities);

	const [ snackMessage, setSnackMessage ] = React.useState(null);
	const [ visible, setVisible ] = React.useState(false);
	const [ disableSave, setDisableSave ] = React.useState(false);
	const [ error, setError ] = React.useState(false);
	const { control, handleSubmit, formState: { errors } } = useForm({
		resolver: yupResolver(schema.advancedInfo)
	});

	// Saving Accounting/Expediting Information
	const onSubmit = async(values, actions) => {
		setDisableSave(true);
		
		let responses = [];
		let queryValues = { type: "accounting", id: clientId, values: values.accounting };
		responses.push(await dispatch(updateClientDetails(queryValues)));

		values.expediting.estimatedStartDate = values.expediting.estimatedStartDate.toISOString( ).slice(0, 19).replace('T', ' ');
		queryValues = { type: "expediting", id: clientId, values: values.expediting};
		responses.push(await dispatch(updateClientDetails(queryValues)));

		queryValues = { values: values.programs, clientId: clientId };
		responses.push(await dispatch(updateClientPrograms(queryValues)));

		console.log(responses)
		responses.forEach((response) => {
			if (response.payload < 200 || response.payload > 299) {
				setError(true);
				setSnackMessage("There was an error saving Client Details. Please try again.");
				setDisableSave(false);

				return;
			}
		});

		if (error !== true) {
			setSnackMessage(`Client Details were saved successfully.`);
		}
	
		setVisible(true);
	}

  function findAllByKey(obj, keyToFind) {
    return Object.entries(obj)
      .reduce((acc, [key, value]) => (key === keyToFind)
        ? acc.concat(value)
        : (typeof value === 'object')
        ? acc.concat(findAllByKey(value, keyToFind))
        : acc
      , [])
  }

	const onErrors = errors => {
    let errorMessage = findAllByKey(errors, 'message').join('\n');

    setDisableSave(true);

    setSnackMessage(errorMessage);

    setError(true);

    setVisible(true);

    setDisableSave(false);
	}

	const snackbarDismiss = ( ) => {
		setVisible(false);

		if (error === false) {
			setDisableSave(false);
		} else {
			setError(false);
		}
	}

	const AccountingInfo = ( ) => (
		<View style={styles.formRoot}>
			  <View style={{...styles.form, width: '80%'}}>
				<Text style={styles.label}>Accounting Information</Text>

				<Divider/>

				<View style={{ flex: 1, flexDirection: 'row', zIndex: 100 }}>
					<View style={{ flex: 1, flexDirection: 'column' }}>
						<Dropdown 
							label="Payment Frequency" 
							items={paymentFrequency} 
							control={control} 
							field="accounting.paymentFrequency" 
							defaultValue={details.accounting_details.paymentFrequency || ""} 
							errors={errors}
							zIndex={zIndex-=1}
							rightIcon={<ToolTip popover={DetailInfo.paymentFrequency} height={75} width={325}/>}/>
						<Dropdown 
							label="Auto Pay" 
							items={yesOrNo} 
							control={control} 
							field="accounting.autopay" 
							defaultValue={details.accounting_details.autopay || null}
							errors={errors}
							zIndex={zIndex-=1}
							rightIcon={<ToolTip popover={DetailInfo.autopay} height={125} width={525}/>}/>
						<View style={{ flex: 1, width: '100%'}}>
							<Input 
								label="Email for Submitting Invoices" 
								control={control} 
								field="accounting.invoiceEmailAddress" 
								defaultValue={details.accounting_details.invoiceEmailAddress || ""}
								errors={errors}
								zIndex={zIndex-=1}
								options={{ autoCapitalize: 'none', keyboardType: 'email-address' }}/>
						</View>
						<Dropdown 
							label="Payment Type" 
							items={paymentType} 
							control={control} 
							field="accounting.paymentType" 
							defaultValue={details.accounting_details.paymentType || ""}
							errors={errors}
							zIndex={zIndex-=1}
							rightIcon={<ToolTip popover={DetailInfo.paymentType} height={75} width={400}/>}/>
						<Dropdown 
							label="Payment Portal" 
							items={yesOrNo} 
							control={control} 
							field="accounting.paymentPortal" 
							defaultValue={details.accounting_details.paymentPortal || null}
							errors={errors}
							zIndex={zIndex-=1}/>

						<View style={{ flex: 1, width: 300 }}>
							<Input 
								label="Portal URL" 
								control={control} 
								field="accounting.paymentURL" 
								defaultValue={details.accounting_details.paymentURL || ""}
								errors={errors}
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
							control={control} 
							field="accounting.poRequired" 
							defaultValue={details.accounting_details.poRequired || null}
							errors={errors}
							zIndex={zIndex-=1}
							rightIcon={<ToolTip popover={DetailInfo.poRequired} height={50} width={325}/>}/>
						<Dropdown 
							label="PO's Required for Invoices" 
							items={yesOrNo} 
							control={control} 
							field="accounting.poInvoiceRequired" 
							defaultValue={details.accounting_details.poInvoiceRequired || null}
							errors={errors}
							zIndex={zIndex-=1}
							rightIcon={<ToolTip popover={DetailInfo.poInvoiceRequired} height={75} width={350}/>}/>
						<Dropdown 
							label="Approval's Required?" 
							items={yesOrNo} 
							control={control} 
							field="accounting.approvalsRequired" 
							defaultValue={details.accounting_details.approvalsRequired || null}
							errors={errors}
							zIndex={zIndex-=1}
							rightIcon={<ToolTip popover={DetailInfo.approvalsRequired} height={75} width={425}/>}/>
						<Dropdown 
							label="Have you attached the contract?" 
							items={yesOrNo} 
							control={control} 
							field="accounting.contractAttached" 
							defaultValue={details.accounting_details.contractAttached || null}
							errors={errors}
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
							control={control} field="accounting.contactName" 
							defaultValue={details.accounting_details.contactName || ""}
							errors={errors}
							options={{ autoCapitalize: 'words' }}/>
						<Input 
							label="Contact Phone" 
							control={control} field="accounting.contactPhone" 
							defaultValue={details.accounting_details.contactPhone || ""}
							errors={errors}
							options={{ keyboardType: 'phone-pad' }}/>
						<Input 
							label="Contact Email" 
							control={control} 
							field="accounting.contactEmail" 
							defaultValue={details.accounting_details.contactEmail || ""}
							errors={errors}
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
						containerStyle={styles.saveButtonContainer}/>
				</View>
				
				<Divider style={{ marginVertical: 20 }}/>
				
				<Text style={styles.label}>Accounting General Information</Text>

				<Divider style={{ marginBottom: 10 }}/>

				<View style={{ flexDirection: 'row', width: '100%' }}>
					<Input 
						label="Notes" 
						control={control} 
						field="accounting.notes" 
						defaultValue={details.accounting_details.notes || ""}
						errors={errors}
						mutliline={true}
						zIndex={zIndex-=1}
						options= {{ maxLength: 250 }}/>
				</View>
			</View>
		</View>
	);

	const ExpeditingInfo = ( ) => (
		<View style={styles.formRoot}>
			  <View style={{...styles.form, width: '80%', zIndex: 3}}>
					
				<Text style={styles.label}>Expediting Information</Text>

				<Divider/>

				<View style={{ flex: 1, flexDirection: 'row' }}>
					<View style={{ flex: 1, flexDirection: 'column' }}>
						<Dropdown 
							label="Is there a Vendor Portal?" 
							items={yesOrNo} 
							control={control} 
							field="expediting.vendorPortal" 
							defaultValue={details.expediting_details.vendorPortal || null} 
							errors={errors}
							zIndex={zIndex-=1}/>
						<Input 
							label="Vendor Portal URL" 
							control={control} 
							field="expediting.vendorPortalURL" 
							defaultValue={details.expediting_details.vendorPortalURL || ""}
							errors={errors}
							mutliline={true}
							zIndex={zIndex-=1}
							options={{ autoCapitalize: 'none', keyboardType: 'url' }}/>
						<Dropdown 
							label="Has the Vendor Portal Account been created?" 
							items={yesOrNo} 
							control={control} 
							field="expediting.portalAccountCreated" 
							defaultValue={details.expediting_details.portalAccountCreated || null}
							errors={errors}
							zIndex={zIndex-=1}/>
						<Input 
							label="Portal Username" 
							control={control} 
							field="expediting.portalUsername" 
							defaultValue={details.expediting_details.portalUsername || null}
							errors={errors}
							mutliline={true}
							zIndex={zIndex-=1}
							options={{ autoCapitalize: 'none' }}/>
						<Input 
							label="Portal Password" 
							control={control} 
							field="expediting.portalPassword" 
							defaultValue={details.expediting_details.portalPassword || ""}
							errors={errors}
							mutliline={true}
							zIndex={zIndex-=1}
							options={{ autoCapitalize: 'none' }}/>
					</View>

					<Divider orientation="vertical" style={{ margin: 10 }}/>

					<View style={{ flex: 1, flexDirection: 'column' }}>
						<Dropdown 
							label="How are jobs released?" 
							items={jobReleaseChoices} 
							control={control} 
							field="expediting.jobReleaseMethod" 
							defaultValue={details.expediting_details.jobReleaseMethod || ""}
							errors={errors}
							zIndex={zIndex-=1}
							rightIcon={<ToolTip popover={DetailInfo.jobReleaseMethod} height={50} width={400}/>}/>
						<Dropdown 
							label="PO Correction Handling?" 
							items={yesOrNo} 
							control={control} 
							field="expediting.poErrorHandling" 
							defaultValue={details.expediting_details.poErrorHandling || null}
							errors={errors}
							zIndex={zIndex-=1}
							rightIcon={<ToolTip popover={DetailInfo.poErrorHandling} height={75} width={450}/>}/>
						<Input 
							label="Estimated Number of Homes per Year" 
							control={control} 
							field="expediting.estimatedHomes"
							defaultValue={details.expediting_details.estimatedHomes || null}
							errors={errors}
							zIndex={zIndex-=1}
							options={{ keyboardType: 'numeric' }}/>
						<DateModal
							control={control}
							defaultValue={details.expediting_details.estimatedStartDate || null}
							field="expediting.estimatedStartDate"/>
					</View>
				</View>
				
				<Divider style={{ marginVertical: 20 }}/>
				
				<Text style={styles.label}>Programs Selected</Text>

				<Divider style={{ marginBottom: 10 }}/>

				<View style={{ flexDirection: 'row', flexWrap: 'wrap', width: '100%', height: 75 }}>
					<ChipInput 
						title="Cabinets"
						control={control}
						field="programs.cabinets"
						defaultValue={programs.cabinets || 0}/>
					<ChipInput 
						title="Carpet"
						control={control}
						field="programs.carpet"
						defaultValue={programs.carpet || 0}/>
					<ChipInput 
						title="Countertops"
						control={control}
						field="programs.countertops"
						defaultValue={programs.countertops || 0}/>
					<ChipInput 
						title="Tile"
						control={control}
						field="programs.tile"
						defaultValue={programs.tile || 0}/>
					<ChipInput 
						title="Vinyl"
						control={control}
						field="programs.vinyl"
						defaultValue={programs.vinyl || 0}/>
					<ChipInput 
						title="Wood"
						control={control}
						field="programs.wood"
						defaultValue={programs.wood || 0}/>
				</View>
				
				<Divider style={{ marginVertical: 20 }}/>
				
				<Text style={styles.label}>Expediting Files</Text>

				<Divider style={{ marginBottom: 10 }}/>

				<View style={{ alignItems: 'center', width: '100%'}}>
					<Button
						title='Attach Files'
						containerStyle={styles.attachButtonContainer}
						buttonStyle={styles.attach}
						containerStyle={styles.saveButtonContainer}/>
				</View>
				
				<Divider style={{ marginVertical: 20 }}/>
				
				<Text style={styles.label}>Expediting General Information</Text>

				<Divider style={{ marginBottom: 10 }}/>

				<View style={{ flexDirection: 'row', width: '100%' }}>
					<Input 
						label="Notes" 
						control={control}
						field="expediting.notes" 
						defaultValue={details.expediting_details.notes || ""}
						errors={errors}
						mutliline={true}
						zIndex={zIndex-=1}
						options={{ maxLength: 250 }}/>
				</View> 
			</View>
		</View>
	);

	return details !== null && (
		<KeyboardAvoidingView behavior='padding' enabled style={styles.background}>
			<StatusBar barStyle="light-content"/>

			<View style={styles.infoContainer}>
				<Header title="Save Client Details"/>

				<Divider/>

				<ScrollView style={styles.sv} contentContainerStyle={styles.svContentContainer} showsVerticalScrollIndicator={false}>
					<AccountingInfo/>

					<ExpeditingInfo/>
	
					<View style={{...styles.buttonView, zIndex: 0}}>
						<Button
							title='SAVE'
							disabled={disableSave}
							buttonStyle={styles.save}
							containerStyle={styles.saveButtonContainer}
							onPress={handleSubmit(onSubmit, onErrors)}/>
					</View>
				</ScrollView>
			</View> 

			<FloatingButton action={( ) => { navigation.navigation.pop(1); resetDetails( ); }} icon="arrow-left"/>
			<Snack visible={visible} action={( ) => snackbarDismiss( )} message={snackMessage}/>
		</KeyboardAvoidingView>
	);
}

export default AdvInfoForm;
 