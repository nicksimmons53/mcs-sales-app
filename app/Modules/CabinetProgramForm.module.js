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
// import { TileFieldInfo } from '../Form/Values.form';
import { styles, colors } from './Styles/Form.style';

// Class Component for Client Accounting Info
class CabinetProgramForm extends Component {
    state = {
        fieldsVisible: true,
        bidTypeOptions: [
            { label: "Whole House", value: "Whole House" },
            { label: "Specific Rooms", value: "Specific Rooms" }
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
                    <Text style={styles.headerText}>Cabinet Program</Text>

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
                                <Text style={styles.label}>Preferred Colors</Text>
                                <Input
                                    onChangeText={this.props.formik.handleChange('color_pref')}
                                    onBlur={this.props.formik.handleBlur('color_pref')}
                                    value={values.color_pref}
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

                            <View style={styles.textRow} zIndex={0}>
                                <Text style={styles.label}>Preferred Styles</Text>
                                <Input
                                    onChangeText={this.props.formik.handleChange('style_pref')}
                                    onBlur={this.props.formik.handleBlur('style_pref')}
                                    value={values.style_pref}
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

                            <View style={styles.textRow} zIndex={0}>
                                <Text style={styles.label}>Preferences on Soft Close (Are They Standard?)</Text>
                                <CheckBox 
                                    checked={values.soft_close_std}
                                    onPress={( ) => this.props.formik.setFieldValue('soft_close_std', !values.soft_close_std)}
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
                                <Text style={styles.label}>Overlay</Text>
                                <Input
                                    onChangeText={this.props.formik.handleChange('overlay')}
                                    onBlur={this.props.formik.handleBlur('overlay')}
                                    value={values.overlay}
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
                                                                                                                                                                           
                            <View style={styles.textRow} zIndex={0}>
                                <Text style={styles.label}>Preferences and Sizes of Crown</Text>
                                <Input
                                    onChangeText={this.props.formik.handleChange('crown_pref')}
                                    onBlur={this.props.formik.handleBlur('crown_pref')}
                                    value={values.crown_pref}
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
                                                                                                                                                                                                       
                            <View style={styles.textRow} zIndex={0}>
                                <Text style={styles.label}>Standard Specifications for Upper Cabinets</Text>
                                <Input
                                    onChangeText={this.props.formik.handleChange('upper_cabinet_spec')}
                                    onBlur={this.props.formik.handleBlur('upper_cabinet_spec')}
                                    value={values.upper_cabinet_spec}
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
                                                                                                                                                                                                                                   
                            <View style={styles.textRow} zIndex={0}>
                                <Text style={styles.label}>Standard Specifications for Vanity Height</Text>
                                <Input
                                    onChangeText={this.props.formik.handleChange('vanity_height_spec')}
                                    onBlur={this.props.formik.handleBlur('vanity_height_spec')}
                                    value={values.vanity_height_spec}
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
                                <Text style={styles.label}>Preferences on Bid Types</Text>
                                <DropDownPicker
                                    placeholder="Choose..."
                                    items={this.state.bidTypeOptions}
                                    defaultValue={values.bid_type_pref}
                                    containerStyle={styles.dropdown}
                                    dropDownStyle={styles.dropdownMenu}
                                    labelStyle={styles.dropdownItem}
                                    itemStyle={styles.dropdownItem}
                                    onChangeItem={item => this.props.formik.setFieldValue('bid_type_pref', item.value)}/>
                                <Tooltip 
                                    width={450}
                                    height={75}
                                    backgroundColor={colors.black}>
                                    <Icon name="info-circle" type="font-awesome" color={colors.white}/>
                                </Tooltip>
                            </View>
                                                                                                                                               
                            <View style={styles.textRow} zIndex={0}>
                                <Text style={styles.label}>Any Areas Optioned Out?</Text>
                                <Input
                                    onChangeText={this.props.formik.handleChange('optioned_area_out')}
                                    onBlur={this.props.formik.handleBlur('optioned_area_out')}
                                    value={values.optioned_area_out}
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
CabinetProgramForm.propTypes = {
  formik: PropTypes.object
}

export default CabinetProgramForm;