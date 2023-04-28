import { Button, DatePicker, Descriptions, Input, Select, Space, Spin } from 'antd';
import dayjs from 'dayjs';
import { useEffect, useMemo, useState } from 'react';
import timeSheetApi from '~/api/timesheetApi';
import fieldlist from './FieldList';
import userApi from '~/api/userApi';
import { useLocation, useNavigate } from 'react-router-dom';

const Description = ({ setTimeSheetTable, setLoadingTable }) => {
  const location = useLocation();
  const type = location.state?.type;
  const timesheetLocation = location.state?.timesheet;
  const [timesheetID, setTimesheetID] = useState('');
  const [loading, setLoading] = useState(true);
  const [employee, setEmployee] = useState();
  const [timesheetList, setTimesheetList] = useState([]);
  const navigate = useNavigate();

  const timesheetName = useMemo(
    () =>
      timesheetList.map((item) => {
        return { label: item.name, value: item.id };
      }),
    [timesheetList]
  );

  console.log(location);

  useEffect(() => {
    const getTimeSheet = async () => {
      let employeeId = timesheetLocation?.AdjustEmployerEmployee?.employeeId;
      if (type === 'add' || !type) {
        const employStorage = JSON.parse(localStorage.getItem('employee'));
        employeeId = employStorage.id;
      }
      const [timesheetApi, employeeApi] = await Promise.all([
        timeSheetApi.getAll(),
        userApi.getUser(employeeId),
      ]);
      setTimesheetList(timesheetApi.data.data.docs);
      setEmployee(employeeApi.data.data.doc.employee);
      setLoading(false);
    };
    getTimeSheet();
  }, [timesheetLocation?.AdjustEmployerEmployee?.employeeId, type]);

  useEffect(() => {
    const getDataTable = async () => {
      if (employee?.enrollNumber && timesheetID) {
        const respone = await timeSheetApi.getDetail(timesheetID, employee?.enrollNumber);
        setTimeSheetTable(respone.data.data.doc.employerTimesheets);
        setLoadingTable(false);
      }
    };
    getDataTable();
  }, [timesheetID, employee?.enrollNumber, setTimeSheetTable, setLoadingTable]);

  const handleSelectTimeSheet = (e) => {
    setTimesheetID(e);
    setLoadingTable(true);
  };
  const fieldList = fieldlist({
    timesheetLocation,
    employee,
    timesheetName,
    handleSelectTimeSheet,
  });

  const handleCancle = () => {
    navigate('/timesheet', { state: { timesheet: {}, type: 'add' } });
  };

  return (
    <Spin spinning={loading}>
      <Descriptions bordered>
        {fieldList.map((field, index) => {
          if (field.type === 'input') {
            return (
              <Descriptions.Item key={index} label={field.label}>
                <Input value={field.value} name={field.name} disabled={field.disabled ?? false}/>
              </Descriptions.Item>
            );
          } else if (field.type === 'select') {
            return (
              <Descriptions.Item key={index} label={field.label}>
                <Select
                  onChange={field?.handleSelect}
                  value={field.value}
                  style={{ width: '100%' }}
                  options={field.options}
                  disabled={field.disabled ?? false}
                />
              </Descriptions.Item>
            );
          } else {
            return (
              <Descriptions.Item key={index} label={field.label}>
                <DatePicker
                  name={field.name}
                  value={field.value ? dayjs(field.value, 'YYYY-MM-DD HH:mm:ss') : field.value}
                  style={{ width: '100%' }}
                  format="YYYY-MM-DD HH:mm:ss"
                  disabled={field.disabled ?? false}
                />
              </Descriptions.Item>
            );
          }
        })}
        {type !== 'detail' && (
          <Descriptions.Item span={4}>
            <div style={{ float: 'right' }}>
              <Space>
                <Button onClick={handleCancle}>Hủy</Button>
                <Button type="primary">{type === 'add' ? 'Thêm' : 'Cập nhật'}</Button>
              </Space>
            </div>
          </Descriptions.Item>
        )}
      </Descriptions>
    </Spin>
  );
};

export default Description;
