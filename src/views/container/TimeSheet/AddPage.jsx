import { Button, Result, Table, Typography } from 'antd';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { columns } from './ColumnDetail.jsx';
import Description from './Description.jsx';

const AddPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [timeSheetTable, setTimeSheetTable] = useState([]);
  const [loadingTable, setLoadingTable] = useState(false);

  console.log(timeSheetTable);

  const handleSubmit = (employee) => {
    console.log(employee)
  };

  if (!location.state && location.pathname !== '/timesheet/add') {
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
        rowKey="Id"
        dataSource={timeSheetTable}
        columns={columns()}
        bordered
        style={{ marginTop: '14px' }}
        pagination={false}
        scroll={{ x: true, y: '580px' }}
        loading={loadingTable}
      />
    </div>
  );
};

export default AddPage;
