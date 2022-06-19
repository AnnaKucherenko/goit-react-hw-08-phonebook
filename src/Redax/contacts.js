import { createSlice} from "@reduxjs/toolkit";

const initialState = {
    contacts: {
        filter: '',
    }
};

const contactsSlice = createSlice({
    name:'contacts',
    initialState,
    reducers:{
             
        setFilterContacts(state, { payload }) {
            state.contacts.filter = payload;
        },
        
    }
})

export default contactsSlice.reducer;
export const {  setFilterContacts } = contactsSlice.actions;
