import { Alert, Button, DatePicker, Descriptions, Form, Input, Select, Space, Spin } from 'antd';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import employSheetApi from '~/api/employSheetApi';
import timeSheetApi from '~/api/timesheetApi';
import userApi from '~/api/userApi';
import fieldlist from '../../component/FieldList/FieldList';

const FormSheet = ({ setTimeSheetTable, setLoadingTable, form }) => {
  const location = useLocation();
  const { timesheetId } = useParams();
  const type = useMemo(() => location.pathname.split('/')[2], [location.pathname]);
  const timesheetLocation = location.state?.timesheet;
  const [loading, setLoading] = useState(true);
  const [employee, setEmployee] = useState();
  const [timesheetList, setTimesheetList] = useState([]);
  const [defaultTableId, setDefaultTableId] = useState('');
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
        defaultTableId,
        type,
      }),
    [timesheetLocation, employee, timesheetDate, defaultTableId, type]
  );

  useEffect(() => {
    const getTimeSheet = async () => {
      try {
        const timesheetlist = await timeSheetApi.getAll();
        const response =
          type === 'add'
            ? JSON.parse(localStorage.getItem('employee'))
            : await employSheetApi.getAdjustDetail(timesheetId);
        const employeeApi = await userApi.getUser(response?.doc?.employeeId ?? response.id);
        setTimesheetList(timesheetlist?.docs);
        setEmployee(employeeApi?.doc?.employee);
        setTimeSheetTable(response?.doc?.adjustEmployeeTimesheets ?? []);
        setDefaultTableId(response?.doc?.timesheetsMasterId ?? '');
      } catch (error) {
        console.error(error);
        setError(true);
      } finally {
        setLoading(false);
      }
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
    (timeSheetSelectedId) => {
      setLoadingTable(true);
      const getDataTable = async () => {
        try {
          const respone =
            defaultTableId === timeSheetSelectedId
              ? await employSheetApi.getAdjustDetail(timesheetId)
              : await timeSheetApi.getMasterDetail(timeSheetSelectedId, employee?.enrollNumber);
          const timesheetTable =
            respone?.doc?.employerTimesheets ?? respone?.doc?.adjustEmployeeTimesheets;
          setTimeSheetTable(timesheetTable);
        } catch (error) {
          console.error(error);
        } finally {
          setLoadingTable(false);
        }
      };
      getDataTable();
    },
    [employee?.enrollNumber, setTimeSheetTable, setLoadingTable, timesheetId, defaultTableId]
  );
  
  const handleCancle = () => {
    navigate('/timesheet');
  };

  // const handleSubmitButton = async (values) => {
  //   setLoading(true);
  //   const month = values.dateIn.$D;
  //   const year = values.dateIn.$y;
  //   const newValues = { ...values, month, year };
  //   const check = await handleSubmit(newValues, type);
  //   if (check) setLoading(false);
  // };

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
      </Spin>
    </>
  );
};

export default FormSheet;
