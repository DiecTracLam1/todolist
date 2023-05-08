import { Button, DatePicker, Descriptions, Form, Input, Select, Space, Spin } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import timeSheetApi from '~/api/timesheetApi';
import userApi from '~/api/userApi';
import fieldlist from '../../component/FieldList/FieldList';
import { getDetailEmploySheetThunk } from '~/features/timesheet/employSheetSlice.js';
import { useDispatch } from 'react-redux';
import employSheetApi from '~/api/employSheetApi';

const Description = ({ setTimeSheetTable, setLoadingTable, handleSubmit }) => {
  const location = useLocation();
  const type = location.state?.type ?? 'add';
  const timesheetLocation = location.state?.timesheet;
  const [timesheetID, setTimesheetID] = useState('');
  const [loading, setLoading] = useState(true);
  const [employee, setEmployee] = useState();
  const [timesheetList, setTimesheetList] = useState([]);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  console.log(timesheetList);
  const timesheetDate = useMemo(
    () =>
      timesheetList.map((item, index) => {
        return { label: item.name, value: item.id };
      }),
    [timesheetList]
  );

  const fieldList = useMemo(
    () =>
      fieldlist({
        timesheetLocation,
        employee,
        timesheetDate,
      }),
    [timesheetLocation, employee, timesheetDate]
  );

  useEffect(() => {
    const getTimeSheet = async () => {
      const timesheetlist= await timeSheetApi.getAll();
      setTimesheetList(timesheetlist.data.data.docs);

      if (type === 'add') {
        const employStorage = JSON.parse(localStorage.getItem('employee'));
        const employeeId = employStorage.id;
        const employeeApi = await userApi.getUser(employeeId);
        setEmployee(employeeApi.data.data.doc.employee);
      } else {
        // api get detail timesheet by id
        //hr/adjust-employee-timesheets/${timesheetLocation}
        const respone = await employSheetApi.getDetail(timesheetLocation.id);
        setTimeSheetTable(respone?.data?.data.doc?.adjustEmployeeTimesheets ?? []);
        console.log('values:::', respone);
      }
      setLoading(false);
    };
    getTimeSheet();
  }, [timesheetLocation?.AdjustEmployerEmployee?.employeeId, type]);

  useEffect(() => {
    const getDataTable = async () => {
      if (employee?.enrollNumber && timesheetID) {
        console.log(timesheetID);
        const respone = await timeSheetApi.getDetail(timesheetID, employee?.enrollNumber);
        setTimeSheetTable(respone.data.data.doc.employerTimesheets);
        setLoadingTable(false);
      }
    };
    getDataTable();
  }, [timesheetID, employee?.enrollNumber, setTimeSheetTable, setLoadingTable]);

  useEffect(() => {
    fieldList.forEach((field) => {
      form.setFieldsValue({ [field.name]: field.value });
    });
  }, [form, fieldList]);

  const handleSelectTimeSheet = (e) => {
    setTimesheetID(e);
    setLoadingTable(true);
  };

  const handleCancle = () => {
    navigate('/timesheet');
  };

  const handleSubmitButton = (values) => {
    const month = values.dateIn.$D;
    const year = values.dateIn.$y;
    const newValues = { ...values, month, year };
    handleSubmit(newValues, type);
  };

  return (
    <Spin spinning={loading}>
      <Form onFinish={handleSubmitButton} form={form}>
        <Descriptions bordered>
          {fieldList.map((field, index) => {
            if (field.type === 'input') {
              return (
                <Descriptions.Item label={field.label} key={index}>
                  <Form.Item style={{ marginBottom: 0 }} name={field.name}>
                    <Input disabled={field.disabled ?? false} />
                  </Form.Item>
                </Descriptions.Item>
              );
            } else if (field.type === 'select') {
              return (
                <Descriptions.Item label={field.label} key={index}>
                  <Form.Item style={{ marginBottom: 0 }} name={field.name}>
                    <Select
                      defaultValue="BC032023"
                      onChange={handleSelectTimeSheet}
                      style={{ width: '100%' }}
                      options={field.options}
                      disabled={field.disabled ?? false}
                    />
                  </Form.Item>
                </Descriptions.Item>
              );
            } else {
              return (
                <Descriptions.Item label={field.label} key={index}>
                  <Form.Item name={field.name} style={{ marginBottom: 0 }}>
                    <DatePicker style={{ width: '100%' }} disabled={field.disabled ?? false} />
                  </Form.Item>
                </Descriptions.Item>
              );
            }
          })}
          {type !== 'detail' && (
            <Form.Item>
              <div style={{ float: 'right' }}>
                <Space>
                  <Button onClick={handleCancle}>Hủy</Button>
                  <Button htmlType="submit" type="primary">
                    {type === 'add' ? 'Thêm' : 'Cập nhật'}
                  </Button>
                </Space>
              </div>
            </Form.Item>
          )}
        </Descriptions>
      </Form>
    </Spin>
  );
};

export default Description;
