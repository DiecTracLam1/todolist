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

  add(todo){
    return axiosClient.post(url, { headers: { Authorization: `Bearer ${token}` }  , todo});
  },

  edit(todo) {
    const urlParam = `${url}${todo.id}`;
    return axiosClient.put(urlParam, { headers: { Authorization: `Bearer ${token}` } }, todo);
  },

  delete(id) {
    const urlParam = `${url}${id}`;
    console.log(urlParam)
    return axiosClient.delete(urlParam, { headers: { Authorization: `Bearer ${token}` } });
  },
};
export default brandApi;
