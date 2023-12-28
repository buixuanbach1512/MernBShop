import axios from 'axios';
axios.defaults.baseURL = 'https://backend-7mzxh8l23-buixuanbach1512s-projects.vercel.app/api/';

const getAllColor = async () => {
    const response = await axios.get(`color/`);
    if (response) {
        return response.data;
    }
};

export const colorService = {
    getAllColor,
};
