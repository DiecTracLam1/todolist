import { fetchApi } from '../features/api/fetchApi';

const url = '/hr/timesheet-masters';

const timeSheetApi = {
  async getAll() {
    return fetchApi(url, { method: 'GET'});
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
export default timeSheetApi;