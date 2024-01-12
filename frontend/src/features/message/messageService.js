import axios from 'axios';
import { baseUrl } from '../../utils/baseUrl';
axios.defaults.baseURL = baseUrl;

const createMessage = async (data) => {
    let getToken = JSON.parse(sessionStorage.getItem('user'))?.token;
    axios.defaults.headers.common = { Authorization: `Bearer ${getToken}` };
    const response = await axios.post('message/create-new-message', data);
    if (response.data) {
        return response.data;
    }
};

const getAllMessageById = async (id) => {
    let getToken = JSON.parse(sessionStorage.getItem('user'))?.token;
    axios.defaults.headers.common = { Authorization: `Bearer ${getToken}` };
    const response = await axios.get(`message/get-message-by-id/${id}`);
    if (response.data) {
        return response.data;
    }
};

const messageService = {
    createMessage,
    getAllMessageById,
};
export default messageService;
