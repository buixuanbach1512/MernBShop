import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:5000/api/';

const getUsers = async (userName) => {
    const response = await axios.get(`user/all-users?${userName ? `name=${userName}` : ''}`);
    return response.data;
};
const getUser = async (id) => {
    let getToken = JSON.parse(sessionStorage.getItem('user'))?.token;
    axios.defaults.headers.common = { Authorization: `Bearer ${getToken}` };
    const response = await axios.get(`user/get-user/${id}`);
    return response.data;
};

const updateUserById = async (data) => {
    let getToken = JSON.parse(sessionStorage.getItem('user'))?.token;
    axios.defaults.headers.common = { Authorization: `Bearer ${getToken}` };
    const response = await axios.put(`user/edit-user/${data.id}`, data.userData);
    return response.data;
};
const blockUser = async (userId) => {
    let getToken = JSON.parse(sessionStorage.getItem('user'))?.token;
    axios.defaults.headers.common = { Authorization: `Bearer ${getToken}` };
    const response = await axios.put(`user/block-user/${userId}`);
    return response.data;
};

const unBlockUser = async (userId) => {
    let getToken = JSON.parse(sessionStorage.getItem('user'))?.token;
    axios.defaults.headers.common = { Authorization: `Bearer ${getToken}` };
    const response = await axios.put(`user/unblock-user/${userId}`);
    return response.data;
};
const customerService = {
    getUsers,
    getUser,
    blockUser,
    unBlockUser,
    updateUserById,
};
export default customerService;
