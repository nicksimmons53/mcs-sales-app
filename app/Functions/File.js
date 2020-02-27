import Firebase from '../../config/Firebase';

// Save File
const saveData = (blob, uid) => {
  let user = Firebase.auth( ).currentUser.uid;
  let filePath = user + '/' + uid + '/' + blob._data.name;

  return new Promise((resolve, reject) => {
    var storageRef = Firebase.storage( ).ref( );

    storageRef.child(filePath).put(blob, {
      contentType: blob._data.type
    }).then((snapshot) => {
      blob.close( );

      resolve(snapshot);
    }).catch((error) => {
      reject(error);
    });
  });
}

// Retrieve File
const retrieveData = async(fileName, client) => {
  let fileURL = '';
  const user = Firebase.auth( ).currentUser;
  const filePath = user.uid + '/' + client.uid + '/' + fileName;

  const storageRef = Firebase.storage( ).ref( );
  const fileRef = storageRef.child(filePath);

  await fileRef.getDownloadURL( ).then((url) => {
    let promise = fetch(url);
    return promise;
  }).then((result) => {
    fileURL = result.url;
  }).catch((error) => {
    console.log(error);
  });

  return fileURL;
}

// Delete File
const deleteData = async(fileName, client) => {
  const user = Firebase.auth( ).currentUser;
  const filePath = user.uid + '/' + client.uid + '/' + fileName;
  const storageRef = Firebase.storage( ).ref(filePath);

  await storageRef.delete( );
}

// Delete All Files
const deleteAll = async(client) => {
  const folderPath = Firebase.auth( ).currentUser.uid + '/' + client.uid + '/';
  const storageRef = Firebase.storage( ).ref( );

  const folderRef = storageRef.child(folderPath);
  await folderRef.listAll( ).then((res) => {
    res.items.forEach((itemRef) => {
      itemRef.delete( );
    });
  }).catch((err) => {
    console.error(err);
  });
}

// Retrieve All Files
const retrieveAll = async(client) => {
  const folderPath = Firebase.auth( ).currentUser.uid + '/' + client.uid + '/';
  const storageRef = Firebase.storage( ).ref( );
  let files = [ ];

  const folderRef = storageRef.child(folderPath);
  await folderRef.listAll( ).then((res) => {
    res.items.forEach((itemRef) => {
      let fileObj = { };

      fileObj['name'] = itemRef.name;
      files.push(fileObj);
    });
  }).catch((err) => {
    console.error(err);

  });

  return files;
}

// Convert File
const uriToBlob = (uri) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest( );

    xhr.onload = function( ) {
      resolve(xhr.response);
    };

    xhr.onerror = function( ) {
      reject(new Error('uriToBlob failed'));
    };

    xhr.responseType = 'blob';

    xhr.open('GET', uri, true);

    xhr.send(null);
  });
}

export {
  saveData,
  deleteData,
  deleteAll,
  retrieveData,
  retrieveAll,
  uriToBlob
};
