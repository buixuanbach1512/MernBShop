import axios from 'axios';
axios.defaults.baseURL = 'https://backend-5qwebmt2k-buixuanbach1512s-projects.vercel.app/api/';

const getAllColor = async () => {
    const response = await axios.get(`color/`);
    if (response) {
        return response.data;
    }
};

export const colorService = {
    getAllColor,
};
