import React from 'react';
import { StyleSheet } from 'react-native';
import { Snackbar } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { show } from '../redux/features/snackbar/snackbarSlice';

const Snack = (props) => {
  const dispatch = useDispatch( );
  let state = useSelector((state) => state.snackbar);

  return (
      <Snackbar 
        visible={state.visible} 
        onDismiss={( ) => dispatch(show( ))} 
        style={styles.root}>
        {state.message}
      </Snackbar>
  )
};

const styles = StyleSheet.create({
  root: {
    width: '30%'
  }
})

export default Snack;