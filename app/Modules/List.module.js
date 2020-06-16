// Library Imports
import React, { Component } from 'react';
import { Text, ScrollView, Image } from 'react-native';
import { S3_BUCKET } from 'react-native-dotenv';
import PropTypes from 'prop-types';
import { Divider, ListItem, Icon } from 'react-native-elements';
import  { WebView } from 'react-native-webview';
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

  displayFile = async(fileName) => {
    let fileURL = S3_BUCKET + "/" + fileName;

    if (/\.pdf$/.test(fileURL)) {
      fileURL = `https://drive.google.com/viewerng/viewer?embedded=true&url=${fileURL}`;
    }
    
    this.setState({ fileURL: fileURL });
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
          title='No File Attachments Found'
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
            onPress={( ) => this.displayFile(l.Key)}/>
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
