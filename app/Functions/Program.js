import Firebase from '../../config/Firebase';

// Save Table Data
const saveTable = async(values, docName, collection, client) => {
  const clientRef = Firebase.firestore( )
    .collection('clients')
    .doc(Firebase.auth( ).currentUser.uid)
    .collection('clients')
    .doc(client.uid)
    .collection('programs')
    .doc(docName)

  await clientRef.set(values[docName], { merge: true });
}

// Retrieve Table Data
const retrieveTable = async() => {

}

// Update Table Data
const updateTable = async() => {

}

// Delete Table Data
const deleteTable = async() => {
  
}

export var Program = {
  saveTable,
  retrieveTable,
  updateTable,
  deleteTable
};
