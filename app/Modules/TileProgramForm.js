// Library Imports
import React from 'react';
import { View, Text, Switch } from 'react-native';
import { Divider, Button } from 'react-native-elements';
import { Formik } from 'formik';
import CheckboxRow from '../Components/CheckboxRow';
import { SmallInputRow, MediumInputRow } from '../Components/InputRow';
import DropdownRow from '../Components/DropdownRow';
import { TileFieldInfo } from '../Form/Values.form';
import Programs from '../api/Programs';
import { styles, colors } from './Styles/Form.style';

let zIndex=100;

// Class Component for Client Accounting Info
function TileProgramForm(props) {
    const [ fields, showFields ] = React.useState(false);
    const [ initialValues, setValues ] = React.useState(null);

    state = {
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

    const toggleFields = async( ) => {
        showFields(!fields);
        setValues(await Programs.getTile(props.userId, props.clientId));
    }

    if (initialValues === null) {
        return (
            <View style={styles.background}>
                <View style={styles.form}>
                    <Text style={styles.headerText}>Tile Program</Text>
    
                    <Divider />
    
                    <View style={styles.textRow}>
                        <Text style={styles.label}>Toggle Input Fields</Text>
                        <Switch
                            value={fields}
                            onValueChange={( ) => toggleFields( )}
                            trackColor={{true: colors.green}}/>
                    </View>
                </View>
            </View>
        );
    }
    
    return initialValues !== null && (
        <View style={styles.background}>
            <View style={styles.form}>
                <Text style={styles.headerText}>Tile Program</Text>

                <Divider />

                <View style={styles.textRow}>
                    <Text style={styles.label}>Toggle Input Fields</Text>
                    <Switch
                        value={fields}
                        onValueChange={( ) => toggleFields( )}
                        trackColor={{true: colors.green}}/>
                </View>

                {fields &&
                    <Formik
                        enableReinitialize={true}
                        initialValues={{...initialValues[0]}}
                        onSubmit={(actions, values) => props.save(values, "tileProgram")}>
                        { formikProps => (
                            <>
                            <Divider/>
                            <DropdownRow
                                title="Floor Setting Material"
                                choices={this.state.settingMaterialOptions}
                                formik={formikProps}
                                fieldName="setting_material_floors"
                                zIndex={zIndex-=1}
                                tooltip={true}
                                tooltipHeight={75}
                                popover={TileFieldInfo.settingMaterial}/>

                        {
                            (formikProps.initialValues.setting_material_floors === "Custom") ?
                                <MediumInputRow
                                    zIndex={0}
                                    fieldName="setting_material_floors_cust"
                                    formik={formikProps}
                                    tooltip={false}/>
                            :
                                null
                        }

                        <SmallInputRow
                            label='Setting Material Floors Product'
                            zIndex={0}
                            fieldName="setting_material_floors_product"
                            formik={formikProps}
                            tooltip={false}/>
                
                        <DropdownRow
                            title="Wall Setting Material"
                            choices={this.state.settingMaterialOptions2}
                            formik={formikProps}
                            fieldName="setting_material_walls"
                            zIndex={zIndex-=1}
                            tooltip={true}
                            tooltipHeight={75}
                            popover={TileFieldInfo.settingMaterial}/>

                        {
                            (formikProps.initialValues.setting_material_walls === "Custom") ?

                                <MediumInputRow
                                    zIndex={0}
                                    fieldName="setting_material_walls_cust"
                                    formik={formikProps}
                                    tooltip={false}/>
                            :
                                null
                        }

                        <SmallInputRow
                            label='Setting Material Walls Product'
                            zIndex={0}
                            fieldName="setting_material_walls_product"
                            formik={formikProps}
                            tooltip={false}/>

                        <SmallInputRow
                            label='Allotted Float'
                            zIndex={0}
                            fieldName="allotted_float"
                            formik={formikProps}
                            tooltip={false}/>

                        <SmallInputRow
                            label='Charge for Extra Float'
                            zIndex={0}
                            fieldName="allotted_float_charge"
                            formik={formikProps}
                            tooltip={false}/>
                                        
                        <DropdownRow
                            title="Waterproofing Method"
                            choices={this.state.waterpoofingOptions}
                            formik={formikProps}
                            fieldName="waterproof_method"
                            zIndex={zIndex-=1}
                            tooltip={false}/>

                        <DropdownRow
                            title="Waterproofing Method - Shower Walls"
                            choices={this.state.waterpoofingOptions}
                            formik={formikProps}
                            fieldName="waterproof_method_shower_wall"
                            zIndex={zIndex-=1}
                            tooltip={false}/>

                        <DropdownRow
                            title="Waterproofing Method - Tub Wall"
                            choices={this.state.waterpoofingOptions}
                            formik={formikProps}
                            fieldName="waterproof_method_tub_wall"
                            zIndex={zIndex-=1}
                            tooltip={false}/>

                        {
                            (formikProps.initialValues.waterproof_method === "Fiberglass") ? 
                                <CheckboxRow
                                    zIndex={0}
                                    label="Sova Construction?"
                                    fieldName="waterproof_sova_constr"
                                    formik={formikProps}
                                    defaultValue={formikProps.initialValues.waterproof_sova_constr}
                                    tooltip={true}
                                    popover={TileFieldInfo.sovaConstruction}
                                    tooltipHeight={60}/>
                            :
                                null
                        }

                        <DropdownRow
                            title="Will We Be Installing Backerboard?"
                            choices={this.state.yesOrNoOptions}
                            formik={formikProps}
                            defaultValue={formikProps.initialValues.backerboard_installer}
                            fieldName="backerboard_installer"
                            zIndex={zIndex-=1}
                            tooltip={false}/>

                        <DropdownRow
                            title="Punch Out Material"
                            choices={this.state.punchOutOptions}
                            formik={formikProps}
                            fieldName="punch_out_material"
                            zIndex={zIndex-=1}
                            tooltip={false}/>

                        <DropdownRow
                            title="Shower Niche Construction"
                            choices={this.state.showerNicheOptions}
                            formik={formikProps}
                            fieldName="shower_niche_pref"
                            zIndex={zIndex-=1}
                            tooltip={true}
                            tooltipHeight={75}
                            popover={TileFieldInfo.showerNiche}/>

                        {
                            (formikProps.initialValues.shower_niche_pref !== null) ?    
                            <>                                    
                                <MediumInputRow
                                    zIndex={0}
                                    label="Shower Niche Brand"
                                    fieldName="shower_niche_brand"
                                    formik={formikProps}
                                    tooltip={false}/>  

                                <SmallInputRow  
                                    zIndex={0}
                                    label="Shower Niche Standard Size"
                                    fieldName="shower_niche_std_size"
                                    formik={formikProps}
                                    tooltip={false}/>
                            </>
                            :
                            null
                        }

                        <DropdownRow
                            title="Are Corner Soap Dishes Standard?"
                            choices={this.state.yesOrNoOptions}
                            formik={formikProps}
                            fieldName="corner_soap_dish_std"
                            zIndex={zIndex-=1}
                            tooltip={false}/>
                        
                        <DropdownRow
                            title="Preferred Construction of Shower Seats"
                            choices={this.state.showerSeatOptions}
                            formik={formikProps}
                            fieldName="shower_seat_pref"
                            zIndex={zIndex-=1}
                            tooltip={false}/>

                        {
                            (formikProps.initialValues.shower_seat_pref === "Other") ?
                            <MediumInputRow
                                zIndex={0}
                                fieldName="shower_seat_constr"
                                formik={formikProps}
                                tooltip={false}/>
                            :
                            null
                        }

                        <DropdownRow
                            title="Schulter Options"
                            choices={this.state.schulterOptions}
                            formik={formikProps}
                            fieldName="schulter_option"
                            zIndex={zIndex-=1}
                            tooltip={true}
                            tooltipHeight={75}/>

                        <DropdownRow
                            title="Shower Niche Construction"
                            choices={this.state.showerNicheOptions}
                            formik={formikProps}
                            fieldName="shower_niche_pref"
                            zIndex={zIndex-=1}
                            tooltip={true}
                            tooltipHeight={75}
                            popover={TileFieldInfo.showerNiche}/>
                        
                        <MediumInputRow
                            label='Pony Wall Options'
                            zIndex={0}
                            fieldName="pony_wall"
                            formik={formikProps}
                            tooltip={false}/>

                        <DropdownRow
                            title="Preferred Grout Joint and Sizing"
                            choices={this.state.groutSizeOptions}
                            formik={formikProps}
                            fieldName="grout_joint_size_pref"
                            zIndex={zIndex-=1}
                            tooltip={true}
                            tooltipHeight={75}
                            popover={TileFieldInfo.groutJoint}/>
                        
                        <DropdownRow
                            title="Preferred Grout Brand"
                            choices={this.state.groutBrandOptions}
                            formik={formikProps}
                            fieldName="grout_pref"
                            zIndex={zIndex-=1}
                            tooltip={false}/>
                        
                        <SmallInputRow
                            label='Upgraded Grout'
                            zIndex={0}
                            fieldName="grout_upgrade"
                            formik={formikProps}
                            tooltip={false}/>

                        <SmallInputRow
                            label='Grout Product'
                            zIndex={0}
                            fieldName="grout_product"
                            formik={formikProps}
                            tooltip={false}/>

                        <DropdownRow
                            title="Preferred Standard Practice for Subfloor"
                            choices={this.state.subfloorOptions}
                            formik={formikProps}
                            fieldName="subfloor_pref"
                            zIndex={zIndex-=1}
                            tooltip={false}/>

                        {
                            (formikProps.initialValues.subfloor_pref === "Other") ?  
                            <MediumInputRow
                                zIndex={0}
                                fieldName="subfloor_other"
                                formik={formikProps}
                                tooltip={false}/>
                            :
                            null
                        }

                        <DropdownRow
                            title="Tile Return Walls at Backsplash?"
                            choices={this.state.yesOrNoOptions}
                            formik={formikProps}
                            fieldName="tile_return_walls"
                            zIndex={zIndex-=1}
                            tooltip={false}/>

                        <DropdownRow
                            title="Who Does Takeoffs?"
                            choices={this.state.takeoffOptions}
                            formik={formikProps}
                            fieldName="takeoff_resp"
                            zIndex={zIndex-=1}
                            tooltip={false}/>
                                    
                        <MediumInputRow
                            zIndex={0}
                            label="Waste Factor Percentage"
                            fieldName="waste_pct"
                            formik={formikProps}
                            tooltip={false}/>  

                        <SmallInputRow
                            zIndex={0}
                            label="Waste Factor Percentage - Walls"
                            fieldName="waste_pct_walls"
                            formik={formikProps}
                            tooltip={false}/> 

                        <SmallInputRow
                            zIndex={0}
                            label="Waste Factor Percentage - Floors"
                            fieldName="waste_pct_floors"
                            formik={formikProps}
                            tooltip={false}/> 

                        <SmallInputRow
                            zIndex={0}
                            label="Waste Factor Percentage - Mosaics"
                            fieldName="waste_pct_mosaics"
                            formik={formikProps}
                            tooltip={false}/> 
                        
                        <DropdownRow
                            title="Wall Tile Height Options"
                            choices={this.state.wallTileHeightOptions}
                            formik={formikProps}
                            fieldName="wall_tile_height_opt"
                            zIndex={zIndex-=1}/>

                        <MediumInputRow
                            zIndex={0}
                            label="Notes"
                            fieldName="notes"
                            formik={formikProps}
                            tooltip={false}/>  

                        <Divider/>
                                        
                        <View style={styles.buttonView}>
                            <Button
                                title='Save'
                                disabled={props.disabled}
                                buttonStyle={styles.save}
                                containerStyle={styles.saveButtonContainer}
                                onPress={formikProps.handleSubmit}/>
                        </View>    
                        </>
                    )}               
                </Formik>
                }
            </View>
        </View>
    );
}


export default TileProgramForm;
