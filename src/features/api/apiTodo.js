import axiosClient from '../../api/axiosClient';

const getAuthorizationHeader = () => {
  const token = localStorage.getItem('user_token');
  return { Authorization: `Bearer ${token}` } ;
};

export const fetchApi = async(url, { id = '', params= '',...option }) => {
  return axiosClient(`${url}/${id}?${params}`, { headers : getAuthorizationHeader() , ...option});
};
