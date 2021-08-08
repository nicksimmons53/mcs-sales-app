import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { CheckBox, Tooltip, Icon } from 'react-native-elements';
import colors from '../Library/Colors';

const CheckboxRow = ({...props}) => {
    return (
        <View style={styles.textRow} zIndex={props.zIndex}>
            <Text style={styles.label}>{props.label}</Text>
            <CheckBox 
                checked={props.formik.values[props.fieldName]}
                onPress={( ) => {
                    props.formik.setFieldValue(props.fieldName, !props.defaultValue);
                }}
                size={36}
                containerStyle={styles.checkbox}
                checkedColor={colors.green}/>
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
    label: {
        fontFamily: 'OpenSans',
        flex: 1,
        fontSize: 16,
        paddingRight: 30,
        color: colors.background
    },
    checkbox: {
        marginRight: 10,
        paddingRight: 5,
        paddingVertical: 0
    },
    promptText: {
      color: colors.white,
      fontSize: 18,
      fontFamily: 'Quicksand'
    }
});

export default CheckboxRow;