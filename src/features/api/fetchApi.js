import axiosClient from '../../api/axiosClient';

const getAuthorizationHeader = () => {
  const token = localStorage.getItem('user_token');
  return { Authorization: `Bearer ${token}` };
};

export const fetchApiTodo = async (url, { id = '', params = '', ...option }) => {
  id = id && '/' + id;
  params = params && '?' + params;
  return axiosClient(`${url}${id}${params}`, { headers: getAuthorizationHeader(), ...option });
};

export const fetchApiUser = async (url, { id = '', params = '', ...option }) => {
  id = id && '/' + id;
  params = params && '?' + params;
  return axiosClient(`${url}${id}${params}`, { ...option });
};
