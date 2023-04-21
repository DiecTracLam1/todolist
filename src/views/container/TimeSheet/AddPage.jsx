import { DatePicker, Descriptions, Dropdown, Input, Select, Table, Typography } from 'antd';
import React, { useEffect, useMemo, useState } from 'react';
import { columns } from './ColumnTable.jsx';
import timeSheetApi from '~/api/timeSheetApi';

const items = [
  {
    label: '1st menu item',
    key: '1',
  },
  {
    label: '2nd menu item',
    key: '2',
  },
  {
    label: '3rd menu item',
    key: '3',
  },
];
const AddPage = () => {
  const [timesheet, setTimesheet] = useState([]);
  const timesheetName = useMemo(
    () =>
      timesheet.map((item) => {
        return {label: item.name , value : item.id};
      }),
    [timesheet]
  );
  console.log(timesheet)

  useEffect(() => {
    const getTimeSheet = async () => {
      const result = await timeSheetApi.getAll();
      setTimesheet(result.data.data.docs);
    };
    getTimeSheet();
  }, []);
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

      <Descriptions span={{ xs: 2 }} bordered>
        <Descriptions.Item label="Số phiếu" span={2}>
          <Input></Input>
        </Descriptions.Item>
        <Descriptions.Item label="Mã nhân viên" span={2}>
          <Input></Input>
        </Descriptions.Item>
        <Descriptions.Item label="Tên nhân viên" span={2}>
          <Input></Input>
        </Descriptions.Item>
        <Descriptions.Item label="Phòng Ban" span={2}>
          <Select style={{ width: '100%' }} options={[{ value: '1', label: 'Phòng IT' }]} />
        </Descriptions.Item>
        <Descriptions.Item label="Chức danh" span={2}>
          <Select style={{ width: '100%' }} options={[{ value: '1', label: 'Tổng giám đốc' }]} />
        </Descriptions.Item>
        <Descriptions.Item label="Ngày vào làm" span={2}>
          <DatePicker style={{ width: '100%' }} />
        </Descriptions.Item>
        <Descriptions.Item label="Chọn bảng công" span={2}>
          <Select style={{ width: '100%' }} options={timesheetName} />
        </Descriptions.Item>
        <Descriptions.Item label="Nội dung" span={2}>
          <Input></Input>
        </Descriptions.Item>
        <Descriptions.Item label="Ngày lập" span={2}>
          <DatePicker style={{ width: '100%' }} />
        </Descriptions.Item>
        <Descriptions.Item span={2}></Descriptions.Item>
      </Descriptions>

      <Table bordered style={{ marginTop: '14px' }} rowKey="id" columns={columns()} />
    </div>
  );
};

export default AddPage;
