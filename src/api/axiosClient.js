import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'http://newerp.apggroup.vn:5001/api/auth',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosClient;