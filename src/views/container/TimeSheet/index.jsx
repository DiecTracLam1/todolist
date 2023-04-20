import { Table, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTimesheetThunk } from '~/features/timesheet/timesheetSlice.js';
import { columns } from './Column.jsx';

const TimeSheet = ({searchParams , setSearchParams}) => {
  const TimeSheetList = useSelector((state) => state.timesheet.data.docs);
  const total = useSelector((state) => state.timesheet.data.total);
  const loading = useSelector((state) => state.timesheet.loading);
  const [page, setPage] = useState(searchParams._page ?? 1);
  const [pageSize , setPageSize] = useState(searchParams._limit ?? 10);
  const dispatch = useDispatch();
  useEffect(() => {
    const getApi = async () => {
        console.log(page , pageSize)
      const result = await dispatch(getTimesheetThunk({page : page, pageSize : pageSize }));
      console.log(result);
    };
    getApi();
  }, [dispatch , page , pageSize]);

  const handleChangePage = ({current , pageSize}) => {
    setPage(current)
    setPageSize(pageSize)
    setSearchParams({...searchParams , _page : current , _limit : pageSize})
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
        TimeSheet
      </Typography.Title>
      <Table
        style={{ boxShadow: '5px 4px 4px 2px #d4d4d4' }}
        rowKey="id"
        columns={columns()}
        dataSource={TimeSheetList}
        scroll={{ x: true, y: '720px' }}
        bordered
        pagination={{
          total: total ?? 10,
          defaultCurrent: page,
          defaultPageSize: pageSize,
          showSizeChanger: true,
          pageSizeOptions: ['10', '20', '30'],
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
