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
class TileProgramForm extends Component {
    state = {
        fieldsVisible: true,
        settingMaterialOptions: [
            { label: "Custom", value: "Custom" },
            { label: "Mapei", value: "Mapei" },
            { label: "Texrite", value: "Texrite" }
        ],
        waterpoofingOptions: [
            { label: "Fiberglass", value: "Fiberglass" },
            { label: "Plumber Provided Rubber Liner", value: "Plumber Provided Rubber Liner" },
            { label: "Quikrete", value: "Quikrete" }
        ],
        siliconOptions: [
            { label: "Grout Match", value: "Grout Match" },
            { label: "Colored Caulking", value: "Colored Caulking" }
        ],
        showerNicheOptions: [
            { label: "Premolded/Plastic", value: "Premolded/Plastic" },
            { label: "Prefamed with Waterproofing", value: "Preframed with Waterproofing" }
        ],
        showerSeatOptions: [
            { label: "MC Surfaces Build", value: "MC Surfaces Build" },
            { label: "Other", value: "Other" }
        ],
        groutSizeOptions: [
            { label: "3/16\"", value: "3/16\"" },
            { label: "1/8\"", value: "1/8\"" }
        ],
        groutBrandOptions: [
            { label: "Mapei", value: "Mapei" },
            { label: "Custom", value: "Custom" },
            { label: "Texrite", value: "Texrite" }
        ],
        subfloorOptions: [
            { label: "1/4\" Hardiebacker", value: "1/4\" Hardiebacker" },
            { label: "Ditra Box", value: "Ditra Box" },
            { label: "Mud Build", value: "Mud Build" },
            { label: "Other", value: "Other" }
        ],
        takeoffOptions: [
            { label: "Builder", value: "Builder" },
            { label: "MC Surfaces, Inc.", value: "MC Surfaces, Inc." }
        ]
    };

