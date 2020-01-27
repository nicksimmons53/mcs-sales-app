// Library Imports
import React, { Component } from 'react';
import { Text, ScrollView } from 'react-native';
import { Divider, ListItem, Icon } from 'react-native-elements';
import  { WebView } from 'react-native-webview';
import * as File from '../Functions/File';
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
    this.setState({files: [...File.retrieveAll(this.state.client)]});
  }

  displayFile = async(fileName) => {
    this.setState({fileURL: await File.retrieveData(fileName)});
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
