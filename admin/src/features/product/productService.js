import axios from '../../utils/axiosConfig';

const getProducts = async (queryData) => {
    const response = await axios.get(`product?${queryData?.name ? `name=${queryData?.name}&`: ''}${queryData?.category ? `category=${queryData?.category}&`: ''}${queryData?.brand ? `brand=${queryData?.brand}&`: ''}`);
    return response.data;
};

const getAProduct = async (id) => {
    const response = await axios.get(`product/${id}`);
    return response.data;
};

const createProduct = async (product) => {
    const response = await axios.post(`product/`, product);
    return response.data;
};

const updateProduct = async (productData) => {
    const response = await axios.put(`product/${productData.id}`, productData.data);
    return response.data;
};
const deleteProduct = async (id) => {
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
