import { Button, DatePicker, Descriptions, Form, Input, Select, Space, Spin } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import timeSheetApi from '~/api/timesheetApi';
import userApi from '~/api/userApi';
import fieldlist from './FieldList';

const Description = ({ setTimeSheetTable, setLoadingTable, handleSubmit }) => {
  const location = useLocation();
  const type = location.state?.type;
  const timesheetLocation = location.state?.timesheet;
  const [timesheetID, setTimesheetID] = useState('');
  const [loading, setLoading] = useState(true);
  const [employee, setEmployee] = useState();
  const [timesheetList, setTimesheetList] = useState([]);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const timesheetDate = useMemo(
    () =>
      timesheetList.map((item) => {
        return { label: item.name, value: item.id };
      }),
    [timesheetList]
  );

  // console.log(location);
  // console.log(employee)

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
        console.log(respone.data.data.doc);
        setLoadingTable(false);
      }
    };
    getDataTable();
  }, [timesheetID, employee?.enrollNumber, setTimeSheetTable, setLoadingTable]);

  const handleSelectTimeSheet = (e) => {
    setTimesheetID(e);
    setLoadingTable(true);
  };

  useEffect(() => {
    const fieldList = fieldlist({
      timesheetLocation,
      employee,
      timesheetDate,
    });
    fieldList.forEach((field) => {
      console.log(field);
      form.setFieldsValue({ [field.name]: field.value });
    });
  }, [form, employee, timesheetLocation, timesheetDate]);

  const fieldList = fieldlist({
    timesheetLocation,
    employee,
    timesheetDate,
    handleSelectTimeSheet,
  });

  const handleCancle = () => {
    navigate('/timesheet', { state: { timesheet: {}, type: 'add' } });
  };

  const handleSubmitButton = (values) => {
    handleSubmit(values);
  };

  return (
    <Spin spinning={loading}>
      <Form onFinish={handleSubmitButton} form={form}>
        <Descriptions bordered>
          {fieldList.map((field, index) => {
            if (field.type === 'input') {
              return (
                <Descriptions.Item label={field.label} key={index}>
                  <Form.Item name={field.name}>
                    <Input disabled={field.disabled ?? false} />
                  </Form.Item>
                </Descriptions.Item>
              );
            } else if (field.type === 'select') {
              return (
                <Descriptions.Item label={field.label} key={index}>
                  <Form.Item
                    name={field.name}
                    rules={[
                      {
                        required: field.rules?.require ?? false,
                        message: field.rules?.message,
                      },
                    ]}
                  >
                    <Select
                      onChange={handleSelectTimeSheet}
                      style={{ width: '100%' }}
                      options={field.options}
                      disabled={field.disabled ?? false}
                    />
                  </Form.Item>
                </Descriptions.Item>
              );
            } else {
              console.log();
              return (
                <Descriptions.Item label={field.label} key={index}>
                  <Form.Item name={field.name}>
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
