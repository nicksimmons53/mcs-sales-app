// Library Imports
import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import Toast from 'react-native-easy-toast';
import Firebase from '../../config/Firebase';
import * as DocumentPicker from 'expo-document-picker';
import colors from '../Library/Colors';

// Presentational Component of Buttons inside Client Profile
const ClientActions = ({...props}) => {
  // Upload the File to Firebase
  const _uploadFile = (blob) => {
    console.log(blob);
    return new Promise((resolve, reject) => {
      var storageRef = Firebase.storage( ).ref( );

      storageRef.child(Firebase.auth( ).currentUser.uid + '/' + props.client.uid + '/' + blob._data.name).put(blob, {
        contentType: blob._data.type
      }).then((snapshot) => {
        blob.close( );

        resolve(snapshot);
      }).catch((error) => {
        reject(error);
      });
    });
  }

  // Convert File URI to Blob
  const uriToBlob = (uri) => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest( );

      xhr.onload = function( ) {
        resolve(xhr.response);
      };

      xhr.onerror = function( ) {
        reject(new Error('uriToBlob failed'));
      };

      xhr.responseType = 'blob';

      xhr.open('GET', uri, true);

      xhr.send(null);
    });
  }

  // Expo Cli Document Picker Component
  const filePicker = async( ) => {
    let showToastBool = false;

    let result = await DocumentPicker.getDocumentAsync({
      copyToCacheDirectory: false
    }).then((result) => {
      console.log(result.type)
      if (result.type === 'cancel')
        return;
      else
        return uriToBlob(result.uri);
    }).then((blob) => {
      if (blob !== undefined) {
        showToastBool = true;
        return _uploadFile(blob);
      }
    }).then(( ) => {
      console.log('File Uploaded');
      if (showToastBool === true)
        props.showToast( );
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
        onPress={props.inactivate}/>
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
