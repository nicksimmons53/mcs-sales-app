// Library Imports
import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import PropTypes from 'prop-types';
import { Divider, ListItem } from 'react-native-elements';
import { styles } from './Styles/ClientList.style';

const Item = (props) => (
  <View>
    <ListItem
      title={props.label}
      bottomDivider
      chevron
      titleStyle={styles.title}
      subtitleStyle={styles.subtitle}
      containerStyle={styles.listItem}
      onPress={ ( ) => props.action(props.id)}/>
  </View>
)

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
            <Item 
              key={index}
              label={item.clnnme} 
              id={item.id} 
              action={props.action}/>
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
