// Library Imports
import React, { Component } from 'react';
import { Text, ScrollView, View, Share } from 'react-native';
import PropTypes from 'prop-types';
import { Divider, ListItem, Icon } from 'react-native-elements';
import  { WebView } from 'react-native-webview';
import * as File from '../Functions/File';
import { deleteFile } from '../Components/Alert.component';
import Modal from 'react-native-modal';
import styles from './Styles/List.style';
import colors from '../Library/Colors';

// Presentational Component of Lists
class List extends Component {
  state = {
    client: this.props.client,
    files: [ ],
    fileURL: '',
    fileName: '',
    modalVisible: false
  }

  displayFile = async(fileName) => {
    this.setState({fileName: fileName});
    this.setState({fileURL: await File.retrieveData(fileName, this.state.client)});
    this.setState({modalVisible: true});
  }

  deleteFile = ( ) => {
    File.deleteData(this.state.fileName, this.props.client);
    this.toggleModal( );
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
            title={l.name}
            rightIcon={
              <Icon
                name='external-link-square'
                type='font-awesome'
                color={colors.green}/>}
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
            <View style={styles.toolbar}>
              <Icon
                name='share-square'
                type='font-awesome'
                size={32}
                color={colors.light_grey}
                underlayColor={colors.green}
                containerStyle={styles.icon}
                onPress={( ) => Share.share({url: this.state.fileURL})}/>
              <Icon
                name='trash'
                type='font-awesome'
                size={32}
                color={colors.light_grey}
                underlayColor={colors.green}
                containerStyle={styles.icon}
                onPress={( ) => deleteFile(this.deleteFile)}/>
            </View>

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
