import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import couponService from './couponService';
import { toast } from 'react-toastify';

const initialState = {
    coupons: [],
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: '',
};

export const getAllCoupon = createAsyncThunk('coupon/get-all-coupon', async (thunkAPI) => {
    try {
        return await couponService.getAllCoupon();
    } catch (e) {
        return thunkAPI.rejectWithValue(e);
    }
});

export const createCoupon = createAsyncThunk('coupon/create-coupon', async (data, thunkAPI) => {
    try {
        return await couponService.createCoupons(data);
    } catch (e) {
        return thunkAPI.rejectWithValue(e);
    }
});

export const getACoupon = createAsyncThunk('coupon/get-a-coupon', async (id, thunkAPI) => {
    try {
        return await couponService.getACoupon(id);
    } catch (e) {
        return thunkAPI.rejectWithValue(e);
    }
});

export const updateCoupon = createAsyncThunk('coupon/update-coupon', async (data, thunkAPI) => {
    try {
        return await couponService.updateCoupon(data);
    } catch (e) {
        return thunkAPI.rejectWithValue(e);
    }
});

export const deleteCoupon = createAsyncThunk('coupon/delete-coupon', async (id, thunkAPI) => {
    try {
        return await couponService.deleteCoupon(id);
    } catch (e) {
        return thunkAPI.rejectWithValue(e);
    }
});

export const addCoupon = createAsyncThunk('coupon/add-coupon', async (id, thunkAPI) => {
    try {
        return await couponService.addCoupon(id);
    } catch (e) {
        return thunkAPI.rejectWithValue(e);
    }
});

export const resetState = createAction('Reset-All');

export const couponSlice = createSlice({
    name: 'coupons',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllCoupon.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllCoupon.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.coupons = action.payload;
            })
            .addCase(getAllCoupon.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.message = action.error;
            })
            .addCase(createCoupon.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createCoupon.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.createdCoupon = action.payload;
            })
            .addCase(createCoupon.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(getACoupon.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getACoupon.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.getCoupon = action.payload;
            })
            .addCase(getACoupon.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(updateCoupon.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateCoupon.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.updatedCoupon = action.payload;
            })
            .addCase(updateCoupon.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(deleteCoupon.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteCoupon.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.deletedCoup = action.payload;
            })
            .addCase(deleteCoupon.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(addCoupon.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addCoupon.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.addedCoup = action.payload;
                if (state.isSuccess == true) {
                    toast.success('Nhận thành công');
                }
            })
            .addCase(addCoupon.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.message = action.error;
                if (state.isError == true) {
                    toast.error(action.payload.response.data.message);
                }
            })
            .addCase(resetState, () => initialState);
    },
});

export default couponSlice.reducer;
