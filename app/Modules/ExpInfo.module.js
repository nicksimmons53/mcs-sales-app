// Library Imports
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Divider, Input, Button } from 'react-native-elements';
import * as DocumentPicker from 'expo-document-picker';
import Toast from 'react-native-easy-toast';
import * as File from '../Functions/File';
import styles from './Styles/Form.style';
import colors from '../Library/Colors';

// Class Component to show Expeditor Form Information
class ExpInfo extends Component {

  render( ) {
    // Expo Cli Document Picker Component
    const filePicker = async( ) => {
      let result = await DocumentPicker.getDocumentAsync({
        copyToCacheDirectory: false
      }).then((result) => {
        if (result.type === 'cancel')
          return;
        else
          return File.uriToBlob(result.uri);
      }).then((blob) => {
        if (blob !== undefined) {
          return File.saveFile(blob, this.props.client);
        }
      }).then(( ) => {
        this.refs.toast.show('File Was Attached Successfully');
      }).catch((error) => {
        throw error;
      });
    };

    return (
      <View style={styles.background}>
        <View style={styles.form}>
          <Text style={styles.headerText}>Expediting Information</Text>

          <Divider />

          <Text style={styles.sectionHeaderText}>Builder Contact</Text>
          <View style={styles.textRow}>
            <Text style={styles.label}>Contact Name</Text>
            <Input
              onChangeText={this.props.formik.handleChange('expContactName')}
              onBlur={this.props.formik.handleBlur('expContactName')}
              autoCapitalize='words'
              textContentType='name'
              blurOnSubmit={false}
              containerStyle={styles.mediumInput}
              inputContainerStyle={styles.inputContainer} />
          </View>
          <View style={styles.textRow}>
            <Text style={styles.label}>Title</Text>
            <Input
              onChangeText={this.props.formik.handleChange('expTitle')}
              onBlur={this.props.formik.handleBlur('expTitle')}
              autoCapitalize='words'
              textContentType='jobTitle'
              blurOnSubmit={false}
              containerStyle={styles.mediumInput}
              inputContainerStyle={styles.inputContainer} />
          </View>
          <View style={styles.textRow}>
            <Text style={styles.label}>Phone</Text>
            <Input
              onChangeText={this.props.formik.handleChange('expContactPhone')}
              onBlur={this.props.formik.handleBlur('expContactPhone')}
              keyboardType='phone-pad'
              textContentType='telephoneNumber'
              blurOnSubmit={false}
              containerStyle={styles.smallInput}
              inputContainerStyle={styles.inputContainer} />
          </View>
          <View style={styles.textRow}>
            <Text style={styles.label}>Email</Text>
            <Input
              onChangeText={this.props.formik.handleChange('expContactEmail')}
              onBlur={this.props.formik.handleBlur('expContactEmail')}
              keyboardType='email-address'
              textContentType='emailAddress'
              blurOnSubmit={false}
              containerStyle={styles.mediumInput}
              inputContainerStyle={styles.inputContainer} />
          </View>

          <Divider />

          <View style={styles.textRow}>
            <Text style={styles.label}>Plan Attachment</Text>
            <Button
              title='Attach Plan'
              icon={{
                name: 'paperclip',
                type: 'font-awesome',
                size: 20,
                color: colors.white,
              }}
              buttonStyle={styles.attach}
              containerStyle={styles.attachButtonContainer}
              onPress={( ) => filePicker( )} />
          </View>

          <Divider />

          <Text style={styles.sectionHeaderText}>Model Address</Text>
          <View style={styles.textRow}>
            <Text style={styles.label}>Street Address</Text>
            <Input
              onChangeText={this.props.formik.handleChange('modelStreetAddr')}
              onBlur={this.props.formik.handleBlur('modelStreetAddr')}
              autoCapitalize='words'
              textContentType='streetAddressLine1'
              blurOnSubmit={false}
              containerStyle={styles.mediumInput}
              inputContainerStyle={styles.inputContainer} />
          </View>
          <View style={styles.textRow}>
            <Text style={styles.label}>City</Text>
            <Input
              onChangeText={this.props.formik.handleChange('modelCity')}
              onBlur={this.props.formik.handleBlur('modelCity')}
              autoCapitalize='words'
              textContentType='addressCity'
              blurOnSubmit={false}
              containerStyle={styles.mediumInput}
              inputContainerStyle={styles.inputContainer} />
          </View>
          <View style={styles.textRow}>
            <Text style={styles.label}>State</Text>
            <Input
              onChangeText={this.props.formik.handleChange('modelState')}
              onBlur={this.props.formik.handleBlur('modelState')}
              autoCapitalize='characters'
              textContentType='addressState'
              blurOnSubmit={false}
              containerStyle={styles.xSmallInput}
              inputContainerStyle={styles.inputContainer} />
          </View>
          <View style={styles.textRow}>
            <Text style={styles.label}>Zip</Text>
            <Input
              onChangeText={this.props.formik.handleChange('modelZip')}
              onBlur={this.props.formik.handleBlur('modelZip')}
              keyboardType='number-pad'
              textContentType='postalCode'
              blurOnSubmit={false}
              containerStyle={styles.smallInput}
              inputContainerStyle={styles.inputContainer} />
          </View>

          <Divider />

          <Text style={styles.sectionHeaderText}>Design Center Address</Text>
          <View style={styles.textRow}>
            <Text style={styles.label}>Street Address</Text>
            <Input
              onChangeText={this.props.formik.handleChange('designStreetAddr')}
              onBlur={this.props.formik.handleBlur('designStreetAddr')}
              autoCapitalize='words'
              textContentType='streetAddressLine1'
              blurOnSubmit={false}
              containerStyle={styles.mediumInput}
              inputContainerStyle={styles.inputContainer} />
          </View>
          <View style={styles.textRow}>
            <Text style={styles.label}>City</Text>
            <Input
              onChangeText={this.props.formik.handleChange('designCity')}
              onBlur={this.props.formik.handleBlur('designCity')}
              autoCapitalize='words'
              textContentType='addressCity'
              blurOnSubmit={false}
              containerStyle={styles.mediumInput}
              inputContainerStyle={styles.inputContainer} />
          </View>
          <View style={styles.textRow}>
            <Text style={styles.label}>State</Text>
            <Input
              onChangeText={this.props.formik.handleChange('designState')}
              onBlur={this.props.formik.handleBlur('designState')}
              autoCapitalize='characters'
              textContentType='addressState'
              blurOnSubmit={false}
              containerStyle={styles.xSmallInput}
              inputContainerStyle={styles.inputContainer} />
          </View>
          <View style={styles.textRow}>
            <Text style={styles.label}>Zip</Text>
            <Input
              onChangeText={this.props.formik.handleChange('designZip')}
              onBlur={this.props.formik.handleBlur('designZip')}
              keyboardType='number-pad'
              textContentType='postalCode'
              blurOnSubmit={false}
              containerStyle={styles.smallInput}
              inputContainerStyle={styles.inputContainer} />
          </View>

          <Divider />

          <Text style={styles.sectionHeaderText}>Miscellaneous</Text>
          <Input
            onChangeText={this.props.formik.handleChange('expMisc')}
            onBlur={this.props.formik.handleBlur('expMisc')}
            autoCapitalize='sentences'
            multiline={true}
            max={300}
            blurOnSubmit={false}
            containerStyle={{flex: 1, marginBottom: 30}}
            inputContainerStyle={styles.inputContainer} />

            <Toast ref='toast' position='bottom' style={styles.toast} />
        </View>
      </View>
    );
  }
}

export default ExpInfo;
