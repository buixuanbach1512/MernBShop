import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:5000/api/';

const postContact = async (dataPost) => {
    const response = await axios.post(`contact/`, dataPost);
    return response.data;
};

export const contactService = {
    postContact,
};
