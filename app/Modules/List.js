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
}

// Class Component that will show the list of Clients
function List(props) {
  return (
    <View style={styles.background}>
      <View style={styles.row}>
        <Text style={styles.text}>{props.title}</Text>
      </View>

      <Divider />

      <ScrollView style={styles.sv}>
        { 
          props.list.map((item, index) => (
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
                containerStyle={{width: '15%'}}/>
              <ListItem.Chevron/>
            </ListItem>
          ))
        }
      </ScrollView>
    </View>
  );
}

// Props Valdidation
List.propTypes = {
  setClientUID: PropTypes.func,
  clients: PropTypes.array
}

export default List;
