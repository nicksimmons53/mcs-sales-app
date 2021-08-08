import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import colors from '../Library/Colors';

const Header = ({title}) => (
    <View style={styles.header}>
        <Text style={styles.headerText}>{title}</Text>
    </View>
);

const styles = StyleSheet.create({
  // Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 10,
  },
  headerText: {
    fontFamily: 'OpenSans',
    fontSize: 28,
    color: colors.background,
  }
});

export default Header;