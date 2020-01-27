// Library Imports
import * as Mail from 'expo-mail-composer';
import jsonToCsv from './JSONtoCSV.component';

const sendEmail = (client, forApproval) => {
  if (forApproval === true)
    jsonToCsv(client);

  Mail.composeAsync({
    recipients: ['nicks@mcsurfacesinc.com'],
    subject: 'TEST',
    body: '',
    isHtml: false
  });
}

export default sendEmail;
