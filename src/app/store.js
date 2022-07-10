import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import { emptySplitApi } from "../services/emptySplit";
import { setupListeners } from "@reduxjs/toolkit/query";

const reducers = combineReducers({
  auth: authReducer,
  [emptySplitApi.reducerPath]: emptySplitApi.reducer,
});

export const store = configureStore({
  reducer: reducers,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(emptySplitApi.middleware),
});

setupListeners(store.dispatch);
