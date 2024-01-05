import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import customerService from './customerService';

const initialState = {
    customers: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: '',
};

export const getUsers = createAsyncThunk('customer/get-customers', async (userName, thunkAPI) => {
    try {
        return await customerService.getUsers(userName);
    } catch (e) {
        return thunkAPI.rejectWithValue(e);
    }
});

export const getUser = createAsyncThunk('customer/get-customer', async (id, thunkAPI) => {
    try {
        return await customerService.getUser(id);
    } catch (e) {
        return thunkAPI.rejectWithValue(e);
    }
});

export const updateUserById = createAsyncThunk('customer/update-customer', async (data, thunkAPI) => {
    try {
        return await customerService.updateUserById(data);
    } catch (e) {
        return thunkAPI.rejectWithValue(e);
    }
});

export const blockUser = createAsyncThunk('customer/block-user', async (userId, thunkAPI) => {
    try {
        return await customerService.blockUser(userId);
    } catch (e) {
        return thunkAPI.rejectWithValue(e);
    }
});

export const unBlockUser = createAsyncThunk('customer/unblock-user', async (userId, thunkAPI) => {
    try {
        return await customerService.unBlockUser(userId);
    } catch (e) {
        return thunkAPI.rejectWithValue(e);
    }
});

export const resetState = createAction('Reset-all');

export const customerSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getUsers.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getUsers.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.customers = action.payload;
                state.message = 'Success';
            })
            .addCase(getUsers.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(getUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.getAUser = action.payload;
                state.message = 'Success';
            })
            .addCase(getUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(updateUserById.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateUserById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.updatedUser = action.payload;
                state.message = 'Success';
            })
            .addCase(updateUserById.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(blockUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(blockUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.blocked = action.payload;
                state.isError = false;
            })
            .addCase(blockUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(unBlockUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(unBlockUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.unBlocked = action.payload;
                state.isError = false;
            })
            .addCase(unBlockUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(resetState, () => initialState);
    },
});

export default customerSlice.reducer;
