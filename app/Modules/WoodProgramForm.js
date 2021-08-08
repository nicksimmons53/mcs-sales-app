// Library Imports
import React from 'react';
import { View, Text, Switch } from 'react-native';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import { Divider, Button } from 'react-native-elements';
import { SmallInputRow, MediumInputRow } from '../Components/InputRow';
import CheckboxRow from '../Components/CheckboxRow';
import DropdownRow from '../Components/DropdownRow';
import { WoodFieldInfo } from '../Form/Values.form';
import Programs from '../api/Programs';
import { styles, colors } from './Styles/Form.style';

let zIndex=100;

// Class Component for Client Accounting Info
function WoodProgramForm(props) {
    const [ fields, showFields ] = React.useState(false);
    const [ initialValues, setValues ] = React.useState(null);

    state = {
        fieldsVisible: false,
        floorTrimStyleOptions: [
            { label: "Pre-Primed", value: "Pre-Primed" },
            { label: "MC Surfaces Stain", value: "MC Surfaces Stain" }
        ],
        secondStoryOptions: [
            { label: "None", value: "None" },
            { label: "Hardiebacker for Upstairs Wood", value: "Hardiebacker for Upstairs Wood" }
        ],
        takeoffOptions: [
            { label: "Builder", value: "Builder" },
            { label: "MC Surfaces, Inc.", value: "MC Surfaces, Inc." }
        ],
        yesOrNoOptions: [
            { label: "Yes", value: 1 },
            { label: "No", value: 0 }
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
                    <Text style={styles.headerText}>Wood Program</Text>
    
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
                <Text style={styles.headerText}>Wood Program</Text>

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
                        onSubmit={(actions, values) => props.save(values, "woodProgram")}>
                        { formikProps => (
                    <>
                        <Divider/>

                        <SmallInputRow
                            zIndex={0}
                            label="Preferred Glue Products"
                            fieldName="glue_pref"
                            formik={formikProps}
                            tooltip={true}
                            popover={WoodFieldInfo.preferredGlue}
                            tooltipHeight={75}/>

                        <DropdownRow
                            zIndex={zIndex-=1}
                            title="Will We Be Installing Floor Trim?"
                            choices={this.state.yesOrNoOptions}
                            fieldName="floor_trim_installer"
                            formik={formikProps}
                            tooltip={true}
                            tooltipHeight={135}
                            popover={WoodFieldInfo.floorTrimInstaller}/>

                        {
                            formikProps.initialValues.floor_trim_installer === "Yes" ?
                                <DropdownRow
                                    zIndex={zIndex-=1}
                                    title="Trim Around Cabinets?"
                                    choices={this.state.yesOrNoOptions}
                                    fieldName="cabinet_trim"
                                    formik={formikProps}
                                    tooltip={true}
                                    tooltipHeight={135}
                                    popover={WoodFieldInfo.cabinet_trim}/>
                            :
                            null
                        }

                        <DropdownRow
                            title="Will Floor Trim Be..."
                            choices={this.state.floorTrimStyleOptions}
                            formik={formikProps}
                            fieldName="floor_trim_style"
                            zIndex={zIndex-=1}
                            tooltip={false}/>

                        <DropdownRow
                            title="Preferred Construction of 2nd Story Subfloor"
                            choices={this.state.secondStoryOptions}
                            formik={formikProps}
                            fieldName="second_story_hardie"
                            zIndex={zIndex-=1}
                            tooltip={true}
                            tooltipHeight={90}
                            popover={WoodFieldInfo.secondStorySubfloor}/>

                        <CheckboxRow
                            zIndex={0}
                            label="Are Transition Strips Standard Practice?"
                            fieldName="transition_strips_std"
                            formik={formikProps}
                            defaultValue={formikProps.initialValues.transition_strips_std}
                            tooltip={true}
                            tooltipHeight={75}
                            popover={WoodFieldInfo.transitionStrips}/>

                        <CheckboxRow
                            zIndex={0}
                            label="HVAC Requirement?"
                            fieldName="hvac_req"
                            formik={formikProps}
                            defaultValue={formikProps.initialValues.hvac_req}
                            tooltip={true}
                            tooltipHeight={120}
                            popover={WoodFieldInfo.hvacRequirement}/>

                        <DropdownRow
                            title="Who Will be Doing Takeoffs?"
                            choices={this.state.takeoffOptions}
                            formik={formikProps}
                            fieldName="takeoff_resp"
                            zIndex={zIndex-=1}
                            tooltip={false}/>

                        <SmallInputRow
                            zIndex={0}
                            label="Waste Factor Percentage"
                            fieldName="waste_factor"
                            formik={formikProps}/>

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

// Props Valdidation
WoodProgramForm.propTypes = {
  formik: PropTypes.object
}

export default WoodProgramForm;