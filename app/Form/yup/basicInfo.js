import * as yup from "yup";

const basicInfo = yup.object().shape({
    info: yup.object().shape({
        name: yup.string("Invalid Type.").required("Client Name is Required").trim( ),
        territory: yup.string("Invalid Type.").required("Client Territory is Required")
    }),
    addresses: yup.object().shape({
        Corporate: yup.object().shape({
            address1: yup.string("Invalid Type.").required("Street Address is Required.").trim( ),
            address2: yup.string("Invalid Type.").ensure( ).trim( ),
            city: yup.string("Invalid Type.").required("City Name is Required.").trim( ),
            state: yup.string("Invalid Type.").length(2).required("State is Required."),
            zip: yup.string("Invalid Type.").min(5, "Zip Code must be 5 digits.").required("Zip Code is Required.").matches(/[0-9]*/).trim( )
        })
    })
});

export default basicInfo;