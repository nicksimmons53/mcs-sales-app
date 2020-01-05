// Library Imports
import * as Yup from 'yup';

// Login Schema
export const LoginSchema = Yup.object( ).shape({
  username: Yup.string( )
    .label('Username')
    .email('Username is Required')
    .required('Username is Required'),
  password: Yup.string( )
    .label('Password')
    .required('Password is Required'),
});

// Create Client Schema
export const CreateClientSchema = Yup.object( ).shape({
  contactName: Yup.string( )
    .required( )
    .trim( ),
  contactTitle:Yup.string( )
    .required( )
    .trim( ),
  contactPhone:Yup.string( )
    .required( )
    .trim( ),
  contactEmail:Yup.string( )
    .required( )
    .email( )
    .trim( ),
  corpAddr:Yup.string( )
    .required( )
    .trim( ),
  corpCity:Yup.string( )
    .required( )
    .trim( ),
  corpState:Yup.string( )
    .required( )
    .trim( ),
  corpZip:Yup.string( )
    .required( )
    .trim( ),
  billingAddr:Yup.string( )
    .required( )
    .trim( ),
  billingCity:Yup.string( )
    .required( )
    .trim( ),
  billingState:Yup.string( )
    .required( )
    .trim( ),
  billingZip:Yup.string( )
    .required( )
    .trim( ),
  shippingAddr:Yup.string( )
    .required( )
    .trim( ),
  shippingCity:Yup.string( )
    .required( )
    .trim( ),
  shippingState:Yup.string( )
    .required( )
    .trim( ),
  shippingZip:Yup.string( )
    .required( )
    .trim( ),
});

// Continue Client Schema 
export const ContinueClientSchema = Yup.object( ).shape({
  acctContactName: Yup.string( )
    .trim( ),
  acctContactTitle: Yup.string( )
    .trim( ),
  acctContactPhone: Yup.string( )
    .trim( ),
  acctContactEmail: Yup.string( )
    .email( )
    .trim( ),
  taxID: Yup.string( )
    .trim( ),
  paymentDay: Yup.string( )
    .trim( ),
  paymentFreq: Yup.string( )
    .trim( ),
  invSubmitDeadline: Yup.string( )
    .trim( ),
  paymentType: Yup.string( )
    .trim( ),
  paymentPortal: Yup.string( )
    .url( )
    .trim( ),
  vendorID: Yup.string( )
    .trim( ),
  expContactName: Yup.string( )
  .trim( ),
  expContactTitle: Yup.string( )
  .trim( ),
  expContactPhone: Yup.string( )
  .trim( ),
  expContactEmail: Yup.string( )
  .email( )
  .trim( ),
  modelStreetAddr: Yup.string( )
  .trim( ),
  modelCity: Yup.string( )
  .trim( ),
  modelState: Yup.string( )
  .trim( ),
  modelZip: Yup.string( )
  .trim( ),
  designStreetAddr: Yup.string( )
  .trim( ),
  designCity: Yup.string( )
  .trim( ),
  designState: Yup.string( )
  .trim( ),
  designsZip: Yup.string( )
  .trim( ),
  expMisc: Yup.string( )
  .trim( ),
});