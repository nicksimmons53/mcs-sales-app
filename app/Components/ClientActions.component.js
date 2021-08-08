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

// Presentational Component of Buttons inside Client Profile
const ClientActions = ({...props}) => {
  const navigation = useNavigation( );

  const saveFile = (base64, client, fileName) => {
    const clientName = client.clnnme.replace(/\s/g, "_");
    let reqBody = {
      clientName: clientName,
      base64String: base64
    };

    axios.post(`${API_URL}/create-file/${fileName}`, reqBody)
      .then((response) => {
        console.log(response.status);
      })
      .catch((error) => {
        console.log(error);
      })
  }

  // Expo Cli Document Picker Component
  const filePicker = async( ) => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles]
      });

      let file = {
        name: result.name,
        type: "*",
        uri: result.uri
      };

      const base64 = await FileSystem.readAsStringAsync(file.uri, { encoding: 'base64' });

      return saveFile(base64, props.client, file.name);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {

      } else {
        throw err;
      }
    }
  };

  return (
    <View style={styles.background}>
      <Button
        title='Advanced Info'
        icon={{
          name: 'arrow-right',
          type: 'font-awesome',
          size: 15,
          color: colors.white,
        }}
        buttonStyle={styles.button}
        iconContainerStyle={styles.icon}
        containerStyle={styles.buttonContainer}
        onPress={( ) => navigation.push("ClientDetails", { client: props.client })}/>
      <Button
        title='Program Info'
        icon={{
          name: 'folder',
          type: 'font-awesome',
          size: 15,
          color: colors.white,
        }}
        buttonStyle={styles.button}
        iconContainerStyle={styles.icon}
        containerStyle={styles.buttonContainer}
        onPress={( ) => navigation.push("ClientPrograms", { client: props.client })}/>
      <Button
        title='Build Pricing'
        icon={{
          name: 'wrench',
          type: 'font-awesome',
          size: 15,
          color: colors.white,
        }}
        buttonStyle={styles.button}
        containerStyle={styles.buttonContainer}
        iconContainerStyle={styles.icon}
        onPress={( ) => navigation.push("ClientPricing", { client: props.client })}/>
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
          openComposer({
            to: "lisak@mcsurfacesinc.com",
            subject: `COI Request - ${props.client.clnnme}`,
            body: `
              ${props.client.clnnme}\n
              Corporate Address: ${[props.client.addrs1 + props.client.addrs2, props.client.ctynme, props.client.state_, props.client.zipcde].filter(Boolean).join(', ')}
              Shipping Address: ${[props.client.shpad1 + props.client.shpad2, props.client.shpcty, props.client.shpste, props.client.shpzip].filter(Boolean).join(', ')}
              Billing Address: ${[props.client.bilad1 + props.client.bilad2, props.client.bilcty, props.client.bilste, props.client.bilzip].filter(Boolean).join(', ')}
            `
          })
        }}/>
      <Button
        title='Update Client'
        icon={{
          name: 'pencil',
          type: 'font-awesome',
          size: 15,
          color: colors.white,
        }}
        buttonStyle={styles.button}
        containerStyle={styles.buttonContainer}
        iconContainerStyle={styles.icon}/>
      <Button
        title='Attach Files'
        icon={{
          name: 'paperclip',
          type: 'font-awesome',
          size: 15,
          color: colors.white,
        }}
        buttonStyle={styles.button}
        containerStyle={styles.buttonContainer}
        iconContainerStyle={styles.icon}
        onPress={( ) => filePicker(props.client)}/>
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
    margin: 0,
    marginTop: 10,
    marginBottom: 0,
    borderWidth: 1,
    borderRadius: 3,
    borderColor: colors.white,
    backgroundColor: colors.white
  },

  // Button
  button: {
    alignItems: 'center',
    backgroundColor: colors.background,
    flex: 1,
    height: 35,
    justifyContent: 'center',
    minWidth: 150,
    width: 175
  },
  buttonContainer: {
    padding: 10
  },

  // Icon
  icon: {
    paddingRight: 15
  }
});

export default ClientActions;
