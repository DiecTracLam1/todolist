import { CaretDownOutlined } from '@ant-design/icons';
import { Dropdown, Form, Space, Typography } from 'antd';
import { useEffect, useMemo, useRef, useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import { FaSignOutAlt } from 'react-icons/fa';
import { IoMdAddCircle } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { items } from '~/features/antd/dropdownItems';
import { columns } from '~/features/antd/tableColumn';
import { editTodoThunk } from '~/features/todo/todoSlice';
import { logout } from '~/features/user/userSlice';
import useCustomSearchParams from '~/useCustom/useCustomSearchParams';
import InputSearchContainer from '~/views/component/InputField/InputSearchContainer';
import Times from '../../component/Times/times';
import List from './List';
import PaginatedItems from './Pagingnation';
import TodoTable from './TodoForm';

const Container = styled.div`
  width: 860px;
  margin: auto;
`;
const ContainerHeader = styled.div`
  position: relative;
`;

const Title = styled.h1`
  font-size: 2rem;
  text-align: center;
  background-color: #685e5e;
  color: white;
`;

const ContainerHeaderButton = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
`;
const ButtonHeader = styled.button`
  padding: 4px 8px;
  text-transform: uppercase;
  margin: 0 6px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  max-height: 26px;
`;

const ButtonAdd = styled(ButtonHeader)`
  background-color: rgb(13, 189, 13);
  color: white;
`;

const ButtonLogOut = styled(ButtonHeader)`
  &:hover {
    background-color: red;
    color: white;
  }
`;

const SearchContainer = styled.div`
  display: flex;
  margin: 8px 0;
`;
const InputContainer = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  background-color: white;
  border-radius: 6px;
  overflow: hidden;
`;
const Input = styled.input`
  padding: 8px;
  border: none;
  outline: none;
  flex: 1;
`;

const Button = styled.button`
  padding: 6px 10px;
  text-transform: uppercase;
  font-weight: 600;
  background-color: #855b85;
  color: white;
  border: none;
  border-radius: 6px;
  margin-left: 2px;
  font-size: 16px;
  cursor: pointer;
`;

const TodoContainer = styled.div`
  background-color: lightgray;
  padding: 6px 14px;
  margin-top: 10px;
  border-radius: 6px;
`;

const ContainerPagingnation = styled.div`
  display: flex;
  justify-content: center;
  margin: 22px 0;
  align-items: center;
`;
const Select = styled.select`
  margin-left: 12px;
  outline: none;
  padding: 4px 8px;
  justify-items: right;
`;

const ItemCount = styled.p`
  margin: 0 0 0 10px;
  font-size: 14px;
  color: #9b9898;
  line-height: 14px;
  height: 14px;
  justify-items: right;
`;

const TodoList = () => {
  const totalList = useSelector((state) => state.todo.data.total);
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useCustomSearchParams();
  const [searchText, setSearchText] = useState(searchParams.name || '');
  const [openTable, setOpenTable] = useState('');
  const [currentTodo, setCurrentTodo] = useState('');
  const searchLimit = useMemo(() => {
    return searchParams._limit > 20 ? 20 : searchParams._limit;
  }, [searchParams._limit]);
  const [limit, setLimit] = useState(searchLimit || 5);
  const [pageCount, setPageCount] = useState(
    !!(searchParams._page - 1) ? searchParams._page - 1 : 0
  );
  const pageTotal = useMemo(() => Math.ceil(totalList / limit), [totalList, limit]);
  const navigate = useNavigate();
  const searchRef = useRef(null);
  

  useEffect(() => {
    if (!localStorage.getItem('user_token')) {
      navigate('/login');
    }
  }, [navigate]);

  let itemCountList = useMemo(() => {
    const initialList = [5, 10, 15, 20];
    if (totalList === 0 || initialList.includes(totalList)) return initialList;

    const list = [totalList, ...initialList];
    return list;
  }, [totalList]);

  const handleChangeSearchInput = (e) => {
    console.log(e)
    setSearchText(e.target.value);
  };

  function handleSearchButton() {
    searchRef.current = columns().find((column, i) => column.defaultSearch);
    if (!searchText) {
      setSearchParams({ ...searchParams, name: '' });
      return;
    }
    setSearchParams({ ...searchParams, name: searchText, _offset: 0, _page: 1 });
    setPageCount(0);
  }

  const handleDeleteSearchInput = () => {
    setSearchText('');
    setSearchParams({ ...searchParams, name: '' });
  };

  const handleDetail = (todo) => {
    console.log(todo);
    setCurrentTodo(todo);
    setOpenTable('Detail');
  };

  const handleEdit = (todo) => {
    setCurrentTodo(todo);
    setOpenTable('Edit');
  };

  const handleAddTable = () => {
    setCurrentTodo({});
    setOpenTable('Add');
  };

  const handleChangeLimit = (e) => {
    setLimit(e.target.value);
    delete searchParams._page;
    setSearchParams({ ...searchParams, _limit: e.target.value, _offset: 0 });
    setPageCount(0);
  };

  const handleSaveTodo = async (editedTodo) => {
    await dispatch(editTodoThunk(editedTodo));
    setSearchParams({ ...searchParams, _page: 1 });
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <>
      <Container>
        <ContainerHeader>
          <Title>Todo List</Title>
          <ContainerHeaderButton>
            <ButtonAdd onClick={handleAddTable}>
              <IoMdAddCircle />
            </ButtonAdd>
            <ButtonLogOut onClick={handleLogout}>
              <FaSignOutAlt />
            </ButtonLogOut>
          </ContainerHeaderButton>
        </ContainerHeader>

        <TodoContainer>
          <SearchContainer>
            <InputContainer>
              <Input
                placeholder="Search name ..."
                value={searchText}
                onChange={handleChangeSearchInput}
                onKeyUp={(e) => e.key === 'Enter' && handleSearchButton()}
                ref={searchRef}
              />
              {searchText && <Times handleDeleteSearchInput={handleDeleteSearchInput} />}
              <Dropdown
                menu={{ items }}
                placement="bottomRight"
                dropdownRender={() => (
                  <div className="dropdown">
                    <Typography.Title
                      style={{ color: '#fff' }}
                      className="dropdown_topic"
                      level={5}
                    >
                      Search
                    </Typography.Title>
                    <div>
                      <Form layout="vertical" size="" style={{ padding: '0px 12px' }}>
                        <InputSearchContainer
                          searchParams={searchParams}
                          setSearchParams={setSearchParams}
                          searchText={searchText}
                          setSearchText={setSearchText}
                        />
                      </Form>
                    </div>
                  </div>
                )}
                trigger={['click']}
              >
                <Space>
                  <CaretDownOutlined className="dropdown_icon" />
                </Space>
              </Dropdown>
            </InputContainer>
            <Button onClick={handleSearchButton}>
              <BiSearch />
            </Button>
          </SearchContainer>

          <List
            searchParams={searchParams}
            setSearchParams={setSearchParams}
            limit={limit}
            handleDetail={handleDetail}
            handleEdit={handleEdit}
            setPageCount={setPageCount}
            pageCount={pageCount}
          />

          <ContainerPagingnation>
            <PaginatedItems
              pageCount={pageCount}
              pageTotalCount={pageTotal}
              setPagecount={setPageCount}
              setSearchparams={setSearchParams}
              searchParams={searchParams}
              limit={limit}
            />
            <Select value={limit} onChange={handleChangeLimit}>
              {itemCountList.map((item, index) => (
                <option key={index} value={item}>
                  {item} items
                </option>
              ))}
            </Select>
            <ItemCount>Have {totalList} items</ItemCount>
          </ContainerPagingnation>
        </TodoContainer>
      </Container>
      {openTable !== '' && (
        <TodoTable
          setOpenTable={setOpenTable}
          openTable={openTable}
          currentTodo={currentTodo}
          handleSaveTodo={handleSaveTodo}
          searchParams={searchParams}
          limit={limit}
          setSearchParams={setSearchParams}
          setPageCount={setPageCount}
        />
      )}
    </>
  );
};

export default TodoList;
