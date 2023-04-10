import Table from 'antd/es/table';
import { useEffect, useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import '~/assets/css/TodoList.css';
import { columns } from '~/features/antd/tableColumn';
import { deleTodoThunk, editTodoThunk, getDataThunk } from '~/features/todo/todoSlice';
import { getAllParams } from '~/ultis/getAllParams';

const ContainerList = styled.div`
  padding-right: 8px;
  margin-top: 18px;
`;

const List = (props) => {
  const { searchParams, limit, handleDetail, handleEdit, pageCount } = props;
  const offset = useMemo(() => Number(limit) * Number(pageCount), [limit, pageCount]);
  const TodoList = useSelector((state) => state.todo.data.docs ?? []);
  const NewTodoList = useMemo(
    () =>
      TodoList.map((todo, i) => {
        return {
          num: i + 1 + offset,
          ...todo,
          createdAt: new Date(todo.createdAt).toLocaleDateString(),
        };
      }),
    [TodoList, offset]
  );
  const loading = useSelector((state) => state.todo.loading);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const getApi = async () => {
      const result = await dispatch(
        getDataThunk({
          limit,
          offset,
          searchText: [
            { value: searchParams.name, key: 'name' },
            { value: searchParams.id, key: 'id' },
            { value: searchParams.fullName, key: 'BrandEmployeeCreate.fullName' },
            { value: searchParams.createdAt, key: 'createdAt' },
          ],
        })
      );
      if (!!result.payload?.errorCode) {
        localStorage.removeItem('user_token');
        navigate('/login');
      }
    };
    getApi();
  }, [
    dispatch,
    limit,
    offset,
    navigate,
    searchParams?.name,
    searchParams.id,
    searchParams.fullName,
    searchParams.createdAt,
  ]);

  
  
  if (loading) return;

  return (
    <>
      <ContainerList>
        {/* <Table
          rowKey="id"
          columns={column}
          dataSource={NewTodoList}
          pagination={false}
          scroll={{ x: true, y: '420px' }}
          bordered
          ref={table}
        /> */}
      </ContainerList>
    </>
  );
};
export default List;
