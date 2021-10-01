import { createAsyncThunk } from '@reduxjs/toolkit';
import Contacts from '../../../api/Contacts';

export const getClientContacts = createAsyncThunk(
  'contacts/getAll',
  async (id) => {
    const response = await Contacts.getAll(id);
    
    return response.contacts;
  }
);

export const createClientContact = createAsyncThunk(
  'contacts/create',
  async (values) => {
    const response = await Contacts.create(values);

    return response;
  }
);

export const deleteClientContact = createAsyncThunk(
  'contacts/delete',
  async (query) => {
    const response = await Contacts.deleteById(query);

    return response;
  }
);