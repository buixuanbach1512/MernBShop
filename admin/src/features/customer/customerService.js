import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:5000/api/';

const getUsers = async (userName) => {
    let getToken = JSON.parse(sessionStorage.getItem('user'))?.token;
    axios.defaults.headers.common = { Authorization: `Bearer ${getToken}` };
    const response = await axios.get(`user/all-users?${userName ? `name=${userName}` : ''}`);
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
    blockUser,
    unBlockUser,
};
export default customerService;
