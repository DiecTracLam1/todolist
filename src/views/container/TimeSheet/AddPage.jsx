import { Table, Typography } from 'antd';
import { useState } from 'react';
import { columns } from './ColumnDetail.jsx';
import Description from './Description.jsx';

const AddPage = () => {
  const [timeSheetTable, setTimeSheetTable] = useState([]);
  const [loadingTable, setLoadingTable] = useState(false);
  console.log(timeSheetTable);
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

      <Description setTimeSheetTable={setTimeSheetTable} setLoadingTable={setLoadingTable} />

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
