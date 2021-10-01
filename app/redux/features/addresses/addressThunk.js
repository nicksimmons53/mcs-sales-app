import { createAsyncThunk } from '@reduxjs/toolkit';
import Addresses from '../../../api/Addresses';

export const getClientAddresses = createAsyncThunk(
  'addresses/getAll',
  async (id) => {
    const response = await Addresses.getAll(id);
    
    return response.addresses;
  }
);

export const createClientAddresses = createAsyncThunk(
  'addresses/create',
  async (values) => {
    const response = await Addresses.create(values);
    
    return response;
  }
);

export const updateClientAddresses = createAsyncThunk(
  'addresses/update',
  async (values) => {
    const response = await Addresses.update(values);

    return response;
  }
);