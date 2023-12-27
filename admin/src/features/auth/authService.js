import axios from '../../utils/axiosConfig';

const login = async (userData) => {
    const response = await axios.post(`user/login-admin`, userData);
    if (response.data) {
        sessionStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
};

const getAllOrders = async () => {
    const response = await axios.get(`user/all-order`);
    return response.data;
};

const getOrderById = async (id) => {
    const response = await axios.get(`user/order/${id}`);
    return response.data;
};

const updateOrder = async (data) => {
    const response = await axios.put(`user/order/${data.id}`, { status: data.status });
    return response.data;
};

const getCountOrderByMonth = async () => {
    const response = await axios.get(`user/order-by-month`);
    return response.data;
};

const getCountOrderByYear = async () => {
    const response = await axios.get(`user/order-by-year`);
    return response.data;
};

const authService = {
    login,
    getAllOrders,
    getOrderById,
    updateOrder,
    getCountOrderByMonth,
    getCountOrderByYear,
};
export default authService;
