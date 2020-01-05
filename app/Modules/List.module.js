// Library Imports
import React, { Component } from 'react';
import { View, Text, FlatList, TouchableHighlight, ScrollView, Image } from 'react-native';
import Firebase from '../../config/Firebase';
import { Divider, ListItem, Icon } from 'react-native-elements';
import * as FileSystem from 'expo-file-system';
import  { WebView } from 'react-native-webview';
import Modal from 'react-native-modal';
import styles from './Styles/List.style';
import colors from '../Library/Colors';

// Presentational Component of Lists
class List extends Component {
  state = {
    client: this.props.client,
    files: [ ],
    fileURL: '',
    modalVisible: false
  }

  // Will retrieve list of files and notifications per client
  componentDidMount( ) {
    let files = [ ];

    const folderPath = Firebase.auth( ).currentUser.uid + '/' + this.state.client.uid + '/';
    const storageRef = Firebase.storage( ).ref( );

    const folderRef = storageRef.child(folderPath);
    folderRef.listAll( ).then((res) => {
      res.items.forEach((itemRef) => {
        fileObj = { };
        fileObj['name'] = itemRef.name;

        files.push(fileObj);
      });

      this.setState({files: [...files]});

    }).catch((err) => {
      console.error(err);
    });
  }

  _getFile = async(fileName) => {
    const filePath = Firebase.auth( ).currentUser.uid + '/' + this.state.client.uid
                        + '/' + fileName;
    const storageRef = Firebase.storage( ).ref( );
    const fileRef = storageRef.child(filePath);
    await fileRef.getDownloadURL( ).then((url) => {
      let promise = fetch(url);
      return promise;
    }).then((result) => {
      this.setState({fileURL: result.url});
      console.log(result.url);
    }).catch((error) => {
      console.log(error);
    });
  }

  displayFile = async(fileName) => {
    await this._getFile(fileName);
    console.log(this.state.fileURL);
    this.setState({modalVisible: true});
  }

  renderFileList = ( ) => {
    let moreThanOneIndex = false;
    if (this.state.files.length > 1)
      moreThanOneIndex = true;

    if (this.state.files.length === 0) {
      return (
        <ListItem
          key={0}
          title='No File Attachments Found'
          titleStyle={styles.listItemTitle}/>
      )
    } else {
      return (
        this.state.files.map((l, i) => (
          <ListItem
            key={i}
            title={l.name}
            rightIcon={<Icon name='external-link-square' type='font-awesome' color={colors.green}/>}
            topDivider={moreThanOneIndex}
            titleStyle={styles.listItemTitle}
            onPress={( ) => this.displayFile(l.name)}/>
        ))
      );
    }
  }

  toggleModal = ( ) => {
    this.setState({modalVisible: !this.state.modalVisible});
  }

  render( ) {
    console.log(this.state.fileURL);
    return (
      <ScrollView style={styles.background}>
        <Text style={styles.header}>{this.props.title}</Text>
        <Divider />
        {this.props.files ? this.renderFileList( ) : null}
        {this.state.modalVisible
          ?
          <Modal isVisible={this.state.modalVisible}
            onBackdropPress={this.toggleModal}>
            <WebView source={{uri: this.state.fileURL}} style={styles.filePreview}/>
          </Modal>
          :
          null
        }
      </ScrollView>
    );
  }
}

export default List;
