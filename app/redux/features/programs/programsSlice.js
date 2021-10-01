import { createSlice } from '@reduxjs/toolkit';
import { 
  getProgramsByClient,
  updatePrograms
} from './programsThunk';

const initialState = {
  entities: [],
  loading: false,
};

export const programsSlice = createSlice({
    name: 'programs',
    initialState,
    reducers: {
      reset: ( ) => initialState
    },
    extraReducers: {
      [getProgramsByClient.pending]: (state, action) => {
        state.loading = true;
      },
      [getProgramsByClient.fulfilled]: (state, action) => {
        state.loading = false;
        delete action.payload.clientId;
        state.entities = action.payload;
      },
      [getProgramsByClient.rejected]: (state, action) => {
        state.loading = false;
      },
      [updatePrograms.pending]: (state, action) => {
        state.loading = true;
      },
      [updatePrograms.fulfilled]: (state, action) => {
        state.loading = false;
      },
      [updatePrograms.rejected]: (state, action) => {
        state.loading = false;
      },
    }
});

export const { reset } = programsSlice.actions;

export default programsSlice.reducer;