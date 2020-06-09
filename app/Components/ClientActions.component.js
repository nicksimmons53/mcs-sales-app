// Library Imports
import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Button } from 'react-native-elements';
import * as DocumentPicker from 'expo-document-picker';
import colors from '../Library/Colors';

// Presentational Component of Buttons inside Client Profile
const ClientActions = ({...props}) => {
  const saveFile = (file, client) => {
    const user = props.user;
    const body = new FormData( );

    body.append('file', file);

    axios.post(`https://ga3xyasima.execute-api.us-east-1.amazonaws.com/dev/employee/${user.recnum}/clients/${client.id}/files`, body)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      })
  }

  // Expo Cli Document Picker Component
  const filePicker = async( ) => {
    await DocumentPicker.getDocumentAsync({
      copyToCacheDirectory: false
    }).then((result) => {
      if (result.type === 'cancel') {
        return;
      } else {
        let file = {
          name: result.name,
          type: "*",
          uri: result.uri
        };

        return saveFile(file, props.client);
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
        title='Build Pricing'
        icon={{
          name: 'wrench',
          type: 'font-awesome',
          size: 20,
          color: colors.white,
        }}
        buttonStyle={styles.button}
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
        }} />
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
            user: props.user,
            createClient: false
          });
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
