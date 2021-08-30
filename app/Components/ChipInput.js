import React from 'react';
import { StyleSheet } from 'react-native';
import { Chip } from 'react-native-paper';
import { Controller, get } from 'react-hook-form';
import colors from '../Library/Colors';

const styles = StyleSheet.create({
    root: {
        alignItems: 'center',
        flex: 1,
        height: 50,
        justifyContent: 'center',
        margin: 10
    },
    selectedRoot: {
        alignItems: 'center',
        backgroundColor: colors.green,
        flex: 1,
        height: 50,
        justifyContent: 'center',
        margin: 10
    },
    selectedText: {
        color: colors.white,
        fontFamily: 'Quicksand',
        fontWeight: 'bold'
    },
    text: {
        color: colors.background,
        fontFamily: 'Quicksand',
        fontWeight: 'bold'
    }
});

const ChipInput = (props) => {
    let mode = props.mode || "flat";

    return (
        <Controller
            control={props.control}
            render={({ field: { onChange, value } } ) => (
                <Chip 
                    onPress={( ) => onChange(!value)}
                    selected={value}
                    selectedColor={colors.white}
                    mode={mode} 
                    style={value ? styles.selectedRoot : styles.root} 
                    textStyle={value ? styles.selectedText : styles.text}>
                    {props.title}
                </Chip>
            )}
            name={props.field}
            defaultValue={props.defaultValue}/>
    );
}

export default ChipInput;