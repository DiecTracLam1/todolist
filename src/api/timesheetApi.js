import { fetchApi } from '../features/api/fetchApi';

const url = '/hr/timesheet-masters';

const timeSheetApi = {
  async getAll() {
    return fetchApi(url, { method: 'GET'});
  },

  async getDetail(timesheetID = "" ,enrollnumber=""  ) {
    timesheetID = timesheetID && "/"+timesheetID
    enrollnumber = enrollnumber && "/"+enrollnumber
    const newUrl = `hr/employer-timesheet-details${timesheetID}${enrollnumber}`
    return fetchApi(newUrl, { method: 'GET' });
  },

  async add(data) {
    return fetchApi(url, { method: 'POST', data });
  },

  // async edit(data) {
  //   const id = data.id;
  //   return fetchApi(url, { id, method: 'PUT', data });
  // },

  // async delete(id) {
  //   return fetchApi(url, { id, method: 'DELETE' });
  // },
};
export default timeSheetApi;