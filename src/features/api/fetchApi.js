import axiosClient from '../../api/axiosClient';

const getAuthorizationHeader = () => {
  const token = localStorage.getItem('user_token');
  return { Authorization: `Bearer ${token}` };
};

export const fetchApi = async (url, { id = '', params = '', ...option }) => {
  id = id && '/' + id;
  params = params && '?' + params;
  // console.log( await axiosClient.get("http://newerp.apggroup.vn:5001/api//hr/timesheet-masters", { headers: getAuthorizationHeader() }))
  return axiosClient(`${url}${id}${params}`, { headers: getAuthorizationHeader(), ...option });
};

