import Firebase from '../../config/Firebase';

const retrieveAll = async( ) => {
  let users = [ ];

  await Firebase.firestore( )
    .collection('users')
    .get( )
    .then(function(querySnap) {
      querySnap.forEach(function(doc) {
        let userObj = { };
        userObj.uid = doc.id;
        userObj.userInfo = doc.data( );

        users.push(userObj);
      });
    })
    .catch((reason) => {
      console.log(reason.isCanceled)
    });

  return users;
}

export {
  retrieveAll
}