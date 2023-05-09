import { Alert, Button, DatePicker, Descriptions, Form, Input, Select, Space, Spin } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import employSheetApi from '~/api/employSheetApi';
import timeSheetApi from '~/api/timesheetApi';
import userApi from '~/api/userApi';
import fieldlist from '../../component/FieldList/FieldList';

const Description = ({ setTimeSheetTable, setLoadingTable, handleSubmit }) => {
  const location = useLocation();
  const { timesheetId } = useParams();
  const type = useMemo(() => location.pathname.split('/')[2], [location.pathname]);
  const timesheetLocation = location.state?.timesheet;
  const [timesheetSelectedId, setTimesheetSelectedId] = useState('');
  const [loading, setLoading] = useState(true);
  const [employee, setEmployee] = useState();
  const [timesheetList, setTimesheetList] = useState([]);
  const [defaultSelected, setDefaultSelected] = useState('');
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [error, setError] = useState(false);

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
        defaultSelected,
      }),
    [timesheetLocation, employee, timesheetDate, defaultSelected]
  );

  useEffect(() => {
    const getTimeSheet = async () => {
      const timesheetlist = await timeSheetApi.getAll();
      setTimesheetList(timesheetlist.data.data.docs);
      let employeeId = '';

      if (type === 'add') {
        const employStorage = JSON.parse(localStorage.getItem('employee'));
        employeeId = employStorage.id;
      } else {
        try {
          const respone = await employSheetApi.getAdjustDetail(timesheetId);
          setTimeSheetTable(respone?.data?.data.doc?.adjustEmployeeTimesheets ?? []);
          setDefaultSelected(respone?.data?.data.doc?.timesheetsMasterId);
          employeeId = respone?.data?.data.doc?.AdjustEmployerEmployee.id;
        } catch (error) {
          setError(true);
        }
      }

      const employeeApi = await userApi.getUser(employeeId);
      setEmployee(employeeApi.data.data.doc.employee);
      setLoading(false);
    };
    getTimeSheet();
  }, [timesheetId, type, setTimeSheetTable]);

  // action when selected timesheet 
  useEffect(() => {
    const getDataTable = async () => {
      if (timesheetSelectedId) {
        if (type !== 'add' && defaultSelected === timesheetSelectedId) {
          const respone = await employSheetApi.getAdjustDetail(timesheetId);
          setTimeSheetTable(respone?.data?.data.doc?.adjustEmployeeTimesheets ?? []);
        } else {
          const respone = await timeSheetApi.getMasterDetail(
            timesheetSelectedId,
            employee?.enrollNumber
          );
          setTimeSheetTable(respone.data.data.doc.employerTimesheets);
        }
        setLoadingTable(false);
      }
    };
    getDataTable();
  }, [
    timesheetSelectedId,
    employee?.enrollNumber,
    setTimeSheetTable,
    setLoadingTable,
    type,
    timesheetId,
    defaultSelected,
  ]);

  useEffect(() => {
    fieldList.forEach((field) => {
      form.setFieldsValue({ [field.name]: field.value });
    });
  }, [form, fieldList]);

  const handleSelectTimeSheet = (e) => {
    setTimesheetSelectedId(e);
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
    <>
      {error && (
        <Alert
          message="Lỗi"
          description="Mã số phiếu không tồn tại."
          type="error"
          showIcon
          closable
          action={
            <Button
              size="middle"
              onClick={() => {
                navigate('/timesheet');
              }}
              danger
            >
              Trở lại
            </Button>
          }
        />
      )}
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

            <Form.Item>
              <div style={{ float: 'right' }}>
                <Space>
                  <Button onClick={handleCancle}>Trở lại</Button>
                  {type !== 'detail' && (
                    <Button htmlType="submit" type="primary">
                      {type === 'add' ? 'Thêm' : 'Cập nhật'}
                    </Button>
                  )}
                </Space>
              </div>
            </Form.Item>
          </Descriptions>
        </Form>
      </Spin>
    </>
  );
};

export default Description;
