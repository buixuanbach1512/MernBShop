import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import permissionService from './permissionService';

const initialState = {
    permissions: [],
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: '',
};

export const getAllPermission = createAsyncThunk('permission/get-all-Ppermissions', async (data, thunkAPI) => {
    try {
        return await permissionService.getAllPermission(data);
    } catch (e) {
        return thunkAPI.rejectWithValue(e);
    }
});

export const createPermission = createAsyncThunk('permission/create-permission', async (data, thunkAPI) => {
    try {
        return await permissionService.createPermission(data);
    } catch (e) {
        return thunkAPI.rejectWithValue(e);
    }
});

export const getAPermission = createAsyncThunk('permission/get-a-permission', async (id, thunkAPI) => {
    try {
        return await permissionService.getAPermission(id);
    } catch (e) {
        return thunkAPI.rejectWithValue(e);
    }
});

export const updatePermission = createAsyncThunk('permission/update-permission', async (data, thunkAPI) => {
    try {
        return await permissionService.updatePermission(data);
    } catch (e) {
        return thunkAPI.rejectWithValue(e);
    }
});

export const deletePermission = createAsyncThunk('permission/delete-permission', async (id, thunkAPI) => {
    try {
        return await permissionService.deletePermission(id);
    } catch (e) {
        return thunkAPI.rejectWithValue(e);
    }
});

export const resetState = createAction('Reset-All');

export const permissionSlice = createSlice({
    name: 'permission',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllPermission.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllPermission.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.permissions = action.payload;
            })
            .addCase(getAllPermission.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.message = action.error;
            })
            .addCase(createPermission.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createPermission.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.createdPermission = action.payload;
            })
            .addCase(createPermission.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(getAPermission.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAPermission.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.getPermission = action.payload;
            })
            .addCase(getAPermission.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(updatePermission.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updatePermission.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.updatedPermission = action.payload;
            })
            .addCase(updatePermission.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(deletePermission.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deletePermission.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.deletedPer = action.payload;
            })
            .addCase(deletePermission.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(resetState, () => initialState);
    },
});

export default permissionSlice.reducer;
