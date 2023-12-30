import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:5000/api/';

const createRole = async (data) => {
    let getToken = JSON.parse(sessionStorage.getItem('user'))?.token;
    axios.defaults.headers.common = { Authorization: `Bearer ${getToken}` };
    const response = await axios.post('role/', data);
    return response.data;
};

const getAllRole = async () => {
    const response = await axios.get(`role/`);
    return response.data;
};

const getARole = async (id) => {
    let getToken = JSON.parse(sessionStorage.getItem('user'))?.token;
    axios.defaults.headers.common = { Authorization: `Bearer ${getToken}` };
    const response = await axios.get(`role/${id}`);
    return response.data;
};
const updateRole = async (data) => {
    let getToken = JSON.parse(sessionStorage.getItem('user'))?.token;
    axios.defaults.headers.common = { Authorization: `Bearer ${getToken}` };
    const response = await axios.put(`role/${data.id}`, data.data);
    return response.data;
};
const deleteRole = async (id) => {
    let getToken = JSON.parse(sessionStorage.getItem('user'))?.token;
    axios.defaults.headers.common = { Authorization: `Bearer ${getToken}` };
    const response = await axios.delete(`role/${id}`);
    return response.data;
};

const roleService = {
    getAllRole,
    createRole,
    getARole,
    updateRole,
    deleteRole,
};

export default roleService;
