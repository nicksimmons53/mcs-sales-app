import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Tooltip, Icon } from 'react-native-elements';
import DropDownPicker from 'react-native-dropdown-picker';
import colors from '../Library/Colors';

const DropdownRow = ({...props}) => {
    return (
        <View style={styles.textRow} zIndex={props.zIndex}>
            <Text style={styles.label}>{props.title}</Text>
            <DropDownPicker
                placeholder="Choose..."
                items={props.choices}
                defaultValue={props.formik.values[props.fieldName]}
                containerStyle={styles.dropdown}
                dropDownStyle={styles.dropdownMenu}
                labelStyle={styles.dropdownItem}
                itemStyle={styles.dropdownItem}
                onChangeItem={item => props.formik.setFieldValue(props.fieldName, item.value)}/>
            {props.tooltip === true ?
                <Tooltip 
                    popover={<Text style={styles.promptText}>{props.popover}</Text>} 
                    width={450}
                    height={props.tooltipHeight}
                    backgroundColor={ props.tooltip === true ? colors.black : colors.white }>
                    <Icon name="info-circle" type="font-awesome" color={colors.black}/>
                </Tooltip>   
            :
                <Icon name="info-circle" type="font-awesome" color={colors.white}/>
            } 
        </View>
    );
};

const styles = StyleSheet.create({
    textRow: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        alignItems: 'center',
        margin: 10,
        zIndex: 20
    },
    dropdown: {
        width: '37%',
        marginRight: 20
    },
    dropdownMenu: {
        backgroundColor: colors.white,
    },
    dropdownItem: {
        justifyContent: 'flex-start',
        fontSize: 16,
        fontFamily: 'Quicksand'
    },
    label: {
        fontFamily: 'OpenSans',
        flex: 1,
        fontSize: 16,
        paddingRight: 30,
        color: colors.background
    },
    promptText: {
      color: colors.white,
      fontSize: 18,
      fontFamily: 'Quicksand'
    }
});

export default DropdownRow;