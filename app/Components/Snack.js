import React from 'react';
import { StyleSheet } from 'react-native';
import { Snackbar } from 'react-native-paper';

const Snack = (props) => {
    return (
        <Snackbar 
          visible={props.visible} 
          onDismiss={props.action} 
          style={styles.root}>
          {props.message}
        </Snackbar>
    )
};

const styles = StyleSheet.create({
  root: {
    width: '30%'
  }
})

export default Snack;