import { fetchApi } from '../features/api/fetchApi';

const url = '/hr/timesheet-masters';

const timeSheetApi = {
  async getAll() {
    return fetchApi(url, { method: 'GET' });
  },

  async getMasterDetail(timesheetID = '', enrollnumber = '') {
    timesheetID = timesheetID && '/' + timesheetID;
    enrollnumber = enrollnumber && '/' + enrollnumber;

    const newUrl = `hr/employer-timesheet-details${timesheetID}${enrollnumber}`;
    return fetchApi(newUrl, { method: 'GET' });
  },

  async add(data) {
    return fetchApi(url, { method: 'POST', data });
  },
};
export default timeSheetApi;
