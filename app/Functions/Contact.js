// Library Imports
import Firebase from '../../config/Firebase';

// Save Contact
const saveInfo = async(contact, client) => {
  if (contact.title === '' || contact.name === '') 
    return;

  const contactRef = Firebase.firestore( )
    .collection('clients')
    .doc(Firebase.auth( ).currentUser.uid)
    .collection('clients')
    .doc(client.uid)
    .collection('contacts')
    .doc(contact.title)
  
  await contactRef.set(contact);
}

// Update Contact

// Retrieve all Contacts
const retrieveAll = async(client) => {
  let contacts = [ ];

  await Firebase.firestore( )
    .collection('clients')
    .doc(Firebase.auth( ).currentUser.uid)
    .collection('clients')
    .doc(client.uid)
    .collection('contacts')
    .get( ).then(function(querySnap) {
      querySnap.forEach(function(doc) {
        contacts.push(doc.data( ));
      });
    }).catch((reason) => console.log(reason.isCanceled));
    
  return contacts;
}

// Delete Contact
const deleteInfo = async(client, contact) => {
  console.log(client, contact)
  const contactRef = Firebase.firestore( )
    .collection('clients')
    .doc(Firebase.auth( ).currentUser.uid)
    .collection('clients')
    .doc(client.uid)
    .collection('contacts')
    .doc(contact.title)

  await contactRef.delete( );
}

export {
  saveInfo,
  retrieveAll,
  deleteInfo
}