import axios from 'axios';
import axiosClient from '../../api/axiosClient';

const getAuthorizationHeader = () => {
  const token = localStorage.getItem('user_token');
  return { Authorization: `Bearer ${token}` };
};

export const fetchApi = async (url, { id = '', params = '', ...option }) => {
  id = id && '/' + id;
  params = params && '?' + params;
  // 123480 
  console.log(await axios.get('http://newerp.apggroup.vn:5001/api/employees/APG01096?hasEm=true' ,  { headers: getAuthorizationHeader()}))
  // console.log(await axios.get('http://newerp.apggroup.vn:5001/api/employees/APG01096?hasEm=true' ,  { headers: getAuthorizationHeader()}))

  
  return axiosClient(`${url}${id}${params}`, { headers: getAuthorizationHeader(), ...option });
};

