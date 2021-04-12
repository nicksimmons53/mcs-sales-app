import { string } from 'prop-types';
import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import colors from '../Library/Colors';

const Info = ({...props}) => {
  let address = props.address;
  let corpAddr = [address.addrs1, address.addrs2, address.ctynme, address.state_, address.zipcde];
  let billAddr = [address.bilad1, address.bilad2, address.bilcty, address.bilste, address.bilzip];
  let shipAddr = [address.shpad1, address.shpad2, address.shpcty, address.shpste, address.shpzip];

  // Address Combine Rewrite
  corpAddr.map((address, index) => {
    if (address == null || address == '')
      corpAddr.splice(index, 1)
  });

  billAddr.map((address, index) => {
    if (address == null || address.length == 0)
      billAddr.splice(index)
  });

  shipAddr.map((address, index) => {
    if (address == null || address.length == 0)
      shipAddr.splice(index)
  });

  return (
    <View style={styles.background}>
      <View style={styles.row}>
        <Text style={styles.text}>Corporate Address:</Text>
        <Text style={styles.text}>{corpAddr.join(', ')}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.text}>Billing Address:</Text>
        <Text style={styles.text}>{billAddr.join(', ')}</Text>
      </View>      
      <View style={styles.row}>
        <Text style={styles.text}>Shipping Address:</Text>
        <Text style={styles.text}>{shipAddr.join(', ')}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  background: {
    minHeight: 75,
    margin: 10,
    borderRadius: 3,
    backgroundColor: colors.white
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  text: {
    color: colors.background,
    margin: 10,
    fontFamily: 'opensans-reg'
  }
});

export default Info;