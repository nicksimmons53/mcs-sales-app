import React from 'react';
import { Slide } from 'native-base';
import { StyleSheet, Text, View } from 'react-native';
import colors from '../Library/Colors';
import { Button, Divider } from 'react-native-elements';
import { ScrollView } from 'react-native';
import { useForm } from 'react-hook-form';
import Header from './Header';
import Input from '../components/Input';
import Dropdown from '../components/Dropdown';
import { states, territories } from '../form/dropdown/values';
import { KeyboardAvoidingView } from 'react-native';
import { BasicInfo } from '../Modules/InfoForms';

const styles = StyleSheet.create({
  root: {
    alignSelf: 'center',
    backgroundColor: colors.light_grey, 
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    height: 600,
    padding: 20,
    width: '70%'
  },
  formRoot: {
    alignItems: 'center'
  }
});

// Props
// title  => ""
// form   => basicInfo 
function QuickForm(props) {
  return (
    <KeyboardAvoidingView behavior='padding' enabled style={styles.background}>
      <ScrollView style={styles.root}>
        <Header title={props.title}/>

        <Divider/>

        {props.children}

        <View style={styles.formRoot}>
          <Button title="Collapse" onPress={props.setIsVisible} buttonStyle={{ margin: 10, height: 35, width: 200 }}/>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export default QuickForm;