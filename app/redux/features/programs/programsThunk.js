import { createAsyncThunk } from '@reduxjs/toolkit';
import Programs from '../../../api/Programs';

export const getProgramsByClient = createAsyncThunk(
  'programs/getAll',
  async (clientId) => {
    const response = await Programs.getAll(clientId);
    console.log(response)
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

export const getProgramByName = createAsyncThunk(
  'programs/getByName',
  async (query) => {
    const response = await Programs.getByName(query);

    return response;
  }
);

export const createProgram = createAsyncThunk(
  'programs/create',
  async (query) => {
    const response = await Programs.createByName(query);

    return response;
  }
);