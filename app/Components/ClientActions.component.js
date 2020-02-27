// Library Imports
import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { Button } from 'react-native-elements';
import * as File from '../Functions/File';
import * as DocumentPicker from 'expo-document-picker';
import { inactivateClient } from './Alert.component';
import colors from '../Library/Colors';

// Presentational Component of Buttons inside Client Profile
const ClientActions = ({...props}) => {
  // Expo Cli Document Picker Component
  const filePicker = async(client) => {
    await DocumentPicker.getDocumentAsync({
      copyToCacheDirectory: false
    }).then((result) => {
      if (result.type === 'cancel') {
        return;
      } else {
        return File.uriToBlob(result.uri);
      }
    }).then((blob) => {
      if (blob !== undefined) {
        props.showFileToast( );
        props.addFileToState( );
        return File.saveData(blob, client.uid);
      }
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
        title='Attach Files'
        icon={{
          name: 'paperclip',
          type: 'font-awesome',
          size: 20,
          color: colors.white,
        }}
        buttonStyle={styles.button}
        onPress={( ) => {
          filePicker(props.client);
        }}/>
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
          if (props.isPortrait === true)
            props.toggleModal( );
          props.nav.navigate('AdvInfoForm', {
            client: props.client,
            createClient: false
          });
        }} />
      <Button
        title='Inactivate Client'
        icon={{
          name: 'window-close',
          type: 'font-awesome',
          size: 20,
          color: colors.white,
        }}
        buttonStyle={styles.button}
        onPress={( ) => inactivateClient(props)}/>
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

// Props Validation
ClientActions.propTypes = {
  showFileToast: PropTypes.func,
  client: PropTypes.object,
  toggleModal: PropTypes.func,
  nav: PropTypes.object,
  update: PropTypes.func,
  isPortrait: PropTypes.bool
}

export default ClientActions;
