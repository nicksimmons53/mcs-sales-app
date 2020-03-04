import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import colors from '../Library/Colors';

const Info = ({...props}) => {
  let client = props.client;
  let corpAddr2 = '';
  if (client.corpAddr2 !== '' || typeof(client.corpAddr2) !== undefined) 
    corpAddr2 = client.corpAddr2 + ', ';

  let corpAddr = client.corpAddr + ', ' + corpAddr2 + ', ' + client.corpCity + ', ' + client.corpState + client.corpZip;
  let billingAddr = client.billingAddr + ', ' + client.billingCity + ', ' + client.billingState + client.billingZip;
  let shippingAddr = client.shippingAddr + ', ' + client.shippingCity + ', ' + client.shippingState + client.shippingZip;

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
        <Text style={styles.text}>{props.client.shippin}</Text>
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