import React from 'react';
import { StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';
import { Controller, get } from 'react-hook-form';

import colors from '../Library/Colors';

const styles = StyleSheet.create({
    root: {
        flex: 1,
        fontFamily: 'Quicksand',
        marginTop: 4,
        marginLeft: 2,
        marginRight: 2
    }
});

const defaultTheme = {
    myOwnProperty: true,
    colors: { 
        primary: colors.green,
        background: colors.white,
        error: colors.red,
        text: colors.background
    },
};

// Props
// mode
// label
// multiline
// control
// errors
// field
// default value
const Input = (props) => {
    let mode = props.mode || "outlined";
    let label = props.label || "undefined";
    let multiline = props.multiline || false;

    return (
        <Controller
            control={props.control}
            render={({ field: { onChange, value } } ) => (
                <TextInput 
                    dense
                    onChangeText={onChange}
                    value={value}
                    mode={mode}
                    label={label}
                    theme={defaultTheme}
                    error={get(props.errors, props.field)}
                    multiline={multiline}
                    outlineColor={colors.light_background}
                    style={styles.root}
                    {...props.options}/>
            )}
            name={props.field}
            defaultValue={props.defaultValue}/>
    )
}

export default Input;