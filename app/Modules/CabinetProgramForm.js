// Library Imports
import React from 'react';
import { View, Text, Switch } from 'react-native';;
import { Divider, Button } from 'react-native-elements';
import { Formik } from 'formik';
import { SmallInputRow, MediumInputRow } from '../components/InputRow';
import CheckboxRow from '../components/CheckboxRow';
import DropdownRow from '../components/DropdownRow';
import Programs from '../api/Programs';
import { styles, colors } from './Styles/Form.style';

let zIndex=100;

// Class Component for Client Accounting Info
function CabinetProgramForm(props) {
    const [ fields, showFields ] = React.useState(false);
    const [ initialValues, setValues ] = React.useState(null);

    state = {
        fieldsVisible: false,
        bidTypeOptions: [
            { label: "Whole House", value: "Whole House" },
            { label: "Specific Rooms", value: "Specific Rooms" }
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
                    <Text style={styles.headerText}>Cabinet Program</Text>
    
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
                <Text style={styles.headerText}>Cabinet Program</Text>

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

                        <MediumInputRow
                            zIndex={0}
                            fieldName="color_pref"
                            label="Preferred Colors"
                            tooltip={false}
                            formik={formikProps}/>

                        <MediumInputRow
                            zIndex={0}
                            fieldName="style_pref"
                            label="Preferred Styles"
                            tooltip={false}
                            formik={formikProps}/>
                        
                        <CheckboxRow
                            zIndex={0}
                            label="Preferences on Soft Close (Are They Standard?)"
                            fieldName="soft_close_std"
                            formik={formikProps}
                            defaultValue={formikProps.initialValues.soft_close_std}
                            tooltip={false}/>
                        
                        <MediumInputRow
                            zIndex={0}
                            fieldName="overlay"
                            label="Overylay"
                            tooltip={false}
                            formik={formikProps}/>

                        <MediumInputRow
                            zIndex={0}
                            fieldName="crown_pref"
                            label="Preferences and Sizes of Crown"
                            tooltip={false}
                            formik={formikProps}/>
                            
                        <MediumInputRow
                            zIndex={0}
                            fieldName="upper_cabinet_spec"
                            label="Standard Specifications for Upper Cabinets"
                            tooltip={false}
                            formik={formikProps}/>   
                                                            
                        <MediumInputRow
                            zIndex={0}
                            fieldName="vanity_height_spec"
                            label="Standard Specifications for Vanity Height"
                            tooltip={false}
                            formik={formikProps}/>

                        <DropdownRow
                            title="Preferences on Bid Types"
                            choices={this.state.bidTypeOptions}
                            formik={formikProps}
                            fieldName="bid_type_pref"
                            zIndex={zIndex-=1}
                            tooltip={false}/>

                        <SmallInputRow
                            zIndex={0}
                            fieldName="optioned_area_out"
                            label="Any Areas Optioned Out?"
                            formik={formikProps}
                            tooltip={false}/>
                                                                                    
                        <MediumInputRow
                            zIndex={0}
                            fieldName="notes"
                            label="Notes"
                            tooltip={false}
                            formik={formikProps}/>            

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

export default CabinetProgramForm;