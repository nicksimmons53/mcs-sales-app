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
import { CarpetProgramInfo } from '../Form/Values.form';
import { styles, colors } from './Styles/Form.style';

// Class Component for Client Accounting Info
class CarpetProgramForm extends Component {
    state = {
        fieldsVisible: false,
        floorTrimOptions: [
            { label: "Pre-Primed", value: "Pre-Primed" },
            { label: "MC Surfaces Stain", value: "MC Surfaces Stain" }
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
                    <Text style={styles.headerText}>Carpet Program</Text>

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
                                <Text style={styles.label}>Preferred Padding Brand</Text>
                                <Input
                                    onChangeText={this.props.formik.handleChange('padding_brand_pref')}
                                    onBlur={this.props.formik.handleBlur('padding_brand_pref')}
                                    value={values.padding_brand_pref}
                                    inputStyle={styles.label}
                                    blurOnSubmit={false}
                                    containerStyle={styles.mediumInput}
                                    inputContainerStyle={styles.inputContainer}/>
                                <Icon name="info-circle" type="font-awesome" color={colors.white}/>
                            </View> 
                                                        
                            <View style={styles.textRow} zIndex={0}>
                                <Text style={styles.label}>Preferred Carpet Brand</Text>
                                <Input
                                    onChangeText={this.props.formik.handleChange('carpet_brand_pref')}
                                    onBlur={this.props.formik.handleBlur('carpet_brand_pref')}
                                    value={values.carpet_brand_pref}
                                    inputStyle={styles.label}
                                    blurOnSubmit={false}
                                    containerStyle={styles.mediumInput}
                                    inputContainerStyle={styles.inputContainer}/>
                                <Icon name="info-circle" type="font-awesome" color={colors.white}/>
                            </View> 

                            <View style={styles.textRow} zIndex={5}>
                                <Text style={styles.label}>Will Floor Trim Be...</Text>
                                <DropDownPicker
                                    placeholder="Choose..."
                                    items={this.state.floorTrimOptions}
                                    defaultValue={values.floor_trim_style}
                                    containerStyle={styles.dropdown}
                                    dropDownStyle={styles.dropdownMenu}
                                    labelStyle={styles.dropdownItem}
                                    itemStyle={styles.dropdownItem}
                                    onChangeItem={item => this.props.formik.setFieldValue('floor_trim_style', item.value)}/>
                                <Icon name="info-circle" type="font-awesome" color={colors.white}/>
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
                                    popover={<Text style={styles.promptText}>{CarpetProgramInfo.floorTrimInstaller}</Text>}
                                    width={450}
                                    height={135}
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
                                <Icon name="info-circle" type="font-awesome" color={colors.white}/>
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
                                <Icon name="info-circle" type="font-awesome" color={colors.white}/>
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
                                <Icon name="info-circle" type="font-awesome" color={colors.white}/>
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
CarpetProgramForm.propTypes = {
  formik: PropTypes.object
}

export default CarpetProgramForm;