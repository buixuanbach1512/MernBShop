import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:5000/api/';

const getAllColor = async (data) => {
    const response = await axios.get(`color?${data ? `name=${data}` : ''}`);
    if (response.data) {
        return response.data;
    }
};

const createColor = async (data) => {
    let getToken = JSON.parse(sessionStorage.getItem('user'))?.token;
    axios.defaults.headers.common = { Authorization: `Bearer ${getToken}` };
    const response = await axios.post(`color/`, data);
    if (response.data) {
        return response.data;
    }
};

const getAColor = async (id) => {
    let getToken = JSON.parse(sessionStorage.getItem('user'))?.token;
    axios.defaults.headers.common = { Authorization: `Bearer ${getToken}` };
    const response = await axios.get(`color/${id}`);
    if (response.data) {
        return response.data;
    }
};

const updateColor = async (data) => {
    let getToken = JSON.parse(sessionStorage.getItem('user'))?.token;
    axios.defaults.headers.common = { Authorization: `Bearer ${getToken}` };
    const response = await axios.put(`color/${data.id}`, data.colorData);
    if (response.data) {
        return response.data;
    }
};

const deleteColor = async (id) => {
    let getToken = JSON.parse(sessionStorage.getItem('user'))?.token;
    axios.defaults.headers.common = { Authorization: `Bearer ${getToken}` };
    const response = await axios.delete(`color/${id}`);
    if (response.data) {
        return response.data;
    }
};

const colorService = {
    getAllColor,
    createColor,
    getAColor,
    updateColor,
    deleteColor,
};

export default colorService;
