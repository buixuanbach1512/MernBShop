import { createAsyncThunk, createSlice, createAction } from '@reduxjs/toolkit';
import messageService from './messageService';

const initialState = {
    messages: [],
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: '',
};

export const createMessage = createAsyncThunk('message/create-message', async (data, thunkAPI) => {
    try {
        return messageService.createMessage(data);
    } catch (e) {
        return thunkAPI.rejectWithValue(e);
    }
});

export const getAllMessageById = createAsyncThunk('message/get-message-by-id', async (id, thunkAPI) => {
    try {
        return messageService.getAllMessageById(id);
    } catch (e) {
        return thunkAPI.rejectWithValue(e);
    }
});

export const resetState = createAction('Reset-all');

export const messageSlice = createSlice({
    name: 'message',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createMessage.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createMessage.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.createdMessage = action.payload;
            })
            .addCase(createMessage.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.message = action.error;
            })
            .addCase(getAllMessageById.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllMessageById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.messages = action.payload;
            })
            .addCase(getAllMessageById.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.message = action.error;
            })
            .addCase(resetState, () => initialState);
    },
});

export default messageSlice.reducer;
