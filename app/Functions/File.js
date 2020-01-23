import Firebase from '../../config/Firebase';

// Save File
const saveData = (blob, client) => {
  let user = Firebase.auth( ).currentUser.uid;
  let filePath = user + '/' + client.uid + '/' + blob._data.name;

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

// Update File

// Delete File

// Retrieve All Files
const retrieveAll = (client) => {
  let files = [ ];

  const folderPath = Firebase.auth( ).currentUser.uid + '/' + client.uid + '/';
  const storageRef = Firebase.storage( ).ref( );

  const folderRef = storageRef.child(folderPath);
  folderRef.listAll( ).then((res) => {
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

export var File {
  saveData,
  retrieveData,
  retrieveAll,
  uriToBlob
};
