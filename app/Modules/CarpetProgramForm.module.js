// Library Imports
import React, { Component } from 'react';
import { View, Text, Switch } from 'react-native';
import PropTypes from 'prop-types';
import { Divider, Button } from 'react-native-elements';
import { SmallInputRow, MediumInputRow } from '../Components/InputRow';
import DropdownRow from '../Components/DropdownRow';
import CheckboxRow from '../Components/CheckboxRow';
import { CarpetProgramInfo } from '../Form/Values.form';
import { styles, colors } from './Styles/Form.style';

// Class Component for Client Accounting Info
class CarpetProgramForm extends Component {
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
    
    toggleFields = ( ) => {
        this.setState({ fieldsVisible: !this.state.fieldsVisible });
    }

    render( ) {
        let values = this.props.formik.values;

        return (
            <View style={styles.background}>
                <View style={styles.form}>
                    <Text style={styles.headerText}>Carpet Program</Text>

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

                            <MediumInputRow
                                zIndex={0}
                                fieldName="padding_brand_pref"
                                label="Preferred Padding Brand"
                                tooltip={false}
                                formik={this.props.formik}/>

                            <MediumInputRow
                                zIndex={0}
                                fieldName="carpet_brand_pref"
                                label="Preferred Carpet Brand"
                                tooltip={false}
                                formik={this.props.formik}/>

                            <DropdownRow
                                title="Who Will be Doing Takeoffs?"
                                choices={this.state.takeoffOptions}
                                formik={this.props.formik}
                                fieldName="takeoff_resp"
                                zIndex={2}
                                tooltip={false}/>

                            <SmallInputRow
                                zIndex={0}
                                fieldName="waste_factor"
                                label="Waste Factor Percentage"
                                tooltip={false}
                                formik={this.props.formik}/>
                                      
                            <MediumInputRow
                                zIndex={0}
                                fieldName="notes"
                                label="Notes"
                                tooltip={false}
                                formik={this.props.formik}/>

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
CarpetProgramForm.propTypes = {
  formik: PropTypes.object
}

export default CarpetProgramForm;