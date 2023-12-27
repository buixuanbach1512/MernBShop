import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import brandService from './brandService';

const initialState = {
    brands: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: '',
};

export const getBrands = createAsyncThunk('brand/get-brands', async (brandName, thunkAPI) => {
    try {
        return await brandService.getBrands(brandName);
    } catch (e) {
        return thunkAPI.rejectWithValue(e);
    }
});

export const createBrands = createAsyncThunk('brand/create-brands', async (dataBrand, thunkAPI) => {
    try {
        return await brandService.createBrands(dataBrand);
    } catch (e) {
        return thunkAPI.rejectWithValue(e);
    }
});

export const getABrand = createAsyncThunk('brand/get-a-brand', async (brandId, thunkAPI) => {
    try {
        return await brandService.getABrand(brandId);
    } catch (e) {
        return thunkAPI.rejectWithValue(e);
    }
});

export const updateBrand = createAsyncThunk('brand/update-brand', async (dataBrand, thunkAPI) => {
    try {
        return await brandService.updateBrand(dataBrand);
    } catch (e) {
        return thunkAPI.rejectWithValue(e);
    }
});

export const deleteBrand = createAsyncThunk('brand/delete-brand', async (brandId, thunkAPI) => {
    try {
        return await brandService.deleteBrand(brandId);
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
            .addCase(createBrands.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createBrands.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.createdBrands = action.payload;
            })
            .addCase(createBrands.rejected, (state, action) => {
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
