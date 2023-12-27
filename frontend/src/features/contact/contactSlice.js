import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import { contactService } from './contactService';
import { toast } from 'react-toastify';
const initialState = {
    contact: '',
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: '',
};

export const postContact = createAsyncThunk('contact/post-contact', async (dataPost, thunkAPI) => {
    try {
        return await contactService.postContact(dataPost);
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
                state.contact = action.payload;
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
            .addCase(resetState, () => initialState);
    },
});

export default contactSlice.reducer;
