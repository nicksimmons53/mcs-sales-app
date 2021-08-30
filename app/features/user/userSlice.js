import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    id: null,
    info: null,
    accessToken: null,
    isSigningOut: false
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        restoreUser: (state, action) => {
            state.info = action.payload;
        },
        restoreToken: (state, action) => {
            state.accessToken = action.payload;
        },
        restoreId: (state, action) => {
            state.id = action.payload;
        },
        signOut: (state) => {
            state.isSigningOut = true;
        },
        reset: ( ) => initialState
    }
});

export const { restoreUser, restoreToken, restoreId, signOut, reset } = userSlice.actions;

export default userSlice.reducer;