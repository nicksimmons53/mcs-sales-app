import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Input, Icon, Tooltip } from 'react-native-elements';
import colors from '../Library/Colors';

const TinyInputRow = ({...props}) => {
    return (
        <View style={styles.textRow} zIndex={props.zIndex}>
            <Text style={styles.label}>{props.label}</Text>
            <Input
                onChangeText={props.formik.handleChange(props.fieldName)}
                onBlur={props.formik.handleBlur(props.fieldName)}
                value={props.formik.values[props.fieldName]}
                placeholder={props.placeholder}
                blurOnSubmit={false}
                inputStyle={styles.label}
                containerStyle={styles.xSmallInput}
                inputContainerStyle={styles.inputContainer}/>
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
    )
}

const SmallInputRow = ({...props}) => {
    return (
        <View style={styles.textRow} zIndex={props.zIndex}>
            <Text style={styles.label}>{props.label}</Text>
            <Input
                onChangeText={props.formik.handleChange(props.fieldName)}
                onBlur={props.formik.handleBlur(props.fieldName)}
                value={props.formik.values[props.fieldName]}
                placeholder={props.placeholder}
                blurOnSubmit={false}
                inputStyle={styles.label}
                containerStyle={styles.smallInput}
                inputContainerStyle={styles.inputContainer}/>
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
    )
};

const MediumInputRow = ({...props}) => {
    return (
        <View style={styles.textRow} zIndex={props.zIndex}>
            <Text style={styles.label}>{props.label}</Text>
            <Input
                onChangeText={props.formik.handleChange(props.fieldName)}
                onBlur={props.formik.handleBlur(props.fieldName)}
                value={props.formik.values[props.fieldName]}
                placeholder={props.placeholder}
                blurOnSubmit={false}
                inputStyle={styles.label}
                containerStyle={styles.mediumInput}
                inputContainerStyle={styles.inputContainer}/>
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
    )
};

const styles = StyleSheet.create({
    // Text Input
    textRow: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        alignItems: 'center',
        margin: 10,
        zIndex: 20
    },
    label: {
        fontFamily: 'opensans-reg',
        flex: 1,
        fontSize: 16,
        paddingRight: 30,
        color: colors.background
    },
    inputContainer: {
        flex: 3,
        paddingLeft: 5,
        marginRight: 10,
        borderWidth: 1,
        borderRadius: 3,
        borderColor: colors.light_grey,
    },
    mediumInput: {
        width: '65%',
    },
    smallInput: {
        width: '40%',
    },
    xSmallInput: {
        width: '20%',
    },
    promptText: {
      color: colors.white,
      fontSize: 18,
      fontFamily: 'quicksand-reg'
    }
});

export {
    TinyInputRow,
    SmallInputRow,
    MediumInputRow
};