// Library Imports
import React, { Component } from 'react';
import * as Mail from 'expo-mail-composer';

const sendEmail = ( ) => {
  Mail.composeAsync({
    recipients: ['nicks@mcsurfacesinc.com'],
    subject: 'TEST',
    body: '',
    isHtml: false
  })
}

export default sendEmail;
