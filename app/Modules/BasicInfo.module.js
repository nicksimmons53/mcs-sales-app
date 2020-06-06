// Library Imports
import React, { Component } from 'react';
import { View, Text, Switch } from 'react-native';
import PropTypes from 'prop-types';
import { Input } from 'react-native-elements';
import { styles } from './Styles/Form.style';

// Class Component that will display Client Basic Info
class BasicInfo extends Component {
  render( ) {
    return (
      <View style={styles.background}>

        <View style={styles.form}>
          <View style={styles.textRow}>
            <Text style={styles.label}>Client Name</Text>
            <Input
              onChangeText={this.props.formik.handleChange('clnnme')}
              onBlur={this.props.formik.handleBlur('clnnme')}
              autoCapitalize='words'
              textContentType='organizationName'
              blurOnSubmit={false}
              inputStyle={styles.userInput}
              containerStyle={styles.mediumInput}
              inputContainerStyle={styles.inputContainer} />
          </View>
        </View>

        <View style={styles.form}>
          <Text style={styles.sectionHeaderText}>Corporate Address</Text>
          <View style={styles.textRow}>
            <Text style={styles.label}>Street Address</Text>
            <Input
              onChangeText={this.props.formik.handleChange('addrs1')}
              onBlur={this.props.formik.handleBlur('addrs1')}
              autoCapitalize='words'
              textContentType='streetAddressLine1'
              blurOnSubmit={false}
              inputStyle={styles.userInput}
              containerStyle={styles.mediumInput}
              inputContainerStyle={styles.inputContainer} />
          </View>

          <View style={styles.textRow}>
            <Text style={styles.label}>Street Address 2</Text>
            <Input
              onChangeText={this.props.formik.handleChange('addrs2')}
              onBlur={this.props.formik.handleBlur('addrs2')}
              autoCapitalize='words'
              textContentType='streetAddressLine2'
              blurOnSubmit={false}
              inputStyle={styles.userInput}
              containerStyle={styles.mediumInput}
              inputContainerStyle={styles.inputContainer} />
          </View>

          <View style={styles.textRow}>
            <Text style={styles.label}>City</Text>
            <Input
              onChangeText={this.props.formik.handleChange('ctynme')}
              onBlur={this.props.formik.handleBlur('ctynme')}
              autoCapitalize='words'
              textContentType='addressCity'
              blurOnSubmit={false}
              inputStyle={styles.userInput}
              containerStyle={styles.mediumInput}
              inputContainerStyle={styles.inputContainer} />
          </View>
          <View style={styles.textRow}>
            <Text style={styles.label}>State</Text>
            <Input
              onChangeText={this.props.formik.handleChange('state_')}
              onBlur={this.props.formik.handleBlur('state_')}
              autoCapitalize='characters'
              textContentType='addressState'
              blurOnSubmit={false}
              inputStyle={styles.userInput}
              containerStyle={styles.xSmallInput}
              inputContainerStyle={styles.inputContainer} />
          </View>
          <View style={styles.textRow}>
            <Text style={styles.label}>Zip</Text>
            <Input
              onChangeText={this.props.formik.handleChange('zipcde')}
              onBlur={this.props.formik.handleBlur('zipcde')}
              keyboardType='number-pad'
              textContentType='postalCode'
              blurOnSubmit={false}
              inputStyle={styles.userInput}
              containerStyle={styles.smallInput}
              inputContainerStyle={styles.inputContainer} />
          </View>
        </View>

        <View style={styles.form}>
          <Text style={styles.sectionHeaderText}>Billing Address</Text>
          <View style={styles.textRow}>
            <Text style={styles.label}>Street Address</Text>
            <Input
              onChangeText={this.props.formik.handleChange('bilad1')}
              onBlur={this.props.formik.handleBlur('bilad1')}
              autoCapitalize='words'
              textContentType='streetAddressLine1'
              blurOnSubmit={false}
              inputStyle={styles.userInput}
              containerStyle={styles.mediumInput}
              inputContainerStyle={styles.inputContainer} />
          </View>
          <View style={styles.textRow}>
            <Text style={styles.label}>Street Address 2</Text>
            <Input
              onChangeText={this.props.formik.handleChange('bilad2')}
              onBlur={this.props.formik.handleBlur('bilad2')}
              autoCapitalize='words'
              textContentType='streetAddressLine1'
              blurOnSubmit={false}
              inputStyle={styles.userInput}
              containerStyle={styles.mediumInput}
              inputContainerStyle={styles.inputContainer} />
          </View>
          <View style={styles.textRow}>
            <Text style={styles.label}>City</Text>
            <Input
              onChangeText={this.props.formik.handleChange('bilcty')}
              onBlur={this.props.formik.handleBlur('bilcty')}
              autoCapitalize='words'
              textContentType='addressCity'
              blurOnSubmit={false}
              inputStyle={styles.userInput}
              containerStyle={styles.mediumInput}
              inputContainerStyle={styles.inputContainer} />
          </View>
          <View style={styles.textRow}>
            <Text style={styles.label}>State</Text>
            <Input
              onChangeText={this.props.formik.handleChange('bilste')}
              onBlur={this.props.formik.handleBlur('bilste')}
              autoCapitalize='characters'
              textContentType='addressState'
              blurOnSubmit={false}
              inputStyle={styles.userInput}
              containerStyle={styles.xSmallInput}
              inputContainerStyle={styles.inputContainer} />
          </View>
          <View style={styles.textRow}>
            <Text style={styles.label}>Zip</Text>
            <Input
              onChangeText={this.props.formik.handleChange('bilzip')}
              onBlur={this.props.formik.handleBlur('bilzip')}
              keyboardType='number-pad'
              textContentType='postalCode'
              blurOnSubmit={false}
              inputStyle={styles.userInput}
              containerStyle={styles.smallInput}
              inputContainerStyle={styles.inputContainer} />
          </View>
        </View>

        <View style={styles.form}>
          <Text style={styles.sectionHeaderText}>Shipping Address</Text>
          <View style={styles.textRow}>
            <Text style={styles.label}>Street Address</Text>
            <Input
              onChangeText={this.props.formik.handleChange('shpad1')}
              onBlur={this.props.formik.handleBlur('shpad1')}
              autoCapitalize='words'
              textContentType='streetAddressLine1'
              blurOnSubmit={false}
              inputStyle={styles.userInput}
              containerStyle={styles.mediumInput}
              inputContainerStyle={styles.inputContainer} />
          </View>
          <View style={styles.textRow}>
            <Text style={styles.label}>Street Address 2</Text>
            <Input
              onChangeText={this.props.formik.handleChange('shpad2')}
              onBlur={this.props.formik.handleBlur('shpad2')}
              autoCapitalize='words'
              textContentType='streetAddressLine1'
              blurOnSubmit={false}
              inputStyle={styles.userInput}
              containerStyle={styles.mediumInput}
              inputContainerStyle={styles.inputContainer} />
          </View>
          <View style={styles.textRow}>
            <Text style={styles.label}>City</Text>
            <Input
              onChangeText={this.props.formik.handleChange('shpcty')}
              onBlur={this.props.formik.handleBlur('shpcty')}
              autoCapitalize='words'
              textContentType='addressCity'
              blurOnSubmit={false}
              inputStyle={styles.userInput}
              containerStyle={styles.mediumInput}
              inputContainerStyle={styles.inputContainer} />
          </View>
          <View style={styles.textRow}>
            <Text style={styles.label}>State</Text>
            <Input
              onChangeText={this.props.formik.handleChange('shpste')}
              onBlur={this.props.formik.handleBlur('shpste')}
              autoCapitalize='characters'
              textContentType='addressState'
              blurOnSubmit={false}
              inputStyle={styles.userInput}
              containerStyle={styles.xSmallInput}
              inputContainerStyle={styles.inputContainer} />
          </View>
          <View style={styles.textRow}>
            <Text style={styles.label}>Zip</Text>
            <Input
              onChangeText={this.props.formik.handleChange('shpzip')}
              onBlur={this.props.formik.handleBlur('shpzip')}
              keyboardType='number-pad'
              textContentType='postalCode'
              blurOnSubmit={false}
              inputStyle={styles.userInput}
              containerStyle={styles.smallInput}
              inputContainerStyle={styles.inputContainer} />
          </View>
        </View>
      </View>
    );
  }
}

// Props Valdidation
BasicInfo.propTypes = {
  formik: PropTypes.object
}

export default BasicInfo;
