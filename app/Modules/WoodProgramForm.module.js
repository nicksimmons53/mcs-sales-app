// Library Imports
import React, { Component } from 'react';
import { View, Text, Switch } from 'react-native';
import PropTypes from 'prop-types';
import { 
    Divider, 
    Input, 
    Button, 
    Icon, 
    CheckBox, 
    Tooltip
} from 'react-native-elements';
import DropDownPicker from 'react-native-dropdown-picker';
import { WoodFieldInfo } from '../Form/Values.form';
import { styles, colors } from './Styles/Form.style';

// Class Component for Client Accounting Info
class WoodProgramForm extends Component {
    state = {
        fieldsVisible: false,
        floorTrimOptions: [
            { label: "1/4\" Round", value: "1/4\" Round" },
            { label: "Shoe Mold", value: "Shoe Mold" }
        ],
        floorTrimStyleOptions: [
            { label: "Pre-Primed", value: "Pre-Primed" },
            { label: "MC Surfaces Stain", value: "MC Surfaces Stain" }
        ],
        secondStoryOptions: [
            { label: "None", value: "None" },
            { label: "Hardiebacker for Upstairs Wood", value: "Hardiebacker for Upstairs Wood" }
        ],
        takeoffOptions: [
            { label: "Builder", value: "Builder" },
            { label: "MC Surfaces, Inc.", value: "MC Surfaces, Inc." }
        ]
    }
    
    toggleFields = ( ) => {
        this.setState({ fieldsVisible: !this.state.fieldsVisible });
    }

