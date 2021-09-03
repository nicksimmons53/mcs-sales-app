import "react-native-get-random-values";
import "react-native-url-polyfill/auto";
import {
  S3Client,
  CreateBucketCommand,
  ListObjectsCommand,
  PutObjectCommand
} from "@aws-sdk/client-s3";
import { CognitoIdentityClient } from "@aws-sdk/client-cognito-identity";
import { fromCognitoIdentityPool } from "@aws-sdk/credential-provider-cognito-identity";
import { COGNITO_REGION, COGNITO_POOL_ID } from 'react-native-dotenv';

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

const createEmptyObject = async (username, newBucket) => {
  let bucketName = "onboard-" + username;
  
  try {
    await client.send(new PutObjectCommand({ Key: newBucket + "/", Bucket: bucketName }));
    return "Object Created";
  } catch (error) { 
    return error;
  }
}

module.exports = {
  createBucket,
  getObjects,
  createEmptyObject
}