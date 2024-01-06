import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:5000/api/';

const postContact = async (data) => {
    const response = await axios.post(`contact/`, data);
    if (response.data) {
        return response.data;
    }
};

const getContact = async () => {
    const response = await axios.get(`contact`);
    if (response.data) {
        return response.data;
    }
};

const deleteContact = async (id) => {
    let getToken = JSON.parse(sessionStorage.getItem('user'))?.token;
    axios.defaults.headers.common = { Authorization: `Bearer ${getToken}` };
    const response = await axios.delete(`contact/${id}`);
    if (response.data) {
        return response.data;
    }
};

export const contactService = {
    postContact,
    getContact,
    deleteContact,
};

export default contactService;
