// Library Imports
import React, { Component } from 'react';
import { View, Text, Switch } from 'react-native';
import PropTypes from 'prop-types';
import { Divider, Button } from 'react-native-elements';
import { MediumInputRow } from '../Components/InputRow';
import DropdownRow from '../Components/DropdownRow';
import CheckboxRow from '../Components/CheckboxRow';
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

                            <DropdownRow
                                title="Preferred Material Thickness"
                                choices={this.state.materialThicknessOptions}
                                formik={this.props.formik}
                                fieldName="material_thickness_pref"
                                zIndex={5}
                                tooltip={false}/>

                            {values.material_thickness_pref === "Other" ? 
                                <MediumInputRow
                                    zIndex={0}
                                    fieldName="material_thickness_other"
                                    formik={this.props.formik}
                                    tooltip={false}/>            
                            : null}

                            
                            <DropdownRow
                                title="Preferred Edge"
                                choices={this.state.edgeOptions}
                                formik={this.props.formik}
                                fieldName="edge_pref"
                                zIndex={4}
                                tooltip={false}/>

                            {values.edge_pref === "Other" ?    
                                <MediumInputRow
                                    zIndex={0}
                                    fieldName="edge_pref_other"
                                    formik={this.props.formik}
                                    tooltip={false}/>  
                            : null}


                            <CheckboxRow
                                zIndex={0}
                                label="Are Waterfall Sides Standard (or Option)?"
                                fieldName="waterfall_sides_std"
                                formik={formik}
                                defaultValue={values.waterfall_sides_std}
                                tooltip={false}/>
                            
                            <CheckboxRow
                                zIndex={0}
                                label="Faucet Holes (Are We Providing Sinks?)"
                                fieldName="faucet_holes"
                                formik={formik}
                                defaultValue={values.faucet_holes}
                                tooltip={false}/>
                            
                            <MediumInputRow
                                zIndex={0}
                                fieldName="stove_range_specs"
                                label="Stove Range Specifications"
                                formik={this.props.formik}
                                tooltip={false}/> 

                            <DropdownRow
                                title="Who Will be Doing Takeoffs?"
                                choices={this.state.takeoffOptions}
                                formik={this.props.formik}
                                fieldName="takeoff_resp"
                                zIndex={2}
                                tooltip={false}/>                     
                                      
                            <MediumInputRow
                                zIndex={0}
                                fieldName="waste_factor"
                                label="Waste Factor Percentage"
                                formik={this.props.formik}
                                tooltip={false}/>
                           
                            <MediumInputRow
                                zIndex={0}
                                fieldName="notes"
                                label="notes"
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
CountertopProgramForm.propTypes = {
  formik: PropTypes.object
}

export default CountertopProgramForm;