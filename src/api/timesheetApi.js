import { fetchApi } from '../features/api/fetchApi';

const url = '/hr/adjust-employee-timesheets';

const timesheetApi = {
  async getAll({page , pageSize}) {
    let params = {
      limit: pageSize,
      offset: Number(page - 1) * pageSize,
    };
    params = new URLSearchParams(params).toString();
    return fetchApi(url, { method: 'GET' , params});
  },

  async getDetail(params) {
    return fetchApi(url, { method: 'GET', params });
  },

  async add(data) {
    return fetchApi(url, { method: 'POST', data });
  },

  async edit(data) {
    const id = data.id;
    return fetchApi(url, { id, method: 'PUT', data });
  },

  async delete(id) {
    return fetchApi(url, { id, method: 'DELETE' });
  },
};
export default timesheetApi;
