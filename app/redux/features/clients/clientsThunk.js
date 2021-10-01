import { createAsyncThunk } from '@reduxjs/toolkit';
import Clients from '../../../api/Clients';
import Approvals from '../../../api/Approvals';

export const getClientsByUser = createAsyncThunk(
  'clients/fetchByUser',
  async (userId) => {
    const response = await Clients.getAll(userId);
    
    return response.clients;
  }
);

export const createClient = createAsyncThunk(
  'clients/create',
  async (values) => {
    const response = await Clients.create(values);
    
    return response;
  }
);

export const updateClient = createAsyncThunk(
  'clients/update',
  async (values) => {
    const response = await Clients.update(values);

    return response;
  }
);

export const getClientApprovals = createAsyncThunk(
  'clients/approvals',
  async (clientId) => {
    const response = await Approvals.getAll(clientId);
    
    return response.approvals;
  }
);