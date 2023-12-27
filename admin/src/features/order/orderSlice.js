import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import orderService from './orderService';

const initialState = {
    orders: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: '',
};

export const getAllOrders = createAsyncThunk('order/get-all-orders', async (thunkAPI) => {
    try {
        return await orderService.getAllOrders();
    } catch (e) {
        return thunkAPI.rejectWithValue(e);
    }
});

export const getOrderById = createAsyncThunk('order/get-order', async (orderId, thunkAPI) => {
    try {
        return await orderService.getOrderById(orderId);
    } catch (e) {
        return thunkAPI.rejectWithValue(e);
    }
});

export const resetState = createAction('Reset_all');

export const orderSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllOrders.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllOrders.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.orders = action.payload;
                state.isError = false;
            })
            .addCase(getAllOrders.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(getOrderById.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getOrderById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.getOrder = action.payload.products;
                state.isError = false;
            })
            .addCase(getOrderById.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(resetState, () => initialState);
    },
});

export default orderSlice.reducer;
