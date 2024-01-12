import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import { productService } from './productService';
import { toast } from 'react-toastify';
const initialState = {
    products: [],
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: '',
};
export const getAllProduct = createAsyncThunk('product/get-all-product', async (data, thunkAPI) => {
    try {
        return await productService.getAllProduct(data);
    } catch (e) {
        return thunkAPI.rejectWithValue(e);
    }
});

export const getAProduct = createAsyncThunk('product/get-a-product', async (id, thunkAPI) => {
    try {
        return await productService.getAProduct(id);
    } catch (e) {
        return thunkAPI.rejectWithValue(e);
    }
});

export const getProduct = createAsyncThunk('product/get-product', async (data, thunkAPI) => {
    try {
        return await productService.getProduct(data);
    } catch (e) {
        return thunkAPI.rejectWithValue(e);
    }
});

export const createProduct = createAsyncThunk('product/create-products', async (data, thunkAPI) => {
    try {
        return await productService.createProduct(data);
    } catch (e) {
        return thunkAPI.rejectWithValue(e);
    }
});

export const updateProduct = createAsyncThunk('product/update-product', async (data, thunkAPI) => {
    try {
        return await productService.updateProduct(data);
    } catch (e) {
        return thunkAPI.rejectWithValue(e);
    }
});

export const updateQuantity = createAsyncThunk('product/update-quantity-product', async (data, thunkAPI) => {
    try {
        return await productService.updateQuantity(data);
    } catch (e) {
        return thunkAPI.rejectWithValue(e);
    }
});

export const deleteProduct = createAsyncThunk('product/delete-product', async (id, thunkAPI) => {
    try {
        return await productService.deleteProduct(id);
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

export const getProductByCate = createAsyncThunk('product/get-product-by-cate', async (data, thunkAPI) => {
    try {
        return await productService.getProductByCate(data);
    } catch (e) {
        return thunkAPI.rejectWithValue(e);
    }
});

export const addToWishList = createAsyncThunk('product/add-to-wishlist', async (id, thunkAPI) => {
    try {
        return await productService.addToWishList(id);
    } catch (e) {
        return thunkAPI.rejectWithValue(e);
    }
});

export const compareProduct = createAsyncThunk('product/compare-product', async (id, thunkAPI) => {
    try {
        return await productService.compareProduct(id);
    } catch (e) {
        return thunkAPI.rejectWithValue(e);
    }
});

export const rating = createAsyncThunk('product/rating', async (data, thunkAPI) => {
    try {
        return await productService.rating(data);
    } catch (e) {
        return thunkAPI.rejectWithValue(e);
    }
});

export const resetState = createAction('Reset-all');

export const productSlice = createSlice({
    name: 'product',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllProduct.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.products = action.payload;
            })
            .addCase(getAllProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.message = action.error;
            })
            .addCase(createProduct.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.createdProduct = action.payload;
            })
            .addCase(createProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(getProductByCate.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getProductByCate.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.productCate = action.payload;
            })
            .addCase(getProductByCate.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
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
            .addCase(addToWishList.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addToWishList.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.addToWl = action.payload;
            })
            .addCase(addToWishList.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.message = action.error;
            })
            .addCase(compareProduct.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(compareProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.compareList = action.payload;
            })
            .addCase(compareProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.message = action.error;
            })
            .addCase(getAProduct.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.getAProd = action.payload;
            })
            .addCase(getAProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.message = action.error;
            })
            .addCase(rating.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(rating.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.rated = action.payload;
                if (state.isSuccess === true) {
                    toast.success('Đánh giá sản phẩm thành công');
                }
            })
            .addCase(rating.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.message = action.error;
                if (state.isError === true) {
                    toast.error('Đã có lỗi xảy ra');
                }
            })
            .addCase(resetState, () => initialState);
    },
});

export default productSlice.reducer;
