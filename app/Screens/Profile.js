// Library Imports
import React from 'react';
import { 
  View, 
  StatusBar,
  Dimensions 
} from 'react-native';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { reset, restoreId, signOut } from '../features/user/userSlice';
import List from '../Modules/List';
import Toolbar from '../Components/Toolbar';
import { styles } from './Styles/Profile.style';
import deleteObject from '../Realm/deleteObject';
import readMultiples from '../Realm/readMultiples';
import Clients from '../api/Clients';
import { useIsFocused } from '@react-navigation/native';

function Profile({ navigation }) {
  const isPortrait = ( ) => {
    const dim = Dimensions.get('screen');
    return dim.height >= dim.width;
  }

  const dispatch = useDispatch( );
  const isFocused = useIsFocused( );
  let userId = useSelector((state) => state.user.id);
  const [ clients, setClients ] = React.useState([ ]);
  const [ client, setClient ] = React.useState(null);
  const [ portraitView, setPortraitView ] = React.useState(isPortrait( ) ? true : false);

  Dimensions.addEventListener('change', ( ) => {
    setPortraitView(isPortrait( ) ? true : false);
  });

  React.useEffect(async ( ) => {
    if (userId === null) {
      readMultiples("user")
        .then(async (objects) => {
          dispatch(restoreId(objects[0].sageUserId));
          setClients(await Clients.getAll(objects[0].sageUserId));
        });
    }
    
    if (userId !== null && isFocused) {
      setClients(await Clients.getAll(userId));
    }
  }, [ isFocused ]);

  // Sets the UID when a client is selected for viewing
  const setClientUID = (uid) => {
    clients.map((client) => {
      if (client.id === uid) {
        setClient(client);

        navigation.push('ClientProfile', { client: client });
      }
    });
  }

  // User Sign Out (clears AsyncStorage and Firebase)
  const logout = async( ) => {
    readMultiples("user", userId)
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
      
    dispatch(restoreId(user.sageUserId));
  }

  if (userId === null) {
    refresh( );
  }
  
  return userId !== null && (
    <View style={styles.background}>
      <StatusBar barStyle='light-content' />

      <View style={styles.content}>
        <View style={styles.list}>
          <Toolbar
            navigation={navigation}
            logout={logout}
            refresh={refresh}/>

          <List 
            title="Client List"
            action={setClientUID} 
            list={clients}/>
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
