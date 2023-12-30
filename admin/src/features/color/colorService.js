import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:5000/api/';

const getColors = async (colorName) => {
    const response = await axios.get(`color?${colorName ? `name=${colorName}` : ''}`);
    return response.data;
};

const createColors = async (color) => {
    let getToken = JSON.parse(sessionStorage.getItem('user'))?.token;
    axios.defaults.headers.common = { Authorization: `Bearer ${getToken}` };
    const response = await axios.post(`color/`, color);
    return response.data;
};

const getAColor = async (id) => {
    let getToken = JSON.parse(sessionStorage.getItem('user'))?.token;
    axios.defaults.headers.common = { Authorization: `Bearer ${getToken}` };
    const response = await axios.get(`color/${id}`);
    return response.data;
};

const updateColor = async (color) => {
    let getToken = JSON.parse(sessionStorage.getItem('user'))?.token;
    axios.defaults.headers.common = { Authorization: `Bearer ${getToken}` };
    const response = await axios.put(`color/${color.id}`, color.colorData);
    return response.data;
};

const deleteColor = async (id) => {
    let getToken = JSON.parse(sessionStorage.getItem('user'))?.token;
    axios.defaults.headers.common = { Authorization: `Bearer ${getToken}` };
    const response = await axios.delete(`color/${id}`);
    return response.data;
};

const colorService = {
    getColors,
    createColors,
    getAColor,
    updateColor,
    deleteColor,
};
export default colorService;
