// Library Imports
import * as Realm from 'realm';
import Firebase from './Firebase';

class User { }
User.schema = {
  name: 'User',
  primaryKey: 'email',
  properties: {
    firstName: 'string',
    lastName: 'string',
    email: 'string',
    phone: 'string',
    access: 'string',
    division: 'string',
    sageUN: 'string',
    lastLogin: 'date'
  }
}

const realm = new Realm({schema: [User]});