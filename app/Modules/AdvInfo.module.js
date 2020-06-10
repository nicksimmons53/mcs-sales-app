// Library Imports
import React, { Component } from 'react';
import { View, Text, Switch } from 'react-native';
import PropTypes from 'prop-types';
import { Divider, Input, Button } from 'react-native-elements';
import * as DocumentPicker from 'expo-document-picker';
import Toast from 'react-native-easy-toast';
import { styles, colors } from './Styles/Form.style';

// Class Component for Client Accounting Info
class AcctInfo extends Component {
  filePicker = async( ) => {
    await DocumentPicker.getDocumentAsync({
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
  }

  render( ) {
    let values = this.props.formik.values;
    console.log(values.exmnum)
    return (
      <View style={styles.background}>
        <View style={styles.form}>
          <Text style={styles.headerText}>Accounting Information</Text>
          <Divider />

          <View style={styles.textRow}>
            <Text style={styles.label}>Tax ID #</Text>
            <Input
              onChangeText={this.props.formik.handleChange('exmnum')}
              onBlur={this.props.formik.handleBlur('exmnum')}
              value={values.exmnum}
              keyboardType='number-pad'
              textContentType='none'
              blurOnSubmit={false}
              containerStyle={styles.mediumInput}
              inputContainerStyle={styles.inputContainer} />
          </View>

          <Divider />

          <Text style={styles.sectionHeaderText}>Payment Information</Text>
          <View style={styles.textRow}>
            <Text style={styles.label}>Payment Day</Text>
            <Input
              onChangeText={this.props.formik.handleChange('pmtday')}
              onBlur={this.props.formik.handleBlur('pmtday')}
              keyboardType='default'
              textContentType='none'
              blurOnSubmit={false}
              containerStyle={styles.smallInput}
              inputContainerStyle={styles.inputContainer} />
          </View>
          <View style={styles.textRow}>
            <Text style={styles.label}>Payment Frequency</Text>
            <Input
              onChangeText={this.props.formik.handleChange('pmtfrq')}
              onBlur={this.props.formik.handleBlur('pmtfrq')}
              keyboardType='default'
              textContentType='none'
              blurOnSubmit={false}
              containerStyle={styles.smallInput}
              inputContainerStyle={styles.inputContainer} />
          </View>
          <View style={styles.textRow}>
            <Text style={styles.label}>Autopay</Text>
            <Switch
              onChange={( ) => this.props.formik.setFieldValue('atopay', !this.props.formik.values.atopay)}
              value={this.props.formik.values.atopay}
              style={styles.switch}
              trackColor={{true: colors.green}} />
          </View>
          <View style={styles.textRow}>
            <Text style={styles.label}>How to submit invoices?</Text>
            <Input
              onChangeText={this.props.formik.handleChange('invsbm')}
              onBlur={this.props.formik.handleBlur('invsbm')}
              keyboardType='default'
              textContentType='none'
              blurOnSubmit={false}
              containerStyle={styles.smallInput}
              inputContainerStyle={styles.inputContainer} />
          </View>
          <View style={styles.textRow}>
            <Text style={styles.label}>Invoice Submit Deadline</Text>
            <Input
              onChangeText={this.props.formik.handleChange('invddl')}
              onBlur={this.props.formik.handleBlur('invddl')}
              keyboardType='default'
              textContentType='none'
              blurOnSubmit={false}
              containerStyle={styles.smallInput}
              inputContainerStyle={styles.inputContainer} />
          </View>
          <View style={styles.textRow}>
            <Text style={styles.label}>Payment Type</Text>
            <Input
              onChangeText={this.props.formik.handleChange('pmttyp')}
              onBlur={this.props.formik.handleBlur('pmttyp')}
              keyboardType='default'
              textContentType='none'
              blurOnSubmit={false}
              containerStyle={styles.smallInput}
              inputContainerStyle={styles.inputContainer} />
          </View>
          <View style={styles.textRow}>
            <Text style={styles.label}>Check Pick Up?</Text>
            <Switch
              onChange={( ) => this.props.formik.setFieldValue('chkpup', !this.props.formik.values.chkpup)}
              value={this.props.formik.values.chkpup}
              style={styles.switch}
              trackColor={{true: colors.green}} />
          </View>
          <View style={styles.textRow}>
            <Text style={styles.label}>Payment Portal</Text>
            <Input
              onChangeText={this.props.formik.handleChange('pmtprt')}
              onBlur={this.props.formik.handleBlur('pmtprt')}
              keyboardType='url'
              textContentType='URL'
              blurOnSubmit={false}
              containerStyle={styles.smallInput}
              inputContainerStyle={styles.inputContainer} />
          </View>

          <Divider />

          <Text style={styles.sectionHeaderText}>General Information</Text>
          <View style={styles.textRow}>
            <Text style={styles.label}>Vendor ID Required?</Text>
            <Switch
              onChange={( ) => this.props.formik.setFieldValue('vndreq', !this.props.formik.values.vndreq)}
              value={this.props.formik.values.vndreq}
              style={styles.switch}
              trackColor={{true: colors.green}} />
          </View>
          <View style={styles.textRow}>
            <Text style={styles.label}>{"PO's Required?"}</Text>
            <Switch
              onChange={( ) => this.props.formik.setFieldValue('posreq', !this.props.formik.values.posreq)}
              value={this.props.formik.values.posreq}
              style={styles.switch}
              trackColor={{true: colors.green}} />
          </View>
          <View style={styles.textRow}>
            <Text style={styles.label}>PO Correction Handling</Text>
            <Input
              onChangeText={this.props.formik.handleChange('pohndl')}
              onBlur={this.props.formik.handleBlur('pohndl')}
              keyboardType='url'
              textContentType='URL'
              blurOnSubmit={false}
              containerStyle={styles.smallInput}
              inputContainerStyle={styles.inputContainer} />
          </View>
          <View style={styles.textRow}>
            <Text style={styles.label}>Approvals Required?</Text>
            <Switch
              onChange={( ) => this.props.formik.setFieldValue('aprvls', !this.props.formik.values.aprvls)}
              value={this.props.formik.values.aprvls}
              style={styles.switch}
              trackColor={{true: colors.green}} />
          </View>
        </View>

        <View style={styles.form}>
          <Text style={styles.headerText}>Expediting Information</Text>

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
              onPress={( ) => this.filePicker( )} />
          </View>

          <View style={styles.textRow}>
            <Text style={styles.label}>Vendor Portal</Text>
            <Input
              onChangeText={this.props.formik.handleChange('vndprt')}
              onBlur={this.props.formik.handleBlur('vndprt')}
              blurOnSubmit={false}
              containerStyle={styles.mediumInput}
              inputContainerStyle={styles.inputContainer} />
          </View>

          <View style={styles.textRow}>
            <Text style={styles.label}>Waste Factor</Text>
            <Input
              onChangeText={this.props.formik.handleChange('wstfct')}
              onBlur={this.props.formik.handleBlur('wstfct')}
              blurOnSubmit={false}
              containerStyle={styles.smallInput}
              inputContainerStyle={styles.inputContainer} />
          </View>

          <Toast ref='toast' position='bottom' style={styles.toast} />
        </View>
      </View>
    );
  }
}

// Props Valdidation
AcctInfo.propTypes = {
  formik: PropTypes.object
}

export default AcctInfo;
