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
  const Icons = [
    {
      name: "home",
      color: colors.white,
      action: ( ) => navigation.popToTop() 
    },
    {
      name: "user-plus",
      color: colors.white,
      action: ( ) => {
        navigation.push('ClientForm', {
          headerText: 'Create Client',
          createClient: true,
          user: user
        })
      }
    },
    {
      name: "sign-out",
      color: colors.red,
      action: ( ) => logout( )
    }
  ];

  return (
    <View style={styles.background}>
      { Icons.map((icon, index) => (
        <Icon
          key={index}
          name={icon.name}
          type="font-awesome"
          color={icon.color}
          underlayColor={colors.black}
          containerStyle={styles.icons}
          onPress={icon.action}/>
      )) }
    </View>
  )
}

// Props Validation
Toolbar.propTypes = {
  createClient: PropTypes.bool,
  signOut: PropTypes.bool
}


export default Toolbar;
