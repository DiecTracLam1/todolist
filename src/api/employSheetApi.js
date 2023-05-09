import { fetchApi } from '../features/api/fetchApi';

const url = '/hr/adjust-employee-timesheets';

const employSheetApi = {
  async getAll({ page, pageSize }) {
    let params = {
      limit: pageSize,
      offset: Number(page - 1) * pageSize,
    };
    params = new URLSearchParams(params).toString();
    return fetchApi(url, { method: 'GET', params });
  },

  async getAdjustDetail(id) {
    return fetchApi(url, { id, method: 'GET'});
  },

  async add(data) {
    const newData = { ...data.detailValues, ...data.adjustTimesheet };
    return fetchApi(url, { method: 'POST', data: newData });
  },

  async edit(data) {
    const newData = { ...data.detailValues, ...data.adjustTimesheet };
    const id = data.id;
    return fetchApi(url, { id, method: 'PUT', data: newData });
  },

  async delete(id) {
    return fetchApi(url, { id, method: 'DELETE' });
  },
};
export default employSheetApi;
