import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import uploadService from './uploadService';

const initialState = {
    images: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: '',
};

export const uploadImg = createAsyncThunk('upload/upload-images', async (data, thunkAPI) => {
    try {
        const formData = new FormData();
        for (let i = 0; i < data.length; i++) {
            formData.append('images', data[i]);
        }
        return await uploadService.uploadImg(formData);
    } catch (e) {
        return thunkAPI.rejectWithValue(e);
    }
});

export const deleteImg = createAsyncThunk('delete/upload-images', async (id, thunkAPI) => {
    try {
        return await uploadService.deleteImg(id);
    } catch (e) {
        return thunkAPI.rejectWithValue(e);
    }
});

export const resetStateUpload = createAction('Reset-all');

export const uploadSlice = createSlice({
    name: 'images',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(uploadImg.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(uploadImg.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.images = action.payload;
            })
            .addCase(uploadImg.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(deleteImg.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteImg.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.images = [];
            })
            .addCase(deleteImg.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.payload;
            })
            .addCase(resetStateUpload, () => initialState);
    },
});

export default uploadSlice.reducer;
