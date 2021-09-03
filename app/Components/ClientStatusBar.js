import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import colors from '../Library/Colors';

const styles = StyleSheet.create({
    root: {
      alignItems: 'center',
      backgroundColor: colors.white,
      borderRadius: 10,
      height: 50,
      justifyContent: 'center',
      margin: 10
    },
    font: {
      color: colors.white,
      fontFamily: 'Quicksand',
      fontSize: 16,
    }
});

const fontStyle = (status) => {
  switch (status) {
    case "Potential":
      return colors.black
      break;

    case "Queued":
      return colors.blue
      break;

    case "Approved":
      return colors.orange
      break;

    case "Pushed":
      return colors.green
      break;

    case "Declined":
      return colors.red
      break;

    default:
      break;
  }
}

function ClientStatusBar({ status }) {
  return (
    <View style={{...styles.root, backgroundColor: fontStyle(status)}}>
      <Text style={styles.font}>{ status }</Text>
    </View>
  );
}

export default ClientStatusBar;