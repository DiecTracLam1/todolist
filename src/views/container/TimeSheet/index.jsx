import { Table, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTimesheetThunk } from '~/features/timesheet/timesheetSlice.js';
import { columns } from './Column.jsx';

const TimeSheet = ({ searchParams, setSearchParams }) => {
  const TimeSheetList = useSelector((state) => state.timesheet.data.docs);
  const total = useSelector((state) => state.timesheet.data.total);
  const loading = useSelector((state) => state.timesheet.loading);
  const [page, setPage] = useState(Number(searchParams._page ?? 1));
  const [pageSize, setPageSize] = useState(searchParams._limit ?? 10);
  const dispatch = useDispatch();

  useEffect(() => {
    const getApi = async () => {
      await dispatch(getTimesheetThunk({ page: page, pageSize: pageSize }));
    };
    getApi();
  }, [dispatch, page, pageSize]);

  const handleChangePage = ({ current, pageSize }) => {
    setPage(current);
    setPageSize(pageSize);
    setSearchParams({ ...searchParams, _page: current, _limit: pageSize });
  };

  const handleDetail = (todo) => {};

  const handleEdit = (todo) => {};

  const handleDelete = async (id) => {};

  const handleButtonDone = async (todo) => {};
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
        TimeSheet
      </Typography.Title>
      <Table
        style={{ boxShadow: '5px 4px 4px 2px #d4d4d4' }}
        rowKey="id"
        columns={columns({handleDetail, handleEdit, handleDelete, handleButtonDone , page ,pageSize})}
        dataSource={TimeSheetList}
        scroll={{ x: true, y: '70vh' }}
        bordered
        pagination={{
          total: total ?? 1,
          defaultCurrent: page,
          defaultPageSize: pageSize,
          showSizeChanger: true,
          pageSizeOptions: ['10', '20', '30'],
          style: { marginRight: '10px' },
        }}
        // ref={ref}
        loading={loading}
        sticky
        onChange={handleChangePage}
      />
    </div>
  );
};

export default TimeSheet;
