// Library Imports
import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import PropTypes from 'prop-types';
import { Chip, Divider, ListItem } from 'react-native-elements';
import { colors, styles } from './Styles/ClientList.style';

const chipStyle = (status) => {
  switch (status) {
    case "Potential":
      return { backgroundColor: colors.black }

    case "Queued":
      return { backgroundColor: colors.blue }

    case "Approved":
      return { backgroundColor: colors.orange }

    case "Pushed":
      return { backgroundColor: colors.green }

    case "Declined":
      return { backgroundColor: colors.red }

    default:
      break;
  }
};

// Class Component that will show the list of Clients
export const ClientList = (props) => {
  return (
    <View style={{...styles.background, borderRadius: 5, flex: 2, margin: 5}}>
      <View style={styles.row}>
        <Text style={styles.text}>Client List</Text>
      </View>

      <Divider />

      <ScrollView style={styles.sv}>
        { props.list.map((item, index) => (
          <ListItem 
            key={index} 
            bottomDivider 
            onPress={( ) => props.action(item.id)}>
            <ListItem.Content>
              <ListItem.Title style={{fontFamily: 'OpenSans', fontWeight: 'bold'}}>{item.name}</ListItem.Title>
            </ListItem.Content>
            
            <Chip 
              title={item.status} 
              buttonStyle={chipStyle(item.status)}
              containerStyle={{width: '20%'}}/>
            <ListItem.Chevron/>
          </ListItem>
        ))}
      </ScrollView>
    </View>
  );
};

// Class Component that will show the list of Clients
export const NotificationsList = (props) => {
  return (
    <View style={{...styles.background, borderRadius: 5, flex: 1.5, margin: 5}}>
      <View style={styles.row}>
        <Text style={styles.text}>Notifications</Text>
      </View>

      <Divider />

      <ScrollView style={styles.sv}>
        { props.list.map((item, index) => (
          <ListItem 
            key={index} 
            bottomDivider 
            onPress={( ) => props.action(item.id)}>
              
            <ListItem.Content>
            </ListItem.Content>

            <ListItem.Chevron/>
          </ListItem>
        ))}
      </ScrollView>
    </View>
  );
};

// Class Component that will show the list of Clients
export const DocumentsList = (props) => {
  return (
    <View style={{...styles.background, borderRadius: 5, flex: 1.5, margin: 5}}>
      <View style={styles.row}>
        <Text style={styles.text}>Documents</Text>
      </View>

      <Divider />

      <ScrollView style={styles.sv}>
        { props.list.map((item, index) => (
          <ListItem 
            key={index} 
            bottomDivider 
            onPress={( ) => props.action(item.id)}>
              
            <ListItem.Content>
            </ListItem.Content>

            <ListItem.Chevron/>
          </ListItem>
        ))}
      </ScrollView>
    </View>
  );
};
