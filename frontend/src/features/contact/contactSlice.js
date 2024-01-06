import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import contactService from './contactService';
import { toast } from 'react-toastify';
const initialState = {
    contacts: [],
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: '',
};

export const postContact = createAsyncThunk('contact/post-contact', async (data, thunkAPI) => {
    try {
        return await contactService.postContact(data);
    } catch (e) {
        return thunkAPI.rejectWithValue(e);
    }
});

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

export const resetState = createAction('Reset-all');

export const contactSlice = createSlice({
    name: 'contact',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(postContact.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(postContact.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.createdContact = action.payload;
                if (state.isSuccess === true) {
                    toast.success('Gửi phản hồi thành công');
                }
            })
            .addCase(postContact.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.message = action.error;
                if (state.isError === true) {
                    toast.error('Thất bại');
                }
            })
            .addCase(getAllContact.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllContact.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.contacts = action.payload;
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

export default contactSlice.reducer;
