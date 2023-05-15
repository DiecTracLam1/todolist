import { Alert, Button, DatePicker, Descriptions, Form, Input, Select, Space, Spin } from 'antd';
import { useCallback, useEffect, useMemo, useState } from 'react';
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
      if (type === 'add') {
        // get information employee to log into form
        const employStorage = JSON.parse(localStorage.getItem('employee'));
        const employeeApi = await userApi.getUser(employStorage.id);
        setEmployee(employeeApi?.doc?.employee);
      } else {
        try {
          // get the timesheet detail and the timesheet's id was existed
          const respone = await employSheetApi.getAdjustDetail(timesheetId);
          setTimeSheetTable(respone?.doc?.adjustEmployeeTimesheets ?? []);
          setDefaultSelected(respone?.doc?.timesheetsMasterId);
          setEmployee({ ...respone.doc, ...respone.doc.AdjustEmployerEmployeeCreate });
        } catch (error) {
          setError(true);
          return;
        }
      }

      const timesheetlist = await timeSheetApi.getAll();
      setTimesheetList(timesheetlist?.docs);
      setLoading(false);
    };
    getTimeSheet();
  }, [timesheetId, type, setTimeSheetTable]);

  useEffect(() => {
    fieldList.forEach((field) => {
      form.setFieldsValue({ [field.name]: field.value });
    });
  }, [form, fieldList]);

  // action when selected timesheet
  const handleSelectTimeSheet = useCallback(
    (timesheetSelectedId) => {
      setLoadingTable(true);
      const getDataTable = async () => {
        if (defaultSelected === timesheetSelectedId) { 
          try {
            const respone = await employSheetApi.getAdjustDetail(timesheetId);
            setTimeSheetTable(respone?.doc?.adjustEmployeeTimesheets ?? []);
          } catch (error) {}
        } else { 
          try {
            const respone = await timeSheetApi.getMasterDetail(
              timesheetSelectedId,
              employee?.enrollNumber
            );
            setTimeSheetTable(respone?.doc.employerTimesheets);
          } catch (error) {}
        }
        setLoadingTable(false);
      };
      getDataTable();
    },
    [employee?.enrollNumber, setTimeSheetTable, setLoadingTable, timesheetId, defaultSelected]
  );

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
                    <Form.Item
                      style={{ marginBottom: 0 }}
                      name={field.name}
                      rules={[
                        {
                          required: field?.rules?.required ?? false,
                          message: field?.rules?.message,
                        },
                      ]}
                    >
                      <Input disabled={field.disabled ?? false} />
                    </Form.Item>
                  </Descriptions.Item>
                );
              } else if (field.type === 'select') {
                return (
                  <Descriptions.Item label={field.label} key={index}>
                    <Form.Item
                      style={{ marginBottom: 0 }}
                      name={field.name}
                      rules={[
                        {
                          required: field?.rules?.required ?? false,
                          message: field?.rules?.message,
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
