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
import { setSelected } from '../redux/features/clients/clientsSlice';
import { getClientsByUser, getClientApprovals } from '../redux/features/clients/clientsThunk';
import { getClientContacts } from '../redux/features/contacts/contactsThunk';
import { getClientAddresses } from '../redux/features/addresses/addressThunk';
import { getProgramsByClient } from '../redux/features/programs/programsThunk';
import { ClientList, DocumentsList, NotificationsList } from '../Modules/List';
import Toolbar from '../components/Toolbar';
import styles from '../styles/Screen';
import deleteObject from '../realm/deleteObject';
import readMultiples from '../realm/readMultiples';
import { useIsFocused } from '@react-navigation/native';
import colors from '../Library/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Profile({ navigation }) {
  const isPortrait = ( ) => {
    const dim = Dimensions.get('screen');
    return dim.height >= dim.width;
  }

  const dispatch = useDispatch( );
  const isFocused = useIsFocused( ); 
  let user = useSelector((state) => state.user.info);
  let clients = useSelector((state) => state.clients.entities);
  const [ portraitView, setPortraitView ] = React.useState(isPortrait( ) ? true : false);
  
  Dimensions.addEventListener('change', ( ) => {
    setPortraitView(isPortrait( ) ? true : false);
  });

  React.useEffect(( ) => {
    const getClients = async(id) => {
      await dispatch(getClientsByUser(id));
    }
    
    getClients(user.id);
  }, [ ]);

  React.useEffect(( ) => {
    // if (user === null) {
    //   AsyncStorage.removeItem("sub");
    //   dispatch(reset( ));
    //   dispatch(signOut( ));
    // } else {
    //   dispatch(getClientsByUser(user.id));
    // }

    // const getClients = async(id) => {
    //   await dispatch(getClientsByUser(id));
    // }
    
    // getClients(user.id);
  }, [ isFocused ]);
  
  // Sets the UID when a client is selected for viewing
  const fetchClientById = async (id) => {
    dispatch(setSelected(id));
    dispatch(getClientAddresses(id));
    dispatch(getClientContacts(id))    
    dispatch(getProgramsByClient(id));
    dispatch(getClientApprovals(id));
    
    navigation.push('ClientProfile');
  }

  // User Sign Out (clears AsyncStorage and Firebase)
  const logout = async( ) => {
    dispatch(signOut( ));
    await AsyncStorage.removeItem("sub");
  }
  
  return (
    <View style={{...styles.background, backgroundColor: colors.black}}>
      <StatusBar barStyle="light-content"/>

      <View style={styles.row}>
        <Toolbar navigation={navigation} logout={logout}/>

        {clients !== undefined && <ClientList action={fetchClientById} list={clients}/> }

        <View style={{ flexDirection: 'column', flex: 1.5 }}>
          <NotificationsList list={[]}/>

          <DocumentsList list={[]}/>
        </View>
      </View>
    </View>
  );
}

// Prop Validation
Profile.propTypes = {
  navigation: PropTypes.object
}

export default Profile;
