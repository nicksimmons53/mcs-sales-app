import { createSlice } from '@reduxjs/toolkit';
import { 
  createProgram,
  getProgramByName,
  getProgramsByClient,
  updatePrograms
} from './programsThunk';

const initialState = {
  entities: null,
  loading: false,
  selected: null
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
        if (action.payload !== undefined) {
          delete action.payload.clientId;
        }
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
      [getProgramByName.pending]: (state, action) => {
        state.loading = true;
      },
      [getProgramByName.fulfilled]: (state, action) => {
        state.loading = false;
        state.selected = {...action.payload};
      },
      [getProgramByName.rejected]: (state, action) => {
        state.loading = false;
      },
      [createProgram.pending]: (state, action) => {
        state.loading = true;
      },
      [createProgram.fulfilled]: (state, action) => {
        state.loading = false;
      },
      [createProgram.rejected]: (state, action) => {
        state.loading = false;
      },
    }
});

export const { reset } = programsSlice.actions;

export default programsSlice.reducer;