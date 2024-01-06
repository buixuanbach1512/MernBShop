import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import brandService from './brandService';

const initialState = {
    brands: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: '',
};

export const getBrands = createAsyncThunk('brand/get-brands', async (data, thunkAPI) => {
    try {
        return await brandService.getBrands(data);
    } catch (e) {
        return thunkAPI.rejectWithValue(e);
    }
});

export const createBrand = createAsyncThunk('brand/create-brand', async (data, thunkAPI) => {
    try {
        return await brandService.createBrand(data);
    } catch (e) {
        return thunkAPI.rejectWithValue(e);
    }
});

export const getABrand = createAsyncThunk('brand/get-a-brand', async (id, thunkAPI) => {
    try {
        return await brandService.getABrand(id);
    } catch (e) {
        return thunkAPI.rejectWithValue(e);
    }
});

export const updateBrand = createAsyncThunk('brand/update-brand', async (data, thunkAPI) => {
    try {
        return await brandService.updateBrand(data);
    } catch (e) {
        return thunkAPI.rejectWithValue(e);
    }
});

export const deleteBrand = createAsyncThunk('brand/delete-brand', async (id, thunkAPI) => {
    try {
        return await brandService.deleteBrand(id);
    } catch (e) {
        return thunkAPI.rejectWithValue(e);
    }
});

export const resetState = createAction('Reset_all');

export const brandSlice = createSlice({
    name: 'brands',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getBrands.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getBrands.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.brands = action.payload;
                state.message = 'Success';
            })
            .addCase(getBrands.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(createBrand.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createBrand.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.createdBrand = action.payload;
            })
            .addCase(createBrand.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(getABrand.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getABrand.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.getBrand = action.payload;
            })
            .addCase(getABrand.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(updateBrand.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateBrand.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.updatedBrand = action.payload;
            })
            .addCase(updateBrand.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(deleteBrand.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteBrand.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.deletedBr = action.payload;
            })
            .addCase(deleteBrand.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(resetState, () => initialState);
    },
});

export default brandSlice.reducer;
