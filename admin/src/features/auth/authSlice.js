import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import authService from './authService';
import { toast } from 'react-toastify';

const getUserfromSessionStorage = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')) : null;

const initialState = {
    user: getUserfromSessionStorage,
    orders: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: '',
};

export const register = createAsyncThunk('auth/admin-register', async (user, thunkAPI) => {
    try {
        return await authService.register(user);
    } catch (e) {
        return thunkAPI.rejectWithValue(e);
    }
});

export const login = createAsyncThunk('auth/admin-login', async (user, thunkAPI) => {
    try {
        return await authService.login(user);
    } catch (e) {
        return thunkAPI.rejectWithValue(e);
    }
});

export const getAllOrders = createAsyncThunk('auth/get-all-orders', async (thunkAPI) => {
    try {
        return await authService.getAllOrders();
    } catch (e) {
        return thunkAPI.rejectWithValue(e);
    }
});

export const getOrderById = createAsyncThunk('auth/get-order', async (orderId, thunkAPI) => {
    try {
        return await authService.getOrderById(orderId);
    } catch (e) {
        return thunkAPI.rejectWithValue(e);
    }
});

export const updateOrder = createAsyncThunk('auth/update-order', async (data, thunkAPI) => {
    try {
        return await authService.updateOrder(data);
    } catch (e) {
        return thunkAPI.rejectWithValue(e);
    }
});

export const deleteOrder = createAsyncThunk('auth/delete-order', async (id, thunkAPI) => {
    try {
        return await authService.deleteOrder(id);
    } catch (e) {
        return thunkAPI.rejectWithValue(e);
    }
});

export const deleteUser = createAsyncThunk('auth/delete-user', async (id, thunkAPI) => {
    try {
        return await authService.deleteUser(id);
    } catch (e) {
        return thunkAPI.rejectWithValue(e);
    }
});

export const getCountOrderByMonth = createAsyncThunk('order/get-order-by-month', async (thunkAPI) => {
    try {
        return await authService.getCountOrderByMonth();
    } catch (e) {
        return thunkAPI.rejectWithValue(e);
    }
});

export const getCountOrderByYear = createAsyncThunk('order/get-order-by-year', async (thunkAPI) => {
    try {
        return await authService.getCountOrderByYear();
    } catch (e) {
        return thunkAPI.rejectWithValue(e);
    }
});

export const resetState = createAction('Reset_all');

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.createdUser = action.payload;
                if (state.isSuccess === true) {
                    toast.success('Tạo tài khoản thành công');
                }
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.message = action.error;
                if (state.isError === true) {
                    toast.error('Đã có lỗi xảy ra');
                }
            })
            .addCase(login.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
                state.isError = false;
                if (state.isSuccess === true) {
                    let newUserData = {
                        _id: action.payload._id,
                        token: action.payload.token,
                        permissions: action.payload.permissions,
                    };
                    sessionStorage.setItem('user', JSON.stringify(newUserData));
                    toast.success('Đăng nhập thành công!');
                }
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.payload.response.data.message;
            })
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

export default authSlice.reducer;
