import axios from 'axios';
axios.defaults.baseURL = 'https://backend-5qwebmt2k-buixuanbach1512s-projects.vercel.app/api/';
const getAllCategory = async () => {
    const response = await axios.get(`category/`);
    if (response.data) {
        return response.data;
    }
};

const getProdCategory = async () => {
    const response = await axios.get('category/prod-cate');
    if (response.data) {
        return response.data;
    }
};

export const categoryService = {
    getAllCategory,
    getProdCategory,
};
