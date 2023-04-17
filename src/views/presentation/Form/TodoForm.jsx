import { Radio, Space } from 'antd';
import React, { useState } from 'react';
import styled from 'styled-components';
import InputField from '../../component/InputField/InputField';
import TextareaField from '../../component/TextareaField/TextareaField';
import { addTodoThunk, getDataThunk, editTodoThunk } from '../../../features/todo/todoSlice';
import { getAllParams } from '~/ultis/getAllParams';
import { useDispatch } from 'react-redux';
import { TiTimes } from 'react-icons/ti';

const LayoutContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(39, 36, 36, 0.5);
  display: flex;
  justify-content: center;
`;

const ContainerTable = styled.div`
  position: absolute;
  width: 600px;
  /* height: 500px; */
  background-color: #fff;
  padding: 12px 14px;
  margin-top: 10%;
`;
const Title = styled.h1`
  text-transform: uppercase;
  color: #cbcb26;
  margin: 0 0 30px 0;
`;

const Times = styled.div`
  position: absolute;
  cursor: pointer;
  opacity: 0.4;
  font-size: 24px;
  right: 4%;
  top: 2%;

  &:hover {
    opacity: 1;
  }
`;

const ContainerInput = styled.div`
  display: flex;
  flex-direction: column;
  margin: 16px 0;
`;

const Label = styled.label`
  margin-bottom: 8px;
  color: #8f8585;
  font-weight: 600;
`;

const ContainerButton = styled.div`
  display: flex;
  margin: 22px 36px 0 0;
  justify-content: right;
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
  font-size: 14px;
  cursor: pointer;
  margin: 0 6px;
  outline: none;
  &:hover {
    opacity: 0.8;
  }
`;

const SaveButton = styled(Button)`
  background-color: #1baa1b;
`;
const CancelButton = styled(Button)`
  background-color: #312e2ec9;
`;

const TodoTable = (props) => {
  const {
    setOpenTable,
    currentTodo = {},
    openTable,
    limit,
    searchParams,
    setPageCount,
    setSearchParams,
  } = props;

  const [todo, setTodo] = useState({
    ...currentTodo,
    status: currentTodo?.status ?? 1,
  });
  const [textError, setTextError] = useState('');
  const dispatch = useDispatch();

  const handleSaveTodo = async () => {
    await dispatch(editTodoThunk(todo));
    setSearchParams({ ...searchParams, _page: 1 });
  };

  const handleAddTodo = async () => {
    await dispatch(addTodoThunk(todo));
    if (Number(searchParams._page) === 1) {
      await dispatch(getDataThunk(getAllParams(limit, 0, searchParams))); // if page = 0 , run this function
    } else { // if pageCount is in others page  
      setPageCount(0);
      setSearchParams({ ...searchParams, _page: 1 });
    }
  };

  const handleSaveButton = async () => {
    // check if field todo's name is empty
    if (!todo?.name) {
      setTextError('Please type a todo name');
      return;
    }

    if (openTable === 'Edit') handleSaveTodo(); // if table is edit
    else if (openTable === 'Add') handleAddTodo();
    setOpenTable('');
  };

  const handleChangeInput = (e) => {
    if (e.target.name === 'name' || !todo.name?.length) {
      setTextError('');
    }
    const newContent = { ...todo, [e.target.name]: e.target.value };
    setTodo(newContent);
  };

  const handleCloseTable = () => {
    setOpenTable('');
  };

  return (
    <LayoutContainer>
      <ContainerTable>
        <Title>{openTable} Table</Title>
        <Times onClick={handleCloseTable}>
          <TiTimes />
        </Times>

        <ContainerInput>
          <Label htmlFor="editText">Content</Label>
          <InputField
            name="name"
            value={todo?.name ?? ''}
            textError={textError}
            setTodo={setTodo}
            handleChangeInput={handleChangeInput}
            placeholder="Fill content"
            isdisabled={openTable === 'Detail'}
          />
        </ContainerInput>

        <ContainerInput>
          <Label htmlFor="note">Note</Label>
          <TextareaField
            name="note"
            value={todo?.note ?? ''}
            handleChangeInput={handleChangeInput}
            isdisabled={openTable === 'Detail'}
          />
        </ContainerInput>

        {openTable !== 'Add' && (
          <ContainerInput>
            <Space size={'large'}>
              <Label htmlFor="status">Status : </Label>
              <Radio.Group
                name="status"
                onChange={handleChangeInput}
                value={todo.status}
                disabled={openTable === 'Detail'}
              >
                <Radio value={1}>Progressing</Radio>
                <Radio value={0}>Not progress</Radio>
              </Radio.Group>
            </Space>
          </ContainerInput>
        )}

        {openTable === 'Detail' && (
          <>
            <ContainerInput>
              <Label htmlFor="description">Create Date</Label>
              <InputField
                id="description"
                onChange={handleChangeInput}
                name="description"
                value={new Date(todo.createdAt).toLocaleDateString()}
                isdisabled={true}
              />
            </ContainerInput>

            <ContainerInput>
              <Label htmlFor="editText">Update Date</Label>
              <InputField
                id="editText"
                name="content"
                type="text"
                value={new Date(todo.updatedAt).toLocaleDateString()}
                onChange={handleChangeInput}
                isdisabled={true}
              />
            </ContainerInput>
          </>
        )}

        {openTable !== 'Detail' && (
          <ContainerButton>
            <CancelButton onClick={handleCloseTable}>Cancel</CancelButton>
            <SaveButton onClick={handleSaveButton}>Save</SaveButton>
          </ContainerButton>
        )}
      </ContainerTable>
    </LayoutContainer>
  );
};

export default TodoTable;
