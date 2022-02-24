// Library Imports
import React from 'react';
import {
  View,
  StatusBar,
  Dimensions
} from 'react-native';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { reset, signOut } from '../redux/features/user/userSlice';
import { ClientList, DocumentsList, NotificationsList } from '../Modules/List';
import Toolbar from '../components/Toolbar';
import { TakeoffList } from '../Modules/List';
import styles from '../styles/Screen';
import { useIsFocused } from '@react-navigation/native';
import colors from '../Library/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';

function ClientTakeoff({ navigation }) {
  let clients = useSelector((state) => state.clients.entities.filter(client => client.status === "Pushed"));

  // User Sign Out (clears AsyncStorage and Firebase)
  const logout = async( ) => {
    dispatch(signOut( ));
    await AsyncStorage.removeItem("sub");
  }

  console.log(clients)

  return (
    <View style={{...styles.background, backgroundColor: colors.black}}>
      <StatusBar barStyle="light-content"/>

      <View style={styles.row}>
        <Toolbar navigation={navigation} logout={logout}/>

        <TakeoffList list={clients}/>
      </View>
    </View>
  );
}

export default ClientTakeoff;