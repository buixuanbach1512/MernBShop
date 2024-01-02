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

export const addCoupon = createAsyncThunk('coupon/add-coupon', async (couponId, thunkAPI) => {
    try {
        return await couponService.addCoupon(couponId);
    } catch (e) {
        return thunkAPI.rejectWithValue(e);
    }
});

export const resetState = createAction('Reset-All');

export const couponSlice = createSlice({
    name: 'coupon',
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
