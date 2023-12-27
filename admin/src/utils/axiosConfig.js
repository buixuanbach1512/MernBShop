import axios from 'axios';
let getToken = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')) : { token: null };

axios.defaults.baseURL = 'http://localhost:5000/api/';
axios.defaults.headers.common = { Authorization: `Bearer ${getToken.token}` };
export default axios;
