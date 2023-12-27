import axios from '../../utils/axiosConfig';

const getSize = async (sizeName) => {
    const response = await axios.get(`size?${sizeName ? `name=${sizeName}`:''}`);
    return response.data;
};

const createSize = async (size) => {
    const response = await axios.post(`size/`, size);
    return response.data;
};

const getASize = async (id) => {
    const response = await axios.get(`size/${id}`);
    return response.data;
};

const updateSize = async (size) => {
    const response = await axios.put(`size/${size.id}`, size.sizeData);
    return response.data;
};

const deleteSize = async (id) => {
    const response = await axios.delete(`size/${id}`);
    return response.data;
};

const sizeService = {
    getSize,
    createSize,
    getASize,
    updateSize,
    deleteSize,
};
export default sizeService;
