import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:5000/api/';

const getBrands = async (brandName) => {
    const response = await axios.get(`brand?${brandName ? `name=${brandName}` : ''}`);
    return response.data;
};

const createBrands = async (brand) => {
    let getToken = JSON.parse(sessionStorage.getItem('user'))?.token;
    axios.defaults.headers.common = { Authorization: `Bearer ${getToken}` };
    const response = await axios.post(`brand/`, brand);
    return response.data;
};

const getABrand = async (id) => {
    let getToken = JSON.parse(sessionStorage.getItem('user'))?.token;
    axios.defaults.headers.common = { Authorization: `Bearer ${getToken}` };
    const response = await axios.get(`brand/${id}`);
    return response.data;
};

const updateBrand = async (brand) => {
    let getToken = JSON.parse(sessionStorage.getItem('user'))?.token;
    axios.defaults.headers.common = { Authorization: `Bearer ${getToken}` };
    const response = await axios.put(`brand/${brand.id}`, brand.brandData);
    return response.data;
};

const deleteBrand = async (id) => {
    let getToken = JSON.parse(sessionStorage.getItem('user'))?.token;
    axios.defaults.headers.common = { Authorization: `Bearer ${getToken}` };
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
