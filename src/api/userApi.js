import { fetchApi } from '../features/api/fetchApi';

const userApi = {
  login(data) {
    const url = '/auth/login';
    return fetchApi(url, { method: 'POST', data });
  },
  getUser(id = "APG01096") {
    const url = '/employees';
    const params = { hasEm: true };
    return fetchApi(url, { id, method: 'GET', params });
  },
};
export default userApi;
