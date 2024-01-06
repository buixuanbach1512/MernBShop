import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:5000/api/';

const getSize = async (data) => {
    const response = await axios.get(`size?${data ? `name=${data}` : ''}`);
    if (response.data) {
        return response.data;
    }
};

const createSize = async (data) => {
    let getToken = JSON.parse(sessionStorage.getItem('user'))?.token;
    axios.defaults.headers.common = { Authorization: `Bearer ${getToken}` };
    const response = await axios.post(`size/`, data);
    if (response.data) {
        return response.data;
    }
};

const getASize = async (id) => {
    let getToken = JSON.parse(sessionStorage.getItem('user'))?.token;
    axios.defaults.headers.common = { Authorization: `Bearer ${getToken}` };
    const response = await axios.get(`size/${id}`);
    if (response.data) {
        return response.data;
    }
};

const updateSize = async (data) => {
    let getToken = JSON.parse(sessionStorage.getItem('user'))?.token;
    axios.defaults.headers.common = { Authorization: `Bearer ${getToken}` };
    const response = await axios.put(`size/${data.id}`, data.sizeData);
    if (response.data) {
        return response.data;
    }
};

const deleteSize = async (id) => {
    let getToken = JSON.parse(sessionStorage.getItem('user'))?.token;
    axios.defaults.headers.common = { Authorization: `Bearer ${getToken}` };
    const response = await axios.delete(`size/${id}`);
    if (response.data) {
        return response.data;
    }
};

const sizeService = {
    getSize,
    createSize,
    getASize,
    updateSize,
    deleteSize,
};
export default sizeService;
