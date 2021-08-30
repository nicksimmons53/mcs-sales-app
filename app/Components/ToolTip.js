import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Icon, Tooltip } from 'react-native-elements';

import colors from '../Library/Colors';

const styles = StyleSheet.create({
    promptText: {
      color: colors.white,
      fontSize: 18,
      fontFamily: 'Quicksand'
    }
});

const ToolTip = (props) => {
    return (
        <Tooltip 
            popover={<Text style={styles.promptText}>{props.popover}</Text>} 
            backgroundColor={colors.black}
            height={props.height || 40}
            width={props.width || 150}>
            <Icon name="info-circle" type="font-awesome" color={colors.black} containerStyle={{margin: 5, marginTop: 10}}/>
        </Tooltip>
    );
}

export default ToolTip;