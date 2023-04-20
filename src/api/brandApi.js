import { fetchApi } from '../features/api/fetchApi';

const url = '/sys/brands';

const brandApi = {
  async getAll(offset = 5, limit = 5, searchList = []) {
    const searchlist = searchList
      .filter((search) => search.value)
      .map((search) => {
        return {
          code: search.key,
          operator: 'contains_case_insensitive',
          value: search.key === 'createdAt' ? new Date(search.value).toISOString() : search.value,
        };
      });

    let params = {
      filters: JSON.stringify(searchlist),
      limit: limit,
      offset: offset,
    };
    params = new URLSearchParams(params).toString();
    return fetchApi(url, { method: 'GET', params });
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
export default brandApi;
