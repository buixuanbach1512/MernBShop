import { createAsyncThunk, createSlice, createAction } from '@reduxjs/toolkit';
import roleService from './roleService';

const initialState = {
    roles: [],
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: '',
};

export const createRole = createAsyncThunk('role/create-role', async (data, thunkAPI) => {
    try {
        return await roleService.createRole(data);
    } catch (e) {
        return thunkAPI.fulfillWithValue(e);
    }
});

export const getAllRole = createAsyncThunk('role/get-all-role', async (thunkAPI) => {
    try {
        return await roleService.getAllRole();
    } catch (e) {
        return thunkAPI.fulfillWithValue(e);
    }
});

export const getARole = createAsyncThunk('role/get-a-role', async (id, thunkAPI) => {
    try {
        return await roleService.getARole(id);
    } catch (e) {
        return thunkAPI.fulfillWithValue(e);
    }
});

export const updateRole = createAsyncThunk('role/update-role', async (data, thunkAPI) => {
    try {
        return await roleService.updateRole(data);
    } catch (e) {
        return thunkAPI.fulfillWithValue(e);
    }
});

export const deleteRole = createAsyncThunk('role/delete-role', async (id, thunkAPI) => {
    try {
        return await roleService.deleteRole(id);
    } catch (e) {
        return thunkAPI.fulfillWithValue(e);
    }
});

export const resetState = createAction('Reset-all');

export const roleSlice = createSlice({
    name: 'roles',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createRole.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createRole.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.createdRole = action.payload;
            })
            .addCase(createRole.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.message = action.error;
            })
            .addCase(getAllRole.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllRole.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.roles = action.payload;
            })
            .addCase(getAllRole.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.message = action.error;
            })
            .addCase(getARole.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getARole.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.role = action.payload;
            })
            .addCase(getARole.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.message = action.error;
            })
            .addCase(updateRole.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateRole.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.updatedRole = action.payload;
            })
            .addCase(updateRole.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.message = action.error;
            })
            .addCase(deleteRole.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteRole.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.deletedRole = action.payload;
            })
            .addCase(deleteRole.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.message = action.error;
            })
            .addCase(resetState, () => initialState);
    },
});

export default roleSlice.reducer;
