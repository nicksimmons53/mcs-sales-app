import { createSlice } from '@reduxjs/toolkit';
import { getUserBySub } from './userThunk.js';

const initialState = {
    id: null,
    sub: null,
    info: null,
    isSigningOut: false,
    loading: false
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        restoreSub: (state, action) => {
            state.sub = action.payload;
        },
        restoreId: (state, action) => {
            state.id = action.payload;
        },
        signOut: (state) => {
            state.isSigningOut = true;
        },
        reset: ( ) => initialState
    },
    extraReducers: {
        [getUserBySub.pending]: (state, action) => {
            state.loading = true;
        },
        [getUserBySub.fulfilled]: (state, action) => {
            state.id = action.payload.id;
            state.sub = action.payload.auth0Sub;
            state.info = {...action.payload};
        },
        [getUserBySub.rejected]: (state, action) => {
            state.loading = false;
        }
    }
});

export const { restoreSub, restoreId, signOut, reset } = userSlice.actions;

export default userSlice.reducer;