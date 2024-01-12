import axios from 'axios';
import { baseUrl } from '../../utils/baseUrl';
axios.defaults.baseURL = baseUrl;

const createBlog = async (data) => {
    let getToken = JSON.parse(sessionStorage.getItem('user'))?.token;
    axios.defaults.headers.common = { Authorization: `Bearer ${getToken}` };
    const response = await axios.post('blog/', data);
    if (response.data) {
        return response.data;
    }
};

const getAllBlog = async (data) => {
    const response = await axios.get(`blog?${data ? `title=${data}` : ''}`);
    if (response.data) {
        return response.data;
    }
};

const getBlogById = async (id) => {
    const response = await axios.get(`blog/${id}`);
    if (response.data) {
        return response.data;
    }
};

const updateBlog = async (data) => {
    let getToken = JSON.parse(sessionStorage.getItem('user'))?.token;
    axios.defaults.headers.common = { Authorization: `Bearer ${getToken}` };
    const response = await axios.put(`blog/${data.id}`, data.data);
    if (response.data) {
        return response.data;
    }
};

const deleteBlog = async (id) => {
    let getToken = JSON.parse(sessionStorage.getItem('user'))?.token;
    axios.defaults.headers.common = { Authorization: `Bearer ${getToken}` };
    const response = await axios.delete(`blog/${id}`);
    if (response.data) {
        return response.data;
    }
};

const blogService = {
    createBlog,
    getAllBlog,
    getBlogById,
    updateBlog,
    deleteBlog,
};

export default blogService;
