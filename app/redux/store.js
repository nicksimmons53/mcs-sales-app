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
import userReducer from './features/user/userSlice';
import clientReducer from './features/clients/clientsSlice';
import addressReducer from './features/addresses/addressSlice';
import contactsReducer from './features/contacts/contactsSlice';
import detailsReducer from './features/details/detailsSlice';
import programsReducer from './features/programs/programsSlice';
import snackbarReducer from './features/snackbar/snackbarSlice'

const persistConfig = {
    key: 'root',
    version: 1,
    storage: AsyncStorage,
    whitelist: [
        'user',
        'clients'
    ]
};

const persistedUserReducer = persistReducer(persistConfig, userReducer);
const persistedClientReducer = persistReducer(persistConfig, clientReducer);

export const store = configureStore({
    reducer: {
        user: persistedUserReducer,
        clients: persistedClientReducer,
        addresses: addressReducer,
        contacts: contactsReducer,
        details: detailsReducer,
        programs: programsReducer,
        snackbar: snackbarReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export const persistor = persistStore(store);
