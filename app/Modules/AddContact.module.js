// Library Imports
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import { Button, Input, Divider } from 'react-native-elements';
import { styles, colors } from './Styles/AddContact.style';

class AddContact extends Component {
  input = (label) => (
    <View style={styles.textRow}>
      <Text style={styles.label}>{label}</Text>
      <Input
        autoCapitalize='words'
        blurOnSubmit={false}
        containerStyle={styles.mediumInput}
        inputContainerStyle={styles.inputContainer} />
    </View>
  )

  render( ) {
    return (
      <View style={styles.background}>
        <View style={styles.form}>
          <View style={styles.header}>
            <Text style={styles.label}>Add Client Contact</Text>
          </View>

          <Divider/>

          {this.input('Name')}
          {this.input('Title')}
          {this.input('Phone')}
          {this.input('Email')}

          <View style={{width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
            <Button
              title='Save'
              buttonStyle={styles.save} />
            <Button
              title='Cancel'
              buttonStyle={styles.cancel}
              onPress={( ) => this.props.toggle( )}/>
          </View>
        </View>
      </View>
    )
  }
}

AddContact.propTypes = {
  toggle: PropTypes.func
}

export default AddContact;
