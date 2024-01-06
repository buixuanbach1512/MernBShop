import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:5000/api/';

const uploadImg = async (data) => {
    let getToken = JSON.parse(sessionStorage.getItem('user'))?.token;
    axios.defaults.headers.common = { Authorization: `Bearer ${getToken}` };
    const response = await axios.post(`upload/upload-img`, data);
    if (response.data) {
        return response.data;
    }
};

const deleteImg = async (id) => {
    let getToken = JSON.parse(sessionStorage.getItem('user'))?.token;
    axios.defaults.headers.common = { Authorization: `Bearer ${getToken}` };
    const response = await axios.delete(`upload/delete-img/${id}`);
    if (response.data) {
        return response.data;
    }
};

const uploadService = {
    uploadImg,
    deleteImg,
};

export default uploadService;
