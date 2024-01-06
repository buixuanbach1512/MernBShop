import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:5000/api/';

const register = async (data) => {
    const response = await axios.post(`user/register`, data);
    if (response.data) {
        return response.data;
    }
};

const login = async (data) => {
    const response = await axios.post(`user/login`, data);
    if (response.data) {
        return response.data;
    }
};

const loginAdmin = async (data) => {
    const response = await axios.post(`user/login-admin`, data);
    if (response.data) {
        return response.data;
    }
};

const getUser = async (id) => {
    let getToken = JSON.parse(sessionStorage.getItem('user'))?.token;
    axios.defaults.headers.common = { Authorization: `Bearer ${getToken}` };
    const response = await axios.get(`user/get-user/${id}`);
    if (response.data) {
        return response.data;
    }
};

const getAllUser = async (data) => {
    const response = await axios.get(`user/all-users?${data ? `name=${data}` : ''}`);
    if (response.data) {
        return response.data;
    }
};

const updateUser = async (data) => {
    let getToken = JSON.parse(sessionStorage.getItem('user'))?.token;
    axios.defaults.headers.common = { Authorization: `Bearer ${getToken}` };
    const response = await axios.put(`user/edit-user`, data);
    if (response.data) {
        return response.data;
    }
};

const updateUserById = async (data) => {
    let getToken = JSON.parse(sessionStorage.getItem('user'))?.token;
    axios.defaults.headers.common = { Authorization: `Bearer ${getToken}` };
    const response = await axios.put(`user/edit-user/${data.id}`, data.userData);
    if (response.data) {
        return response.data;
    }
};

const blockUser = async (id) => {
    let getToken = JSON.parse(sessionStorage.getItem('user'))?.token;
    axios.defaults.headers.common = { Authorization: `Bearer ${getToken}` };
    const response = await axios.put(`user/block-user/${id}`);
    if (response.data) {
        return response.data;
    }
};

const deleteUser = async (id) => {
    let getToken = JSON.parse(sessionStorage.getItem('user'))?.token;
    axios.defaults.headers.common = { Authorization: `Bearer ${getToken}` };
    const response = await axios.delete(`user/${id}`);
    return response.data;
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
    let getToken = JSON.parse(sessionStorage.getItem('user'))?.token;
    axios.defaults.headers.common = { Authorization: `Bearer ${getToken}` };
    const response = await axios.get(`user/wishlist`);
    if (response.data) {
        return response.data;
    }
};

const getUserCoupon = async () => {
    let getToken = JSON.parse(sessionStorage.getItem('user'))?.token;
    axios.defaults.headers.common = { Authorization: `Bearer ${getToken}` };
    const response = await axios.get(`user/coupon`);
    if (response.data) {
        return response.data;
    }
};

const addToCart = async (data) => {
    let getToken = JSON.parse(sessionStorage.getItem('user'))?.token;
    axios.defaults.headers.common = { Authorization: `Bearer ${getToken}` };
    const response = await axios.post(`user/add-to-cart`, data);
    if (response.data) {
        return response.data;
    }
};

const getCart = async () => {
    let getToken = JSON.parse(sessionStorage.getItem('user'))?.token;
    axios.defaults.headers.common = { Authorization: `Bearer ${getToken}` };
    const response = await axios.get(`user/cart`);
    if (response.data) {
        return response.data;
    }
};

const removeProdCart = async (id) => {
    let getToken = JSON.parse(sessionStorage.getItem('user'))?.token;
    axios.defaults.headers.common = { Authorization: `Bearer ${getToken}` };
    const response = await axios.delete(`user/delete-cart/${id}`);
    if (response.data) {
        return response.data;
    }
};
const updateQuantityCart = async (data) => {
    let getToken = JSON.parse(sessionStorage.getItem('user'))?.token;
    axios.defaults.headers.common = { Authorization: `Bearer ${getToken}` };
    const response = await axios.put(`user/update-cart/${data.id}/${data.quantity}`);
    if (response.data) {
        return response.data;
    }
};

const createOrder = async (data) => {
    let getToken = JSON.parse(sessionStorage.getItem('user'))?.token;
    axios.defaults.headers.common = { Authorization: `Bearer ${getToken}` };
    const response = await axios.post(`user/create-order/`, data);
    if (response.data) {
        return response.data;
    }
};

const emptyCart = async () => {
    let getToken = JSON.parse(sessionStorage.getItem('user'))?.token;
    axios.defaults.headers.common = { Authorization: `Bearer ${getToken}` };
    const response = await axios.delete(`user/empty-cart/`);
    if (response.data) {
        return response.data;
    }
};

const applyCoupon = async (data) => {
    let getToken = JSON.parse(sessionStorage.getItem('user'))?.token;
    axios.defaults.headers.common = { Authorization: `Bearer ${getToken}` };
    const response = await axios.post(`user/cart/applyCoupon`, { coupon: data });
    if (response.data) {
        return response.data;
    }
};

const userOrder = async () => {
    let getToken = JSON.parse(sessionStorage.getItem('user'))?.token;
    axios.defaults.headers.common = { Authorization: `Bearer ${getToken}` };
    const response = await axios.get(`user/order`);
    if (response.data) {
        return response.data;
    }
};

const unBlockUser = async (id) => {
    let getToken = JSON.parse(sessionStorage.getItem('user'))?.token;
    axios.defaults.headers.common = { Authorization: `Bearer ${getToken}` };
    const response = await axios.put(`user/unblock-user/${id}`);
    if (response.data) {
        return response.data;
    }
};

export const authService = {
    register,
    login,
    loginAdmin,
    getUserWishList,
    getUserCoupon,
    getAllUser,
    getUser,
    updateUser,
    updateUserById,
    deleteUser,
    blockUser,
    unBlockUser,
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
};

export default authService;
