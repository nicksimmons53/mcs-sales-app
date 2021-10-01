import { createAsyncThunk } from '@reduxjs/toolkit';
import Clients from '../../../api/Clients';

export const getClientDetails = createAsyncThunk(
  'details',
  async (id) => {
    const response = await Clients.getDetails(id);
    
    return response.tables;
  }
);

export const updateClientDetails = createAsyncThunk(
  'details/update',
  async (query) => {
    const response = await Clients.updateDetails(query);

    return response;
  }
);