import * as yup from 'yup';

const advancedInfo = yup.object( ).shape({
  accounting_details: yup.object( ).shape({
    invoiceEmailAddress: yup.string( ).email("Invoice Email Contact is formatted incorrectly.").trim( ).nullable( ),
    paymentPortal: yup.boolean( ).nullable( ),
    paymentURL: yup
      .string( )
      .when("paymentPortal", {
        is: true,
        then: yup.string( ).required("Payment Portal URL is required when Payment Portal is selected.").trim( ),
        otherwise: yup.string( ).nullable( ),
      })
      .trim( ),
    contactPhone: yup.string( ).matches(/[0-9]{3}-[0-9]{3}-[0-9]{4}|^(?![\s\S])/, "Accounting Contact Phone Number should be in 999-999-9999 format.").trim( ).nullable( ),
    contactEmail: yup.string( ).email("Accounting Contact Email is formatted incorrectly.").trim( ).nullable( ),

  }),
  expediting_details: yup.object( ).shape({
    vendorPortal: yup.boolean( ).nullable( ),
    vendorPortalURL: yup
      .string( )
      .when("vendorPortal", {
        is: true,
        then: yup.string( ).required("Vendor Portal URL is required when Vendor Portal is selected.").trim( ),
        otherwise: yup.string( ).nullable( ),
      })
      .trim( ),
    portalAccountCreated: yup.boolean( ).nullable( ),
    portalUsername: yup
      .string( )
      .when("portalAccountCreated", {
        is: true,
        then: yup.string( ).required("Vendor Portal Username is required when Vendor Portal is selected.").trim( ),
        otherwise: yup.string( ).nullable( ),
      }),
    portalPassword: yup
      .string( )
      .when("portalAccountCreated", {
        is: true,
        then: yup.string( ).required("Vendor Portal Password is required when Vendor Portal is selected.").trim( ),
        otherwise: yup.string( ).nullable( ),
      }),
    estimatedHomes: yup.number( ).min(1, "At least one home must be specified.").nullable( )
  }),
  programs: yup.object( ).shape({

  })
});

export default advancedInfo;