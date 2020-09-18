// Library Imports
import React, { Component } from 'react';
import { View, Text, Switch } from 'react-native';
import PropTypes from 'prop-types';
import { Divider, Button } from 'react-native-elements';
import { SmallInputRow, MediumInputRow } from '../Components/InputRow';
import CheckboxRow from '../Components/CheckboxRow';
import DropdownRow from '../Components/DropdownRow';
import { WoodFieldInfo } from '../Form/Values.form';
import { styles, colors } from './Styles/Form.style';

// Class Component for Client Accounting Info
class WoodProgramForm extends Component {
    state = {
        fieldsVisible: false,
        floorTrimOptions: [
            { label: "1/4\" Round", value: "1/4\" Round" },
            { label: "Shoe Mold", value: "Shoe Mold" }
        ],
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
                    <Text style={styles.headerText}>Wood Program</Text>

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

                            <SmallInputRow
                                zIndex={0}
                                label="Preferred Glue Products"
                                fieldName="glue_pref"
                                formik={this.props.formik}
                                tooltip={true}
                                popover={WoodFieldInfo.preferredGlue}
                                tooltipHeight={75}/>

                            <CheckboxRow
                                zIndex={0}
                                label="Will We Be Installing Floor Trim?"
                                fieldName="floor_trim_installer"
                                formik={this.props.formik}
                                defaultValue={values.floor_trim_installer}
                                tooltip={true}
                                tooltipHeight={135}
                                popover={WoodFieldInfo.floorTrimInstaller}/>

                            <DropdownRow
                                title="Preferred Floor Trim"
                                choices={this.state.floorTrimOptions}
                                formik={this.props.formik}
                                fieldName="floor_trim_pref"
                                zIndex={5}
                                tooltip={false}/>

                            <DropdownRow
                                title="Will Floor Trim Be..."
                                choices={this.state.floorTrimStyleOptions}
                                formik={this.props.formik}
                                fieldName="floor_trim_style"
                                zIndex={4}
                                tooltip={false}/>

                            <DropdownRow
                                title="Preferred Construction of 2nd Story Subfloor"
                                choices={this.state.secondStoryOptions}
                                formik={this.props.formik}
                                fieldName="second_story_hardie"
                                zIndex={3}
                                tooltip={true}
                                tooltipHeight={90}
                                popover={WoodFieldInfo.secondStorySubfloor}/>

                            <CheckboxRow
                                zIndex={0}
                                label="Are Transition Strips Standard Practice?"
                                fieldName="transition_strips_std"
                                formik={this.props.formik}
                                defaultValue={values.transition_strips_std}
                                tooltip={true}
                                tooltipHeight={75}
                                popover={WoodFieldInfo.transitionStrips}/>

                            <CheckboxRow
                                zIndex={0}
                                label="HVAC Requirement?"
                                fieldName="hvac_req"
                                formik={this.props.formik}
                                defaultValue={values.hvac_req}
                                tooltip={true}
                                tooltipHeight={120}
                                popover={WoodFieldInfo.hvacRequirement}/>

                            <DropdownRow
                                title="Who Will be Doing Takeoffs?"
                                choices={this.state.takeoffOptions}
                                formik={this.props.formik}
                                fieldName="takeoff_resp"
                                zIndex={2}
                                tooltip={false}/>

                            <SmallInputRow
                                zIndex={0}
                                label="Waste Factor Percentage"
                                fieldName="waste_factor"
                                formik={this.props.formik}/>

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
WoodProgramForm.propTypes = {
  formik: PropTypes.object
}

export default WoodProgramForm;