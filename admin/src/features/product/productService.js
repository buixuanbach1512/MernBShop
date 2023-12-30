import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:5000/api/';

const getProducts = async (queryData) => {
    const response = await axios.get(
        `product?${queryData?.name ? `name=${queryData?.name}&` : ''}${
            queryData?.category ? `category=${queryData?.category}&` : ''
        }${queryData?.brand ? `brand=${queryData?.brand}&` : ''}`,
    );
    return response.data;
};

const getAProduct = async (id) => {
    let getToken = JSON.parse(sessionStorage.getItem('user'))?.token;
    axios.defaults.headers.common = { Authorization: `Bearer ${getToken}` };
    const response = await axios.get(`product/${id}`);
    return response.data;
};

const createProduct = async (product) => {
    let getToken = JSON.parse(sessionStorage.getItem('user'))?.token;
    axios.defaults.headers.common = { Authorization: `Bearer ${getToken}` };
    const response = await axios.post(`product/`, product);
    return response.data;
};

const updateProduct = async (productData) => {
    let getToken = JSON.parse(sessionStorage.getItem('user'))?.token;
    axios.defaults.headers.common = { Authorization: `Bearer ${getToken}` };
    const response = await axios.put(`product/${productData.id}`, productData.data);
    return response.data;
};
const deleteProduct = async (id) => {
    let getToken = JSON.parse(sessionStorage.getItem('user'))?.token;
    axios.defaults.headers.common = { Authorization: `Bearer ${getToken}` };
    const response = await axios.delete(`product/${id}`);
    return response.data;
};

const productService = {
    getProducts,
    getAProduct,
    createProduct,
    updateProduct,
    deleteProduct,
};
export default productService;
