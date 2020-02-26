// Library Imports
import React from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { ListItem } from 'react-native-elements';
import colors from '../Library/Colors';

// Presentational Component of Client Items
const ListObject = ({ client, setClientUID }) => {
  console.log(client);
  return (
    <View>
      <ListItem
        title={client.clientName}
        subtitle= {'Status: ' + client.status}
        bottomDivider
        chevron
        titleStyle={styles.title}
        subtitleStyle={styles.subtitle}
        containerStyle={styles.background}
        onPress={( ) => setClientUID(client.uid)} />
    </View>
  )
};

// Styles
const styles = StyleSheet.create({
  // Item
  background: {
    height: 70,
  },

  // Title
  title: {
    fontFamily: 'opensans-reg',
    fontSize: 20,
    paddingTop: 5,
    paddingBottom: 5,
    color: colors.background,
  },

  // Subtitle
  subtitle: {
    fontFamily: 'opensans-reg',
    color: colors.blue,
  },
});

// Props Validation
ListObject.propTypes = {
  client: PropTypes.object,
  setClientUID: PropTypes.func
}

export default ListObject;
