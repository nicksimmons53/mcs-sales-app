// Imports
import React from 'react';
import { StyleSheet, Text } from 'react-native';
import colors from '../Library/Colors';

export const SmallText = (props) => (
  <Text style={styles.small}>
    {props.children}
  </Text>
);

export const MediumText = (props) => (
  <Text style={styles.medium}>
    {props.children}
  </Text>
);

export const LargeText = (props) => (
  <Text style={styles.large}>
    {props.children}
  </Text>
);

const styles = StyleSheet.create({
  large: {
    color: colors.black,
    fontFamily: 'Quicksand',
    fontSize: 48
  },
  medium: {
    color: colors.black,
    fontFamily: 'Quicksand',
    fontSize: 36
  },
  small: {
    color: colors.black,
    fontFamily: 'Quicksand',
    fontSize: 24
  }
});