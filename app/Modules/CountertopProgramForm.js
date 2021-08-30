// Library Imports
import React from 'react';
import { View, Text, Switch } from 'react-native';
import { Divider, Button } from 'react-native-elements';
import { Formik } from 'formik';
import { MediumInputRow } from '../components/InputRow';
import DropdownRow from '../components/DropdownRow';
import CheckboxRow from '../components/CheckboxRow';
import Programs from '../api/Programs';
import { styles, colors } from './Styles/Form.style';

let zIndex=100;

// Class Component for Client Accounting Info
function CountertopProgramForm(props) {
    const [ fields, showFields ] = React.useState(false);
    const [ initialValues, setValues ] = React.useState(null);

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

    const toggleFields = async( ) => {
        showFields(!fields);
        setValues(await Programs.getTile(props.userId, props.clientId));
    }

    if (initialValues === null) {
        return (
            <View style={styles.background}>
                <View style={styles.form}>
                    <Text style={styles.headerText}>Countertop Program</Text>
    
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
                <Text style={styles.headerText}>Countertop Program</Text>

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
                        onSubmit={(actions, values) => props.save(values, "countertopProgram")}>
                        { formikProps => (
                    <>
                        <Divider/>

                        <DropdownRow
                            title="Preferred Material Thickness"
                            choices={this.state.materialThicknessOptions}
                            formik={formikProps}
                            fieldName="material_thickness_pref"
                            zIndex={zIndex-=1}
                            tooltip={false}/>

                        {formikProps.initialValues.material_thickness_pref === "Other" ? 
                            <MediumInputRow
                                zIndex={0}
                                fieldName="material_thickness_other"
                                formik={formikProps}
                                tooltip={false}/>            
                        : null}

                        
                        <DropdownRow
                            title="Preferred Edge"
                            choices={this.state.edgeOptions}
                            formik={formikProps}
                            fieldName="edge_pref"
                            zIndex={zIndex-=1}
                            tooltip={false}/>

                        {formikProps.initialValues.edge_pref === "Other" ?    
                            <MediumInputRow
                                zIndex={0}
                                fieldName="edge_pref_other"
                                formik={formikProps}
                                tooltip={false}/>  
                        : null}


                        <CheckboxRow
                            zIndex={0}
                            label="Are Waterfall Sides Standard (or Option)?"
                            fieldName="waterfall_sides_std"
                            formik={formikProps}
                            defaultValue={formikProps.initialValues.waterfall_sides_std}
                            tooltip={false}/>
                        
                        <CheckboxRow
                            zIndex={0}
                            label="Faucet Holes (Are We Providing Sinks?)"
                            fieldName="faucet_holes"
                            formik={formikProps}
                            defaultValue={formikProps.initialValues.faucet_holes}
                            tooltip={false}/>
                        
                        <MediumInputRow
                            zIndex={0}
                            fieldName="stove_range_specs"
                            label="Stove Range Specifications"
                            formik={formikProps}
                            tooltip={false}/> 

                        <DropdownRow
                            title="Who Will be Doing Takeoffs?"
                            choices={this.state.takeoffOptions}
                            formik={formikProps}
                            fieldName="takeoff_resp"
                            zIndex={zIndex-=1}
                            tooltip={false}/>                     
                                    
                        <MediumInputRow
                            zIndex={0}
                            fieldName="waste_factor"
                            label="Waste Factor Percentage"
                            formik={formikProps}
                            tooltip={false}/>
                        
                        <MediumInputRow
                            zIndex={0}
                            fieldName="notes"
                            label="Notes"
                            formik={formikProps}
                            tooltip={false}/>
                                    
                        <Divider/>
                                            
                        <View style={styles.buttonView}>
                            <Button
                                title='Save'
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

export default CountertopProgramForm;