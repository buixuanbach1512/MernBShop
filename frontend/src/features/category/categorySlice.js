import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import categoryService from './categoryService';

const initialState = {
    categories: [],
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: '',
};

export const getAllCategory = createAsyncThunk('category/get-all-categories', async (data, thunkAPI) => {
    try {
        return await categoryService.getAllCategory(data);
    } catch (e) {
        return thunkAPI.rejectWithValue(e);
    }
});

export const createCategories = createAsyncThunk('category/create-categories', async (data, thunkAPI) => {
    try {
        return await categoryService.createCategories(data);
    } catch (e) {
        return thunkAPI.rejectWithValue(e);
    }
});

export const getACategory = createAsyncThunk('category/get-a-category', async (id, thunkAPI) => {
    try {
        return await categoryService.getACategory(id);
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

export const updateCategory = createAsyncThunk('category/update-category', async (data, thunkAPI) => {
    try {
        return await categoryService.updateCategory(data);
    } catch (e) {
        return thunkAPI.rejectWithValue(e);
    }
});

export const deleteCategory = createAsyncThunk('category/delete-category', async (id, thunkAPI) => {
    try {
        return await categoryService.deleteCategory(id);
    } catch (e) {
        return thunkAPI.rejectWithValue(e);
    }
});

export const resetState = createAction('Reset-All');

export const categorySlice = createSlice({
    name: 'categories',
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
            .addCase(createCategories.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createCategories.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.createdCategory = action.payload;
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
