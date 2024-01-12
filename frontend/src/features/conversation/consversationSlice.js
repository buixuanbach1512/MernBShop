import { createAsyncThunk, createSlice, createAction } from '@reduxjs/toolkit';
import conversationService from './conversationService';
import { toast } from 'react-toastify';

const initialState = {
    conversations: [],
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: '',
};

export const createConversation = createAsyncThunk('conversation/create-conversation', async (data, thunkAPI) => {
    try {
        return conversationService.createConversation(data);
    } catch (e) {
        return thunkAPI.rejectWithValue(e);
    }
});

export const getAllConversation = createAsyncThunk('conversation/get-all-conversation', async (thunkAPI) => {
    try {
        return conversationService.getAllConversation();
    } catch (e) {
        return thunkAPI.rejectWithValue(e);
    }
});

export const updateLastMessage = createAsyncThunk('conversation/update-last-message', async (data, thunkAPI) => {
    try {
        return conversationService.updateLastMessage(data);
    } catch (e) {
        return thunkAPI.rejectWithValue(e);
    }
});

export const deleteConversation = createAsyncThunk('conversation/delete-conversation', async (id, thunkAPI) => {
    try {
        return conversationService.deleteConversation(id);
    } catch (e) {
        return thunkAPI.rejectWithValue(e);
    }
});

export const resetState = createAction('Reset-all');

export const conversationSlice = createSlice({
    name: 'conversation',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createConversation.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createConversation.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.createdConver = action.payload;
            })
            .addCase(createConversation.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.message = action.error;
            })
            .addCase(getAllConversation.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllConversation.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.conversations = action.payload;
            })
            .addCase(getAllConversation.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.message = action.error;
            })
            .addCase(updateLastMessage.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateLastMessage.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.updatedLastMessage = action.payload;
            })
            .addCase(updateLastMessage.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.message = action.error;
            })
            .addCase(deleteConversation.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteConversation.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.deletedConversation = action.payload;
                if (state.isSuccess === true) {
                    toast.success('Xóa trò truyện thành công');
                }
            })
            .addCase(deleteConversation.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.message = action.error;
                if (state.isError === true) {
                    toast.success('Có lỗi xảy ra');
                }
            })
            .addCase(resetState, () => initialState);
    },
});

export default conversationSlice.reducer;
