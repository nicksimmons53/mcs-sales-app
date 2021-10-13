import { createSlice } from '@reduxjs/toolkit';
import { 
  getCountertopOptions,
  getClientParts,
  createClientParts,
  deleteClientParts,
  getInHouseProgram
} from './pricingThunk';

const initialState = {
  entities: [],
  countertopOptions: { },
  parts: [],
  loading: false
};

export const pricingSlice = createSlice({
    name: 'pricing',
    initialState,
    reducers: {
      reset: ( ) => initialState
    },
    extraReducers: {
      [getCountertopOptions.pending]: (state, action) => {
        state.loading = true;
      },
      [getCountertopOptions.fulfilled]: (state, action) => {
        state.loading = false;
        state.countertopOptions = action.payload;
      },
      [getCountertopOptions.rejected]: (state, action) => {
        state.loading = false;
      },
      [getClientParts.pending]: (state, action) => {
        state.loading = true;
      },
      [getClientParts.fulfilled]: (state, action) => {
        state.loading = false;
        state.parts = action.payload;
      },
      [getClientParts.rejected]: (state, action) => {
        state.loading = false;
      },
      [createClientParts.pending]: (state, action) => {
        state.loading = true;
      },
      [createClientParts.fulfilled]: (state, action) => {
        state.loading = false;
      },
      [createClientParts.rejected]: (state, action) => {
        state.loading = false;
      },
      [deleteClientParts.pending]: (state, action) => {
        state.loading = true;
      },
      [deleteClientParts.fulfilled]: (state, action) => {
        state.loading = false;
      },
      [deleteClientParts.rejected]: (state, action) => {
        state.loading = false;
      },
      [getInHouseProgram.pending]: (state, action) => {
        state.loading = true;
      },
      [getInHouseProgram.fulfilled]: (state, action) => {
        state.loading = false;
        state.parts = action.payload;
      },
      [getInHouseProgram.rejected]: (state, action) => {
        state.loading = false;
      },
    }
});

export const { reset } = pricingSlice.actions;

export default pricingSlice.reducer;