import axios from '../../utils/axiosConfig';

const uploadImg = async (data) => {
    const response = await axios.post(`upload/upload-img`, data);
    return response.data;
};

const deleteImg = async (id) => {
    const response = await axios.delete(`upload/delete-img/${id}`);
    return response.data;
};

const uploadService = {
    uploadImg,
    deleteImg,
};

export default uploadService;
