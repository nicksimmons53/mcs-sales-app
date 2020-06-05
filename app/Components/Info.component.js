import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import colors from '../Library/Colors';

const Info = ({...props}) => {
  let client = props.client;
  let corpAddr2 = '';
  let billAddr2 = '';
  let shipAddr2 = '';
  if (client.addrs2 !== '' || typeof(client.addrs2) !== undefined) 
    corpAddr2 = client.addrs2 + ', ';

  if (client.bilad2 !== '' || typeof(client.bilad2) !== undefined) 
    billAddr2 = client.bilad2 + ', ';

  if (client.shpad2 !== '' || typeof(client.shpad2) !== undefined) 
    shipAddr2 = client.shpad2 + ', ';

  let corpAddr = client.addrs1 + ', ' + corpAddr2 + client.ctynme + ', ' + client.state_ + " " + client.zipcde;
  let billingAddr = client.bilad1 + ', ' + billAddr2 + client.bilcty + ', ' + client.bilste + " " + client.bilzip;
  let shippingAddr = client.shpad1 + ', ' + shipAddr2 + client.shpcty + ', ' + client.shpste + " " + client.shpzip;

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