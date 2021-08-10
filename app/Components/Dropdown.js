import React from 'react';
import { StyleSheet } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { Controller } from 'react-hook-form';

import colors from '../Library/Colors';

const styles = StyleSheet.create({
    root: {
        flex: 1,
        margin: 5,
        marginTop: 11,
        height: 43
    },
    menu: {
        backgroundColor: colors.white,
        borderColor: colors.light_background,
    },
    item: {
        justifyContent: 'flex-start',
        fontSize: 16,
        fontFamily: 'Quicksand'
    },
});

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
                    defaultValue={""}
                    value={value}
                    containerStyle={styles.root}
                    style={{borderColor: colors.light_background}}
                    dropDownStyle={styles.menu}
                    labelStyle={styles.item}
                    itemStyle={styles.item}
                    onChangeItem={item => onChange(item.value)}/>
            )}
            name={props.field}
            defaultValue={props.defaultValue}/>
    );
}

export default Dropdown;