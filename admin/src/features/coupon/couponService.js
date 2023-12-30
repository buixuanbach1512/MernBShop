import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:5000/api/';

const getCoupons = async (couponName) => {
    let getToken = JSON.parse(sessionStorage.getItem('user'))?.token;
    axios.defaults.headers.common = { Authorization: `Bearer ${getToken}` };
    const response = await axios.get(`coupon?${couponName ? `name=${couponName}` : ''}`);
    return response.data;
};
const createCoupons = async (coupon) => {
    let getToken = JSON.parse(sessionStorage.getItem('user'))?.token;
    axios.defaults.headers.common = { Authorization: `Bearer ${getToken}` };
    const response = await axios.post(`coupon/`, coupon);
    return response.data;
};
const getACoupon = async (id) => {
    let getToken = JSON.parse(sessionStorage.getItem('user'))?.token;
    axios.defaults.headers.common = { Authorization: `Bearer ${getToken}` };
    const response = await axios.get(`coupon/${id}`);
    return response.data;
};
const updateCoupon = async (coupon) => {
    let getToken = JSON.parse(sessionStorage.getItem('user'))?.token;
    axios.defaults.headers.common = { Authorization: `Bearer ${getToken}` };
    const response = await axios.put(`coupon/${coupon.id}`, coupon.couponData);
    return response.data;
};
const deleteCoupon = async (id) => {
    let getToken = JSON.parse(sessionStorage.getItem('user'))?.token;
    axios.defaults.headers.common = { Authorization: `Bearer ${getToken}` };
    const response = await axios.delete(`coupon/${id}`);
    return response.data;
};

const couponService = {
    getCoupons,
    createCoupons,
    getACoupon,
    updateCoupon,
    deleteCoupon,
};

export default couponService;