    render( ) {
        let values = this.props.formik.values;

        return (
            <View style={styles.background}>
                <View style={styles.form}>
                    <Text style={styles.headerText}>Wood Program</Text>

                    <Divider />

                    <View style={styles.textRow}>
                        <Text style={styles.label}>Toggle Input Fields</Text>
                        <Switch
                            value={this.state.fieldsVisible}
                            onValueChange={( ) => this.toggleFields( )}
                            trackColor={{true: colors.green}}/>
                    </View>

                    {this.state.fieldsVisible ?
                        <>
                            <Divider/>
                                                                                                                                                       
                            <View style={styles.textRow} zIndex={0}>
                                <Text style={styles.label}>Preferred Glue Products</Text>
                                <Input
                                    onChangeText={this.props.formik.handleChange('glue_pref')}
                                    onBlur={this.props.formik.handleBlur('glue_pref')}
                                    value={values.glue_pref}
                                    inputStyle={styles.label}
                                    blurOnSubmit={false}
                                    containerStyle={styles.smallInput}
                                    inputContainerStyle={styles.inputContainer}/>
                                <Tooltip 
                                    popover={<Text style={styles.promptText}>{WoodFieldInfo.preferredGlue}</Text>}
                                    width={450}
                                    height={75}
                                    backgroundColor={colors.black}>
                                    <Icon name="info-circle" type="font-awesome" color={colors.black}/>
                                </Tooltip>
                            </View> 

                            <View style={styles.textRow} zIndex={0}>
                                <Text style={styles.label}>Will We Be Installing Floor Trim?</Text>
                                <CheckBox 
                                    checked={values.floor_trim_installer}
                                    onPress={( ) => this.props.formik.setFieldValue('floor_trim_installer', !values.floor_trim_installer)}
                                    size={36}
                                    containerStyle={styles.checkbox}
                                    checkedColor={colors.green}/>
                                <Tooltip 
                                    popover={<Text style={styles.promptText}>{WoodFieldInfo.floorTrimInstaller}</Text>}
                                    width={450}
                                    height={135}
                                    backgroundColor={colors.black}>
                                    <Icon name="info-circle" type="font-awesome" color={colors.black}/>
                                </Tooltip>
                            </View>

                            <View style={styles.textRow} zIndex={5}>
                                <Text style={styles.label}>Preferred Floor Trim</Text>
                                <DropDownPicker
                                    placeholder="Choose..."
                                    items={this.state.floorTrimOptions}
                                    defaultValue={values.floor_trim_pref}
                                    containerStyle={styles.dropdown}
                                    dropDownStyle={styles.dropdownMenu}
                                    labelStyle={styles.dropdownItem}
                                    itemStyle={styles.dropdownItem}
                                    onChangeItem={item => this.props.formik.setFieldValue('floor_trim_pref', item.value)}/>
                                <Tooltip 
                                    width={450}
                                    height={75}
                                    backgroundColor={colors.black}>
                                    <Icon name="info-circle" type="font-awesome" color={colors.white}/>
                                </Tooltip>
                            </View>

                            <View style={styles.textRow} zIndex={4}>
                                <Text style={styles.label}>Will Floor Trim Be...</Text>
                                <DropDownPicker
                                    placeholder="Choose..."
                                    items={this.state.floorTrimStyleOptions}
                                    defaultValue={values.floor_trim_style}
                                    containerStyle={styles.dropdown}
                                    dropDownStyle={styles.dropdownMenu}
                                    labelStyle={styles.dropdownItem}
                                    itemStyle={styles.dropdownItem}
                                    onChangeItem={item => this.props.formik.setFieldValue('floor_trim_style', item.value)}/>
                                <Tooltip 
                                    width={450}
                                    height={75}
                                    backgroundColor={colors.black}>
                                    <Icon name="info-circle" type="font-awesome" color={colors.white}/>
                                </Tooltip>
                            </View>

                            <View style={styles.textRow} zIndex={3}>
                                <Text style={styles.label}>Preferred Construction of 2nd Story Subfloor</Text>
                                <DropDownPicker
                                    placeholder="Choose..."
                                    items={this.state.secondStoryOptions}
                                    defaultValue={values.second_story_hardie}
                                    containerStyle={styles.dropdown}
                                    dropDownStyle={styles.dropdownMenu}
                                    labelStyle={styles.dropdownItem}
                                    itemStyle={styles.dropdownItem}
                                    onChangeItem={item => this.props.formik.setFieldValue('second_story_hardie', item.value)}/>
                                <Tooltip 
                                    popover={<Text style={styles.promptText}>{WoodFieldInfo.secondStorySubfloor}</Text>}
                                    width={450}
                                    height={90}
                                    backgroundColor={colors.black}>
                                    <Icon name="info-circle" type="font-awesome" color={colors.black}/>
                                </Tooltip>
                            </View>

                            <View style={styles.textRow} zIndex={0}>
                                <Text style={styles.label}>Are Transition Strips Standard Practice?</Text>
                                <CheckBox 
                                    checked={values.transition_strips_std}
                                    onPress={( ) => this.props.formik.setFieldValue('transition_strips_std', !values.transition_strips_std)}
                                    size={36}
                                    containerStyle={styles.checkbox}
                                    checkedColor={colors.green}/>
                                <Tooltip 
                                    popover={<Text style={styles.promptText}>{WoodFieldInfo.transitionStrips}</Text>}
                                    width={450}
                                    height={75}
                                    backgroundColor={colors.black}>
                                    <Icon name="info-circle" type="font-awesome" color={colors.black}/>
                                </Tooltip>
                            </View>

                            <View style={styles.textRow} zIndex={0}>
                                <Text style={styles.label}>HVAC Requirement?</Text>
                                <CheckBox 
                                    checked={values.hvac_req}
                                    onPress={( ) => this.props.formik.setFieldValue('hvac_req', !values.hvac_req)}
                                    size={36}
                                    containerStyle={styles.checkbox}
                                    checkedColor={colors.green}/>
                                <Tooltip 
                                    popover={<Text style={styles.promptText}>{WoodFieldInfo.hvacRequirement}</Text>}
                                    width={450}
                                    height={120}
                                    backgroundColor={colors.black}>
                                    <Icon name="info-circle" type="font-awesome" color={colors.black}/>
                                </Tooltip>
                            </View>

                            <View style={styles.textRow} zIndex={2}>
                                <Text style={styles.label}>Who Will be Doing Takeoffs?</Text>
                                <DropDownPicker
                                    placeholder="Choose..."
                                    items={this.state.takeoffOptions}
                                    defaultValue={values.takeoff_resp}
                                    containerStyle={styles.dropdown}
                                    dropDownStyle={styles.dropdownMenu}
                                    labelStyle={styles.dropdownItem}
                                    itemStyle={styles.dropdownItem}
                                    onChangeItem={item => this.props.formik.setFieldValue('takeoff_resp', item.value)}/>
                                <Tooltip 
                                    width={450}
                                    height={75}
                                    backgroundColor={colors.black}>
                                    <Icon name="info-circle" type="font-awesome" color={colors.white}/>
                                </Tooltip>
                            </View>
                                                                                                                                               
                            <View style={styles.textRow} zIndex={0}>
                                <Text style={styles.label}>Waste Factor Percentage</Text>
                                <Input
                                    onChangeText={this.props.formik.handleChange('waste_factor')}
                                    onBlur={this.props.formik.handleBlur('waste_factor')}
                                    value={values.waste_factor}
                                    inputStyle={styles.label}
                                    blurOnSubmit={false}
                                    containerStyle={styles.smallInput}
                                    inputContainerStyle={styles.inputContainer}/>
                                <Tooltip 
                                    width={450}
                                    height={75}
                                    backgroundColor={colors.black}>
                                    <Icon name="info-circle" type="font-awesome" color={colors.white}/>
                                </Tooltip>
                            </View> 
                                                                                                                                   
                            <View style={styles.textRow} zIndex={0}>
                                <Text style={styles.label}>Notes</Text>
                                <Input
                                    onChangeText={this.props.formik.handleChange('notes')}
                                    onBlur={this.props.formik.handleBlur('notes')}
                                    value={values.notes}
                                    keyboardType='numbers-and-punctuation'
                                    inputStyle={styles.label}
                                    blurOnSubmit={false}
                                    containerStyle={styles.mediumInput}
                                    inputContainerStyle={styles.inputContainer}/>
                                <Tooltip 
                                    width={450}
                                    height={75}
                                    backgroundColor={colors.black}>
                                    <Icon name="info-circle" type="font-awesome" color={colors.white}/>
                                </Tooltip>
                            </View>  

                            <Divider/>
                                                
                            <View style={styles.buttonView}>
                                <Button
                                    title='Save'
                                    buttonStyle={styles.save}
                                    containerStyle={styles.saveButtonContainer}
                                    onPress={this.props.formik.handleSubmit}/>
                            </View>
                        </>
                    : 
                        null 
                    }
                </View>
            </View>
        );
    }
}

// Props Valdidation
WoodProgramForm.propTypes = {
  formik: PropTypes.object
}

export default WoodProgramForm;