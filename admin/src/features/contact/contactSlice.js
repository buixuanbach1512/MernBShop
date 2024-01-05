import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import contactService from './contactService';

const initialState = {
    contact: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: '',
};

export const getAllContact = createAsyncThunk('contact/get-all-contact', async (thunkAPI) => {
    try {
        return await contactService.getContact();
    } catch (e) {
        return thunkAPI.rejectWithValue(e);
    }
});
export const deleteContact = createAsyncThunk('contact/delete-contact', async (id, thunkAPI) => {
    try {
        return await contactService.deleteContact(id);
    } catch (e) {
        return thunkAPI.rejectWithValue(e);
    }
});

export const resetState = createAction('Reset_all');

export const colorSlice = createSlice({
    name: 'contact',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllContact.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllContact.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.contact = action.payload;
            })
            .addCase(getAllContact.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(deleteContact.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteContact.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.deletedContact = action.payload;
            })
            .addCase(deleteContact.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(resetState, () => initialState);
    },
});

export default colorSlice.reducer;
