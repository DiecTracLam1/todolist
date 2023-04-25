import { fetchApi } from '../features/api/fetchApi';

const userApi = {
  login(data) {
    const url = '/auth/login';
    return fetchApi(url, { method: 'POST', data });
  },
  getUser(id = '') {
    const url = '/employees';
    const params = new URLSearchParams({ hasEm: true }).toString();
    return fetchApi(url, { id, method: 'GET', params });
  },
};
export default userApi;
