import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import categoryService from './categoryService';

const initialState = {
    categories: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: '',
};

export const getCategories = createAsyncThunk('category/get-categories', async (catName, thunkAPI) => {
    try {
        return await categoryService.getCategories(catName);
    } catch (e) {
        return thunkAPI.rejectWithValue(e);
    }
});

export const createCategories = createAsyncThunk('category/create-categories', async (catData, thunkAPI) => {
    try {
        return await categoryService.createCategories(catData);
    } catch (e) {
        return thunkAPI.rejectWithValue(e);
    }
});

export const getACategory = createAsyncThunk('category/get-a-category', async (catId, thunkAPI) => {
    try {
        return await categoryService.getACategory(catId);
    } catch (e) {
        return thunkAPI.rejectWithValue(e);
    }
});

export const updateCategory = createAsyncThunk('category/update-category', async (catData, thunkAPI) => {
    try {
        return await categoryService.updateCategory(catData);
    } catch (e) {
        return thunkAPI.rejectWithValue(e);
    }
});

export const deleteCategory = createAsyncThunk('category/delete-category', async (catId, thunkAPI) => {
    try {
        return await categoryService.deleteCategory(catId);
    } catch (e) {
        return thunkAPI.rejectWithValue(e);
    }
});

export const resetState = createAction('Reset_all');

export const categorySlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getCategories.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getCategories.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.categories = action.payload;
                state.message = 'Success';
            })
            .addCase(getCategories.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(createCategories.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createCategories.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.createdCategory = action.payload;
                state.message = 'Success';
            })
            .addCase(createCategories.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(getACategory.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getACategory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.getACat = action.payload;
            })
            .addCase(getACategory.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(updateCategory.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateCategory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.updatedCat = action.payload;
            })
            .addCase(updateCategory.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(deleteCategory.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteCategory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.deletedCat = action.payload;
            })
            .addCase(deleteCategory.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(resetState, () => initialState);
    },
});

export default categorySlice.reducer;
