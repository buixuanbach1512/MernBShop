import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:5000/api/';

const getAllColor = async () => {
    const response = await axios.get(`color/`);
    if (response) {
        return response.data;
    }
};

export const colorService = {
    getAllColor,
};
