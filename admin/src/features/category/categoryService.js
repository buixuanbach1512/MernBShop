import axios from '../../utils/axiosConfig';

const getCategories = async (catName) => {
    const response = await axios.get(`category?${catName ? `name=${catName}`: ''}`);
    return response.data;
};

const createCategories = async (category) => {
    const response = await axios.post(`category/`, category);
    return response.data;
};
const getACategory = async (id) => {
    const response = await axios.get(`category/${id}`);
    return response.data;
};

const updateCategory = async (category) => {
    const response = await axios.put(`category/${category.id}`, category.catData);
    return response.data;
};

const deleteCategory = async (id) => {
    const response = await axios.delete(`category/${id}`);
    return response.data;
};

const categoryService = {
    getCategories,
    createCategories,
    getACategory,
    updateCategory,
    deleteCategory,
};
export default categoryService;
