import React from 'react';
import { StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';
import { Controller } from 'react-hook-form';

import colors from '../Library/Colors';

const styles = StyleSheet.create({
    root: {
        flex: 1,
        fontFamily: 'Quicksand',
        height: 40,
        margin: 5,
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

const Input = (props) => {
    let mode = props.mode || "outlined";
    let label = props.label || "undefined";

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
                    error={props.errors[props.field]}
                    outlineColor={colors.light_background}
                    style={styles.root}/>
            )}
            name={props.field}
            defaultValue={props.defaultValue}/>
    )
}

export default Input;