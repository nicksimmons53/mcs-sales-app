import React from 'react';
import { StyleSheet } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { Controller, get } from 'react-hook-form';

import colors from '../Library/Colors';

const styles = StyleSheet.create({
    root: {
        marginTop: 10,
        marginLeft: 2,
        marginRight: 2
    },
    border: {
        borderColor: colors.light_background
    },  
    menu: {
        backgroundColor: colors.white,
        borderColor: colors.light_background
    }, 
    item: {
        justifyContent: 'flex-start',
        fontFamily: 'Quicksand'
    },
    errorItem: {
        color: colors.red,
        fontSize: 16,
        fontFamily: 'Quicksand',
        justifyContent: 'flex-start'
    },
    errorBorder: {
        borderColor: colors.red,
        borderWidth: 2
    }
});

// label
// items
// control
// defaultValue
// errors
// field
// zIndex
const Dropdown = (props) => {
    let label = props.label || "undefined";
    const [ items, setItems ] = React.useState(props.items);

    return (
        <Controller
            control={props.control}
            render={({ field: { onChange, value } } ) => (
                <DropDownPicker
                    placeholder={label}
                    items={items}
                    defaultValue={items.find(o => o.value === value) ? value : props.defaultValue}
                    value={items.find(o => o.value === value) ? value : props.defaultValue}
                    style={get(props.errors, props.field) ? styles.errorBorder : styles.border}
                    containerStyle={styles.root}
                    dropDownStyle={styles.menu}
                    labelStyle={styles.item}
                    itemStyle={{ justifyContent: 'flex-start' }}
                    onChangeItem={item => onChange(item.value)}
                    zIndex={props.zIndex-=1 || 100}/>
            )}
            name={props.field}
            defaultValue={props.defaultValue}/>
    );
}

export default Dropdown;