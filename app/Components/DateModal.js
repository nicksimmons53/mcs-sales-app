import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TextInput } from 'react-native-paper';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Controller, get } from 'react-hook-form';

import colors from '../Library/Colors';
import { DateTime } from 'luxon';

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
	const [open, setOpen] = React.useState(false);
  
	const onDismissSingle = React.useCallback(() => {
	  setOpen(false);
	}, [setOpen]);
    
    return (
        <Controller 
            control={props.control}
            render={({ field: { onChange, value } } ) => (
                <>
                    <TextInput 
                        dense
                        value={DateTime.fromISO(value).toFormat("LLL dd yyyy")}
                        mode={"outlined"}
                        label={"Estimated Start Date"}
                        theme={defaultTheme}
                        error={false}
                        outlineColor={colors.light_background}
                        style={styles.root}
                        onFocus={( ) => setOpen(true)}/>
                    <DateTimePickerModal
                        isVisible={open}
                        mode="date"
                        display="inline"
                        onConfirm={date => {
                            onChange(DateTime.fromJSDate(date))
                            setOpen(false);
                        }}
                        onCancel={( ) => setOpen(false)}/>
                </>)}
            name={props.field}
            defaultValue=""/>
    );
}

export default DateModal;