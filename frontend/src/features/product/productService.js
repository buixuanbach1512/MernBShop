import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:5000/api/';

const getAllProduct = async (data) => {
    const response = await axios.get(
        `product?${data.catId ? `category=${data.catId}&` : ''}${data.sort ? `sort=${data.sort}&` : ''}${
            data.inStock ? `quantity[gt]=${data.inStock}&` : ''
        }${data.outStock ? `quantity[lte]=${data.outStock}&` : ''}${
            data.minPrice ? `price[gte]=${data.minPrice}&` : ''
        }${data.maxPrice ? `price[lte]=${data.maxPrice}&` : ''}`,
    );
    return response.data;
};

const getAProduct = async (prodId) => {
    const response = await axios.get(`product/${prodId}`);
    return response.data;
};

const addToWishList = async (prodId) => {
    let getToken = JSON.parse(sessionStorage.getItem('customer'))?.token;
    axios.defaults.headers.common = { Authorization: `Bearer ${getToken}` };
    const response = await axios.put(`product/wishlist`, { prodId });
    return response.data;
};

const rating = async (data) => {
    let getToken = JSON.parse(sessionStorage.getItem('customer'))?.token;
    axios.defaults.headers.common = { Authorization: `Bearer ${getToken}` };
    const response = await axios.put(`product/rating`, data);
    return response.data;
};

export const productService = {
    getAllProduct,
    getAProduct,
    addToWishList,
    rating,
};
