import { createSlice } from '@reduxjs/toolkit';
import { 
  createClient, 
  getClientApprovals, 
  getClientById, 
  getClientsByUser, 
  pushClientToSage, 
  updateClient, 
  updateClientStatus
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
      setUpdated: (state, action) => {
        state.selected = action.payload;
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
      [getClientById.pending]: (state, action) => {
        state.loading = true;
      },
      [getClientById.fulfilled]: (state, action) => {
        state.loading = false;
        state.selected = action.payload;
      },
      [getClientById.rejected]: (state, action) => {
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
        state.approvals = action.payload;
      },
      [getClientApprovals.rejected]: (state, action) => {
        state.loading = false;
      },
      [pushClientToSage.pending]: (state, action) => {
        state.loading = true;
      },
      [pushClientToSage.fulfilled]: (state, action) => {
        state.loading = false;
      },
      [pushClientToSage.rejected]: (state, action) => {
        state.loading = false;
      },
      [updateClientStatus.pending]: (state, action) => {
        state.loading = true;
      },
      [updateClientStatus.fulfilled]: (state, action) => {
        state.loading = false;
      },
      [updateClientStatus.rejected]: (state, action) => {
        state.loading = false;
      },
    }
});

export const { setSelected, setUpdated, reset } = clientsSlice.actions;

export default clientsSlice.reducer;