import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:5000/api/';

const register = async (userData) => {
    const response = await axios.post(`user/register`, userData);
    if (response.data) {
        return response.data;
    }
};

const login = async (userData) => {
    const response = await axios.post(`user/login`, userData);
    if (response.data) {
        return response.data;
    }
};

const getAUser = async (userId) => {
    const response = await axios.get(`user/get-user/${userId}`);
    if (response.data) {
        return response.data;
    }
};

const updateUser = async (userData) => {
    let getToken = JSON.parse(sessionStorage.getItem('customer'))?.token;
    axios.defaults.headers.common = { Authorization: `Bearer ${getToken}` };
    const response = await axios.put(`user/edit-user`, userData);
    if (response.data) {
        return response.data;
    }
};

const forgotPassToken = async (data) => {
    const response = await axios.post(`user/forgot-password-token`, data);
    if (response.data) {
        return response.data;
    }
};

const resetPassword = async (data) => {
    const response = await axios.put(`user/reset-password/${data.token}`, data.password);
    if (response.data) {
        return response.data;
    }
};

const changePassword = async (data) => {
    const response = await axios.put(`user/change-password`, data);
    if (response.data) {
        return response.data;
    }
};

const getUserWishList = async () => {
    let getToken = JSON.parse(sessionStorage.getItem('customer'))?.token;
    axios.defaults.headers.common = { Authorization: `Bearer ${getToken}` };
    const response = await axios.get(`user/wishlist`);
    if (response.data) {
        return response.data;
    }
};

const addToCart = async (cartData) => {
    let getToken = JSON.parse(sessionStorage.getItem('customer'))?.token;
    axios.defaults.headers.common = { Authorization: `Bearer ${getToken}` };
    const response = await axios.post(`user/add-to-cart`, cartData);
    if (response.data) {
        return response.data;
    }
};

const getCart = async () => {
    let getToken = JSON.parse(sessionStorage.getItem('customer'))?.token;
    axios.defaults.headers.common = { Authorization: `Bearer ${getToken}` };
    const response = await axios.get(`user/cart`);
    if (response.data) {
        return response.data;
    }
};

const removeProdCart = async (id) => {
    let getToken = JSON.parse(sessionStorage.getItem('customer'))?.token;
    axios.defaults.headers.common = { Authorization: `Bearer ${getToken}` };
    const response = await axios.delete(`user/delete-cart/${id}`);
    if (response.data) {
        return response.data;
    }
};
const updateQuantityCart = async (cartData) => {
    let getToken = JSON.parse(sessionStorage.getItem('customer'))?.token;
    axios.defaults.headers.common = { Authorization: `Bearer ${getToken}` };
    const response = await axios.put(`user/update-cart/${cartData.id}/${cartData.quantity}`);
    if (response.data) {
        return response.data;
    }
};

const createOrder = async (orderData) => {
    let getToken = JSON.parse(sessionStorage.getItem('customer'))?.token;
    axios.defaults.headers.common = { Authorization: `Bearer ${getToken}` };
    const response = await axios.post(`user/create-order/`, orderData);
    if (response.data) {
        return response.data;
    }
};

const emptyCart = async () => {
    let getToken = JSON.parse(sessionStorage.getItem('customer'))?.token;
    axios.defaults.headers.common = { Authorization: `Bearer ${getToken}` };
    const response = await axios.delete(`user/empty-cart/`);
    if (response.data) {
        return response.data;
    }
};

const applyCoupon = async (couponData) => {
    let getToken = JSON.parse(sessionStorage.getItem('customer'))?.token;
    axios.defaults.headers.common = { Authorization: `Bearer ${getToken}` };
    const response = await axios.post(`user/cart/applyCoupon`, { coupon: couponData });
    if (response.data) {
        return response.data;
    }
};

const userOrder = async () => {
    let getToken = JSON.parse(sessionStorage.getItem('customer'))?.token;
    axios.defaults.headers.common = { Authorization: `Bearer ${getToken}` };
    const response = await axios.get(`user/order`);
    if (response.data) {
        return response.data;
    }
};

const logout = async () => {
    const response = await axios.post(`user/logout`);
    if (response.data) {
        return response.data;
    }
};

export const authService = {
    register,
    login,
    getUserWishList,
    getAUser,
    updateUser,
    forgotPassToken,
    resetPassword,
    changePassword,
    addToCart,
    getCart,
    removeProdCart,
    updateQuantityCart,
    createOrder,
    emptyCart,
    applyCoupon,
    userOrder,
    logout,
};
