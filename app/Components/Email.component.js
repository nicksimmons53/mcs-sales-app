// Library Imports
import React, { Component } from 'react';
import * as Mail from 'expo-mail-composer';
import jsonToCsv from './JSONtoCSV.component';

const sendEmail = (client, forApproval) => {
  let data = [ ];
  if (forApproval === true)
    data = jsonToCsv(client);

  // data.then(function(result) {
  //   console.log(result);
  // });

  Mail.composeAsync({
    recipients: ['nicks@mcsurfacesinc.com'],
    subject: 'TEST',
    body: '',
    isHtml: false
  })
}

export default sendEmail;
