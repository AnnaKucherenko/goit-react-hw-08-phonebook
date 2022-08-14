import { configureStore, combineReducers} from "@reduxjs/toolkit";
import { persistStore, 
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from './auth/authSlice';
import contactsReducer from "./contacts/contactsSlice";

const authPersistConfig = {
    key: 'user',
    storage,
    whitelist: ['auth', 'contacts'],
    
};

const rootReducer = combineReducers({
    auth: authReducer,
    contacts: contactsReducer,
});

const persistedReducer = persistReducer(authPersistConfig,rootReducer);
  
export const store = configureStore({
    reducer: {
        persistedReducer,
        
    },
    middleware: getDefaultMiddleware =>[
                ...getDefaultMiddleware({
                      serializableCheck: {
                        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
                      },
                }),
                     
    ],
    
});
  
export const persistor = persistStore(store);


