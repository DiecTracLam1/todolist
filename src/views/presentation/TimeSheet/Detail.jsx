import { Button, Result, Table, Typography } from 'antd';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { addEmploySheetThunk, editEmploySheetThunk } from '~/features/timesheet/employSheetSlice';
import { columns } from './ColumnDetail.jsx';
import Description from './Description.jsx';

const Detail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [timeSheetTable, setTimeSheetTable] = useState([]);
  const [loadingTable, setLoadingTable] = useState(false);
  const { timesheetId } = useParams();
  const dispatch = useDispatch();

  const handleWorkingHour = (values, index) => {
    const newTimeSheetTable = [...timeSheetTable];
    newTimeSheetTable[index]['workingHourEdit'] = values;
    setTimeSheetTable(newTimeSheetTable);
  };

  const handleOvertime = (values, index) => {
    const newTimeSheetTable = [...timeSheetTable];
    newTimeSheetTable[index]['overtimeEdit'] = values;
    setTimeSheetTable(newTimeSheetTable);
  };

  const handleSubmit = async (detailValues, type) => {
    const adjustTimesheet = { adjustEmployeeTimesheets: [...timeSheetTable] };

    if (type === 'add') await dispatch(addEmploySheetThunk({ detailValues, adjustTimesheet }));
    else
      await dispatch(
        editEmploySheetThunk({ detailValues, adjustTimesheet, id: location.state?.timesheet.id })
      );

    navigate('/timesheet');
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

      <Description
        setTimeSheetTable={setTimeSheetTable}
        setLoadingTable={setLoadingTable}
        handleSubmit={handleSubmit}
      />

      <Table
        size="small"
        rowKey="timesheetsDetailDay"
        dataSource={timeSheetTable}
        columns={columns({ handleWorkingHour, handleOvertime })}
        bordered
        style={{ marginTop: '14px' }}
        pagination={false}
        scroll={{ x: true, y: '550px' }}
        loading={loadingTable}
      />
    </div>
  );
};

export default Detail;
