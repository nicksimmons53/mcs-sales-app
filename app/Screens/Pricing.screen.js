// Library Imports
import React, { Component } from 'react';
import { View, StatusBar, KeyboardAvoidingView, Text } from 'react-native';
import PropTypes from 'prop-types';
import { Divider, ButtonGroup, Button } from 'react-native-elements';
import Toast from 'react-native-easy-toast';
import Wood from '../Modules/Wood.module';
import Tile from '../Modules/Tile.module';
import Carpet from '../Modules/Carpet.module';
import Vinyl from '../Modules/Vinyl.module';
import Countertops from '../Modules/Countertops.module';
import { styles, colors } from './Styles/Pricing.style';

export default class Pricing extends Component {
  state = {
    selectedSpreadsheet: 0,
    buttonGroup: ['Tile', 'Wood', 'Carpet', 'Vinyl', 'Countertops']
  };

  timeout = null;

  componentWillUnmount( ) {
    clearTimeout(this.timeout);
  }

  updateIndex = (selected) => {
    this.setState({selectedSpreadsheet: selected});
  }

  render( ) {
    const client = this.props.navigation.getParam('client');
    const user = this.props.navigation.getParam('user');
    const selectedIndex = this.state.selectedSpreadsheet;

    return (
      <KeyboardAvoidingView enabled behavior='padding' style={styles.background}>
        <StatusBar barStyle='light-content' />
        <View style={styles.row}>
          <View style={styles.infoContainer}>
            <View style={styles.header}>
              <Text style={styles.text}>Level Builder</Text>
            </View>

            <Divider />

            <ButtonGroup
              onPress={this.updateIndex}
              selectedIndex={selectedIndex}
              buttons={this.state.buttonGroup}
              selectedButtonStyle={styles.selected}
              containerStyle={styles.buttonGroup} />

            { selectedIndex === 0 ? <Tile client={client} user={user}/> : null }

            { selectedIndex === 1 ? <Wood client={client} user={user}/> : null }

            { selectedIndex === 2 ? <Carpet client={client} user={user}/> : null }

            { selectedIndex === 3 ? <Vinyl client={client} user={user}/> : null } 

            { selectedIndex === 4 ? <Countertops client={client} user={user}/> : null }

          </View>
        <Toast ref='toast' position='center' style={styles.toast} />
        </View>
      </KeyboardAvoidingView>
    )
  }
}

// Props Validation
Pricing.propTypes = {
  navigation: PropTypes.object
}
