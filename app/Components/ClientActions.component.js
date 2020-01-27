// Library Imports
import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import * as File from '../Functions/File';
import * as Client from '../Functions/Client';
import * as DocumentPicker from 'expo-document-picker';
import colors from '../Library/Colors';

// Presentational Component of Buttons inside Client Profile
const ClientActions = ({...props}) => {
  // Expo Cli Document Picker Component
  const filePicker = async( ) => {
    let result = await DocumentPicker.getDocumentAsync({
      copyToCacheDirectory: false
    }).then((result) => {
      if (result.type === 'cancel')
        return;
      else
        return File.uriToBlob(result.uri);
    }).then((blob) => {
      if (blob !== undefined) {
        return File.saveData(blob, props.client.uid);
      }
    }).then(( ) => {
      props.showFileToast( );
    }).catch((error) => {
      throw error;
    });
  };

  return (
    <ScrollView horizontal={true} style={styles.background}>
      <Button
        title='Update Client'
        icon={{
          name: 'pencil',
          type: 'font-awesome',
          size: 20,
          color: colors.white,
        }}
        buttonStyle={styles.button}
        onPress={props.update} />
      <Button
        title='Build Pricing'
        icon={{
          name: 'wrench',
          type: 'font-awesome',
          size: 20,
          color: colors.white,
        }}
        buttonStyle={styles.button}
        onPress={( ) => {
          props.nav.navigate('Pricing', {
            client: props.client
          });
          if (typeof(props.toggleModal) !== 'undefined')
            props.toggleModal( );
        }} />
      <Button
        title='Attach Files'
        icon={{
          name: 'paperclip',
          type: 'font-awesome',
          size: 20,
          color: colors.white,
        }}
        buttonStyle={styles.button}
        onPress={( ) => filePicker( )} />
      <Button
        title='Continue Client'
        icon={{
          name: 'arrow-right',
          type: 'font-awesome',
          size: 20,
          color: colors.white,
        }}
        buttonStyle={styles.button}
        onPress={( ) => {
          props.nav.navigate('ClientForm', {
            headerText: 'Continue Client',
            client: props.client,
            createClient: false
          });
          if (typeof(props.toggleModal) !== 'undefined')
            props.toggleModal( );
        }} />
      <Button
        title='Rebid Client'
        icon={{
          name: 'repeat',
          type: 'font-awesome',
          size: 20,
          color: colors.white,
        }}
        buttonStyle={styles.button} />
      <Button
        title='Inactivate Client'
        icon={{
          name: 'window-close',
          type: 'font-awesome',
          size: 20,
          color: colors.white,
        }}
        buttonStyle={styles.button}
        onPress={( ) => {
          Client.deleteInfo(props.client);
        }}/>
    </ScrollView>
  );
};

// Styles
const styles = StyleSheet.create({
  // Background
  background: {
    flexDirection: 'row',
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
    height: 40,
    width: 200,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
});

export default ClientActions;
