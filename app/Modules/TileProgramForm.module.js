// Library Imports
import React, { Component } from 'react';
import { View, Text, Switch } from 'react-native';
import PropTypes from 'prop-types';
import { Divider, Button } from 'react-native-elements';
import CheckboxRow from '../Components/CheckboxRow';
import { SmallInputRow, MediumInputRow } from '../Components/InputRow';
import DropdownRow from '../Components/DropdownRow';
import { TileFieldInfo } from '../Form/Values.form';
import { styles, colors } from './Styles/Form.style';

// Class Component for Client Accounting Info
class TileProgramForm extends Component {
    state = {
        fieldsVisible: false,
        settingMaterialOptions: [
            { label: "Custom", value: "Custom" },
            { label: "Mapei", value: "Mapei" },
            { label: "Texrite", value: "Texrite" }
        ],
        settingMaterialOptions2: [
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
            { label: "Preframed with Waterproofing", value: "Preframed with Waterproofing" }
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
    
    toggleFields = ( ) => {
        this.setState({ fieldsVisible: !this.state.fieldsVisible });
    }

    render( ) {
        let values = this.props.formik.values;

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
                            
                            <DropdownRow
                                title="Floor Setting Material"
                                choices={this.state.settingMaterialOptions}
                                formik={this.props.formik}
                                fieldName="setting_material_floors"
                                zIndex={10}
                                tooltip={true}
                                tooltipHeight={75}
                                popover={TileFieldInfo.settingMaterial}/>

                            {
                                (values.setting_material_floors === "Custom") ?
                                    <MediumInputRow
                                        zIndex={0}
                                        fieldName="setting_material_floors_cust"
                                        formik={this.props.formik}
                                        tooltip={false}/>
                                :
                                    null
                            }
                    
                            <DropdownRow
                                title="Wall Setting Material"
                                choices={this.state.settingMaterialOptions2}
                                formik={this.props.formik}
                                fieldName="setting_material_walls"
                                zIndex={9}
                                tooltip={true}
                                tooltipHeight={75}
                                popover={TileFieldInfo.settingMaterial}/>

                            {
                                (values.setting_material_walls === "Custom") ?

                                    <MediumInputRow
                                        zIndex={0}
                                        fieldName="setting_material_walls_cust"
                                        formik={this.props.formik}
                                        tooltip={false}/>
                                :
                                    null
                            }
                                            
                            <DropdownRow
                                title="Waterproofing Method"
                                choices={this.state.waterpoofingOptions}
                                formik={this.props.formik}
                                fieldName="waterproof_method"
                                zIndex={8}
                                tooltip={false}/>

                            {
                                (values.waterproof_method === "Fiberglass") ? 
                                    <CheckboxRow
                                        zIndex={0}
                                        label="Sova Construction?"
                                        fieldName="waterproof_sova_constr"
                                        formik={this.props.formik}
                                        defaultValue={values.waterproof_sova_constr}
                                        tooltip={true}
                                        popover={TileFieldInfo.sovaConstruction}
                                        tooltipHeight={60}/>
                                :
                                    null
                            }

                            <CheckboxRow
                                zIndex={0}
                                label="Will We Be Installing Backerboard?"
                                fieldName="backerboard_installer"
                                formik={this.props.formik}
                                defaultValue={values.backerboard_installer}
                                tooltip={false}/>

                            <DropdownRow
                                title="Preferred Silicon"
                                choices={this.state.siliconOptions}
                                formik={this.props.formik}
                                fieldName="silicon_pref"
                                zIndex={7}
                                tooltip={false}/>

                            <DropdownRow
                                title="Shower Niche Construction"
                                choices={this.state.showerNicheOptions}
                                formik={this.props.formik}
                                fieldName="shower_niche_pref"
                                zIndex={6}
                                tooltip={true}
                                tooltipHeight={75}
                                popover={TileFieldInfo.showerNiche}/>

                            {
                                (values.shower_niche_pref !== null) ?    
                                <>                                    
                                    <MediumInputRow
                                        zIndex={0}
                                        label="Shower Niche Brand"
                                        fieldName="shower_niche_brand"
                                        formik={this.props.formik}
                                        tooltip={false}/>  

                                    <SmallInputRow  
                                        zIndex={0}
                                        label="Shower Niche Standard Size"
                                        fieldName="shower_niche_std_size"
                                        formik={this.props.formik}
                                        tooltip={false}/>
                                </>
                                :
                                null
                            }

                            <CheckboxRow
                                zIndex={0}
                                label="Are Corner Soap Dishes Standard?"
                                fieldName="corner_soap_dish"
                                formik={this.props.formik}
                                defaultValue={values.corner_soap_dish}
                                tooltip={false}/>
                            
                            <DropdownRow
                                title="Preferred Construction of Shower Seats"
                                choices={this.state.showerSeatOptions}
                                formik={this.props.formik}
                                fieldName="shower_seat_pref"
                                zIndex={5}
                                tooltip={false}/>

                            {
                                (values.shower_seat_pref === "Other") ?
                                <MediumInputRow
                                    zIndex={0}
                                    fieldName="shower_seat_constr"
                                    formik={this.props.formik}
                                    tooltip={false}/>
                                :
                                null
                            }

                            <CheckboxRow
                                zIndex={0}
                                label="Does the Builder Prefer Schulter?"
                                fieldName="schulter_pref"
                                formik={this.props.formik}
                                defaultValue={values.schulter_pref}
                                tooltip={false}/>

                            <DropdownRow
                                title="Shower Niche Construction"
                                choices={this.state.showerNicheOptions}
                                formik={this.props.formik}
                                fieldName="shower_niche_pref"
                                zIndex={6}
                                tooltip={true}
                                tooltipHeight={75}
                                popover={TileFieldInfo.showerNiche}/>

                            <DropdownRow
                                title="Preferred Grout Joint and Sizing"
                                choices={this.state.groutSizeOptions}
                                formik={this.props.formik}
                                fieldName="grout_joint_size_pref"
                                zIndex={4}
                                tooltip={true}
                                tooltipHeight={75}
                                popover={TileFieldInfo.groutJoint}/>
                            
                            <DropdownRow
                                title="Preferred Grout Brand"
                                choices={this.state.groutBrandOptions}
                                formik={this.props.formik}
                                fieldName="grout_pref"
                                zIndex={3}
                                tooltip={false}/>   

                            <DropdownRow
                                title="Preferred Standard Practice for Subfloor"
                                choices={this.state.subfloorOptions}
                                formik={this.props.formik}
                                fieldName="subfloor_pref"
                                zIndex={2}
                                tooltip={false}/>

                            {
                                (values.subfloor_pref === "Other") ?  
                                <MediumInputRow
                                    zIndex={0}
                                    fieldName="subfloor_other"
                                    formik={this.props.formik}
                                    tooltip={false}/>
                                :
                                null
                            }

                            <CheckboxRow
                                zIndex={0}
                                label="Tile Return Walls at Backsplash?"
                                fieldName="tile_return_walls"
                                formik={this.props.formik}
                                defaultValue={values.tile_return_walls}
                                tooltip={false}/>
  
                            <DropdownRow
                                title="Who Does Takeoffs?"
                                choices={this.state.takeoffOptions}
                                formik={this.props.formik}
                                fieldName="takeoff_resp"
                                zIndex={1}
                                tooltip={false}/>
                                       
                            <MediumInputRow
                                zIndex={0}
                                label="Waste Factor Percentage"
                                fieldName="waste_pct"
                                formik={this.props.formik}
                                tooltip={false}/>  

                            <MediumInputRow
                                zIndex={0}
                                fieldName="wall_tile_height"
                                label="Wall Tile Height"
                                formik={this.props.formik}
                                tooltip={false}/>
                            
                            <MediumInputRow
                                zIndex={0}
                                label="Notes"
                                fieldName="notes"
                                formik={this.props.formik}
                                tooltip={false}/>  

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
TileProgramForm.propTypes = {
  formik: PropTypes.object
}

export default TileProgramForm;
