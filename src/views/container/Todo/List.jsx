import Table from 'antd/es/table';
import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { columns } from '~/features/antd/tableColumn';
import '~/assets/css/TodoList.css';
import { deleTodoThunk, editTodoThunk, getDataThunk } from '~/features/todo/todoSlice';

const ContainerList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
  /* overflow-y: scroll;
  max-height: 400px; */
  padding-right: 8px;
  margin-top: 18px;
`;

const ContainerSelector = styled.div`
  display: block;
  margin-top: 34px;
  position: relative;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  &::before {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    border-width: 1px;
    border-style: solid;
    border-color: transparent transparent #ada9a9 transparent;
  }
`;
const ContainerButtonSelector = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  text-align: center;
`;

const WrapperButtonSelector = styled.div`
  background: lightgray;
  display: inline-block;
`;
const ButtonSelector = styled.button`
  margin: 0 10px;
  border: none;
  outline: none;
  background: lightgray;
  color: #8d8d8d;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    text-decoration: underline #037ef1 2px;
    color: #037ef1;
  }
`;

const ButtonAll = styled(ButtonSelector)`
  text-decoration: ${(props) => props.checkButton === 'all' && 'underline #037ef1 2px'};
  color: ${(props) => props.checkButton === 'all' && '#037ef1'};
`;

const ButtonDone = styled(ButtonSelector)`
  text-decoration: ${(props) => props.checkButton === 'done' && 'underline #037ef1 2px'};
  color: ${(props) => props.checkButton === 'done' && '#037ef1'};
`;

const ButtonUnDone = styled(ButtonSelector)`
  text-decoration: ${(props) => props.checkButton === 'undone' && 'underline #037ef1 2px'};
  color: ${(props) => props.checkButton === 'undone' && '#037ef1'};
`;

const List = (props) => {
  const { searchParams, setSearchParams, limit, handleDetail, handleEdit } = props;
  const TodoList = useSelector((state) => state.todo.data.docs ?? []);
  const NewTodoList = useMemo(
    () =>
      TodoList.map((todo, i) => {
        const offset = searchParams._offset ? Number(searchParams._offset) : 0;
        return {
          num: i + 1 + offset,
          ...todo,
          createdAt: new Date(todo.createdAt).toLocaleDateString(),
        };
      }),
    [TodoList, searchParams._offset]
  );
  const loading = useSelector((state) => state.todo.loading);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const offset = useMemo(
    () => (searchParams._offset ? Number(searchParams._offset) : 0),
    [searchParams._offset]
  );

  useEffect(() => {
    const getApi = async () => {
      const result = await dispatch(
        getDataThunk({ limit, offset, searchText: searchParams._searchText })
      );
      if (!!result.payload.errorCode) {
        localStorage.removeItem('user_token');
        navigate('/login');
      }
    };
    getApi();
  }, [dispatch, limit, offset, navigate, searchParams?._searchText]);

  const handleDelete = async (id) => {
    setSearchParams({ ...searchParams, _page: 1 });
    await dispatch(deleTodoThunk(id));
    await dispatch(getDataThunk({ limit, offset: offset, searchText: searchParams._searchText }));
  };

  const handleChangeActionLog = (e) => {
    delete searchParams._searchText;
    setSearchParams({ ...searchParams, _actionLog: e.target.name, _page: 1 });
    // setPageCount(0);
  };

  const handleButtonDone = async (todo) => {
    const newTodo = { ...todo };
    console.log(newTodo);
    newTodo.status = Number(!newTodo.status);
    await dispatch(editTodoThunk(newTodo));
  };

  if (loading) return;

  return (
    <>
      <ContainerSelector>
        <ContainerButtonSelector>
          <WrapperButtonSelector>
            <ButtonAll
              checkButton={searchParams._actionLog}
              onClick={handleChangeActionLog}
              name="all"
            >
              All ({TodoList.length})
            </ButtonAll>
            <ButtonDone
              checkButton={searchParams._actionLog}
              onClick={handleChangeActionLog}
              name="done"
            >
              Done ({TodoList.filter((todo) => !todo.status).length})
            </ButtonDone>
            <ButtonUnDone
              checkButton={searchParams._actionLog}
              onClick={handleChangeActionLog}
              name="undone"
            >
              Undone ({TodoList.filter((todo) => todo.status).length})
            </ButtonUnDone>
          </WrapperButtonSelector>
        </ContainerButtonSelector>
      </ContainerSelector>
      <ContainerList>
        <Table
          rowKey="id"
          columns={columns({ handleEdit, handleDetail, handleButtonDone ,handleDelete })}
          dataSource={NewTodoList}
          pagination={false}
          scroll={{ x: true, y: '420px' }}
          bordered
        />
        {/* {TodoList.map((todo) => {
          return (
            <TodoItem
              key={todo.id}
              todo={todo}
              handleDetail={handleDetail}
              setOpenDetail={setOpenDetail}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
            />
          );
        })} */}
      </ContainerList>
    </>
  );
};

export default List;
