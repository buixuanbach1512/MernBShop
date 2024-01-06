import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import orderService from './orderService';
import { toast } from 'react-toastify';

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

export const getOrderById = createAsyncThunk('order/get-order', async (id, thunkAPI) => {
    try {
        return await orderService.getOrderById(id);
    } catch (e) {
        return thunkAPI.rejectWithValue(e);
    }
});

export const updateOrder = createAsyncThunk('order/update-order', async (data, thunkAPI) => {
    try {
        return await orderService.updateOrder(data);
    } catch (e) {
        return thunkAPI.rejectWithValue(e);
    }
});

export const deleteOrder = createAsyncThunk('order/delete-order', async (id, thunkAPI) => {
    try {
        return await orderService.deleteOrder(id);
    } catch (e) {
        return thunkAPI.rejectWithValue(e);
    }
});

export const deleteUser = createAsyncThunk('order/delete-user', async (id, thunkAPI) => {
    try {
        return await orderService.deleteUser(id);
    } catch (e) {
        return thunkAPI.rejectWithValue(e);
    }
});

export const getCountOrderByMonth = createAsyncThunk('order/get-order-by-month', async (thunkAPI) => {
    try {
        return await orderService.getCountOrderByMonth();
    } catch (e) {
        return thunkAPI.rejectWithValue(e);
    }
});

export const getCountOrderByYear = createAsyncThunk('order/get-order-by-year', async (thunkAPI) => {
    try {
        return await orderService.getCountOrderByYear();
    } catch (e) {
        return thunkAPI.rejectWithValue(e);
    }
});

export const resetState = createAction('Reset_all');

export const orderSlice = createSlice({
    name: 'order',
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
                state.getOrder = action.payload;
                state.isError = false;
            })
            .addCase(getOrderById.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(updateOrder.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateOrder.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.updatedOrder = action.payload;
                if (state.isSuccess === true) {
                    toast.success('Đã thay đổi trạng thái đơn hàng');
                }
            })
            .addCase(updateOrder.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                if (state.isError === true) {
                    toast.error('Đã có lỗi xảy ra');
                }
            })
            .addCase(deleteOrder.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteOrder.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.deletedOrder = action.payload;
                if (state.isSuccess === true) {
                    toast.success('Đã xóa đơn hàng');
                }
            })
            .addCase(deleteOrder.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                if (state.isError === true) {
                    toast.error('Đã có lỗi xảy ra');
                }
            })
            .addCase(deleteUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.deletedUser = action.payload;
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                if (state.isError === true) {
                    toast.error('Đã có lỗi xảy ra');
                }
            })
            .addCase(getCountOrderByMonth.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getCountOrderByMonth.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.countOrderMonth = action.payload;
            })
            .addCase(getCountOrderByMonth.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(getCountOrderByYear.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getCountOrderByYear.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.countOrderYear = action.payload;
            })
            .addCase(getCountOrderByYear.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(resetState, () => initialState);
    },
});

export default orderSlice.reducer;
