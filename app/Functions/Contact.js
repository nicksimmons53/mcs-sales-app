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

// Update Client

// Retrieve Client

// Delete Client

export {
  saveInfo,
}