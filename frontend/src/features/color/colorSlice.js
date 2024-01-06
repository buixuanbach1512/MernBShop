import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import colorService from './colorService';

const initialState = {
    colors: [],
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: '',
};

export const getAllColor = createAsyncThunk('color/get-all-colors', async (data, thunkAPI) => {
    try {
        return await colorService.getAllColor(data);
    } catch (e) {
        return thunkAPI.rejectWithValue(e);
    }
});

export const createColor = createAsyncThunk('color/create-colors', async (data, thunkAPI) => {
    try {
        return await colorService.createColor(data);
    } catch (e) {
        return thunkAPI.rejectWithValue(e);
    }
});

export const getAColor = createAsyncThunk('color/get-a-color', async (id, thunkAPI) => {
    try {
        return await colorService.getAColor(id);
    } catch (e) {
        return thunkAPI.rejectWithValue(e);
    }
});

export const updateColor = createAsyncThunk('color/update-color', async (data, thunkAPI) => {
    try {
        return await colorService.updateColor(data);
    } catch (e) {
        return thunkAPI.rejectWithValue(e);
    }
});

export const deleteColor = createAsyncThunk('color/delete-color', async (id, thunkAPI) => {
    try {
        return await colorService.deleteColor(id);
    } catch (e) {
        return thunkAPI.rejectWithValue(e);
    }
});

export const resetState = createAction('Reset-All');

export const colorSlice = createSlice({
    name: 'color',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllColor.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllColor.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.colors = action.payload;
            })
            .addCase(getAllColor.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.message = action.error;
            })
            .addCase(createColor.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createColor.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.createdColor = action.payload;
            })
            .addCase(createColor.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(getAColor.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAColor.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.getColor = action.payload;
            })
            .addCase(getAColor.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(updateColor.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateColor.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.updatedColor = action.payload;
            })
            .addCase(updateColor.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(deleteColor.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteColor.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.deletedCol = action.payload;
            })
            .addCase(deleteColor.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(resetState, () => initialState);
    },
});

export default colorSlice.reducer;
