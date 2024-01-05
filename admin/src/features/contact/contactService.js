import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:5000/api/';

const getContact = async () => {
    const response = await axios.get(`contact`);
    return response.data;
};

const deleteContact = async (id) => {
    let getToken = JSON.parse(sessionStorage.getItem('user'))?.token;
    axios.defaults.headers.common = { Authorization: `Bearer ${getToken}` };
    const response = await axios.delete(`contact/${id}`);
    return response.data;
};

const contactService = {
    getContact,
    deleteContact,
};
export default contactService;
