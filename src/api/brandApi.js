import axiosClient from './axiosClient';

const url = '/sys/brands/';
const token = localStorage.getItem('user_token');

const brandApi = {
  getAll() {
    return axiosClient.get(url, { headers: { Authorization: `Bearer ${token}` } });
  },

  getDetail(id) {
    const urlParam = `${url}${id}`;
    return axiosClient.get(urlParam, { headers: { Authorization: `Bearer ${token}` } });
  },

  edit(todo) {
    const urlParam = `${url}${todo.id}`;
    return axiosClient.get(urlParam, { headers: { Authorization: `Bearer ${token}` } }, todo);
  },
};
export default brandApi;
