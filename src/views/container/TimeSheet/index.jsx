import { Table, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { getEmploySheetThunk } from '~/features/timesheet/employSheetSlice.js';
import TimesheetForm from '../../presentation/Form/TimesheetForm.jsx';
import { columns } from './Column.jsx';
import { AiFillPlusCircle} from 'react-icons/ai'
const AddButtonContainer = styled.div`
  position: fixed;
  top: 88%;
  left: 55%;
  right: 42%;
  bottom: 2%;
  color: rgba(6, 197, 47, 0.897);
  font-size: 46px;
`;

const AddButton = styled.div`
  border-radius: 50%;
  padding: 4px 8px;
  color: white;
  height: 100%;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`;
const TimeSheet = ({ searchParams, setSearchParams }) => {
  const TimeSheetList = useSelector((state) => state.timesheet.data.docs);
  const total = useSelector((state) => state.timesheet.data.total);
  const loading = useSelector((state) => state.timesheet.loading);
  const [page, setPage] = useState(Number(searchParams._page ?? 1));
  const [pageSize, setPageSize] = useState(searchParams._limit ?? 10);
  const [openForm, setOpenForm] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  console.log(TimeSheetList)

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

  const handleAddTable = () => {
    // setCurrentTodo({});
    setOpenForm('Add');
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
        style={{ boxShadow: '5px 4px 4px 2px #d4d4d4', zIndex: 0 }}
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
        <AiFillPlusCircle onClick={handleAddTable} style={{cursor:'pointer'}} />
      </AddButtonContainer>
      {openForm != '' && <TimesheetForm openForm={openForm} setOpenForm={setOpenForm} />}
    </>
  );
};

export default TimeSheet;
