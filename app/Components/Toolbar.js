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
    width: 50,
    height: '100%',
    borderTopEndRadius: 5,
    paddingTop: 50,
    backgroundColor: colors.black,
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
        containerStyle={styles.icons}/>
      <Icon
        name="user-plus"
        type="font-awesome"
        color={colors.white}
        underlayColor={colors.black}
        containerStyle={styles.icons}
        onPress={( ) => {
          navigation.push('ClientForm', {
            headerText: 'Create Client',
            createClient: true,
            user: user
          })
        }}/>
      <Icon
        name="bell"
        type="font-awesome"
        color={colors.white}
        underlayColor={colors.black}
        containerStyle={styles.icons}/>
      <Icon
        name="sign-out"
        type="font-awesome"
        color={colors.red}
        underlayColor={colors.black}
        containerStyle={styles.icons}
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
