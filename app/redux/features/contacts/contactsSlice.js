import { createSlice } from '@reduxjs/toolkit';
import { 
  getClientContacts, 
  createClientContact, 
  deleteClientContact
} from './contactsThunk';

const initialState = {
  entities: [],
  loading: false
};

export const contactsSlice = createSlice({
    name: 'contacts',
    initialState,
    reducers: {
      reset: ( ) => initialState
    },
    extraReducers: {
      [getClientContacts.pending]: (state, action) => {
        state.loading = true;
      },
      [getClientContacts.fulfilled]: (state, action) => {
        state.loading = false;
        state.entities = action.payload;
      },
      [getClientContacts.rejected]: (state, action) => {
        state.loading = false;
      },
      [createClientContact.pending]: (state, action) => {
        state.loading = true;
      },
      [createClientContact.fulfilled]: (state, action) => {
        state.loading = false;
      },
      [createClientContact.rejected]: (state, action) => {
        state.loading = false;
      },
      [deleteClientContact.pending]: (state, action) => {
        state.loading = true;
      },
      [deleteClientContact.fulfilled]: (state, action) => {
        state.loading = false;
        state.entities = state.entities.filter(contact => contact.id !== action.payload.id);
      },
      [deleteClientContact.rejected]: (state, action) => {
        state.loading = false;
      }
    }
});

export const { reset } = contactsSlice.actions;

export default contactsSlice.reducer;