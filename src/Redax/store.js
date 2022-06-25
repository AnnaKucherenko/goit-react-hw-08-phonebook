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
// import { contactsApi } from "./contacts/contactsSlice";

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
        // [contactsApi.reducerPath]: contactsApi.reducer,
    },
    middleware: getDefaultMiddleware =>[
                ...getDefaultMiddleware({
                      serializableCheck: {
                        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
                      },
                }),
                // contactsApi.middleware,        
    ],
    
});
  
export const persistor = persistStore(store);


//RTC----------------------

// import { configureStore} from "@reduxjs/toolkit";
// import contactsReducer from "./contacts";
// import { setupListeners } from "@reduxjs/toolkit/dist/query";
// import { contactsApi } from "./contactsSlice";
// import { userApi } from "./auth/auth-slice";

// const store = configureStore({
//     reducer:{
//         contacts:contactsReducer,
//         [contactsApi.reducerPath]: contactsApi.reducer,
//         [userApi.reducerPath]: userApi.reducer,
//     },
//     middleware: getDefaultMiddleware =>[
//         ...getDefaultMiddleware(),
//         contactsApi.middleware,
//         userApi.middleware,
//     ],
// });

// setupListeners(store.dispatch);

// export default store;