import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  visible: false,
  message: ''
};

export const snackbarSlice = createSlice({
    name: 'snackbar',
    initialState,
    reducers: {
        show: (state, action) => {
          state.visible = !state.visible;
        },
        setMessage: (state, action) => {
          state.message = action.payload;
        },
        reset: ( ) => initialState
    }
});

export const { show, setMessage, reset } = snackbarSlice.actions;

export default snackbarSlice.reducer;