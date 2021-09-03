import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Clients from '../../api/Clients';
import Addresses from '../../api/Addresses';
import Contacts from '../../api/Contacts';
import Programs from '../../api/Programs';
import Approvals from '../../api/Approvals';

const initialState = {
  entities: [],
  status: 'idle',
  selected: null,
  addresses: [],
  contacts: [],
  files: [],
  programs: {
    entities: [],
    selected: []
  },
  details: null,
  approvals: null
};

export const getClientsByUser = createAsyncThunk(
  'clients/fetchByUser',
  async (userId) => {
    const response = await Clients.getAll(userId);
    
    return response.clients;
  }
);

export const createClient = createAsyncThunk(
  'clients/create',
  async (values) => {
    const response = await Clients.create(values);
    
    return response;
  }
)

export const getClientAddresses = createAsyncThunk(
  'clients/addresses',
  async (id) => {
    const response = await Addresses.getAll(id);
    
    return response.addresses;
  }
);

export const getClientContacts = createAsyncThunk(
  'clients/contacts',
  async (id) => {
    const response = await Contacts.getAll(id);
    
    return response.contacts;
  }
);

export const getClientDetails = createAsyncThunk(
  'clients/details',
  async (id) => {
    const response = await Clients.getDetails(id);
    
    return response.tables;
  }
);

export const updateClientDetails = createAsyncThunk(
  'clients/details/update',
  async (query) => {
    const response = await Clients.updateDetails(query);

    return response;
  }
);

export const getProgramsByClient = createAsyncThunk(
  'clients/programs/fetchAll',
  async (clientId) => {
    const response = await Programs.getAll(clientId);
    
    return response.programs;
  }
);

export const updateClientPrograms = createAsyncThunk(
  'clients/programs/update',
  async (query) => {
    const response = await Programs.alterChoices(query);
    
    return response;
  }
);

export const getClientApprovals = createAsyncThunk(
  'clients/approvals',
  async (clientId) => {
    const response = await Approvals.getAll(clientId);

    return response.approvals;
  }
);

export const clientsSlice = createSlice({
    name: 'clients',
    initialState,
    reducers: {
      setSelected: (state, action) => {
        state.selected = state.entities.find(client => 
          client.id === action.payload
        );
      },
      resetDetails: (state) => {
        state.details = null;
      },
      reset: ( ) => initialState
    },
    extraReducers: {
      [getClientsByUser.pending]: (state, action) => {
        state.status = 'loading';
      },
      [getClientsByUser.fulfilled]: (state, action) => {
        state.status = 'fulfilled';
        state.entities = action.payload;
      },
      [getClientsByUser.rejected]: (state, action) => {
        state.status = 'rejected';
      },
      [getClientAddresses.pending]: (state, action) => {
        state.status = 'loading';
      },
      [getClientAddresses.fulfilled]: (state, action) => {
        state.status = 'fulfilled';
        state.addresses = action.payload;
      },
      [getClientAddresses.rejected]: (state, action) => {
        state.status = 'rejected';
      },
      [getClientContacts.pending]: (state, action) => {
        state.status = 'loading';
      },
      [getClientContacts.fulfilled]: (state, action) => {
        state.status = 'fulfilled';
        state.contacts = action.payload;
      },
      [getClientContacts.rejected]: (state, action) => {
        state.status = 'rejected';
      },
      [getClientDetails.pending]: (state, action) => {
        state.status = 'loading';
      },
      [getClientDetails.fulfilled]: (state, action) => {
        state.status = 'fulfilled';
        state.details = action.payload;
      },
      [getClientDetails.rejected]: (state, action) => {
        state.status = 'rejected';
      },
      [getProgramsByClient.pending]: (state, action) => {
        state.status = 'loading';
      },
      [getProgramsByClient.fulfilled]: (state, action) => {
        state.status = 'fulfilled';
        state.programs.entities = action.payload;
      },
      [getProgramsByClient.rejected]: (state, action) => {
        state.status = 'rejected';
      },
      [getClientApprovals.pending]: (state, action) => {
        state.status = 'loading';
      },
      [getClientApprovals.fulfilled]: (state, action) => {
        state.status = 'fulfilled';
        state.approvals = action.payload;
      },
      [getClientApprovals.rejected]: (state, action) => {
        state.status = 'rejected';
      },
    }
});

export const { setSelected, resetDetails, reset } = clientsSlice.actions;

export default clientsSlice.reducer;