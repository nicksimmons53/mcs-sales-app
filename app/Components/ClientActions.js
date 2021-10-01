// Library Imports
import React from 'react';
import { StyleSheet } from 'react-native';
import { API_URL } from 'react-native-dotenv';
import * as FileSystem from 'expo-file-system';
import axios from 'axios';
import { Button } from 'react-native-elements';
import DocumentPicker from 'react-native-document-picker';
import colors from '../Library/Colors';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { openComposer } from 'react-native-email-link';
import { useSelector } from 'react-redux';

// Presentational Component of Buttons inside Client Profile
const ClientActions = ({...props}) => {
  const navigation = useNavigation( );
  let addresses = useSelector(state => (state.clients.addresses));

  return (
    <View style={styles.background}>
      <Button
        title='Client Details'
        icon={{
          name: 'arrow-right',
          type: 'font-awesome',
          size: 15,
          color: colors.white,
        }}
        buttonStyle={styles.button}
        iconContainerStyle={styles.icon}
        containerStyle={styles.buttonContainer}
        onPress={( ) => navigation.push("ClientDetails") }/>
      <Button
        title='Program Details'
        icon={{
          name: 'folder',
          type: 'font-awesome',
          size: 15,
          color: colors.white,
        }}
        buttonStyle={styles.button}
        iconContainerStyle={styles.icon}
        containerStyle={styles.buttonContainer}
        onPress={( ) => navigation.push("ClientPrograms")}/>
      <Button
        title='Program Pricing'
        icon={{
          name: 'wrench',
          type: 'font-awesome',
          size: 15,
          color: colors.white,
        }}
        buttonStyle={styles.button}
        containerStyle={styles.buttonContainer}
        iconContainerStyle={styles.icon}
        onPress={( ) => navigation.push("ClientPricing")}/>
      <Button
        title='Request COI'
        icon={{
          name: 'envelope',
          type: 'font-awesome',
          size: 15,
          color: colors.white,
        }}
        buttonStyle={styles.button}
        containerStyle={styles.buttonContainer}
        iconContainerStyle={styles.icon}
        onPress={ ( ) => {
          let addressString = "";
          addresses.map(address =>
            addressString += `${address.type}: ${[address.address1 + " " + address.address2, address.city, address.state, address.zip].filter(Boolean).join(', ')}\n`
          );

          openComposer({
            to: "lisak@mcsurfacesinc.com",
            subject: `COI Request - ${props.client.name}`,
            body: addressString
          });
        }}/>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  // Background
  background: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: "wrap",
    justifyContent: 'center',
    margin: 10,
    borderWidth: 1,
    borderRadius: 3,
    borderColor: colors.white,
    backgroundColor: colors.white,
  },

  // Button
  button: {
    alignItems: 'center',
    backgroundColor: colors.black,
    flex: 1,
    height: 35,
    justifyContent: 'center',
  },
  buttonContainer: {
    flex: 1,
    padding: 10
  },

  // Icon
  icon: {
    paddingRight: 15
  }
});

export default ClientActions;
