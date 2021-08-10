import React from 'react';
import { StyleSheet } from 'react-native';
import { FAB } from 'react-native-paper';
import colors from '../Library/Colors';

const styles = StyleSheet.create({
    root: {
        backgroundColor: colors.green, 
        bottom: 0,
        margin: 15,
        position: 'absolute', 
        right: 0, 
    }
})

const FloatingButton = (props) => {
    return (
        <FAB 
            onPress={props.action} 
            icon={props.icon} 
            color={colors.white}
            style={styles.root}/>
    );
}

export default FloatingButton;