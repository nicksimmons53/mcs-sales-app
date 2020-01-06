import React, { Component } from 'react';
import Firebase from '../../config/Firebase';

const jsonToCsv = async(client) => {
  let tables = [ ];

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
  tables.map((program, key) => {
    Object.keys(program).map((table) => {
      let rows = program[table].rows;
      const replacer = (key, value) => value === null ? '' : value;
      let csvTable = [ ];
      let csvHeader = Object.keys(rows[0]);
      console.log(csvHeader);

      rows.map((row, key) => {
        console.log(row);
      });
    });
  });

  return tables;
}

export default jsonToCsv;
