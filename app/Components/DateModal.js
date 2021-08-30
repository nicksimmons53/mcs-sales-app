import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TextInput } from 'react-native-paper';
import { DatePickerModal } from 'react-native-paper-dates';
import { Controller, get } from 'react-hook-form';

import colors from '../Library/Colors';

const styles = StyleSheet.create({
    root: {
        fontFamily: 'Quicksand'
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

const DateModal = (props) => {
	// const [date, setDate] = React.useState(new Date(props.defaultValue));
	const [open, setOpen] = React.useState(false);
  
	const onDismissSingle = React.useCallback(() => {
	  setOpen(false);
	}, [setOpen]);
  
	// const onConfirmSingle = React.useCallback(
	//   (params) => {
	// 	setOpen(false);
	// 	setDate(params.date);
	//   },
	//   [setOpen, setDate]
	// );
    
    return (
        <Controller
            control={props.control}
            render={({ field: { onChange, value } } ) => {console.log( value); return (
                <>
                    <TextInput 
                        dense
                        value={new Date(value).toDateString( )}
                        mode={"outlined"}
                        label={"Estimated Start Date"}
                        theme={defaultTheme}
                        error={false}
                        outlineColor={colors.light_background}
                        style={styles.root}
                        onFocus={( ) => setOpen(true)}/>
                    
                    <DatePickerModal
                        mode="single"
                        visible={open}
                        onDismiss={onDismissSingle}
                        date={new Date(value)}
                        onConfirm={params => {
                            onChange(params.date);
                            setOpen(false);
                        }}/>
                </>)}}
            name={props.field}
            defaultValue={props.defaultValue}/>
    );
}

export default DateModal;