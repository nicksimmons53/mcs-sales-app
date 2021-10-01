import { createSlice } from '@reduxjs/toolkit';
import { 
  createClient, 
  getClientApprovals, 
  getClientsByUser, 
  updateClient 
} from './clientsThunk';

const initialState = {
  entities: [],
  loading: false,
  selected: null,
  approvals: []
};

export const clientsSlice = createSlice({
    name: 'clients',
    initialState,
    reducers: {
      setSelected: (state, action) => {
        state.selected = state.entities.find(client => 
          client.id === action.payload
        );
      },
      reset: ( ) => initialState
    },
    extraReducers: {
      [getClientsByUser.pending]: (state, action) => {
        state.loading = true;
      },
      [getClientsByUser.fulfilled]: (state, action) => {
        state.loading = false;
        state.entities = action.payload;
      },
      [getClientsByUser.rejected]: (state, action) => {
        state.loading = false;
      },
      [createClient.pending]: (state, action) => {
        state.loading = true;
      },
      [createClient.fulfilled]: (state, action) => {
        state.loading = false;
      },
      [createClient.rejected]: (state, action) => {
        state.loading = false;
      },
      [updateClient.pending]: (state, action) => {
        state.loading = true;
      },
      [updateClient.fulfilled]: (state, action) => {
        state.loading = false;
      },
      [updateClient.rejected]: (state, action) => {
        state.loading = false;
      },
      [getClientApprovals.pending]: (state, action) => {
        state.loading = true;
      },
      [getClientApprovals.fulfilled]: (state, action) => {
        state.loading = false;
        console.log(action)
        state.approvals = action.payload;
      },
      [getClientApprovals.rejected]: (state, action) => {
        state.loading = false;
      },
    }
});

export const { setSelected, reset } = clientsSlice.actions;

export default clientsSlice.reducer;