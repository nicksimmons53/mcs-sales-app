import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import colors from '../Library/Colors';

const Header = (props) => (
    <View style={styles.header}>
        <Text style={styles.headerText}>{props.title}</Text>
        {props.children}
    </View>
);

const styles = StyleSheet.create({
  // Header
  header: {
    backgroundColor: colors.white,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 24,
    paddingHorizontal: 12,
    paddingBottom: 12,
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
  },
  headerText: {
    fontFamily: 'OpenSans',
    fontSize: 28,
    color: colors.background
  }
});

export default Header;