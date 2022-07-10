import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

const initialState = {
  isSignedOut: true,
  loading: false,
  token: null,
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    saveToken: (state, action) => {
      state.token = action.payload;
    },
    clearToken: state => {
      AsyncStorage.removeItem("userToken");
      state.token = null;
    },
    setLoading: state => {
      state.loading = !state.loading;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { saveToken, clearToken, setLoading, setUser } = authSlice.actions;

export default authSlice.reducer;
