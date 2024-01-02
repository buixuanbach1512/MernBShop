import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:5000/api/';

const getAllCoupon = async () => {
    const response = await axios.get(`coupon/`);
    if (response) {
        return response.data;
    }
};

const addCoupon = async (couponId) => {
    let getToken = JSON.parse(sessionStorage.getItem('customer'))?.token;
    axios.defaults.headers.common = { Authorization: `Bearer ${getToken}` };
    const response = await axios.put(`coupon/addCoupon`, { couponId: couponId });
    if (response) {
        return response.data;
    }
};

const couponService = {
    getAllCoupon,
    addCoupon,
};

export default couponService;
