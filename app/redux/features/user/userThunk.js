import { createAsyncThunk } from "@reduxjs/toolkit";
import Users from '../../../api/Users';

export const getUserBySub = createAsyncThunk(
  'user/fetchBySub',
  async (sub) => {
    const response = await Users.getBySub(sub);
    
    return response;
  }
);