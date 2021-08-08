import React from 'react';
import { StyleSheet, View } from 'react-native';
import { 
    Overlay, 
    Text, 
    Input, 
    Button,
    Divider,
    Icon
} from 'react-native-elements';
import { API_URL } from 'react-native-dotenv';
import axios from 'axios';
import { Formik } from 'formik';
import colors from '../Library/Colors';

const Email = ({...props}) => {
    let email = {
        to: "",
        from: "",
        subject: "",
        message: ""
    }

    if (props.to !== "" || props.to !== undefined) 
        email.to = props.to;
    
    if (props.client !== null || props.client !== undefined) {
        email.message += `Client Name: ${props.client.clnnme}\n`;
        email.message += `Client Address: ${props.client.addrs1}, ${props.client.addrs2}, ${props.client.ctynme}, ${props.client.state_}, ${props.client.zipcde}\n\n`;
    }

    email.from = props.user.e_mail;
    email.subject = props.subject;

    sendEmail = (values, actions) => {
        axios.post(`${API_URL}/send-email`, {
                to: values.to, 
                from: values.from,
                subject: values.subject,
                client: values.client,
                message: values.message
            })
            .then((response) => {
                console.log(response.status);
                email.message = "";
                email.subject = "";
                email.to = "";
                email.from = "";

                props.toggleEmailOverlay( );
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <Overlay 
            isVisible={props.isVisible} 
            onBackdropPress={props.toggleEmailOverlay} 
            width="85%"
            height="auto">
            <Formik
                initialValues={{...email}}
                onSubmit={(values, actions) => sendEmail(values, actions)}>  
                {formikProps => (
                    <>
                    <View style={styles.headerRow}>
                        <Text style={styles.headerText}>New Email</Text>
                        <Icon
                            name="times"
                            type="font-awesome"
                            size={36}
                            color={colors.red}
                            iconStyle={styles.icon}
                            onPress={props.toggleEmailOverlay}/>
                    </View>

                    <Divider/>

                    <View style={styles.form}>
                        <View style={styles.textRow}>
                            <Text style={styles.label}>To:</Text>
                            <Input
                                onChangeText={formikProps.handleChange('to')}
                                onBlur={formikProps.handleBlur('to')}
                                value={formikProps.values.to}
                                defaultValue={formikProps.values.to}
                                autoCapitalize="none"
                                blurOnSubmit={false}
                                inputStyle={styles.userInput}
                                containerStyle={styles.mediumInput}
                                inputContainerStyle={styles.inputContainer}/>
                        </View>
                        <View style={styles.textRow}>
                            <Text style={styles.label}>From:</Text>
                            <Input
                                onChangeText={formikProps.handleChange('from')}
                                onBlur={formikProps.handleBlur('from')}
                                value={formikProps.values.from}
                                defaultValue={props.user.e_mail}
                                autoCapitalize="none"
                                blurOnSubmit={false}
                                inputStyle={styles.userInput}
                                containerStyle={styles.mediumInput}
                                inputContainerStyle={styles.inputContainer}/>
                        </View>
                        <View style={styles.textRow}>
                            <Text style={styles.label}>Subject:</Text>
                            <Input
                                onChangeText={formikProps.handleChange('subject')}
                                onBlur={formikProps.handleBlur('subject')}
                                value={formikProps.values.subject}
                                autoCapitalize="none"
                                blurOnSubmit={false}
                                inputStyle={styles.userInput}
                                containerStyle={styles.mediumInput}
                                inputContainerStyle={styles.inputContainer}/>
                        </View>
                        <View style={styles.textRow}>
                            <Text style={styles.label}>Message:</Text>
                            <Input
                                onChangeText={formikProps.handleChange('message')}
                                onBlur={formikProps.handleBlur('message')}
                                value={formikProps.values.message}
                                multiline
                                numberOfLines={10}
                                style={styles.messageInputContainer}
                                containerStyle={styles.inputContainer}
                                inputContainerStyle={styles.messageInput}/>
                        </View>
                    </View>

                    <Divider/>

                    <View style={styles.buttonView}>
                        <Button
                            title="Send Email"
                            containerStyle={styles.submitButtonContainer}
                            buttonStyle={styles.submitButton}
                            onPress={formikProps.handleSubmit}/>
                    </View>
                    </>
                )}
            </Formik>
        </Overlay>
    );
}

const styles = StyleSheet.create({
    // Text Input
    textRow: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 10,
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    divider: {
        width: '100%'
    },
    // Form
    form: {
        width: '95%',
        margin: 10,
        borderRadius: 3,
        backgroundColor: colors.white,
    },
    headerText: {
        fontFamily: 'OpenSans',
        fontSize: 20,
        padding: 10,
        color: colors.background,
    },
    inputContainer: {
        flex: 3,
        paddingLeft: 5,
        borderWidth: 1,
        borderRadius: 3,
        borderColor: colors.light_grey,
    },
    messageInput: {
        borderBottomWidth: 0
    },
    messageInputContainer: {
        width: '65%',
        height: 300,
        paddingLeft: 5,
        borderWidth: 1,
        borderRadius: 3,
        borderColor: colors.light_grey,
        textAlignVertical: "center"
    },
    label: {
        fontFamily: 'OpenSans',
        flex: 1,
        fontSize: 16,
        paddingRight: 30,
        color: colors.background
    },
    mediumInput: {
        width: '65%',
        height: 40
    },
    buttonView: {
        alignItems: 'center',
    },
    attachFileButtonContainer: {
        width: 200,
        margin: 10
    },
    attachFileButton: {
        backgroundColor: colors.black,
    },
    submitButtonContainer: {
        width: '50%',
        margin: 20
    },
    submitButton: {
        backgroundColor: colors.green
    },
    icon: {
        marginRight: 15
    }
});

export default Email;