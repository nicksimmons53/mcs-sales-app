import { createAsyncThunk } from '@reduxjs/toolkit';
import Programs from '../../../api/Programs';

export const getProgramsByClient = createAsyncThunk(
  'programs/getAll',
  async (clientId) => {
    const response = await Programs.getAll(clientId);
    
    return response.programs;
  }
);

export const updatePrograms = createAsyncThunk(
  'programs/update',
  async (query) => {
    const response = await Programs.update(query);
    
    return response;
  }
);