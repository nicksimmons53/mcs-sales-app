import Firebase from '../../config/Firebase';

// Inactivate the Currently Selected Client
const deleteClient = async(client, loading, modal, isPortrait) => {
  let programs = [ ];

  // New Client Location (inactivate clients)
  const clientRef = Firebase.firestore( )
    .collection('inactiveClients')
    .doc(Firebase.auth( ).currentUser.uid)
    .collection('clients')
    .doc(client.uid);

  clientRef.set(client);

  // Client Programs
  const programRef = await Firebase.firestore( )
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

export {
  deleteClient,
}
