import Firebase from '../../config/Firebase';
import * as FileSystem from 'expo-file-system';

const saveFile = async(client, programName, csvString) => {
  const fileName = client.clientName + '_' + programName + '.csv';
  const filePath = FileSystem.documentDirectory + fileName;
  let string = '';
  let index = 0;

  csvString.map((values) => {
    string += '\n' + values;
  });
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
    let programs = [ ];
    let programName = '';

    Object.keys(program).map((table) => {
      programName = program[table].program;
      let header = program[table].columnHeaders.toString( );
      let values = '';

      program[table].rows.map((row) => {
        let tempArr = [ ];
        Object.values(row).map((val) => {
          if (val === '' || typeof(val) === undefined) {
            tempArr.push("''");
          } else {
            tempArr.push(val);
          }
        });

        let reorderedArr = [ ];
        if (program[table].program === 'Tile') {
          if (tempArr.length === 6) {
            reorderedArr.push(tempArr[1]);
            reorderedArr.push(tempArr[0]);
            reorderedArr.push(tempArr[4]);
            reorderedArr.push(tempArr[2]);
            reorderedArr.push(tempArr[3]);
            reorderedArr.push(tempArr[5]);
          } else if (tempArr.length === 3) {
            reorderedArr.push(tempArr[2]);
            reorderedArr.push(tempArr[0]);
            reorderedArr.push(tempArr[1]);
          } else {
            reorderedArr = tempArr;
          }
        }

        if (program[table].program === 'Wood') {
          if (tempArr.length === 8) {
            reorderedArr.push(tempArr[5]);
            reorderedArr.push(tempArr[4]);
            reorderedArr.push(tempArr[6]);
            reorderedArr.push(tempArr[1]);
            reorderedArr.push(tempArr[7]);
            reorderedArr.push(tempArr[3]);
            reorderedArr.push(tempArr[2]);
            reorderedArr.push(tempArr[0]);
            reorderedArr.push(tempArr[4]);
          } else {
            reorderedArr = tempArr;
          }
        }

        if (program[table].program === 'Carpet') {
          if (tempArr.length === 3) {
            reorderedArr.push(tempArr[1]);
            reorderedArr.push(tempArr[2]);
            reorderedArr.push(tempArr[0]);
          } else {
            reorderedArr = tempArr;
          }
        }

        programs.push(header);
        programs.push(reorderedArr.toString( ) + '\n');
      });
    });
      saveFile(client, programName, programs);
  });


  return filesURI;
}

export default jsonToCsv;
