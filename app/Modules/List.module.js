// Library Imports
import React, { Component } from 'react';
import { Text, ScrollView, Platform } from 'react-native';
import { S3_URL_DEV } from 'react-native-dotenv';
import PropTypes from 'prop-types';
import { Divider, ListItem, Icon } from 'react-native-elements';
import  { WebView } from 'react-native-webview';
import RNFS from 'react-native-fs';
import FileViewer from 'react-native-file-viewer';
import Modal from 'react-native-modal';
import { styles, colors } from './Styles/List.style';

// Presentational Component of Lists
class List extends Component {
  state = {
    client: this.props.client,
    fileURL: '',
    fileName: '',
    modalVisible: false
  }

  displayFile = async(fileName, file) => {
    let s3FileURL = S3_URL_DEV + "/" + fileName;
    let s3FileExt = fileName.split('.')[1];
    let localFile = `${RNFS.DocumentDirectoryPath}/tempFile.${s3FileExt}`;
    let options = {
      fromUrl: s3FileURL,
      toFile: localFile
    };

    RNFS.downloadFile(options).promise
      .then(( ) => FileViewer.open(localFile))
      .catch((error) => {
        console.log(error);
      });
      
    this.setState({ modalVisible: true });
  }

  renderFileList = ( ) => {
    let moreThanOneIndex = false;
    if (this.props.files.length > 1)
      moreThanOneIndex = true;

    if (this.props.files.length === 0) {
      return (
        <ListItem
          key={0}
          title='No Files Found. Attach Files Here (Inventory Part Sheet, Original Price Sheet, etc...)'
          titleStyle={styles.listItemTitle}/>
      )
    } else {
      return (
        this.props.files.map((l, i) => (
          <ListItem
            key={i}
            title={l.Key.split("/")[1]}
            rightIcon={
              <Icon
                name='external-link-square'
                type='font-awesome'
                color={colors.green}/>}
            topDivider={moreThanOneIndex}
            titleStyle={styles.listItemTitle}
            onPress={( ) => this.displayFile(l.Key, l)}/>
        ))
      );
    }
  }

  toggleModal = ( ) => {
    this.setState({modalVisible: !this.state.modalVisible});
  }

  render( ) {
    return (
      <ScrollView style={styles.background}>
        <Text style={styles.header}>{this.props.title}</Text>

        <Divider />
        {this.props.files ? this.renderFileList( ) : null}
        {this.state.modalVisible
          ?
          <Modal
            isVisible={this.state.modalVisible}
            onBackdropPress={this.toggleModal}
            style={styles.fileModal}>

            <WebView source={{uri: this.state.fileURL}} style={styles.filePreview} />
          </Modal>
          :
          null
        }
      </ScrollView>
    );
  }
}

// Props Valdidation
List.propTypes = {
  title: PropTypes.string,
  files: PropTypes.array,
  client: PropTypes.object
}

export default List;
