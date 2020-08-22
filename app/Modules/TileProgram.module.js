// Library Imports
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import { Divider, Input, Button, Icon, CheckBox, Tooltip } from 'react-native-elements';
import DropDownPicker from 'react-native-dropdown-picker';
import { TileProgram } from '../Form/Values.form';
import { styles, colors } from './Styles/Form.style';

// Class Component for Client Accounting Info
class TileProgramForm extends Component {
  state = {
  };

  disableSubmitInvoice = ( ) => {
    if (this.props.formik.values.atopay === true) {
      this.props.formik.setFieldValue('invsbm', null);
      this.props.formik.setFieldValue('invpos', 1);
      this.props.formik.setFieldValue('aprvls', 1);
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
					defaultValue={values.pmtfrq}
					containerStyle={styles.dropdown}
					dropDownStyle={styles.dropdownMenu}
					labelStyle={styles.dropdownItem}
					itemStyle={styles.dropdownItem}
					onChangeItem={item => this.props.formik.setFieldValue('pmtfrq', item.value)}/>
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
					checked={values.atopay}
					onPress={( ) => {
						this.props.formik.setFieldValue('atopay', !values.atopay);
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
				<Tooltip 
					popover={<Text style={styles.promptText}>{FieldInfo.invoiceSubmit}</Text>} 
					width={450}
					height={90}
					backgroundColor={colors.black}>
					<Icon name="info-circle" type="font-awesome" color={colors.black}/>
				</Tooltip>
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
						inputStyle={styles.label}
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
                    inputStyle={styles.label}
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
                    inputStyle={styles.label}
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
                    inputStyle={styles.label}
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
              defaultValue={values.pmttyp}
              containerStyle={styles.dropdown}
              dropDownStyle={styles.dropdownMenu}
              labelStyle={styles.dropdownItem}
              zIndex={1}
              itemStyle={styles.dropdownItem}
              onChangeItem={item => this.props.formik.setFieldValue('pmttyp', item.value)}/>
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
              checked={values.pmtprt}
              onPress={( ) => this.props.formik.setFieldValue('pmtprt', !values.pmtprt)}
              size={36}
              containerStyle={styles.checkbox}
              checkedColor={colors.green}/>
            <Icon name="info-circle" type="font-awesome" color={colors.white}/>
          </View>

          { 
            values.pmtprt ? 
              <View style={styles.textRow} zIndex={0}>
                <Text style={styles.label}></Text>
                <Input
                  onChangeText={this.props.formik.handleChange('pmturl')}
                  onBlur={this.props.formik.handleBlur('pmturl')}
                  value={values.pmturl}
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
              checked={values.posreq}
              onPress={( ) => this.props.formik.setFieldValue('posreq', !values.posreq)}
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
              checked={values.invpos}
              onPress={( ) => this.props.formik.setFieldValue('invpos', !values.invpos)}
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
              checked={values.aprvls}
              onPress={( ) => this.props.formik.setFieldValue('aprvls', !values.aprvls)}
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
              onChangeText={this.props.formik.handleChange('accnam')}
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
              onChangeText={this.props.formik.handleChange('accphn')}
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
              onChangeText={this.props.formik.handleChange('accema')}
              autoCapitalize='none'
              blurOnSubmit={false}
              inputStyle={styles.label}
              containerStyle={styles.mediumInput}
              inputContainerStyle={styles.inputContainer}/>
            <Icon name="info-circle" type="font-awesome" color={colors.white}/>
          </View>
        </View>
      </View>
    );
  }
}

// Props Valdidation
TileProgramForm.propTypes = {
  formik: PropTypes.object
}

export default TileProgramForm;
