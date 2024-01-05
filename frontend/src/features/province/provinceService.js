import axios from 'axios';

const getProvince = async () => {
    const response = await axios.get('https://vapi.vnappmob.com/api/province/');
    if (response.data) {
        return response.data;
    }
};

const getDistrict = async (id) => {
    const response = await axios.get(`https://vapi.vnappmob.com/api/province/district/${id}`);
    if (response.data) {
        return response.data;
    }
};

const provinceService = {
    getProvince,
    getDistrict,
};

export default provinceService;
