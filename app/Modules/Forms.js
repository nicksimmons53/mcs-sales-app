// Library Imports
import React from 'react';
import {
  Text,
  View
} from 'react-native';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import { Divider } from 'native-base';
import Input from '../components/Input';
import Dropdown from '../components/Dropdown';
import { states, territories } from '../form/dropdown/values';
import colors from '../Library/Colors';

let zIndex = 100000;

export const BasicInfo = (props) => {
  return (
    <View style={styles.formRoot}>
      <View style={styles.form}>
        <Text style={styles.label}>Legal Name</Text>

        <Divider/>
        
        <Input label="Client Name" control={props.control} field="info.name" defaultValue="" errors={props.errors}/>
      </View>

      <View style={{...styles.form, zIndex: 4}}>
        <Text style={styles.label}>Territory</Text>

        <Divider/>
        
        <Dropdown label="Regional City" items={territories} control={props.control} field="info.territory" errors={props.errors} zIndex={zIndex-=1}/>
      </View>

      <View style={{...styles.form, zIndex: 3}}>
        <Text style={styles.label}>Corporate Address</Text>

        <Divider/>

        <Input label="Address 1" control={props.control} field="addresses.Corporate.address1" defaultValue="" errors={props.errors}/>
        <Input label="Address 2" control={props.control} field="addresses.Corporate.address2" defaultValue="" errors={props.errors}/>
        <View style={{ flexDirection: 'row'}}>
          <Input label="City" control={props.control} field="addresses.Corporate.city" defaultValue="" errors={props.errors}/>
          <View style={{ width: '15%'}}>
            <Dropdown label="State" items={states} control={props.control} field="addresses.Corporate.state" errors={props.errors} zIndex={zIndex-=1}/>
          </View>
          <Input label="Zip" control={props.control} field="addresses.Corporate.zip" defaultValue="" errors={props.errors}/>
        </View>
      </View>

      <View style={{...styles.form, zIndex: 2}}>
        <Text style={styles.label}>Billing Address</Text>

        <Divider/>
        
        <Input label="Address 1" control={props.control} field="addresses.Billing.address1" defaultValue="" errors={props.errors}/>
        <Input label="Address 2" control={props.control} field="addresses.Billing.address2" defaultValue="" errors={props.errors}/>
        <View style={{ flexDirection: 'row' }}>
          <Input label="City" control={props.control} field="addresses.Billing.city" defaultValue="" errors={props.errors}/>
          <View style={{ width: '15%'}}>
            <Dropdown label="State" items={states} control={props.control} field="addresses.Billing.state" errors={props.errors} zIndex={zIndex-=1}/>
          </View>
          <Input label="Zip" control={props.control} field="addresses.Billing.zip" defaultValue="" errors={props.errors}/>
        </View>
      </View>

      <View style={{...styles.form, zIndex: 1}}>
        <Text style={styles.label}>Shipping Address</Text>

        <Divider/>
        
        <Input label="Address 1" control={props.control} field="addresses.Shipping.address1" defaultValue="" errors={props.errors}/>
        <Input label="Address 2" control={props.control} field="addresses.Shipping.address2" defaultValue="" errors={props.errors}/>
        <View style={{ flexDirection: 'row' }}>
          <Input label="City" control={props.control} field="addresses.Shipping.city" defaultValue="" errors={props.errors}/>
          <View style={{ width: '15%'}}>
            <Dropdown label="State" items={states} control={props.control} field="addresses.Shipping.state" errors={props.errors} zIndex={zIndex-=1}/>
          </View>
          <Input label="Zip" control={props.control} field="addresses.Shipping.zip" defaultValue="" errors={props.errors}/>
        </View>
      </View>

      <View style={{...styles.buttonView, zIndex: 0}}>
        <Button
          title='SAVE'
          disabled={props.disableSave}
          buttonStyle={styles.save}
          containerStyle={styles.saveButtonContainer}
          onPress={props.handleSubmit(props.onSubmit, props.onErrors)}/>
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  // Background
  background: {
    backgroundColor: colors.black,
    flex: 1,
    paddingTop: 25,
    width: '100%'
  },

  // Row
  row: {
    flex: 1,
    flexDirection: 'row'
  },

  // Info Container
  infoContainer: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    height: '100%',
    width: '100%',
  },

  // form
  formRoot: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  form: {
    backgroundColor: colors.white,
    borderRadius: 3,
    margin: 10,
    padding: 20,
    width: '50%'
  },
  label: {
    fontFamily: 'OpenSans',
    flex: 1,
    fontSize: 18,
    paddingRight: 30,
    color: colors.black
  },

  // ScrollView
  sv: {
    backgroundColor: colors.light_grey,
  },

  // Buttons
  buttonView: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  attachButtonContainer: {
    height: 100,
    width: 150,
  },
  attach: {
    backgroundColor: colors.black,  
  },
  saveButtonContainer: {
    width: 350,
    margin: 40,
    marginTop: 20,
  },
  save: {
    backgroundColor: colors.green,
  }
});