import axios from 'axios';
import { baseUrl } from '../../utils/baseUrl';
axios.defaults.baseURL = baseUrl;

const createOrder = async (orderData) => {
    let getToken = JSON.parse(sessionStorage.getItem('user'))?.token;
    axios.defaults.headers.common = { Authorization: `Bearer ${getToken}` };
    const response = await axios.post(`user/create-order/`, orderData);
    if (response.data) {
        return response.data;
    }
};

const getAllOrders = async (data) => {
    let getToken = JSON.parse(sessionStorage.getItem('user'))?.token;
    axios.defaults.headers.common = { Authorization: `Bearer ${getToken}` };
    const response = await axios.get(`user/all-order?${data ? `orderStatus=${data}` : ''}`);
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

const getOrderById = async (id) => {
    let getToken = JSON.parse(sessionStorage.getItem('user'))?.token;
    axios.defaults.headers.common = { Authorization: `Bearer ${getToken}` };
    const response = await axios.get(`user/order/${id}`);
    if (response.data) {
        return response.data;
    }
};

const updateOrder = async (data) => {
    let getToken = JSON.parse(sessionStorage.getItem('user'))?.token;
    axios.defaults.headers.common = { Authorization: `Bearer ${getToken}` };
    const response = await axios.put(`user/order/${data.id}`, { status: data.status });
    if (response.data) {
        return response.data;
    }
};

const deleteOrder = async (id) => {
    let getToken = JSON.parse(sessionStorage.getItem('user'))?.token;
    axios.defaults.headers.common = { Authorization: `Bearer ${getToken}` };
    const response = await axios.delete(`user/order/${id}`);
    if (response.data) {
        return response.data;
    }
};

const getCountOrderByMonth = async () => {
    let getToken = JSON.parse(sessionStorage.getItem('user'))?.token;
    axios.defaults.headers.common = { Authorization: `Bearer ${getToken}` };
    const response = await axios.get(`user/order-by-month`);
    if (response.data) {
        return response.data;
    }
};

const getCountOrderByYear = async () => {
    let getToken = JSON.parse(sessionStorage.getItem('user'))?.token;
    axios.defaults.headers.common = { Authorization: `Bearer ${getToken}` };
    const response = await axios.get(`user/order-by-year`);
    if (response.data) {
        return response.data;
    }
};

const paymentVNPay = async (data) => {
    let getToken = JSON.parse(sessionStorage.getItem('user'))?.token;
    axios.defaults.headers.common = { Authorization: `Bearer ${getToken}` };
    const response = await axios.post(`vnpay/create_payment_url`, data);
    if (response.data) {
        return response.data;
    }
};

const orderService = {
    createOrder,
    getAllOrders,
    userOrder,
    getOrderById,
    updateOrder,
    deleteOrder,
    getCountOrderByMonth,
    getCountOrderByYear,
    paymentVNPay,
};
export default orderService;
