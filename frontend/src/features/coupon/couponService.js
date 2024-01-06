import axios from 'axios';
import { baseUrl } from '../../utils/baseUrl';
axios.defaults.baseURL = baseUrl;

const getAllCoupon = async () => {
    const response = await axios.get(`coupon/`);
    if (response.data) {
        return response.data;
    }
};

const createCoupons = async (data) => {
    let getToken = JSON.parse(sessionStorage.getItem('user'))?.token;
    axios.defaults.headers.common = { Authorization: `Bearer ${getToken}` };
    const response = await axios.post(`coupon/`, data);
    if (response.data) {
        return response.data;
    }
};

const getACoupon = async (id) => {
    let getToken = JSON.parse(sessionStorage.getItem('user'))?.token;
    axios.defaults.headers.common = { Authorization: `Bearer ${getToken}` };
    const response = await axios.get(`coupon/${id}`);
    if (response.data) {
        return response.data;
    }
};

const updateCoupon = async (data) => {
    let getToken = JSON.parse(sessionStorage.getItem('user'))?.token;
    axios.defaults.headers.common = { Authorization: `Bearer ${getToken}` };
    const response = await axios.put(`coupon/${data.id}`, data.couponData);
    if (response.data) {
        return response.data;
    }
};

const addCoupon = async (couponId) => {
    let getToken = JSON.parse(sessionStorage.getItem('user'))?.token;
    axios.defaults.headers.common = { Authorization: `Bearer ${getToken}` };
    const response = await axios.put(`coupon/addCoupon`, { couponId: couponId });
    if (response) {
        return response.data;
    }
};

const deleteCoupon = async (id) => {
    let getToken = JSON.parse(sessionStorage.getItem('user'))?.token;
    axios.defaults.headers.common = { Authorization: `Bearer ${getToken}` };
    const response = await axios.delete(`coupon/${id}`);
    if (response) {
        return response.data;
    }
};

const couponService = {
    getAllCoupon,
    createCoupons,
    getACoupon,
    updateCoupon,
    addCoupon,
    deleteCoupon,
};

export default couponService;
