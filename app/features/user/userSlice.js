import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    id: null,
    accessToken: null,
    isSigningOut: false
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
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

export const { restoreToken, restoreId, signOut, reset } = userSlice.actions;

export default userSlice.reducer;