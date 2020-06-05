import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import colors from '../Library/Colors';

const Info = ({...props}) => {
  let address = props.address;
  let corpAddr2 = '';
  let billAddr2 = '';
  let shipAddr2 = '';
  if (address.addrs2 !== '' || typeof(address.addrs2) !== undefined) 
    corpAddr2 = address.addrs2 + ', ';

  if (address.bilad2 !== '' || typeof(address.bilad2) !== undefined) 
    billAddr2 = address.bilad2 + ', ';

  if (address.shpad2 !== '' || typeof(address.shpad2) !== undefined) 
    shipAddr2 = address.shpad2 + ', ';

  let corpAddr = address.addrs1 + ', ' + corpAddr2 + address.ctynme + ', ' + address.state_ + " " + address.zipcde;
  let billingAddr = address.bilad1 + ', ' + billAddr2 + address.bilcty + ', ' + address.bilste + " " + address.bilzip;
  let shippingAddr = address.shpad1 + ', ' + shipAddr2 + address.shpcty + ', ' + address.shpste + " " + address.shpzip;

  return (
    <View style={styles.background}>
      <View style={styles.row}>
        <Text style={styles.text}>Corporate Address:</Text>
        <Text style={styles.text}>{corpAddr}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.text}>Billing Address:</Text>
        <Text style={styles.text}>{billingAddr}</Text>
      </View>      
      <View style={styles.row}>
        <Text style={styles.text}>Shipping Address:</Text>
        <Text style={styles.text}>{shippingAddr}</Text>
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