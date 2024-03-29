import { Button, Form, Result, Table, Typography, message } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { addEmploySheetThunk, editEmploySheetThunk } from '~/features/timesheet/employSheetSlice';
import { columnsDetail } from './ColumnDetail.jsx';
import FormSheet from './Form.jsx';

const Detail = () => {
  const location = useLocation();
  const [form] = Form.useForm();
  const type = useMemo(() => location.pathname.split('/')[2], [location.pathname]);
  const navigate = useNavigate();
  const [timeSheetTable, setTimeSheetTable] = useState([]);
  const [loadingTable, setLoadingTable] = useState(false);
  const { timesheetId } = useParams();
  const [messageApi, contextHolder] = message.useMessage();
  const dispatch = useDispatch();

  const handleEditTime = (values, index, name) => {
    const newTimeSheetTable = [...timeSheetTable];
    newTimeSheetTable[index][name] = values;
    setTimeSheetTable(newTimeSheetTable);
  };

  useEffect(() => {
    timeSheetTable.forEach((timesheet, index) => {
      form.setFieldsValue({ [`workingHourEdit${index}`]: timesheet?.workingHourEdit });
      form.setFieldsValue({ [`overtimeEdit${index}`]: timesheet?.overtimeEdit });
    });
  }, [timeSheetTable, form]);

  const handleSubmit = async (values) => {
    setLoadingTable(true);
    const date = values?.createDate?.$d ?? new Date()
    const [month, year] = [date?.getMonth(), date.getFullYear()];
    const newValues = { ...values, month, year };
    const adjustTimesheet = { adjustEmployeeTimesheets: [...timeSheetTable] };
    try {
      const result =
        type === 'add'
          ? await dispatch(addEmploySheetThunk({ newValues, adjustTimesheet }))
          : await dispatch(
              editEmploySheetThunk({
                newValues,
                adjustTimesheet,
                id: timesheetId,
              })
            );
      messageApi.open({
        type: 'success',
        content: `${type === 'add' ? 'Thêm' : 'Sửa'} thành công`,
      });
      if (type === 'add')
        navigate(`/timesheet/edit/${result.payload?.id}`, { state: { timesheet: result.payload } });
    } catch (error) {
      console.error(error);
      messageApi.open({ type: 'error', content: 'Xử lý đang bị lỗi' });
    } finally {
      setLoadingTable(false);
    }
  };

  if (location.pathname !== '/timesheet/add' && !timesheetId) {
    return (
      <Result
        status="error"
        title="Tải trang thất bại"
        subTitle="Vui lòng hãy chọn chi tiết thời gian biểu ."
        extra={[
          <Button onClick={() => navigate('/timesheet')} type="primary" key="console">
            Trở lại
          </Button>,
        ]}
      ></Result>
    );
  }
  return (
    <div>
      {contextHolder}
      <Typography.Title
        level={2}
        style={{
          fontSize: '2rem',
          textAlign: 'center',
          backgroundColor: '#464040',
          color: 'white',
          margin: '0 0 16px 0',
        }}
      >
        Thời gian biểu
      </Typography.Title>
      <Form onFinish={handleSubmit} form={form}>
        <FormSheet
          setTimeSheetTable={setTimeSheetTable}
          setLoadingTable={setLoadingTable}
          handleSubmit={handleSubmit}
          form={form}
        />
        <Table
          size="small"
          rowKey="timesheetsDetailDay"
          dataSource={timeSheetTable}
          columns={columnsDetail({ handleEditTime })}
          bordered
          style={{ marginTop: '14px' }}
          pagination={false}
          scroll={{ x: true, y: '550px' }}
          loading={loadingTable}
        />
      </Form>
    </div>
  );
};

export default Detail;
