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
import { styles, colors } from './Styles/Form.style';

// Class Component for Client Accounting Info
class CountertopProgramForm extends Component {
    state = {
        fieldsVisible: false,
        materialThicknessOptions: [
            { label: "3cm", value: "3cm" },
            { label: "2cm", value: "2cm" },
            { label: "Both", value: "Both" },
            { label: "Other", value: "Other"}
        ],
        edgeOptions: [
            { label: "Straight/Square", value: "Straight/Square" },
            { label: "Waterfall (Edge)", value: "Waterfall (Edge)" },
            { label: "Ogee", value: "Ogee" },
            { label: "Bullnose", value: "Bullnose" },
            { label: "Leathered", value: "Leathered" },
            { label: "Other", value: "Other" }
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
                    <Text style={styles.headerText}>Countertop Program</Text>

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

                            <View style={styles.textRow} zIndex={5}>
                                <Text style={styles.label}>Preferred Material Thickness</Text>
                                <DropDownPicker
                                    placeholder="Choose..."
                                    items={this.state.materialThicknessOptions}
                                    defaultValue={values.material_thickness_pref}
                                    containerStyle={styles.dropdown}
                                    dropDownStyle={styles.dropdownMenu}
                                    labelStyle={styles.dropdownItem}
                                    itemStyle={styles.dropdownItem}
                                    onChangeItem={item => this.props.formik.setFieldValue('material_thickness_pref', item.value)}/>
                                <Tooltip 
                                    width={450}
                                    height={75}
                                    backgroundColor={colors.black}>
                                    <Icon name="info-circle" type="font-awesome" color={colors.white}/>
                                </Tooltip>
                            </View>

                            {values.material_thickness_pref === "Other" ?                                                                                                                                                                           
                            <View style={styles.textRow} zIndex={0}>
                                <Text style={styles.label}></Text>
                                <Input
                                    onChangeText={this.props.formik.handleChange('material_thickness_other')}
                                    onBlur={this.props.formik.handleBlur('material_thickness_other')}
                                    placeholder="Material Thickness Other"
                                    value={values.material_thickness_other}
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
                            : null}

                            <View style={styles.textRow} zIndex={4}>
                                <Text style={styles.label}>Preferred Edge</Text>
                                <DropDownPicker
                                    placeholder="Choose..."
                                    items={this.state.edgeOptions}
                                    defaultValue={values.edge_pref}
                                    containerStyle={styles.dropdown}
                                    dropDownStyle={styles.dropdownMenu}
                                    labelStyle={styles.dropdownItem}
                                    itemStyle={styles.dropdownItem}
                                    onChangeItem={item => this.props.formik.setFieldValue('edge_pref', item.value)}/>
                                <Tooltip 
                                    width={450}
                                    height={75}
                                    backgroundColor={colors.black}>
                                    <Icon name="info-circle" type="font-awesome" color={colors.white}/>
                                </Tooltip>
                            </View>

                            {values.edge_pref === "Other" ?                                                                                                                                                                           
                            <View style={styles.textRow} zIndex={0}>
                                <Text style={styles.label}></Text>
                                <Input
                                    onChangeText={this.props.formik.handleChange('edge_pref_other')}
                                    onBlur={this.props.formik.handleBlur('edge_pref_other')}
                                    placeholder="Edge Preference Other"
                                    value={values.edge_pref_other}
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
                            : null}

                            <View style={styles.textRow} zIndex={0}>
                                <Text style={styles.label}>Are Waterfall Sides Standard (or Option)?</Text>
                                <CheckBox 
                                    checked={values.waterfall_sides_std}
                                    onPress={( ) => this.props.formik.setFieldValue('waterfall_sides_std', !values.waterfall_sides_std)}
                                    size={36}
                                    containerStyle={styles.checkbox}
                                    checkedColor={colors.green}/>
                                <Tooltip 
                                    width={450}
                                    height={75}
                                    backgroundColor={colors.black}>
                                    <Icon name="info-circle" type="font-awesome" color={colors.white}/>
                                </Tooltip>
                            </View>

                            <View style={styles.textRow} zIndex={0}>
                                <Text style={styles.label}>Faucet Holes (Are We Providing Sinks?)</Text>
                                <CheckBox 
                                    checked={values.faucet_holes}
                                    onPress={( ) => this.props.formik.setFieldValue('faucet_holes', !values.faucet_holes)}
                                    size={36}
                                    containerStyle={styles.checkbox}
                                    checkedColor={colors.green}/>
                                <Tooltip 
                                    width={450}
                                    height={120}
                                    backgroundColor={colors.black}>
                                    <Icon name="info-circle" type="font-awesome" color={colors.white}/>
                                </Tooltip>
                            </View>

                                                                                                                                               
                            <View style={styles.textRow} zIndex={0}>
                                <Text style={styles.label}>Stove Range Specifications</Text>
                                <Input
                                    onChangeText={this.props.formik.handleChange('stove_range_specs')}
                                    onBlur={this.props.formik.handleBlur('stove_range_specs')}
                                    value={values.stove_range_specs}
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
CountertopProgramForm.propTypes = {
  formik: PropTypes.object
}

export default CountertopProgramForm;