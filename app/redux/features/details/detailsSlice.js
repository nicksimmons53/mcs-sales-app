import { createSlice } from '@reduxjs/toolkit';
import { 
  getClientDetails, 
  updateClientDetails,
} from './detailsThunk';

const initialState = {
  entities: null,
  loading: false
};

export const detailsSlice = createSlice({
    name: 'details',
    initialState,
    reducers: {
      reset: ( ) => initialState
    },
    extraReducers: {
      [getClientDetails.pending]: (state, action) => {
        state.loading = true;
      },
      [getClientDetails.fulfilled]: (state, action) => {
        state.loading = false;
        state.entities = action.payload;
      },
      [getClientDetails.rejected]: (state, action) => {
        state.loading = false;
      },
      [updateClientDetails.pending]: (state, action) => {
        state.loading = true;
      },
      [updateClientDetails.fulfilled]: (state, action) => {
        state.loading = false;
      },
      [updateClientDetails.rejected]: (state, action) => {
        state.loading = false;
      },
    }
});

export const { reset } = detailsSlice.actions;

export default detailsSlice.reducer;