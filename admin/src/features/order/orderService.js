import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:5000/api/';

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

const orderService = {
    getAllOrders,
    getOrderById,
};
export default orderService;
