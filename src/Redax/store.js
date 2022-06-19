import { configureStore} from "@reduxjs/toolkit";
import contactsReducer from "./contacts";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { contactsApi } from "./contactsSlice";

const store = configureStore({
    reducer:{
        contacts:contactsReducer,
        [contactsApi.reducerPath]: contactsApi.reducer,
    },
    middleware: getDefaultMiddleware =>[
        ...getDefaultMiddleware(),
        contactsApi.middleware,
    ],
});

setupListeners(store.dispatch);

export default store;