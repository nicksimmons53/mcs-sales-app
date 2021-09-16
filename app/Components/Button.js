// Imports
import React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import colors from '../Library/Colors';

// props
// title
// action 
// disabled
export const ActionButtonMedium = (props) => (
  <Button
    title={props.title}
    type="solid"
    buttonStyle={styles.actionMedium}
    titleStyle={styles.title}
    onPress={( ) => props.action( )}
    {...props}/>
);

export const ActionButtonSmall = (props) => (
  <Button
    title={props.title}
    type="solid"
    buttonStyle={styles.actionSmall}
    titleStyle={styles.title}
    onPress={( ) => props.action( )}
    {...props}/>
);

export const GeneralButtonSmall = (props) => (
  <Button
    title={props.title}
    type="solid"
    buttonStyle={styles.generalSmall}
    titleStyle={styles.title}
    onPress={( ) => props.action( )}
    {...props}/>
);

export const OutlineButtonSmall = (props) => (
  <Button
    title={props.title}
    type="outline"
    buttonStyle={styles.outlineSmall}
    titleStyle={styles.title}
    onPress={( ) => props.action( )}
    {...props}/>
)

export const SuccessButtonSmall = (props) => (
  <Button
    title={props.title}
    type="solid"
    buttonStyle={styles.successSmall}
    titleStyle={styles.outlineTitle}
    onPress={( ) => props.action( )}
    {...props}/>
);

export const SuccessButtonLarge = (props) => (
  <Button
    title={props.title}
    type="solid"
    buttonStyle={styles.successLarge}
    titleStyle={styles.title}
    onPress={( ) => props.action( )}
    {...props}/>
);

const styles = StyleSheet.create({
  actionMedium: {
    backgroundColor: colors.orange,
    height: 40,
    width: 250
  },
  actionSmall: {
    backgroundColor: colors.orange,
    margin: 10,
    width: 100
  },
  generalSmall: {
    backgroundColor: colors.blue,
    margin: 10,
    width: 100
  },
  outlineSmall: {
    borderColor: colors.red,
    margin: 10,
    width: 100
  },
  outlineTitle: {
    color: colors.red,
    fontFamily: 'Quicksand',
    fontSize: 16
  },
  successLarge: {
    backgroundColor: colors.green,
    margin: 10,
    width: 350
  },
  successSmall: {
    backgroundColor: colors.green,
    margin: 10,
    width: 100
  },
  title: {
    color: colors.white,
    fontFamily: 'Quicksand',
    fontSize: 16
  }
});