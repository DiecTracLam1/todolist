import axiosClient from './axiosClient';

const url = '/sys/brands';


const brandApi = {
  async getAll(offset = 5 , limit = 5) {
    let token =  await localStorage.getItem('user_token');
    const urlParam = `${url}?limit=${limit}&offset=${offset}`
    return axiosClient.get(urlParam, { headers: { Authorization: `Bearer ${token}` } });
  },

  async getDetail(id) {
    let token =  await localStorage.getItem('user_token');
    const urlParam = `${url}/${id}`;
    return axiosClient.get(urlParam, { headers: { Authorization: `Bearer ${token}` } });
  },

  async add(todo) {
    let token =  await localStorage.getItem('user_token');
    return axiosClient.post(url, todo, { headers: { Authorization: `Bearer ${token}` } });
  },

  async edit(todo) {
    let token =  await localStorage.getItem('user_token');
    const urlParam = `${url}/${todo.id}`;
    return axiosClient.put(urlParam, todo, { headers: { Authorization: `Bearer ${token}` } });
  },

  async delete(id) {
    let token =  await localStorage.getItem('user_token');
    const urlParam = `${url}/${id}`;
    return axiosClient.delete(urlParam, { headers: { Authorization: `Bearer ${token}` } });
  },
};
export default brandApi;
