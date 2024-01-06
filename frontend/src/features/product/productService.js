import axios from 'axios';
import { baseUrl } from '../../utils/baseUrl';
axios.defaults.baseURL = baseUrl;

const getAllProduct = async (data) => {
    const response = await axios.get(
        `product?${data?.name ? `name=${data?.name}&` : ''}${data?.category ? `category=${data?.category}&` : ''}${
            data?.brand ? `brand=${data?.brand}&` : ''
        }${data?.id ? `_id=${data?.id}&` : ''}`,
    );
    if (response.data) {
        return response.data;
    }
};

const getAProduct = async (id) => {
    const response = await axios.get(`product/${id}`);
    if (response.data) {
        return response.data;
    }
};

const getProduct = async (data) => {
    const response = await axios.get(`product/get-one?${data?.name ? `name=${data?.name}` : ''}`);
    if (response.data) {
        return response.data;
    }
};

const createProduct = async (data) => {
    let getToken = JSON.parse(sessionStorage.getItem('user'))?.token;
    axios.defaults.headers.common = { Authorization: `Bearer ${getToken}` };
    const response = await axios.post(`product/`, data);
    if (response.data) {
        return response.data;
    }
};

const updateProduct = async (data) => {
    let getToken = JSON.parse(sessionStorage.getItem('user'))?.token;
    axios.defaults.headers.common = { Authorization: `Bearer ${getToken}` };
    const response = await axios.put(`product/${data.id}`, data.data);
    if (response.data) {
        return response.data;
    }
};

const updateQuantity = async (data) => {
    let getToken = JSON.parse(sessionStorage.getItem('user'))?.token;
    axios.defaults.headers.common = { Authorization: `Bearer ${getToken}` };
    const response = await axios.put(`product/update-quantity/${data.id}`, { quantity: data.quantity });
    if (response.data) {
        return response.data;
    }
};

const deleteProduct = async (id) => {
    let getToken = JSON.parse(sessionStorage.getItem('user'))?.token;
    axios.defaults.headers.common = { Authorization: `Bearer ${getToken}` };
    const response = await axios.delete(`product/${id}`);
    if (response.data) {
        return response.data;
    }
};

const getProductByCate = async (data) => {
    const response = await axios.get(
        `product/get-product-cate/${data.catId}?${data.sort ? `sort=${data.sort}&` : ''}${
            data.stock ? `stock=${data.stock}&` : ''
        }${data.price ? `price=${data.price}&` : ''}`,
    );
    if (response.data) {
        return response.data;
    }
};

const addToWishList = async (prodId) => {
    let getToken = JSON.parse(sessionStorage.getItem('user'))?.token;
    axios.defaults.headers.common = { Authorization: `Bearer ${getToken}` };
    const response = await axios.put(`product/wishlist`, { prodId });
    if (response.data) {
        return response.data;
    }
};

const rating = async (data) => {
    let getToken = JSON.parse(sessionStorage.getItem('user'))?.token;
    axios.defaults.headers.common = { Authorization: `Bearer ${getToken}` };
    const response = await axios.put(`product/rating`, data);
    if (response.data) {
        return response.data;
    }
};

const updateRating = async (data) => {
    let getToken = JSON.parse(sessionStorage.getItem('user'))?.token;
    axios.defaults.headers.common = { Authorization: `Bearer ${getToken}` };
    const response = await axios.put(`product/update-rating/${data.id}/${data.prodId}`);
    if (response.data) {
        return response.data;
    }
};

const deleteRating = async (data) => {
    let getToken = JSON.parse(sessionStorage.getItem('user'))?.token;
    axios.defaults.headers.common = { Authorization: `Bearer ${getToken}` };
    const response = await axios.put(`product/delete-rating/${data.id}/${data.prodId}`);
    if (response.data) {
        return response.data;
    }
};

export const productService = {
    getAllProduct,
    getAProduct,
    getProduct,
    createProduct,
    updateProduct,
    updateQuantity,
    deleteProduct,
    getProductByCate,
    addToWishList,
    rating,
    updateRating,
    deleteRating,
};
