import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import { categoryService } from './categoryService';

const initialState = {
    categories: [],
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: '',
};

export const getAllCategory = createAsyncThunk('category/get-all-categories', async (thunkAPI) => {
    try {
        return await categoryService.getAllCategory();
    } catch (e) {
        return thunkAPI.rejectWithValue(e);
    }
});

export const getProdCategory = createAsyncThunk('category/get-category-product', async (thunkAPI) => {
    try {
        return await categoryService.getProdCategory();
    } catch (e) {
        return thunkAPI.rejectWithValue(e);
    }
});

export const resetState = createAction('Reset-All');

export const categorySlice = createSlice({
    name: 'category',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllCategory.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllCategory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.categories = action.payload;
            })
            .addCase(getAllCategory.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.message = action.error;
            })
            .addCase(getProdCategory.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getProdCategory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.prodCategories = action.payload;
            })
            .addCase(getProdCategory.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.message = action.error;
            })
            .addCase(resetState, () => initialState);
    },
});

export default categorySlice.reducer;