    render( ) {
        let values = this.props.formik.values.tileProgram;

        return (
            <View style={styles.background}>
                <View style={styles.form}>
                    <Text style={styles.headerText}>Tile Program</Text>

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
                            
                            <View style={styles.textRow} zIndex={10}>
                                <Text style={styles.label}>Floor Setting Material</Text>
                                <DropDownPicker
                                    placeholder="Choose..."
                                    items={this.state.settingMaterialOptions}
                                    defaultValue={values.setting_material_floors}
                                    containerStyle={styles.dropdown}
                                    dropDownStyle={styles.dropdownMenu}
                                    labelStyle={styles.dropdownItem}
                                    itemStyle={styles.dropdownItem}
                                    onChangeItem={item => this.props.formik.setFieldValue('setting_material_floors', item.value)}/>
                                <Tooltip 
                                    width={450}
                                    height={75}
                                    backgroundColor={colors.black}>
                                    <Icon name="info-circle" type="font-awesome" color={colors.black}/>
                                </Tooltip>
                            </View>

                            {
                                (values.setting_material_floors === "Custom") ?
                                    <View style={styles.textRow} zIndex={0}>
                                        <Text style={styles.label}></Text>
                                        <Input
                                            onChangeText={this.props.formik.handleChange('setting_material_floors_cust')}
                                            onBlur={this.props.formik.handleBlur('setting_material_floors_cust')}
                                            value={values.setting_material_floors_cust}
                                            inputStyle={styles.label}
                                            blurOnSubmit={false}
                                            containerStyle={styles.mediumInput}
                                            inputContainerStyle={styles.inputContainer}/>
                                        <Tooltip 
                                            width={450}
                                            height={75}
                                            backgroundColor={colors.black}>
                                            <Icon name="info-circle" type="font-awesome" color={colors.black}/>
                                        </Tooltip>
                                    </View>
                                :
                                null
                            }
                                                        
                            <View style={styles.textRow} zIndex={9}>
                                <Text style={styles.label}>Wall Setting Material</Text>
                                <DropDownPicker
                                    placeholder="Choose..."
                                    items={this.state.settingMaterialOptions}
                                    defaultValue={values.setting_material_walls}
                                    containerStyle={styles.dropdown}
                                    dropDownStyle={styles.dropdownMenu}
                                    labelStyle={styles.dropdownItem}
                                    itemStyle={styles.dropdownItem}
                                    onChangeItem={item => this.props.formik.setFieldValue('setting_material_walls', item.value)}/>
                                <Tooltip 
                                    width={450}
                                    height={75}
                                    backgroundColor={colors.black}>
                                    <Icon name="info-circle" type="font-awesome" color={colors.black}/>
                                </Tooltip>
                            </View>
                                                        
                            <View style={styles.textRow} zIndex={8}>
                                <Text style={styles.label}>Waterproofing Method</Text>
                                <DropDownPicker
                                    placeholder="Choose..."
                                    items={this.state.waterpoofingOptions}
                                    defaultValue={values.setting_material_walls}
                                    containerStyle={styles.dropdown}
                                    dropDownStyle={styles.dropdownMenu}
                                    labelStyle={styles.dropdownItem}
                                    itemStyle={styles.dropdownItem}
                                    onChangeItem={item => this.props.formik.setFieldValue('setting_material_walls', item.value)}/>
                                <Tooltip 
                                    width={450}
                                    height={75}
                                    backgroundColor={colors.black}>
                                    <Icon name="info-circle" type="font-awesome" color={colors.black}/>
                                </Tooltip>
                            </View>


                            <View style={styles.textRow} zIndex={0}>
                                <Text style={styles.label}>Will We Be Installing Backerboard?</Text>
                                <CheckBox 
                                    checked={values.backerboard_installer}
                                    onPress={( ) => this.props.formik.setFieldValue('backerboard_installer', !values.backerboard_installer)}
                                    size={36}
                                    containerStyle={styles.checkbox}
                                    checkedColor={colors.green}/>
                                <Tooltip 
                                    width={450}
                                    height={60}
                                    backgroundColor={colors.black}>
                                    <Icon name="info-circle" type="font-awesome" color={colors.black}/>
                                </Tooltip>
                            </View>

                            <View style={styles.textRow} zIndex={7}>
                                <Text style={styles.label}>Preferred Silicon</Text>
                                <DropDownPicker
                                    placeholder="Choose..."
                                    items={this.state.siliconOptions}
                                    defaultValue={values.silicon_pref}
                                    containerStyle={styles.dropdown}
                                    dropDownStyle={styles.dropdownMenu}
                                    labelStyle={styles.dropdownItem}
                                    itemStyle={styles.dropdownItem}
                                    onChangeItem={item => this.props.formik.setFieldValue('silicon_pref', item.value)}/>
                                <Tooltip 
                                    width={450}
                                    height={75}
                                    backgroundColor={colors.black}>
                                    <Icon name="info-circle" type="font-awesome" color={colors.black}/>
                                </Tooltip>
                            </View>

                            <View style={styles.textRow} zIndex={6}>
                                <Text style={styles.label}>Shower Niche Construction</Text>
                                <DropDownPicker
                                    placeholder="Choose..."
                                    items={this.state.showerNicheOptions}
                                    defaultValue={values.shower_niche_pref}
                                    containerStyle={styles.dropdown}
                                    dropDownStyle={styles.dropdownMenu}
                                    labelStyle={styles.dropdownItem}
                                    itemStyle={styles.dropdownItem}
                                    onChangeItem={item => this.props.formik.setFieldValue('shower_niche_pref', item.value)}/>
                                <Tooltip 
                                    width={450}
                                    height={75}
                                    backgroundColor={colors.black}>
                                    <Icon name="info-circle" type="font-awesome" color={colors.black}/>
                                </Tooltip>
                            </View>

                            <View style={styles.textRow} zIndex={0}>
                                <Text style={styles.label}>Are Corner Soap Dishes Standard?</Text>
                                <CheckBox 
                                    checked={values.corner_soap_dish}
                                    onPress={( ) => this.props.formik.setFieldValue('corner_soap_dish', !values.corner_soap_dish)}
                                    size={36}
                                    containerStyle={styles.checkbox}
                                    checkedColor={colors.green}/>
                                <Tooltip 
                                    width={450}
                                    height={60}
                                    backgroundColor={colors.black}>
                                    <Icon name="info-circle" type="font-awesome" color={colors.black}/>
                                </Tooltip>
                            </View>

                            <View style={styles.textRow} zIndex={5}>
                                <Text style={styles.label}>Preferred Construction of Shower Seats</Text>
                                <DropDownPicker
                                    placeholder="Choose..."
                                    items={this.state.showerSeatOptions}
                                    defaultValue={values.shower_seat_pref}
                                    containerStyle={styles.dropdown}
                                    dropDownStyle={styles.dropdownMenu}
                                    labelStyle={styles.dropdownItem}
                                    itemStyle={styles.dropdownItem}
                                    onChangeItem={item => this.props.formik.setFieldValue('shower_seat_pref', item.value)}/>
                                <Tooltip 
                                    width={450}
                                    height={75}
                                    backgroundColor={colors.black}>
                                    <Icon name="info-circle" type="font-awesome" color={colors.black}/>
                                </Tooltip>
                            </View>

                            <View style={styles.textRow} zIndex={0}>
                                <Text style={styles.label}>Does the Builder Prefer Schulter?</Text>
                                <CheckBox 
                                    checked={values.schulter_pref}
                                    onPress={( ) => this.props.formik.setFieldValue('schulter_pref', !values.schulter_pref)}
                                    size={36}
                                    containerStyle={styles.checkbox}
                                    checkedColor={colors.green}/>
                                <Tooltip 
                                    width={450}
                                    height={60}
                                    backgroundColor={colors.black}>
                                    <Icon name="info-circle" type="font-awesome" color={colors.black}/>
                                </Tooltip>
                            </View>

                            <View style={styles.textRow} zIndex={4}>
                                <Text style={styles.label}>Preferred Grout Joint and Sizing</Text>
                                <DropDownPicker
                                    placeholder="Choose..."
                                    items={this.state.groutSizeOptions}
                                    defaultValue={values.grout_joint_size_pref}
                                    containerStyle={styles.dropdown}
                                    dropDownStyle={styles.dropdownMenu}
                                    labelStyle={styles.dropdownItem}
                                    itemStyle={styles.dropdownItem}
                                    onChangeItem={item => this.props.formik.setFieldValue('grout_joint_size_pref', item.value)}/>
                                <Tooltip 
                                    width={450}
                                    height={75}
                                    backgroundColor={colors.black}>
                                    <Icon name="info-circle" type="font-awesome" color={colors.black}/>
                                </Tooltip>
                            </View>
      
                            <View style={styles.textRow} zIndex={3}>
                                <Text style={styles.label}>Preferred Grout Brand</Text>
                                <DropDownPicker
                                    placeholder="Choose..."
                                    items={this.state.groutBrandOptions}
                                    defaultValue={values.grout_pref}
                                    containerStyle={styles.dropdown}
                                    dropDownStyle={styles.dropdownMenu}
                                    labelStyle={styles.dropdownItem}
                                    itemStyle={styles.dropdownItem}
                                    onChangeItem={item => this.props.formik.setFieldValue('grout_pref', item.value)}/>
                                <Tooltip 
                                    width={450}
                                    height={75}
                                    backgroundColor={colors.black}>
                                    <Icon name="info-circle" type="font-awesome" color={colors.black}/>
                                </Tooltip>
                            </View>      
                                  
                            <View style={styles.textRow} zIndex={2}>
                                <Text style={styles.label}>Preferred Standard Practice for Subfloor</Text>
                                <DropDownPicker
                                    placeholder="Choose..."
                                    items={this.state.subfloorOptions}
                                    defaultValue={values.subfloor_pref}
                                    containerStyle={styles.dropdown}
                                    dropDownStyle={styles.dropdownMenu}
                                    labelStyle={styles.dropdownItem}
                                    itemStyle={styles.dropdownItem}
                                    onChangeItem={item => this.props.formik.setFieldValue('subfloor_pref', item.value)}/>
                                <Tooltip 
                                    width={450}
                                    height={75}
                                    backgroundColor={colors.black}>
                                    <Icon name="info-circle" type="font-awesome" color={colors.black}/>
                                </Tooltip>
                            </View>

                            <View style={styles.textRow} zIndex={0}>
                                <Text style={styles.label}>Tile Return Walls at Backsplash?</Text>
                                <CheckBox 
                                    checked={values.tile_return_walls}
                                    onPress={( ) => this.props.formik.setFieldValue('tile_return_walls', !values.tile_return_walls)}
                                    size={36}
                                    containerStyle={styles.checkbox}
                                    checkedColor={colors.green}/>
                                <Tooltip 
                                    width={450}
                                    height={60}
                                    backgroundColor={colors.black}>
                                    <Icon name="info-circle" type="font-awesome" color={colors.black}/>
                                </Tooltip>
                            </View>
                                                              
                            <View style={styles.textRow} zIndex={1}>
                                <Text style={styles.label}>Who Does Takeoffs?</Text>
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
                                    <Icon name="info-circle" type="font-awesome" color={colors.black}/>
                                </Tooltip>
                            </View> 
                                                                                          
                            <View style={styles.textRow} zIndex={0}>
                                <Text style={styles.label}>Waste Factor Percentage</Text>
                                <Input
                                    onChangeText={this.props.formik.handleChange('waste_pct')}
                                    onBlur={this.props.formik.handleBlur('waste_pct')}
                                    value={values.waste_pct}
                                    keyboardType='numbers-and-punctuation'
                                    inputStyle={styles.label}
                                    blurOnSubmit={false}
                                    containerStyle={styles.xSmallInput}
                                    inputContainerStyle={styles.inputContainer}/>
                                <Tooltip 
                                    width={450}
                                    height={75}
                                    backgroundColor={colors.black}>
                                    <Icon name="info-circle" type="font-awesome" color={colors.black}/>
                                </Tooltip>
                            </View>    
                                                                                                                      
                            <View style={styles.textRow} zIndex={0}>
                                <Text style={styles.label}>Wall Tile Height</Text>
                                <Input
                                    onChangeText={this.props.formik.handleChange('wall_tile_height')}
                                    onBlur={this.props.formik.handleBlur('wall_tile_height')}
                                    value={values.wall_tile_height}
                                    keyboardType='numbers-and-punctuation'
                                    inputStyle={styles.label}
                                    blurOnSubmit={false}
                                    containerStyle={styles.xSmallInput}
                                    inputContainerStyle={styles.inputContainer}/>
                                <Tooltip 
                                    width={450}
                                    height={75}
                                    backgroundColor={colors.black}>
                                    <Icon name="info-circle" type="font-awesome" color={colors.black}/>
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
                                    <Icon name="info-circle" type="font-awesome" color={colors.black}/>
                                </Tooltip>
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
TileProgramForm.propTypes = {
  formik: PropTypes.object
}

export default TileProgramForm;
