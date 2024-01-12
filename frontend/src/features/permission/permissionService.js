import axios from 'axios';
import { baseUrl } from '../../utils/baseUrl';
axios.defaults.baseURL = baseUrl;

const getAllPermission = async (data) => {
    const response = await axios.get(`permission?${data ? `name=${data}` : ''}`);
    if (response.data) {
        return response.data;
    }
};

const createPermission = async (data) => {
    let getToken = JSON.parse(sessionStorage.getItem('user'))?.token;
    axios.defaults.headers.common = { Authorization: `Bearer ${getToken}` };
    const response = await axios.post(`permission/`, data);
    if (response.data) {
        return response.data;
    }
};

const getAPermission = async (id) => {
    let getToken = JSON.parse(sessionStorage.getItem('user'))?.token;
    axios.defaults.headers.common = { Authorization: `Bearer ${getToken}` };
    const response = await axios.get(`permission/${id}`);
    if (response.data) {
        return response.data;
    }
};

const updatePermission = async (data) => {
    let getToken = JSON.parse(sessionStorage.getItem('user'))?.token;
    axios.defaults.headers.common = { Authorization: `Bearer ${getToken}` };
    const response = await axios.put(`permission/${data.id}`, data.permissionData);
    if (response.data) {
        return response.data;
    }
};

const deletePermission = async (id) => {
    let getToken = JSON.parse(sessionStorage.getItem('user'))?.token;
    axios.defaults.headers.common = { Authorization: `Bearer ${getToken}` };
    const response = await axios.delete(`permission/${id}`);
    if (response.data) {
        return response.data;
    }
};

const PermissionService = {
    getAllPermission,
    createPermission,
    getAPermission,
    updatePermission,
    deletePermission,
};

export default PermissionService;
