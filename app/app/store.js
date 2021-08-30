import { configureStore } from '@reduxjs/toolkit';
import { 
    persistStore, 
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import userReducer from '../features/user/userSlice';
import clientReducer from '../features/clients/clientsSlice';

const persistConfig = {
    key: 'root',
    version: 1,
    storage: AsyncStorage,
    whitelist: [
        'user'
    ]
};

const persistedReducer = persistReducer(persistConfig, userReducer);

export const store = configureStore({
    reducer: {
        user: persistedReducer,
        clients: clientReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export const persistor = persistStore(store);
