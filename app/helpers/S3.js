import "react-native-get-random-values";
import "react-native-url-polyfill/auto";
import {
  S3Client,
  CreateBucketCommand,
  ListObjectsCommand,
  PutObjectCommand,
  DeleteObjectCommand,
  GetObjectCommand
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { CognitoIdentityClient } from "@aws-sdk/client-cognito-identity";
import { fromCognitoIdentityPool } from "@aws-sdk/credential-provider-cognito-identity";
import { COGNITO_REGION, COGNITO_POOL_ID } from 'react-native-dotenv';
import { Linking } from "react-native";
import DocumentPicker from "react-native-document-picker";

const region = COGNITO_REGION; 
const client = new S3Client({
  region,
  credentials: fromCognitoIdentityPool({
    client: new CognitoIdentityClient({ region }),
    identityPoolId: COGNITO_POOL_ID,
  }),
});

const createBucket = async (username) => {
  let bucketName =  "onboard-" + username;
  
  try {
    await client.send(new CreateBucketCommand({ Bucket: bucketName }));
    return "Bucket Created";
  } catch (error) {
    return error;
  }
};

const createEmptyObject = async (username, newBucket) => {
  let bucketName = "onboard-" + username;
  
  try {
    await client.send(new PutObjectCommand({ Key: newBucket + "/", Bucket: bucketName }));
    return "Object Created";
  } catch (error) { 
    return error;
  }
};

const getObjects = async (username, prefix) => {
  let bucketName = "onboard-" + username;
  
  try {
    let objects = await client.send(new ListObjectsCommand({ 
      Bucket: bucketName,
      Prefix: prefix + "/",
      Marker: prefix + "/"
    }));
    
    return objects;
  } catch (error) {
    return error;
  }
};

const deleteObject = async (username, key) => {
  let bucketName = "onboard-" + username;
  
  try {
    await client.send(new DeleteObjectCommand({ 
      Bucket: bucketName,
      Key: key
    }));
    
    return "Object Deleted";
  } catch (error) {
    return error;
  }
};

const viewObject = async (row) => {
  try {
    let url = await getSignedUrl(
      client,
      new GetObjectCommand({
        Bucket: row.Bucket,
        Key: row.Key
      }),
      { expiresIn: 7200 }
    );

    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    }
    
    return url;
  } catch (error) {
    return error;
  }
};

const putObject = async (user, parentBucket) => {
  let file = await pickFile( );
  if (file === "Canceled")
    return "Canceled";

  let bucket = "onboard-".concat(user.sageUserId, "-", user.sageEmployeeNumber);
  let key = parentBucket.concat("/", file.name);
  let body = await fileToBlob(file.uri);
  
  try {
    await client.send(new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: body
    }));

    return "File Uploaded Successfully.";
  } catch (error) {
    return error;
  }
}

const pickFile = async ( ) => {
  try {
    const res = await DocumentPicker.pickSingle({
      type: DocumentPicker.types.allFiles
    });

    return res;
  } catch (error) {
    if (DocumentPicker.isCancel(error)) {
      return "Canceled";
    } else {
      console.log(error)
    }
  }
};

const fileToBlob = async (fileUri) => {
  const response = await fetch(fileUri);
  const blob = await response.blob( );
  
  return blob;
}

const getFiles = async (user, clientName) => {
  let response = await getObjects(user.sageUserId + "-" + user.sageEmployeeNumber, clientName);
  if (typeof response.Contents === "undefined")
    return;

  response.Contents.forEach(file => {
    file.Name = file.Key.split("/")[1];
    file.LastModified = new Date(file.LastModified).toLocaleString("en-us");
    file.Bucket = "onboard-" + user.sageUserId + "-" + user.sageEmployeeNumber;
  });
  
  return response.Contents;
}

module.exports = {
  createBucket,
  createEmptyObject,
  deleteObject,
  getFiles,
  getObjects,
  putObject,
  viewObject
}