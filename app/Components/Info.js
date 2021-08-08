import React from 'react';
import { StyleSheet } from 'react-native';
import { DataTable } from 'react-native-paper';
import colors from '../Library/Colors';

const Info = ({...props}) => {
  let address = props.address[0];

  let addresses = [
    { 
      type: "Corporate", 
      address: address.addrs1 + address.addrs2,
      city: address.ctynme, 
      state: address.state_, 
      zip: address.zipcde 
    },
    { 
      type: "Billing", 
      address1:  address.bilad1 + address.bilad2, 
      city: address.bilcty, 
      state: address.bilste, 
      zip: address.bilzip 
    },
    { 
      type: "Shipping",
      address1:  address.shpad1 + address.shpad2, 
      city: address.shpcty, 
      state: address.shpste, 
      zip: address.shpzip 
    },
  ];

  return (
    <DataTable style={styles.background}>
      <DataTable.Header>
        <DataTable.Title style={{flex : 2}}></DataTable.Title>
        <DataTable.Title style={{flex : 3}}>Address</DataTable.Title>
        <DataTable.Title style={{flex : 3}}>City</DataTable.Title>
        <DataTable.Title style={{flex : 1}}>State</DataTable.Title>
        <DataTable.Title style={{flex : 2}}>Zip</DataTable.Title>
      </DataTable.Header>

      { addresses.map((address, index) => (
        <DataTable.Row key={index}>
          <DataTable.Cell style={{flex : 2}}>{address.type}</DataTable.Cell>
          <DataTable.Cell style={{flex : 3}}>{address.address}</DataTable.Cell>
          <DataTable.Cell style={{flex : 3}}>{address.city}</DataTable.Cell>
          <DataTable.Cell style={{flex : 1}}>{address.state}</DataTable.Cell>
          <DataTable.Cell style={{flex : 2}}>{address.zip}</DataTable.Cell>
        </DataTable.Row>
      ))}
    </DataTable>
  );
}

const styles = StyleSheet.create({
  background: {
    minHeight: 75,
    margin: 10,
    borderRadius: 3,
    backgroundColor: colors.white,
    flex: 1
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  text: {
    color: colors.background,
    margin: 10,
    fontFamily: 'OpenSans'
  }
});

export default Info;