import React, { Component } from 'react';
import Firebase from '../../config/Firebase';

const saveFile = async(client, programName, csvString) => {
  // const fileName = client.clientName + '_' + programName + '.csv';
  // const filePath = FileSystem.documentDirectory + fileName;

  // await FileSystem.writeAsStringAsync(filePath, csvString);
  //
  // return filePath;
}

const jsonToCsv = async(client) => {
  let tables = [ ];
  let filesURI = [ ];

  // Retrieve Data from DB
  var tableRef = await Firebase.firestore( )
    .collection('clients')
    .doc(Firebase.auth( ).currentUser.uid)
    .collection('clients')
    .doc(client.uid)
    .collection('programs')
    .get( ).then(function(querySnap) {
      querySnap.forEach(function(doc) {
        tables.push(doc.data( ));
      })
    });

  // Convert JSON Data to CSV
  tables.map((program) => {
    let tables = '';

    Object.keys(program).map((table) => {
      let index = 1;
      let csv = '';
      let string = '';
      let header = Object.keys(program[table].rows[0]);
      let values = program[table].rows.map(row => Object.values(row).join(',')).join('\n');

      for (var i = 0; i < header.length; i++) {
        if (index == header.length) {
          string += header[i] + '\n';
        } else {
          string += header[i] + ',';
          index += 1;
        }
      }

      csv = string + values;
      console.log("CHECK " + csv)
    });
  });

  return filesURI;
}

export default jsonToCsv;
