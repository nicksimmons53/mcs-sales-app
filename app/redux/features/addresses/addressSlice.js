import { createSlice } from '@reduxjs/toolkit';
import { 
  getClientAddresses, 
  createClientAddresses, 
  updateClientAddresses
} from './addressThunk';

const initialState = {
  entities: [],
  loading: false
};

export const addressesSlice = createSlice({
    name: 'addresses',
    initialState,
    reducers: {
      reset: ( ) => initialState
    },
    extraReducers: {
      [getClientAddresses.pending]: (state, action) => {
        state.loading = true;
      },
      [getClientAddresses.fulfilled]: (state, action) => {
        state.loading = false;
        state.entities = action.payload;
      },
      [getClientAddresses.rejected]: (state, action) => {
        state.loading = false;
      },
      [createClientAddresses.pending]: (state, action) => {
        state.loading = true;
      },
      [createClientAddresses.fulfilled]: (state, action) => {
        state.loading = false;
      },
      [createClientAddresses.rejected]: (state, action) => {
        state.loading = false;
      },
      [updateClientAddresses.pending]: (state, action) => {
        state.loading = true;
      },
      [updateClientAddresses.fulfilled]: (state, action) => {
        state.loading = false;
      },
      [updateClientAddresses.rejected]: (state, action) => {
        state.loading = false;
      },
    }
});

export const { reset } = addressesSlice.actions;

export default addressesSlice.reducer;