import * as yup from "yup";

const address = yup.object().shape({
    clnnme: yup.string("Invalid Type.").required("Client Name is Required").trim( ),
    addrs1: yup.string("Invalid Type.").required("Street Address is Required.").trim( ),
    addrs2: yup.string("Invalid Type.").ensure( ).trim( ),
    ctynme: yup.string("Invalid Type.").required("City Name is Required.").trim( ),
    state_: yup.string("Invalid Type.").length(2).required("State is Required."),
    zipcde: yup.string("Invalid Type.").min(5, "Zip Code must be 5 digits.").required("Zip Code is Required.").trim( )
});

export default address;