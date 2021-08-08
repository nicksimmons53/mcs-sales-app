import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button, Tooltip, Icon } from 'react-native-elements';
import colors from '../Library/Colors';

const ButtonRow = ({...props}) => {
    return (
        <View style={styles.textRow}>
            <Text style={styles.label}>{props.label}</Text>
            <Button
                title={props.title}
                icon={{
                    name: props.iconName,
                    type: 'font-awesome',
                    size: 20,
                    color: colors.white,
                }}
                buttonStyle={styles.attach}
                containerStyle={styles.attachButtonContainer}
                onPress={props.onPress}/>
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
}

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
    attachButtonContainer: {
        width: 200,
        margin: 10,
        marginRight: 20
    },
    attach: {
        backgroundColor: colors.black,  
    },
    submit: {
        width: '40%',
        alignSelf: 'center',
        margin: 10,
        backgroundColor: colors.green,
    },
    program: {
        backgroundColor: colors.orange
    },
    promptText: {
      color: colors.white,
      fontSize: 18,
      fontFamily: 'Quicksand'
    }
});

export default ButtonRow;