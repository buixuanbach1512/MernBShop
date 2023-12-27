import axios from '../../utils/axiosConfig';

const getColors = async (colorName) => {
    const response = await axios.get(`color?${colorName ? `name=${colorName}`: ''}`);
    return response.data;
};

const createColors = async (color) => {
    const response = await axios.post(`color/`, color);
    return response.data;
};

const getAColor = async (id) => {
    const response = await axios.get(`color/${id}`);
    return response.data;
};

const updateColor = async (color) => {
    const response = await axios.put(`color/${color.id}`, color.colorData);
    return response.data;
};

const deleteColor = async (id) => {
    const response = await axios.delete(`color/${id}`);
    return response.data;
};

const colorService = {
    getColors,
    createColors,
    getAColor,
    updateColor,
    deleteColor,
};
export default colorService;
