import axios from 'axios';
import { baseUrl } from '../../utils/baseUrl';
axios.defaults.baseURL = baseUrl;

const getAllCategory = async (data) => {
    const response = await axios.get(`category?${data ? `name=${data}` : ''}`);
    if (response.data) {
        return response.data;
    }
};

const createCategories = async (data) => {
    let getToken = JSON.parse(sessionStorage.getItem('user'))?.token;
    axios.defaults.headers.common = { Authorization: `Bearer ${getToken}` };
    const response = await axios.post(`category/`, data);
    return response.data;
};

const getACategory = async (id) => {
    let getToken = JSON.parse(sessionStorage.getItem('user'))?.token;
    axios.defaults.headers.common = { Authorization: `Bearer ${getToken}` };
    const response = await axios.get(`category/${id}`);
    return response.data;
};

const getProdCategory = async () => {
    const response = await axios.get('category/prod-cate');
    if (response.data) {
        return response.data;
    }
};

const updateCategory = async (data) => {
    let getToken = JSON.parse(sessionStorage.getItem('user'))?.token;
    axios.defaults.headers.common = { Authorization: `Bearer ${getToken}` };
    const response = await axios.put(`category/${data.id}`, data.catData);
    return response.data;
};

const deleteCategory = async (id) => {
    let getToken = JSON.parse(sessionStorage.getItem('user'))?.token;
    axios.defaults.headers.common = { Authorization: `Bearer ${getToken}` };
    const response = await axios.delete(`category/${id}`);
    return response.data;
};

export const categoryService = {
    getAllCategory,
    createCategories,
    getProdCategory,
    getACategory,
    updateCategory,
    deleteCategory,
};
export default categoryService;
