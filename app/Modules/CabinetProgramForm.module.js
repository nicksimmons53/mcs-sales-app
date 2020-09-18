// Library Imports
import React, { Component } from 'react';
import { View, Text, Switch } from 'react-native';
import PropTypes from 'prop-types';
import { Divider, Button } from 'react-native-elements';
import { SmallInputRow, MediumInputRow } from '../Components/InputRow';
import CheckboxRow from '../Components/CheckboxRow';
import DropdownRow from '../Components/DropdownRow';
import { styles, colors } from './Styles/Form.style';

// Class Component for Client Accounting Info
class CabinetProgramForm extends Component {
    state = {
        fieldsVisible: false,
        bidTypeOptions: [
            { label: "Whole House", value: "Whole House" },
            { label: "Specific Rooms", value: "Specific Rooms" }
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
                    <Text style={styles.headerText}>Cabinet Program</Text>

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
                                fieldName="color_pref"
                                label="Preferred Colors"
                                tooltip={false}
                                formik={this.props.formik}/>

                            <MediumInputRow
                                zIndex={0}
                                fieldName="style_pref"
                                label="Preferred Styles"
                                tooltip={false}
                                formik={this.props.formik}/>
                            
                            <CheckboxRow
                                zIndex={0}
                                label="Preferences on Soft Close (Are They Standard?)"
                                fieldName="soft_close_std"
                                formik={this.props.formik}
                                defaultValue={values.soft_close_std}
                                tooltip={false}/>
                            
                            <MediumInputRow
                                zIndex={0}
                                fieldName="overlay"
                                label="Overylay"
                                tooltip={false}
                                formik={this.props.formik}/>

                            <MediumInputRow
                                zIndex={0}
                                fieldName="crown_pref"
                                label="Preferences and Sizes of Crown"
                                tooltip={false}
                                formik={this.props.formik}/>
                             
                            <MediumInputRow
                                zIndex={0}
                                fieldName="upper_cabinet_spec"
                                label="Standard Specifications for Upper Cabinets"
                                tooltip={false}
                                formik={this.props.formik}/>   
                                                             
                            <MediumInputRow
                                zIndex={0}
                                fieldName="vanity_height_spec"
                                label="Standard Specifications for Vanity Height"
                                tooltip={false}
                                formik={this.props.formik}/>

                            <DropdownRow
                                title="Preferences on Bid Types"
                                choices={this.state.bidTypeOptions}
                                formik={this.props.formik}
                                fieldName="bid_type_pref"
                                zIndex={2}
                                tooltip={false}/>

                            <SmallInputRow
                                zIndex={0}
                                fieldName="optioned_area_out"
                                label="Any Areas Optioned Out?"
                                formik={this.props.formik}
                                tooltip={false}/>
                                                                                        
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
CabinetProgramForm.propTypes = {
  formik: PropTypes.object
}

export default CabinetProgramForm;