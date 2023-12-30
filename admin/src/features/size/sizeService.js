import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:5000/api/';

const getSize = async (sizeName) => {
    const response = await axios.get(`size?${sizeName ? `name=${sizeName}` : ''}`);
    return response.data;
};

const createSize = async (size) => {
    let getToken = JSON.parse(sessionStorage.getItem('user'))?.token;
    axios.defaults.headers.common = { Authorization: `Bearer ${getToken}` };
    const response = await axios.post(`size/`, size);
    return response.data;
};

const getASize = async (id) => {
    let getToken = JSON.parse(sessionStorage.getItem('user'))?.token;
    axios.defaults.headers.common = { Authorization: `Bearer ${getToken}` };
    const response = await axios.get(`size/${id}`);
    return response.data;
};

const updateSize = async (size) => {
    let getToken = JSON.parse(sessionStorage.getItem('user'))?.token;
    axios.defaults.headers.common = { Authorization: `Bearer ${getToken}` };
    const response = await axios.put(`size/${size.id}`, size.sizeData);
    return response.data;
};

const deleteSize = async (id) => {
    let getToken = JSON.parse(sessionStorage.getItem('user'))?.token;
    axios.defaults.headers.common = { Authorization: `Bearer ${getToken}` };
    const response = await axios.delete(`size/${id}`);
    return response.data;
};

const sizeService = {
    getSize,
    createSize,
    getASize,
    updateSize,
    deleteSize,
};
export default sizeService;
