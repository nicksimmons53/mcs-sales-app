// Library Imports
import React from 'react';
import { View, Text, Switch } from 'react-native';
import { Divider, Button } from 'react-native-elements';
import { Formik } from 'formik';
import { SmallInputRow, MediumInputRow } from '../Components/InputRow';
import DropdownRow from '../Components/DropdownRow';
import { CarpetProgramInfo } from '../Form/Values.form';
import Programs from '../api/Programs';
import { styles, colors } from './Styles/Form.style';

let zIndex=100;

// Class Component for Client Accounting Info
function CarpetProgramForm(props) {
    const [ fields, showFields ] = React.useState(false);
    const [ initialValues, setValues ] = React.useState(null);

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

    const toggleFields = async( ) => {
        showFields(!fields);
        setValues(await Programs.getTile(props.userId, props.clientId));
    }

    if (initialValues === null) {
        return (
            <View style={styles.background}>
                <View style={styles.form}>
                    <Text style={styles.headerText}>Carpet Program</Text>
    
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
                <Text style={styles.headerText}>Carpet Program</Text>

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
                            fieldName="padding_brand_pref"
                            label="Preferred Padding Brand"
                            tooltip={false}
                            formik={formikProps}/>

                        <MediumInputRow
                            zIndex={0}
                            fieldName="carpet_brand_pref"
                            label="Preferred Carpet Brand"
                            tooltip={false}
                            formik={formikProps}/>

                        <DropdownRow
                            title="Who Will be Doing Takeoffs?"
                            choices={this.state.takeoffOptions}
                            formik={formikProps}
                            fieldName="takeoff_resp"
                            zIndex={zIndex-=1}
                            tooltip={false}/>

                        <SmallInputRow
                            zIndex={0}
                            fieldName="waste_factor"
                            label="Waste Factor Percentage"
                            tooltip={false}
                            formik={formikProps}/>
                                    
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

export default CarpetProgramForm;