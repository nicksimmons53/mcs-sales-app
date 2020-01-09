import Firebase from '../../config/Firebase';

// Inactivate the Currently Selected Client
const deleteClient = async(client, loading, modal) => {
  // New Client Location (inactivate clients)
  const clientRef = Firebase.firestore( )
    .collection('inactiveClients')
    .doc(Firebase.auth( ).currentUser.uid)
    .collection('clients')
    .doc(client.uid);

  clientRef.set(client);

  // Client Programs
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
    });

  Firebase.firestore( )
    .collection('clients')
    .doc(Firebase.auth( ).currentUser.uid)
    .collection('clients')
    .doc(client.uid)
    .delete( );

  modal( );
  loading( );
}

// Retrieves Selected Client Info from the Firestore DB
const retrieveClientInfo = async(uid) => {
  let client = null;

  await Firebase.firestore( )
    .collection('clients')
    .doc(Firebase.auth( ).currentUser.uid)
    .collection('clients')
    .doc(uid)
    .get( )
    .then(function(doc) {
      client = doc.data( );
    });

  return client;
}

export {
  deleteClient,
  retrieveClientInfo,
}
