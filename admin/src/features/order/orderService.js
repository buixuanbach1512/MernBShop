import axios from '../../utils/axiosConfig';

const getAllOrders = async () => {
    const response = await axios.get(`user/all-order`);
    return response.data;
};

const getOrderById = async (id) => {
    const response = await axios.get(`user/order/${id}`);
    return response.data;
};

const orderService = {
    getAllOrders,
    getOrderById,
};
export default orderService;
