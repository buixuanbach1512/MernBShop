import axios from '../../utils/axiosConfig';

const getCoupons = async (couponName) => {
    const response = await axios.get(`coupon?${couponName ? `name=${couponName}` : ''}`);
    return response.data;
};
const createCoupons = async (coupon) => {
    const response = await axios.post(`coupon/`, coupon);
    return response.data;
};
const getACoupon = async (id) => {
    const response = await axios.get(`coupon/${id}`);
    return response.data;
};
const updateCoupon = async (coupon) => {
    const response = await axios.put(`coupon/${coupon.id}`, coupon.couponData);
    return response.data;
};
const deleteCoupon = async (id) => {
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
