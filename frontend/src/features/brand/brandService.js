import axios from 'axios';
import { baseUrl } from '../../utils/baseUrl';
axios.defaults.baseURL = baseUrl;

const getBrands = async (data) => {
    const response = await axios.get(`brand?${data ? `name=${data}` : ''}`);
    if (response.data) {
        return response.data;
    }
};

const createBrand = async (data) => {
    let getToken = JSON.parse(sessionStorage.getItem('user'))?.token;
    axios.defaults.headers.common = { Authorization: `Bearer ${getToken}` };
    const response = await axios.post(`brand/`, data);
    if (response.data) {
        return response.data;
    }
};

const getABrand = async (id) => {
    let getToken = JSON.parse(sessionStorage.getItem('user'))?.token;
    axios.defaults.headers.common = { Authorization: `Bearer ${getToken}` };
    const response = await axios.get(`brand/${id}`);
    if (response.data) {
        return response.data;
    }
};

const updateBrand = async (data) => {
    let getToken = JSON.parse(sessionStorage.getItem('user'))?.token;
    axios.defaults.headers.common = { Authorization: `Bearer ${getToken}` };
    const response = await axios.put(`brand/${data.id}`, data.brandData);
    if (response.data) {
        return response.data;
    }
};

const deleteBrand = async (id) => {
    let getToken = JSON.parse(sessionStorage.getItem('user'))?.token;
    axios.defaults.headers.common = { Authorization: `Bearer ${getToken}` };
    const response = await axios.delete(`brand/${id}`);
    if (response.data) {
        return response.data;
    }
};

const brandService = {
    getBrands,
    createBrand,
    getABrand,
    updateBrand,
    deleteBrand,
};
export default brandService;
