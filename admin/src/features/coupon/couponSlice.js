import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import couponService from './couponService';

const initialState = {
    coupons: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: '',
};

export const getCoupons = createAsyncThunk('coupon/get-coupons', async (couponName, thunkAPI) => {
    try {
        return await couponService.getCoupons(couponName);
    } catch (e) {
        return thunkAPI.rejectWithValue(e);
    }
});

export const createCoupons = createAsyncThunk('coupon/create-coupons', async (dataCoupon, thunkAPI) => {
    try {
        return await couponService.createCoupons(dataCoupon);
    } catch (e) {
        return thunkAPI.rejectWithValue(e);
    }
});

export const getACoupon = createAsyncThunk('coupon/get-a-coupon', async (couponId, thunkAPI) => {
    try {
        return await couponService.getACoupon(couponId);
    } catch (e) {
        return thunkAPI.rejectWithValue(e);
    }
});

export const updateCoupon = createAsyncThunk('coupon/update-coupon', async (dataCoupon, thunkAPI) => {
    try {
        return await couponService.updateCoupon(dataCoupon);
    } catch (e) {
        return thunkAPI.rejectWithValue(e);
    }
});

export const deleteCoupon = createAsyncThunk('coupon/delete-coupon', async (couponId, thunkAPI) => {
    try {
        return await couponService.deleteCoupon(couponId);
    } catch (e) {
        return thunkAPI.rejectWithValue(e);
    }
});

export const resetState = createAction('Reset_all');

export const couponSlice = createSlice({
    name: 'coupons',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getCoupons.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getCoupons.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.coupons = action.payload;
            })
            .addCase(getCoupons.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(createCoupons.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createCoupons.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.createdCoupon = action.payload;
            })
            .addCase(createCoupons.rejected, (state, action) => {
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
            .addCase(resetState, () => initialState);
    },
});

export default couponSlice.reducer;
