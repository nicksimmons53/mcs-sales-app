// Library Imports
import React from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { Icon } from 'react-native-elements';
import colors from '../Library/Colors';

// Styles
const styles = StyleSheet.create({
  // Background Views
  background: {
    backgroundColor: colors.black,
    borderTopEndRadius: 5,
    height: '100%',
    paddingTop: 50,
    paddingBottom: 100,
    width: 50,
  },

  // Icons
  icons: {
    marginTop: 30,
  },
});

// Presentational Component that will dynamically show icons on sidebar.
const Toolbar = ({ navigation, user, logout }) => {
  return (
    <View style={styles.background}>
      <Icon
        name="home"
        type="font-awesome"
        color={colors.white}
        underlayColor={colors.black}
        containerStyle={styles.icons}
        onPress={( ) => navigation.navigate('Profile')}/>
      <Icon
        name="user-plus"
        type="font-awesome"
        color={colors.white}
        underlayColor={colors.black}
        containerStyle={styles.icons}
        onPress={( ) => navigation.push('ClientForm')}/>
      {/*<Icon*/}
      {/*  name="file-text"*/}
      {/*  type="font-awesome"*/}
      {/*  color={colors.white}*/}
      {/*  underlayColor={colors.black}*/}
      {/*  containerStyle={styles.icons}*/}
      {/*  onPress={( ) => navigation.navigate('ClientTakeoff')}/>*/}

      <Icon
        name="sign-out"
        type="font-awesome"
        color={colors.red}
        underlayColor={colors.black}
        containerStyle={{...styles.icons, marginTop: 75}}
        onPress={( ) => logout( )}/>
    </View>
  )
}

// Props Validation
Toolbar.propTypes = {
  createClient: PropTypes.bool,
  signOut: PropTypes.bool
}


export default Toolbar;
