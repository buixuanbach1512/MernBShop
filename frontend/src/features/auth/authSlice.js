import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import authService from './authService';
import { toast } from 'react-toastify';

const initialState = {
    user: JSON.parse(sessionStorage.getItem('user')),
    cart: [],
    createdUser: '',
    allUser: [],
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: '',
};

export const register = createAsyncThunk('auth/register', async (data, thunkAPI) => {
    try {
        return await authService.register(data);
    } catch (e) {
        return thunkAPI.rejectWithValue(e);
    }
});

export const login = createAsyncThunk('auth/login', async (data, thunkAPI) => {
    try {
        return await authService.login(data);
    } catch (e) {
        return thunkAPI.rejectWithValue(e);
    }
});

export const getAllUser = createAsyncThunk('auth/get-all-user', async (data, thunkAPI) => {
    try {
        return await authService.getAllUser(data);
    } catch (e) {
        return thunkAPI.rejectWithValue(e);
    }
});

export const getUserWishList = createAsyncThunk('auth/get-wishlist', async (thunkAPI) => {
    try {
        return await authService.getUserWishList();
    } catch (e) {
        return thunkAPI.rejectWithValue(e);
    }
});

export const getUserCoupon = createAsyncThunk('auth/get-coupon', async (thunkAPI) => {
    try {
        return await authService.getUserCoupon();
    } catch (e) {
        return thunkAPI.rejectWithValue(e);
    }
});

export const getUser = createAsyncThunk('auth/get-user', async (id, thunkAPI) => {
    try {
        return await authService.getUser(id);
    } catch (e) {
        return thunkAPI.rejectWithValue(e);
    }
});

export const updateUser = createAsyncThunk('auth/update-user', async (data, thunkAPI) => {
    try {
        return await authService.updateUser(data);
    } catch (e) {
        return thunkAPI.rejectWithValue(e);
    }
});

export const updateUserById = createAsyncThunk('customer/update-customer', async (data, thunkAPI) => {
    try {
        return await authService.updateUserById(data);
    } catch (e) {
        return thunkAPI.rejectWithValue(e);
    }
});

export const blockUser = createAsyncThunk('customer/block-user', async (id, thunkAPI) => {
    try {
        return await authService.blockUser(id);
    } catch (e) {
        return thunkAPI.rejectWithValue(e);
    }
});

