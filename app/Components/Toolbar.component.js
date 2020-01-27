// Library Imports
import React from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { StackActions } from 'react-navigation';
import { Icon } from 'react-native-elements';
import { signoutAlert } from '../Components/Alert.component';
import colors from '../Library/Colors';

// Presentational Component that will dynamically show icons on sidebar.
const Toolbar = ({...props}) => {
  return (
    <View style={styles.background}>
      {props.home ? <Home {...props} /> : null}
      {props.createClient ? <ClientForm {...props} /> : null}
      {props.signOut ? <SignOut {...props} /> : null}
    </View>
  )
};

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

// Icons
const Home = ({...props}) => (
  <Icon
    name='home'
    type='font-awesome'
    color={colors.white}
    underlayColor={colors.black}
    containerStyle={styles.icons}
    onPress={( ) => props.navigation.dispatch(StackActions.popToTop( ))} />
);

const ClientForm = ({...props}) => (
  <Icon
    name='user-plus'
    type='font-awesome'
    color={colors.white}
    underlayColor={colors.black}
    containerStyle={styles.icons}
    onPress={( ) => props.navigation.navigate('ClientForm', {
      headerText: 'Create Client',
      createClient: true
    })} />
);

const SignOut = ({...props}) => (
  <Icon
    name='sign-out'
    type='font-awesome'
    color={colors.red}
    underlayColor={colors.black}
    containerStyle={styles.icons}
    onPress={( ) => signoutAlert(props.navigation)} />
)

// Props Validation
Toolbar.propTypes = {
  home: PropTypes.bool,
  createClient: PropTypes.bool,
  signOut: PropTypes.bool
}

Home.propTypes = {
  navigation: PropTypes.object
}

ClientForm.propTypes = {
  navigation: PropTypes.object
}

SignOut.propTypes = {
  navigation: PropTypes.object
}

export default Toolbar;
