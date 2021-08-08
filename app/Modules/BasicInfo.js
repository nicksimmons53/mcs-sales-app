// Library Imports
import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import { Divider } from 'react-native-elements';
import { TinyInputRow, MediumInputRow, SmallInputRow } from '../Components/InputRow';
import { styles } from './Styles/Form.style';

// Class Component that will display Client Basic Info
function BasicInfo(props) {
  return (
    <View style={styles.background}>
      <View style={styles.form}>
        <MediumInputRow
          fieldName="clnnme"
          label="Client Name"
          tooltip={false}
          formik={props.formik}/>
      </View>

      <View style={styles.form}>
        <Text style={styles.sectionHeaderText}>Corporate Address</Text>
        <Divider/>

        <MediumInputRow
          fieldName="addrs1"
          label="Street Address"
          tooltip={false}
          formik={props.formik}/>

        <MediumInputRow
          fieldName="addrs2"
          label="Street Address 2"
          tooltip={false}
          formik={props.formik}/>

        <MediumInputRow
          fieldName="ctynme"
          label="City"
          tooltip={false}
          formik={props.formik}/>
        
        <TinyInputRow
          fieldName="state_"
          label="State"
          tooltip={false}
          formik={props.formik}/>

        <SmallInputRow
          fieldName="zipcde"
          label="Zip"
          tooltip={false}
          formik={props.formik}/>
      </View>

      <View style={styles.form}>
        <Text style={styles.sectionHeaderText}>Billing Address</Text>
        <Divider/>

        <MediumInputRow
          fieldName="bilad1"
          label="Street Address"
          tooltip={false}
          formik={props.formik}/>

        <MediumInputRow
          fieldName="bilad2"
          label="Street Address 2"
          tooltip={false}
          formik={props.formik}/>

        <MediumInputRow
          fieldName="bilcty"
          label="City"
          tooltip={false}
          formik={props.formik}/>

        <TinyInputRow
          fieldName="bilste"
          label="State"
          tooltip={false}
          formik={props.formik}/>

        <SmallInputRow
          fieldName="bilzip"
          label="Zip"
          tooltip={false}
          formik={props.formik}/>
      </View>

      <View style={styles.form}>
        <Text style={styles.sectionHeaderText}>Shipping Address</Text>
        <Divider/>

        <MediumInputRow
          fieldName="shpad1"
          label="Street Address"
          tooltip={false}
          formik={props.formik}/>

        <MediumInputRow
          fieldName="shpad2"
          label="Street Address 2"
          tooltip={false}
          formik={props.formik}/>

        <MediumInputRow
          fieldName="shpcty"
          label="City"
          tooltip={false}
          formik={props.formik}/>
        
        <TinyInputRow
          fieldName="shpste"
          label="State"
          tooltip={false}
          formik={props.formik}/>

        <SmallInputRow
          fieldName="shpzip"
          label="Zip"
          tooltip={false}
          formik={props.formik}/>
      </View>
    </View>
  );
}

// Props Valdidation
BasicInfo.propTypes = {
  formik: PropTypes.object
}

export default BasicInfo;