export const unBlockUser = createAsyncThunk('customer/unblock-user', async (id, thunkAPI) => {
    try {
        return await authService.unBlockUser(id);
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

export const forgotPassToken = createAsyncThunk('auth/forgot-password-token', async (data, thunkAPI) => {
    try {
        return await authService.forgotPassToken(data);
    } catch (e) {
        return thunkAPI.rejectWithValue(e);
    }
});

export const resetPassword = createAsyncThunk('auth/reset-password', async (data, thunkAPI) => {
    try {
        return await authService.resetPassword(data);
    } catch (e) {
        return thunkAPI.rejectWithValue(e);
    }
});

export const changePassword = createAsyncThunk('auth/change-password', async (data, thunkAPI) => {
    try {
        return await authService.changePassword(data);
    } catch (e) {
        return thunkAPI.rejectWithValue(e);
    }
});

export const addToCart = createAsyncThunk('auth/add-to-cart', async (data, thunkAPI) => {
    try {
        return await authService.addToCart(data);
    } catch (e) {
        return thunkAPI.rejectWithValue(e);
    }
});

export const getCart = createAsyncThunk('auth/get-cart', async (thunkAPI) => {
    try {
        return await authService.getCart();
    } catch (e) {
        return thunkAPI.rejectWithValue(e);
    }
});

export const removeProdCart = createAsyncThunk('auth/remove-product-cart', async (id, thunkAPI) => {
    try {
        return await authService.removeProdCart(id);
    } catch (e) {
        return thunkAPI.rejectWithValue(e);
    }
});

export const updateCart = createAsyncThunk('auth/update-cart', async (data, thunkAPI) => {
    try {
        return await authService.updateQuantityCart(data);
    } catch (e) {
        return thunkAPI.rejectWithValue(e);
    }
});

export const createOrder = createAsyncThunk('auth/create-order', async (data, thunkAPI) => {
    try {
        return await authService.createOrder(data);
    } catch (e) {
        return thunkAPI.rejectWithValue(e);
    }
});

export const emptyCart = createAsyncThunk('auth/emptycart', async (thunkAPI) => {
    try {
        return await authService.emptyCart();
    } catch (e) {
        return thunkAPI.rejectWithValue(e);
    }
});

export const applyCoupon = createAsyncThunk('auth/apply-coupon', async (data, thunkAPI) => {
    try {
        return await authService.applyCoupon(data);
    } catch (e) {
        return thunkAPI.rejectWithValue(e);
    }
});

export const userOrder = createAsyncThunk('auth/order', async (thunkAPI) => {
    try {
        return await authService.userOrder();
    } catch (e) {
        return thunkAPI.rejectWithValue(e);
    }
});

export const logout = createAsyncThunk('auth/logout', async (thunkAPI) => {
    try {
        return await authService.logout();
    } catch (e) {
        return thunkAPI.rejectWithValue(e);
    }
});

export const resetState = createAction('Reset-all');

export const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.createdUser = action.payload;
                if (state.isSuccess === true) {
                    toast.success('Đăng ký thành công!');
                }
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                if (state.isError === true) {
                    toast.error(action.payload.response.data.message);
                }
            })
            .addCase(login.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.user = action.payload;
                if (state.isSuccess === true) {
                    let newdata = {
                        _id: action.payload._id,
                        token: action.payload.token,
                        name: action.payload.name,
                        email: action.payload.email,
                        mobile: action.payload.mobile,
                        address: action.payload.address,
                        type: action.payload.type,
                        permissions: action.payload.permissions,
                    };
                    sessionStorage.setItem('user', JSON.stringify(newdata));
                    toast.success('Đăng nhập thành công!');
                }
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                if (state.isError === true) {
                    toast.error(action.payload.response.data.message);
                }
            })
            .addCase(getAllUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.allUser = action.payload;
            })
            .addCase(getAllUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(getUserWishList.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getUserWishList.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.wishList = action.payload;
            })
            .addCase(getUserWishList.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(getUserCoupon.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getUserCoupon.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.coupons = action.payload;
            })
            .addCase(getUserCoupon.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(getUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.getUser = action.payload;
            })
            .addCase(getUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(updateUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.updatedUser = action.payload;
                if (state.isSuccess === true) {
                    let currentdata = JSON.parse(sessionStorage.getItem('user'));
                    let newdata = {
                        _id: currentdata?._id,
                        token: currentdata?.token,
                        name: action.payload.name,
                        email: action.payload.email,
                        mobile: action.payload.mobile,
                        address: action.payload.address,
                    };
                    sessionStorage.setItem('user', JSON.stringify(newdata));
                    state.user = newdata;
                    toast.success('Cập nhật thành công');
                }
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                if (state.isError === true) {
                    toast.error('Cập nhật thất bại');
                }
            })
            .addCase(deleteUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.deletedUser = action.payload;
                if (state.isSuccess === true) {
                    toast.success('Xóa người dùng thành công');
                }
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
            .addCase(updateUserById.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateUserById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.updatedUser = action.payload;
                state.message = 'Success';
            })
            .addCase(updateUserById.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(blockUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(blockUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.blocked = action.payload;
                state.isError = false;
            })
            .addCase(blockUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(unBlockUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(unBlockUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.unBlocked = action.payload;
                state.isError = false;
            })
            .addCase(unBlockUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(forgotPassToken.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(forgotPassToken.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.forgotPassToken = action.payload;
                if (state.isSuccess === true) {
                    toast.success('Gửi yêu cầu thành công');
                }
            })
            .addCase(forgotPassToken.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                if (state.isError === true) {
                    toast.error('Đã có lỗi xảy ra');
                }
            })
            .addCase(resetPassword.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(resetPassword.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.resetedPassword = action.payload;
                if (state.isSuccess === true) {
                    toast.success('Làm mới mật khẩu thành công');
                }
            })
            .addCase(resetPassword.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                if (state.isError === true) {
                    toast.error('Đã có lỗi xảy ra');
                }
            })
            .addCase(changePassword.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(changePassword.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.changedPassword = action.payload;
                if (state.isSuccess === true) {
                    toast.success('Thay đổi mật khẩu thành công');
                }
            })
            .addCase(changePassword.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                if (state.isError === true) {
                    toast.error(action.payload.response.data.message);
                }
            })
            .addCase(addToCart.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addToCart.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.addcart = action.payload;
                if (state.isSuccess === true) {
                    toast.success('Sản phẩm được thêm vào giỏ hàng');
                }
            })
            .addCase(addToCart.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                if (state.isError === true) {
                    toast.error(action.payload.response.data.message);
                }
            })
            .addCase(getCart.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getCart.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.cart = action.payload;
            })
            .addCase(getCart.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(removeProdCart.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(removeProdCart.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.removedProdCart = action.payload;
                if (state.isSuccess === true) {
                    toast.success('Xóa sản phẩm thành công');
                }
            })
            .addCase(removeProdCart.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                if (state.isError === true) {
                    toast.error('Đã có lỗi xảy ra!!!');
                }
            })
            .addCase(updateCart.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateCart.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.updatedCart = action.payload;
                if (state.isSuccess === true) {
                    toast.success('Cập nhật giỏ hàng thành công');
                }
            })
            .addCase(updateCart.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                if (state.isError === true) {
                    toast.error('Đã có lỗi xảy ra!!!');
                }
            })
            .addCase(createOrder.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createOrder.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.createdOrder = action.payload;
                if (state.isSuccess === true) {
                    toast.success('Đặt hàng thành công');
                }
            })
            .addCase(createOrder.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                if (state.isError === true) {
                    toast.error('Đã có lỗi xảy ra!!!');
                }
            })
            .addCase(emptyCart.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(emptyCart.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.empCart = action.payload;
            })
            .addCase(emptyCart.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(applyCoupon.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(applyCoupon.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.totalPriceAfterDiscount = action.payload;
                if (state.isSuccess === true) {
                    toast.success('Nhập mã giảm giá thành công');
                }
            })
            .addCase(applyCoupon.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                if (state.isError === true) {
                    toast.error(action.payload.response.data.message);
                }
            })
            .addCase(userOrder.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(userOrder.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.orders = action.payload;
            })
            .addCase(userOrder.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(logout.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(logout.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.logout = action.payload;
            })
            .addCase(logout.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(resetState, () => initialState);
    },
});

export default authSlice.reducer;
