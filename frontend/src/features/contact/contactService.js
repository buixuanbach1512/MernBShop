import axios from 'axios';
axios.defaults.baseURL = 'https://backend-liart-zeta.vercel.app/api/';

const postContact = async (dataPost) => {
    const response = await axios.post(`contact/`, dataPost);
    return response.data;
};

export const contactService = {
    postContact,
};
