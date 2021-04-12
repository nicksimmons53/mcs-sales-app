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

let zIndex=100;

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
            { label: "Membrane", value: "Membrane" },
            { label: "Kerdi", value: "Kerdi" },
            { label: "Quikrete", value: "Quikrete" }
        ],
        punchOutOptions: [
            { label: "Siliconized Grout Match", value: "Siliconized Grout Match" },
            { label: "Colored Caulk", value: "Colored Caulk" }
        ],
        showerNicheOptions: [
            { label: "Premolded/Plastic", value: "Premolded/Plastic" },
            { label: "Preframed with Waterproofing", value: "Preframed with Waterproofing" }
        ],
        showerSeatOptions: [
            { label: "MC Surfaces Build", value: "MC Surfaces Build" },
            { label: "Framed", value: "Framed" },
            { label: "Combination", value: "Combination" },
            { label: "Other", value: "Other" }
        ],
        schulterOptions: [
            { label: "Standard", value: "Standard" },
            { label: "Optional", value: "Optional" }
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
            { label: "Mapeguard", value: "Mapeguard" },
            { label: "Other", value: "Other" }
        ],
        takeoffOptions: [
            { label: "Builder", value: "Builder" },
            { label: "MC Surfaces, Inc.", value: "MC Surfaces, Inc." }
        ],
        wallTileHeightOptions: [
            { label: "Standard", value: "Standard" },
            { label: "Ceiling", value: "Ceiling" },
            { label: "Plan", value: "Plan" },
            { label: "7 ft.", value: "7 ft." }
        ],
        yesOrNoOptions: [
            { label: "Yes", value: 1 },
            { label: "No", value: 0 }
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
                                zIndex={zIndex-=1}
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

                            <SmallInputRow
                                label='Setting Material Floors Product'
                                zIndex={0}
                                fieldName="setting_material_floors_product"
                                formik={this.props.formik}
                                tooltip={false}/>
                    
                            <DropdownRow
                                title="Wall Setting Material"
                                choices={this.state.settingMaterialOptions2}
                                formik={this.props.formik}
                                fieldName="setting_material_walls"
                                zIndex={zIndex-=1}
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

                            <SmallInputRow
                                label='Setting Material Walls Product'
                                zIndex={0}
                                fieldName="setting_material_walls_product"
                                formik={this.props.formik}
                                tooltip={false}/>

                            <SmallInputRow
                                label='Allotted Float'
                                zIndex={0}
                                fieldName="allotted_float"
                                formik={this.props.formik}
                                tooltip={false}/>

                            <SmallInputRow
                                label='Charge for Extra Float'
                                zIndex={0}
                                fieldName="allotted_float_charge"
                                formik={this.props.formik}
                                tooltip={false}/>
                                            
                            <DropdownRow
                                title="Waterproofing Method"
                                choices={this.state.waterpoofingOptions}
                                formik={this.props.formik}
                                fieldName="waterproof_method"
                                zIndex={zIndex-=1}
                                tooltip={false}/>

                            <DropdownRow
                                title="Waterproofing Method - Shower Walls"
                                choices={this.state.waterpoofingOptions}
                                formik={this.props.formik}
                                fieldName="waterproof_method_shower_wall"
                                zIndex={zIndex-=1}
                                tooltip={false}/>

                            <DropdownRow
                                title="Waterproofing Method - Tub Wall"
                                choices={this.state.waterpoofingOptions}
                                formik={this.props.formik}
                                fieldName="waterproof_method_tub_wall"
                                zIndex={zIndex-=1}
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

                            <DropdownRow
                                title="Will We Be Installing Backerboard?"
                                choices={this.state.yesOrNoOptions}
                                formik={this.props.formik}
                                defaultValue={values.backerboard_installer}
                                fieldName="backerboard_installer"
                                zIndex={zIndex-=1}
                                tooltip={false}/>
                            
                            {
                                (values.backerboard_installer === "No") ?
                                    <MediumInputRow
                                        label='Backerboard Options'
                                        zIndex={0}
                                        fieldName="backerboard_options"
                                        formik={this.props.formik}
                                        tooltip={false}/>
                                :
                                    null
                            }

                            <DropdownRow
                                title="Punch Out Material"
                                choices={this.state.punchOutOptions}
                                formik={this.props.formik}
                                fieldName="punch_out_material"
                                zIndex={zIndex-=1}
                                tooltip={false}/>

                            <DropdownRow
                                title="Shower Niche Construction"
                                choices={this.state.showerNicheOptions}
                                formik={this.props.formik}
                                fieldName="shower_niche_pref"
                                zIndex={zIndex-=1}
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

                            <DropdownRow
                                title="Are Corner Soap Dishes Standard?"
                                choices={this.state.yesOrNoOptions}
                                formik={this.props.formik}
                                fieldName="corner_soap_dish_std"
                                zIndex={zIndex-=1}
                                tooltip={false}/>
                            
                            <DropdownRow
                                title="Preferred Construction of Shower Seats"
                                choices={this.state.showerSeatOptions}
                                formik={this.props.formik}
                                fieldName="shower_seat_pref"
                                zIndex={zIndex-=1}
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

                            <DropdownRow
                                title="Schulter Options"
                                choices={this.state.schulterOptions}
                                formik={this.props.formik}
                                fieldName="schulter_option"
                                zIndex={zIndex-=1}
                                tooltip={true}
                                tooltipHeight={75}/>

                            <DropdownRow
                                title="Shower Niche Construction"
                                choices={this.state.showerNicheOptions}
                                formik={this.props.formik}
                                fieldName="shower_niche_pref"
                                zIndex={zIndex-=1}
                                tooltip={true}
                                tooltipHeight={75}
                                popover={TileFieldInfo.showerNiche}/>
                            
                            <MediumInputRow
                                label='Pony Wall Options'
                                zIndex={0}
                                fieldName="pony_wall"
                                formik={this.props.formik}
                                tooltip={false}/>

                            <DropdownRow
                                title="Preferred Grout Joint and Sizing"
                                choices={this.state.groutSizeOptions}
                                formik={this.props.formik}
                                fieldName="grout_joint_size_pref"
                                zIndex={zIndex-=1}
                                tooltip={true}
                                tooltipHeight={75}
                                popover={TileFieldInfo.groutJoint}/>
                            
                            <DropdownRow
                                title="Preferred Grout Brand"
                                choices={this.state.groutBrandOptions}
                                formik={this.props.formik}
                                fieldName="grout_pref"
                                zIndex={zIndex-=1}
                                tooltip={false}/>
                            
                            <SmallInputRow
                                label='Upgraded Grout'
                                zIndex={0}
                                fieldName="grout_upgrade"
                                formik={this.props.formik}
                                tooltip={false}/>

                            <SmallInputRow
                                label='Grout Product'
                                zIndex={0}
                                fieldName="grout_product"
                                formik={this.props.formik}
                                tooltip={false}/>

                            <DropdownRow
                                title="Preferred Standard Practice for Subfloor"
                                choices={this.state.subfloorOptions}
                                formik={this.props.formik}
                                fieldName="subfloor_pref"
                                zIndex={zIndex-=1}
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

                            <DropdownRow
                                title="Tile Return Walls at Backsplash?"
                                choices={this.state.yesOrNoOptions}
                                formik={this.props.formik}
                                fieldName="tile_return_walls"
                                zIndex={zIndex-=1}
                                tooltip={false}/>
  
                            <DropdownRow
                                title="Who Does Takeoffs?"
                                choices={this.state.takeoffOptions}
                                formik={this.props.formik}
                                fieldName="takeoff_resp"
                                zIndex={zIndex-=1}
                                tooltip={false}/>
                                       
                            <MediumInputRow
                                zIndex={0}
                                label="Waste Factor Percentage"
                                fieldName="waste_pct"
                                formik={this.props.formik}
                                tooltip={false}/>  

                            <SmallInputRow
                                zIndex={0}
                                label="Waste Factor Percentage - Walls"
                                fieldName="waste_pct_walls"
                                formik={this.props.formik}
                                tooltip={false}/> 

                            <SmallInputRow
                                zIndex={0}
                                label="Waste Factor Percentage - Floors"
                                fieldName="waste_pct_floors"
                                formik={this.props.formik}
                                tooltip={false}/> 

                            <SmallInputRow
                                zIndex={0}
                                label="Waste Factor Percentage - Mosaics"
                                fieldName="waste_pct_mosaics"
                                formik={this.props.formik}
                                tooltip={false}/> 
                            
                            <DropdownRow
                                title="Wall Tile Height Options"
                                choices={this.state.wallTileHeightOptions}
                                formik={this.props.formik}
                                fieldName="wall_tile_height_opt"
                                zIndex={zIndex-=1}/>

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
