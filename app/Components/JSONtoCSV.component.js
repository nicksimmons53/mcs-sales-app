import React, { Component } from 'react';
import * as FileSystem from 'expo-file-system';
import Firebase from '../../config/Firebase';

const saveFile = async(client, programName, csvString) => {
  let fileName = client.clientName + '_' + programName + '.csv';
  console.log(fileName);
  let fileURI = FileSystem.documentDirectory;
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
    let csvTables = [ ];
    let programName = '';
    Object.keys(program).map((table) => {
      let rows = program[table].rows;
      let csv = Object.keys(rows[0]).join(',') + '\r\n';

      rows.map((row) => {
        let rowValues = Object.values(row);
        let csvRow = rowValues.join(',');
        csv = csv.concat(csvRow + '\r\n');
      });

      csv.concat('\r\n');
      saveFile(client, program[table].program, csv);
    });
  });

  return filesURI;
}

export default jsonToCsv;
