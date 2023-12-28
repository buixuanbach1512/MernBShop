import axios from 'axios';
axios.defaults.baseURL = 'https://backend-7mzxh8l23-buixuanbach1512s-projects.vercel.app/api/';

const postContact = async (dataPost) => {
    const response = await axios.post(`contact/`, dataPost);
    return response.data;
};

export const contactService = {
    postContact,
};
