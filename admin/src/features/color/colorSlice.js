import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import colorService from './colorService';

const initialState = {
    colors: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: '',
};

export const getColors = createAsyncThunk('color/get-colors', async (colorName, thunkAPI) => {
    try {
        return await colorService.getColors(colorName);
    } catch (e) {
        return thunkAPI.rejectWithValue(e);
    }
});

export const createColors = createAsyncThunk('color/create-colors', async (dataColor, thunkAPI) => {
    try {
        return await colorService.createColors(dataColor);
    } catch (e) {
        return thunkAPI.rejectWithValue(e);
    }
});

export const getAColor = createAsyncThunk('color/get-a-color', async (colorId, thunkAPI) => {
    try {
        return await colorService.getAColor(colorId);
    } catch (e) {
        return thunkAPI.rejectWithValue(e);
    }
});

export const updateColor = createAsyncThunk('color/update-color', async (dataColor, thunkAPI) => {
    try {
        return await colorService.updateColor(dataColor);
    } catch (e) {
        return thunkAPI.rejectWithValue(e);
    }
});

export const deleteColor = createAsyncThunk('color/delete-color', async (colorId, thunkAPI) => {
    try {
        return await colorService.deleteColor(colorId);
    } catch (e) {
        return thunkAPI.rejectWithValue(e);
    }
});

export const resetState = createAction('Reset_all');

export const colorSlice = createSlice({
    name: 'colors',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getColors.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getColors.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.colors = action.payload;
            })
            .addCase(getColors.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(createColors.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createColors.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.createdColor = action.payload;
            })
            .addCase(createColors.rejected, (state, action) => {
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
