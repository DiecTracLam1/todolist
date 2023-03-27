import { fetchApi } from '../features/api/apiTodo';
import axiosClient from './axiosClient';

const url = '/sys/brands';

const brandApi = {
  async getAll(offset = 5, limit = 5, searchText) {
    let params = {
      filters: JSON.stringify([
        {
          code: 'name',
          operator: 'contains_case_insensitive',
          value: searchText,
        },
      ]),
      limit: limit,
      offset: offset,
    };
    params = new URLSearchParams(params).toString();
    return fetchApi(url , { method: "GET", params});
  },

  async getDetail(params) {
    return fetchApi(url,{  method: "GET", params });
  },

  async add(data) {
    return fetchApi(url , { method: "POST",data });
  },

  async edit(data) {
    const params = data.id;
    return fetchApi( url ,{ params , method : "PUT" , data});
  },

  async delete(param) {
    return axiosClient.delete(fetchApi({ url, param }));
  },
};
export default brandApi;
