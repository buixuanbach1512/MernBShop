import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import productService from './productService';

const initialState = {
    products: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: '',
};

export const getProducts = createAsyncThunk('product/get-products', async (queryData, thunkAPI) => {
    try {
        return await productService.getProducts(queryData);
    } catch (e) {
        return thunkAPI.rejectWithValue(e);
    }
});

export const getAProduct = createAsyncThunk('product/get-a-product', async (producId, thunkAPI) => {
    try {
        return await productService.getAProduct(producId);
    } catch (e) {
        return thunkAPI.rejectWithValue(e);
    }
});

export const getProduct = createAsyncThunk('product/get-product', async (queryData, thunkAPI) => {
    try {
        return await productService.getProduct(queryData);
    } catch (e) {
        return thunkAPI.rejectWithValue(e);
    }
});

export const createProducts = createAsyncThunk('product/create-products', async (productData, thunkAPI) => {
    try {
        return await productService.createProduct(productData);
    } catch (e) {
        return thunkAPI.rejectWithValue(e);
    }
});

export const updateProduct = createAsyncThunk('product/update-product', async (productData, thunkAPI) => {
    try {
        return await productService.updateProduct(productData);
    } catch (e) {
        return thunkAPI.rejectWithValue(e);
    }
});

export const updateQuantity = createAsyncThunk('product/update-quantity-product', async (productData, thunkAPI) => {
    try {
        return await productService.updateQuantity(productData);
    } catch (e) {
        return thunkAPI.rejectWithValue(e);
    }
});

export const deleteProduct = createAsyncThunk('product/delete-product', async (productId, thunkAPI) => {
    try {
        return await productService.deleteProduct(productId);
    } catch (e) {
        return thunkAPI.rejectWithValue(e);
    }
});

export const updateRating = createAsyncThunk('product/update-rating', async (data, thunkAPI) => {
    try {
        return await productService.updateRating(data);
    } catch (e) {
        return thunkAPI.rejectWithValue(e);
    }
});

export const deleteRating = createAsyncThunk('product/delete-rating', async (data, thunkAPI) => {
    try {
        return await productService.deleteRating(data);
    } catch (e) {
        return thunkAPI.rejectWithValue(e);
    }
});

export const resetState = createAction('Reset_all');

export const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getProducts.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getProducts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.products = action.payload;
                state.message = 'Success';
            })
            .addCase(getProducts.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(createProducts.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createProducts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.createdProduct = action.payload;
            })
            .addCase(createProducts.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(getAProduct.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.getAProduct = action.payload;
            })
            .addCase(getAProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(getProduct.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.getProduct = action.payload;
            })
            .addCase(getProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(updateProduct.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.updatedProd = action.payload;
            })
            .addCase(updateProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(updateQuantity.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateQuantity.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.updatedQuan = action.payload;
            })
            .addCase(updateQuantity.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(deleteProduct.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.deletedProd = action.payload;
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(updateRating.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateRating.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.updatedRate = action.payload;
            })
            .addCase(updateRating.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(deleteRating.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteRating.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.deletedRate = action.payload;
            })
            .addCase(deleteRating.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(resetState, () => initialState);
    },
});

export default productSlice.reducer;
