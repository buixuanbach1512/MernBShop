import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import sizeService from './sizeService';

const initialState = {
    sizes: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: '',
};

export const getSize = createAsyncThunk('size/get-size', async (sizeName, thunkAPI) => {
    try {
        return await sizeService.getSize(sizeName);
    } catch (e) {
        return thunkAPI.rejectWithValue(e);
    }
});

export const createSize = createAsyncThunk('size/create-size', async (dataSize, thunkAPI) => {
    try {
        return await sizeService.createSize(dataSize);
    } catch (e) {
        return thunkAPI.rejectWithValue(e);
    }
});

export const getASize = createAsyncThunk('size/get-a-size', async (sizeId, thunkAPI) => {
    try {
        return await sizeService.getASize(sizeId);
    } catch (e) {
        return thunkAPI.rejectWithValue(e);
    }
});

export const updateSize = createAsyncThunk('size/update-size', async (dataSize, thunkAPI) => {
    try {
        return await sizeService.updateSize(dataSize);
    } catch (e) {
        return thunkAPI.rejectWithValue(e);
    }
});

export const deleteSize = createAsyncThunk('size/delete-size', async (sizeId, thunkAPI) => {
    try {
        return await sizeService.deleteSize(sizeId);
    } catch (e) {
        return thunkAPI.rejectWithValue(e);
    }
});

export const resetState = createAction('Reset_all');

export const sizeSlice = createSlice({
    name: 'sizes',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getSize.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getSize.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.sizes = action.payload;
            })
            .addCase(getSize.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(createSize.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createSize.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.createdSize = action.payload;
            })
            .addCase(createSize.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(getASize.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getASize.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.getSize = action.payload;
            })
            .addCase(getASize.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(updateSize.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateSize.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.updatedSize = action.payload;
            })
            .addCase(updateSize.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(deleteSize.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteSize.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.deletedCol = action.payload;
            })
            .addCase(deleteSize.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(resetState, () => initialState);
    },
});

export default sizeSlice.reducer;
