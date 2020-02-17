import Firebase from '../../config/Firebase';

// Delete Client Info
const deleteInfo = async(client, loading, modal) => {
  // Save to New Location
  let clientRef = saveInfo(client, 'inactiveClients');

  // Client Programs
  // SAVE TO DIFFERENT FILE
  await Firebase.firestore( )
    .collection('clients')
    .doc(Firebase.auth( ).currentUser.uid)
    .collection('clients')
    .doc(client.uid)
    .collection('programs')
    .get( )
    .then((snapshot) => {
      snapshot.docs.forEach(function(doc) {
        clientRef.collection('programs').doc(doc.data( )[0].program).set(doc.data( ));
        doc.ref.delete( );
      });
    }).catch((reason) => console.log(reason.isCanceled));

  // DELETE CLIENT
  Firebase.firestore( )
    .collection('clients')
    .doc(Firebase.auth( ).currentUser.uid)
    .collection('clients')
    .doc(client.uid)
    .delete( );

  // MOVE TO PARENT FOLDER
  modal( );
  loading( );
}

// Retrieves Client Info
const retrieveInfo = async(uid) => {
  let client = null;

  await Firebase.firestore( )
    .collection('clients')
    .doc(Firebase.auth( ).currentUser.uid)
    .collection('clients')
    .doc(uid)
    .get( )
    .then(function(doc) {
      client = doc.data( );
    }).catch((reason) => console.log(reason.isCanceled));

  return client;
}

// Save Client Info
const saveInfo = async(values, collection) => {
  const clientRef = Firebase.firestore( )
    .collection(collection)
    .doc(Firebase.auth( ).currentUser.uid)
    .collection('clients')
    .doc( );
  values.uid = clientRef.id;

  await clientRef.set(values);

  return clientRef;
}

// Save Client Info
const saveAdvancedInfo = async(values, collection, client) => {
  const clientRef = Firebase.firestore( )
    .collection(collection)
    .doc(Firebase.auth( ).currentUser.uid)
    .collection('clients')
    .doc(client.uid);
  values.uid = clientRef.id;

  await clientRef.update(values);

  return clientRef;
}

// Update Client Info
const updateInfo = async(values, collection, client) => {
  console.log(values);

  const clientRef = Firebase.firestore( )
    .collection(collection)
    .doc(Firebase.auth( ).currentUser.uid)
    .collection('clients')
    .doc(client.uid);

  await clientRef.update(values);
}

// Retrieve All Clients
const retrieveAll = async(collection) => {
  let clients = [ ];

  await Firebase.firestore( )
    .collection(collection)
    .doc(Firebase.auth( ).currentUser.uid)
    .collection('clients')
    .get( ).then(function(querySnap) {
      querySnap.forEach(function(doc) {
        clients.push(doc.data( ));
      });
    }).catch((reason) => console.log(reason.isCanceled));

  return clients;
}

//
// Export All Client Functions
export {
  deleteInfo,
  retrieveInfo,
  saveInfo,
  saveAdvancedInfo,
  updateInfo,
  retrieveAll
};
