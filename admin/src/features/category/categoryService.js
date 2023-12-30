import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:5000/api/';

const getCategories = async (catName) => {
    const response = await axios.get(`category?${catName ? `name=${catName}` : ''}`);
    return response.data;
};

const createCategories = async (category) => {
    let getToken = JSON.parse(sessionStorage.getItem('user'))?.token;
    axios.defaults.headers.common = { Authorization: `Bearer ${getToken}` };
    const response = await axios.post(`category/`, category);
    return response.data;
};
const getACategory = async (id) => {
    let getToken = JSON.parse(sessionStorage.getItem('user'))?.token;
    axios.defaults.headers.common = { Authorization: `Bearer ${getToken}` };
    const response = await axios.get(`category/${id}`);
    return response.data;
};

const updateCategory = async (category) => {
    let getToken = JSON.parse(sessionStorage.getItem('user'))?.token;
    axios.defaults.headers.common = { Authorization: `Bearer ${getToken}` };
    const response = await axios.put(`category/${category.id}`, category.catData);
    return response.data;
};

const deleteCategory = async (id) => {
    let getToken = JSON.parse(sessionStorage.getItem('user'))?.token;
    axios.defaults.headers.common = { Authorization: `Bearer ${getToken}` };
    const response = await axios.delete(`category/${id}`);
    return response.data;
};

const categoryService = {
    getCategories,
    createCategories,
    getACategory,
    updateCategory,
    deleteCategory,
};
export default categoryService;
