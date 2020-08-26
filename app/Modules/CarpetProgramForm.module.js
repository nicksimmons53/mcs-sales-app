// Library Imports
import React, { Component } from 'react';
import { View, Text, Switch } from 'react-native';
import PropTypes from 'prop-types';
import { 
    Divider, 
    Input, 
    Button, 
    Icon, 
    CheckBox, 
    Tooltip
} from 'react-native-elements';
import DropDownPicker from 'react-native-dropdown-picker';
// import { TileFieldInfo } from '../Form/Values.form';
import { styles, colors } from './Styles/Form.style';

// Class Component for Client Accounting Info
class CarpetProgramForm extends Component {
    state = {
        fieldsVisible: false
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
                            
                            <View style={styles.textRow}>          
                                <Text style={styles.label}>Coming in Update 1.4...</Text>           
                            </View>

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