// Library Imports
import React from 'react';
import { 
  View, 
  StatusBar,
  Dimensions 
} from 'react-native';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { getClientsByUser, setSelected } from '../features/clients/clientsSlice';
import { reset, restoreId, signOut } from '../features/user/userSlice';
import List from '../Modules/List';
import Toolbar from '../components/Toolbar';
import styles from '../styles/Screen';
import deleteObject from '../realm/deleteObject';
import readMultiples from '../realm/readMultiples';
import { useIsFocused } from '@react-navigation/native';

function Profile({ navigation }) {
  const isPortrait = ( ) => {
    const dim = Dimensions.get('screen');
    return dim.height >= dim.width;
  }

  const dispatch = useDispatch( );
  const isFocused = useIsFocused( ); 
  let user = useSelector((state) => state.user.info);
  let clients = useSelector(state => state.clients.entities);
  const [ portraitView, setPortraitView ] = React.useState(isPortrait( ) ? true : false);

  Dimensions.addEventListener('change', ( ) => {
    setPortraitView(isPortrait( ) ? true : false);
  });

  React.useEffect(( ) => {
    if (user === null) {
      dispatch(reset( ));
      dispatch(signOut( ));
    } else {
      dispatch(getClientsByUser(user.id));
    }
  }, [ isFocused ]);
  
  // Sets the UID when a client is selected for viewing
  const setClientUID = (id) => {
    dispatch(setSelected(id));
    
    navigation.push('ClientProfile');
  }

  // User Sign Out (clears AsyncStorage and Firebase)
  const logout = async( ) => {
    readMultiples("user", user.id)
      .then((objects) => {
        deleteObject(objects[0]);
      }); 

    dispatch(reset( ));
    await dispatch(signOut());
  }

  const refresh = async( ) => {
    let user;
    await readMultiples("user")
      .then((objects) => {
        user = objects[0];
      });
      
    dispatch(restoreId(user.id));
  }

  if (typeof clients === "undefined") {
    dispatch(getClientsByUser(user.id));
  }

  return (
    <View style={styles.background}>
      <StatusBar barStyle='light-content'/>

      <View style={styles.row}>
        <Toolbar navigation={navigation} logout={logout} refresh={refresh}/>

        <List title="Client List" action={setClientUID} list={clients} type="clients"/>
      </View>
    </View>
  );
}

// Prop Validation
Profile.propTypes = {
  navigation: PropTypes.object
}

export default Profile;
