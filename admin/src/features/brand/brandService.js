import axios from '../../utils/axiosConfig';

const getBrands = async (brandName) => {
    const response = await axios.get(`brand?${brandName ? `name=${brandName}`: ''}`);
    return response.data;
};

const createBrands = async (brand) => {
    const response = await axios.post(`brand/`, brand);
    return response.data;
};

const getABrand = async (id) => {
    const response = await axios.get(`brand/${id}`);
    return response.data;
};

const updateBrand = async (brand) => {
    const response = await axios.put(`brand/${brand.id}`, brand.brandData);
    return response.data;
};

const deleteBrand = async (id) => {
    const response = await axios.delete(`brand/${id}`);
    return response.data;
};

const brandService = {
    getBrands,
    createBrands,
    getABrand,
    updateBrand,
    deleteBrand,
};
export default brandService;
