import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:5000/api/';

const register = async (userData) => {
    const response = await axios.post(`user/register`, userData);
    return response.data;
};

const login = async (userData) => {
    const response = await axios.post(`user/login-admin`, userData);
    return response.data;
};

const getAllOrders = async () => {
    let getToken = JSON.parse(sessionStorage.getItem('user'))?.token;
    axios.defaults.headers.common = { Authorization: `Bearer ${getToken}` };
    const response = await axios.get(`user/all-order`);
    return response.data;
};

const getOrderById = async (id) => {
    let getToken = JSON.parse(sessionStorage.getItem('user'))?.token;
    axios.defaults.headers.common = { Authorization: `Bearer ${getToken}` };
    const response = await axios.get(`user/order/${id}`);
    return response.data;
};

const updateOrder = async (data) => {
    let getToken = JSON.parse(sessionStorage.getItem('user'))?.token;
    axios.defaults.headers.common = { Authorization: `Bearer ${getToken}` };
    const response = await axios.put(`user/order/${data.id}`, { status: data.status });
    return response.data;
};

const deleteOrder = async (id) => {
    let getToken = JSON.parse(sessionStorage.getItem('user'))?.token;
    axios.defaults.headers.common = { Authorization: `Bearer ${getToken}` };
    const response = await axios.delete(`user/order/${id}`);
    return response.data;
};

const deleteUser = async (id) => {
    let getToken = JSON.parse(sessionStorage.getItem('user'))?.token;
    axios.defaults.headers.common = { Authorization: `Bearer ${getToken}` };
    const response = await axios.delete(`user/${id}`);
    return response.data;
};

const getCountOrderByMonth = async () => {
    let getToken = JSON.parse(sessionStorage.getItem('user'))?.token;
    axios.defaults.headers.common = { Authorization: `Bearer ${getToken}` };
    const response = await axios.get(`user/order-by-month`);
    return response.data;
};

const getCountOrderByYear = async () => {
    let getToken = JSON.parse(sessionStorage.getItem('user'))?.token;
    axios.defaults.headers.common = { Authorization: `Bearer ${getToken}` };
    const response = await axios.get(`user/order-by-year`);
    return response.data;
};

const authService = {
    register,
    login,
    getAllOrders,
    getOrderById,
    updateOrder,
    deleteOrder,
    deleteUser,
    getCountOrderByMonth,
    getCountOrderByYear,
};
export default authService;
