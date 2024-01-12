import axios from 'axios';
import { baseUrl } from '../../utils/baseUrl';
axios.defaults.baseURL = baseUrl;

const createConversation = async (data) => {
    let getToken = JSON.parse(sessionStorage.getItem('user'))?.token;
    axios.defaults.headers.common = { Authorization: `Bearer ${getToken}` };
    const response = await axios.post('conversation/create-new-conversation', data);
    if (response.data) {
        return response.data;
    }
};

const getAllConversation = async () => {
    let getToken = JSON.parse(sessionStorage.getItem('user'))?.token;
    axios.defaults.headers.common = { Authorization: `Bearer ${getToken}` };
    const response = await axios.get(`conversation/`);
    if (response.data) {
        return response.data;
    }
};

const updateLastMessage = async (data) => {
    let getToken = JSON.parse(sessionStorage.getItem('user'))?.token;
    axios.defaults.headers.common = { Authorization: `Bearer ${getToken}` };
    const response = await axios.put(`conversation/update-last-message/${data.id}`, {
        lastMessage: data.lastMessage,
        lastMessageId: data.lastMessageId,
    });
    if (response.data) {
        return response.data;
    }
};

const deleteConversation = async (id) => {
    let getToken = JSON.parse(sessionStorage.getItem('user'))?.token;
    axios.defaults.headers.common = { Authorization: `Bearer ${getToken}` };
    const response = await axios.delete(`conversation/delete-conversation/${id}`);
    if (response.data) {
        return response.data;
    }
};

const conversationService = {
    createConversation,
    getAllConversation,
    updateLastMessage,
    deleteConversation,
};
export default conversationService;
