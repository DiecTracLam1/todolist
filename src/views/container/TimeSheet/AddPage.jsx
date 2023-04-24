import { DatePicker, Descriptions, Dropdown, Input, Select, Table, Typography } from 'antd';
import React, { useEffect, useMemo, useState } from 'react';
import { columns } from './ColumnTable.jsx';
import timeSheetApi from '~/api/timeSheetApi';
import { useLocation, useMatch, useMatches, useOutlet } from 'react-router-dom';

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
  const location = useLocation();
  console.log(location);
  const [timesheet, setTimesheet] = useState([]);
  const [timesheetID, setTimesheetID] = useState('');
  const [timeSheetDetail, setTimeSheetDetail] = useState([]);
  const timesheetName = useMemo(
    () =>
      timesheet.map((item) => {
        return { label: item.name, value: item.id };
      }),
    [timesheet]
  );

  useEffect(() => {
    const getTimeSheet = async () => {
      const result = await timeSheetApi.getAll();
      setTimesheet(result.data.data.docs);
    };
    getTimeSheet();
  }, []);

  useEffect(() => {
    const getDataTable = async () => {
      const respone = await timeSheetApi.getDetail(timesheetID);
      setTimeSheetDetail(respone.data.data.doc.employerTimesheets);
    };
    getDataTable();
  }, [timesheetID]);

  console.log(timeSheetDetail);

  const handleChangeSelect = (e) => {
    setTimesheetID(e);
  };
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
          <Input value={location.state.timesheet.id}></Input>
        </Descriptions.Item>
        <Descriptions.Item label="Mã nhân viên" span={2}>
          <Input value={location.state.timesheet.AdjustEmployerEmployee.employeeId}></Input>
        </Descriptions.Item>
        <Descriptions.Item label="Tên nhân viên" span={2}>
          <Input value={location.state.timesheet.AdjustEmployerEmployee.fullName}></Input>
        </Descriptions.Item>
        <Descriptions.Item label="Phòng Ban" span={2}>
          <Select style={{ width: '100%' }} options={[{ value: '1', label: 'Phòng IT' }]} />
        </Descriptions.Item>
        <Descriptions.Item label="Chức danh" span={2}>
          <Select style={{ width: '100%' }} options={[{ value: '1', label: 'Tổng giám đốc' }]} />
        </Descriptions.Item>
        <Descriptions.Item label="Ngày vào làm" span={2}>
          <DatePicker
            // format="YYYY-MM-DD HH:mm:ss"
            style={{ width: '100%' }}
            // defaultValue={location.state.timesheet.createdAt}
          />
        </Descriptions.Item>
        <Descriptions.Item label="Chọn bảng công" span={2}>
          <Select onChange={handleChangeSelect} style={{ width: '100%' }} options={timesheetName} />
        </Descriptions.Item>
        <Descriptions.Item label="Nội dung" span={2}>
          <Input value={location.state.timesheet.content}></Input>
        </Descriptions.Item>
        <Descriptions.Item label="Ngày lập" span={2}>
          <DatePicker format="YYYY-MM-DD HH:mm:ss" style={{ width: '100%' }} />
        </Descriptions.Item>
        <Descriptions.Item span={2}></Descriptions.Item>
      </Descriptions>

      <Table
        rowKey="id"
        dataSource={timeSheetDetail}
        columns={columns()}
        bordered
        style={{ marginTop: '14px' }}
        pagination={false}
        scroll={{ x: true, y: '400px' }}
      />
    </div>
  );
};

export default AddPage;
