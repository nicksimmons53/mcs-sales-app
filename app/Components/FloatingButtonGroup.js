import React from 'react';
import { StyleSheet } from 'react-native';
import { FAB } from 'react-native-paper';
import colors from '../Library/Colors';

const styles = StyleSheet.create({
    root: {
        backgroundColor: colors.green, 
        bottom: 0,
        margin: 15,
        right: 0, 
    }
})

const FloatingButtonGroup = (props) => {
  const [state, setState] = React.useState({ open: false });

  const onStateChange = ({ open }) => setState({ open });

  const { open } = state;

  return (
    <FAB.Group
      open={open}
      onPress={props.action} 
      icon={open ? "close-thick" : "hammer-wrench"} 
      color={colors.white}
      fabStyle={styles.root}
      onStateChange={onStateChange}
      actions={props.actions}/>
  );
}

export default FloatingButtonGroup;