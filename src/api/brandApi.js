import {  fetchApiTodo } from '../features/api/fetchApiTodo';

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
    return fetchApiTodo(url , { method: "GET", params});
  },

  async getDetail(params) {
    return fetchApiTodo(url,{  method: "GET", params });
  },

  async add(data) {
    return fetchApiTodo(url , { method: "POST",data });
  },

  async edit(data) {
    const id = data.id;
    return fetchApiTodo( url ,{ id , method : "PUT" , data});
  },

  async delete(id) {
    return fetchApiTodo(url , {id , method : "DELETE" });
  },
};
export default brandApi;
