// Library Imports
import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { API_URL } from 'react-native-dotenv';
import * as FileSystem from 'expo-file-system';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Button } from 'react-native-elements';
import DocumentPicker from 'react-native-document-picker';
import colors from '../Library/Colors';

// Presentational Component of Buttons inside Client Profile
const ClientActions = ({...props}) => {
  const saveFile = (base64, client, fileName) => {
    const clientName = client.clnnme.replace(/\s/g, "_");
    let reqBody = {
      clientName: clientName,
      base64String: base64
    };

    axios.post(`${API_URL}/create-file/${fileName}`, reqBody)
      .then((response) => {
        console.log(response);
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

      props.showFileToast( );

      props.refreshFiles( );

      return saveFile(base64, props.client, file.name);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {

      } else {
        throw err;
      }
    }
  };

  return (
    <ScrollView horizontal={true} style={styles.background}>
      <Button
        title='Advanced Info'
        icon={{
          name: 'arrow-right',
          type: 'font-awesome',
          size: 20,
          color: colors.white,
        }}
        buttonStyle={styles.button}
        iconContainerStyle={styles.icon}
        onPress={( ) => {
          if (props.isPortrait === true)
            props.toggleModal( );
            props.nav.navigate('AdvInfoForm', {
              client: props.client,
              user: props.user,
              clientInfo: props.info,
              refreshInfo: props.refreshInfo
          });
        }}/>
        <Button
          title='Program Info'
          icon={{
            name: 'folder',
            type: 'font-awesome',
            size: 20,
            color: colors.white,
          }}
          buttonStyle={styles.button}
          iconContainerStyle={styles.icon}
          onPress={( ) => {
            let timeout = null;
  
            if (typeof(props.toggleModal) !== 'undefined')
              props.toggleModal( );
  
            timeout = setTimeout(( ) => {
              props.nav.navigate('Program', {
                client: props.client,
                user: props.user,
                tileProgram: props.tileProgram
              });
            }, 2000);
          }}/>
      <Button
        title='Build Pricing'
        icon={{
          name: 'wrench',
          type: 'font-awesome',
          size: 20,
          color: colors.white,
        }}
        buttonStyle={styles.button}
        iconContainerStyle={styles.icon}
        onPress={( ) => {
          let timeout = null;

          if (typeof(props.toggleModal) !== 'undefined')
            props.toggleModal( );

          timeout = setTimeout(( ) => {
            props.nav.navigate('Pricing', {
              client: props.client,
              user: props.user
            });
          }, 2000);
        }}/>
      <Button
        title='Request COI'
        icon={{
          name: 'envelope',
          type: 'font-awesome',
          size: 20,
          color: colors.white,
        }}
        buttonStyle={styles.button}
        iconContainerStyle={styles.icon}
        onPress={props.toggleEmailOverlay}/>
      <Button
        title='Update Client'
        icon={{
          name: 'pencil',
          type: 'font-awesome',
          size: 20,
          color: colors.white,
        }}
        buttonStyle={styles.button}
        iconContainerStyle={styles.icon}
        onPress={props.update}/>
      <Button
        title='Attach Files'
        icon={{
          name: 'paperclip',
          type: 'font-awesome',
          size: 20,
          color: colors.white,
        }}
        buttonStyle={styles.button}
        iconContainerStyle={styles.icon}
        onPress={( ) => {
          filePicker(props.client);
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

  // Icon
  icon: {
    paddingRight: 15
  }
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
