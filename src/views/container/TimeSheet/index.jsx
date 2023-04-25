import { Table, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getEmploySheetThunk } from '~/features/timesheet/employSheetSlice.js';
import { columns } from './Column.jsx';
import styled from 'styled-components';
import { PlusOutlined } from '@ant-design/icons';

const AddButtonContainer = styled.div`
  position: fixed;
  top: 92%;
  left: 55%;
  right: 42%;
  bottom: 2%;
  background-color: rgba(6, 197, 47, 0.897);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  color: white;
  cursor: pointer;
  &:hover{
    opacity: 0.8;
  }
`;
const TimeSheet = ({ searchParams, setSearchParams }) => {
  const TimeSheetList = useSelector((state) => state.timesheet.data.docs);
  const total = useSelector((state) => state.timesheet.data.total);
  const loading = useSelector((state) => state.timesheet.loading);
  const [page, setPage] = useState(Number(searchParams._page ?? 1));
  const [pageSize, setPageSize] = useState(searchParams._limit ?? 10);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const getApi = async () => {
      await dispatch(getEmploySheetThunk({ page: page, pageSize: pageSize }));
    };
    getApi();
  }, [dispatch, page, pageSize]);

  const handleChangePage = ({ current, pageSize }) => {
    setPage(current);
    setPageSize(pageSize);
    setSearchParams({ ...searchParams, _page: current, _limit: pageSize });
  };

  const handleDetail = (timesheet) => {
    navigate('/timesheet/add', { state: { timesheet: timesheet, type: 'detail' } });
    console.log(timesheet);
  };

  const handleEdit = (todo) => {};

  const handleDelete = async (id) => {};

  const handleButtonDone = async (todo) => {};
  return (
    <>
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
      <Table
        style={{ boxShadow: '5px 4px 4px 2px #d4d4d4' }}
        rowKey="id"
        columns={columns({
          handleDetail,
          handleEdit,
          handleDelete,
          handleButtonDone,
          page,
          pageSize,
        })}
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
      <AddButtonContainer>
        <PlusOutlined style={{fontSize:"30px"}}/>
      </AddButtonContainer>
    </>
  );
};

export default TimeSheet;
