import React, { useState } from 'react';
import { BiHealth } from 'react-icons/bi';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { addTodoThunk } from '../../features/todo/todoSlice';

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

const IconWrapper = styled.div`
  display: inline-block;
  color: #970101;
  font-size: 7px;
  margin-right: 2px;
`;

const Input = styled.input`
  width: 90%;
  padding: 8px;
  border: 1px solid #cdcccc;
  outline: none;
  border-radius: 6px;
  border-color : ${props => !!props.textError && '#dd1d1d' };
`;

const TextError = styled.p`
    color: #dd1d1d;
    margin-top: 4px;
    font-weight: 600;
`

const TextArea = styled.textarea`
  width: 90%;
  padding: 8px;
  border: 1px solid #cdcccc;
  outline: none;
  border-radius: 6px;
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

const AddButton = styled(Button)`
  background-color: #1baa1b;
`;
const CancelButton = styled(Button)`
  background-color: #312e2ec9;
`;

const AddTable = ({ setOpen }) => {
    const dispatch = useDispatch();
  const [todo, setTodo] = useState({
    name: '',
    note: '',
    status: 1,
  });

  const [textError , setTextError] = useState("");
  const handleAddButton = async() => {
    if (!todo.name) {
      setTextError("Please type a name todo")
      return;
    }
    await dispatch(addTodoThunk(todo))
    setOpen(false);
  };
  const handleCloseTable = () => {
    setOpen(false);
  };

  const handleChangeInput = (e) => {
    if(e.target.name === 'name'){
        setTextError("")
    }
    const newContent = { ...todo, [e.target.name]: e.target.value };
    setTodo(newContent);
  };

  return (
    <LayoutContainer>
      <ContainerTable>
        <Title>Edit Table</Title>
        <ContainerInput>
          <Label htmlFor="editText">
            <IconWrapper>
              <BiHealth />
            </IconWrapper>
            Name
          </Label>
          <Input
            id="editText"
            name="name"
            type="text"
            textError={textError}
            placeholder="Edit Content ..."
            value={todo.name}
            onChange={handleChangeInput}
            required
          />
          <TextError>{textError}</TextError>
        </ContainerInput>

        <ContainerInput>
          <Label htmlFor="description">Note</Label>
          <TextArea
            id="description"
            name="note"
            rows="4"
            cols="50"
            type="text"
            placeholder="Fill Note ... "
            value={todo?.note}
            onChange={handleChangeInput}
          />
        </ContainerInput>

        <ContainerButton>
          <CancelButton onClick={handleCloseTable}>Cancel</CancelButton>
          <AddButton onClick={handleAddButton}>Add</AddButton>
        </ContainerButton>
      </ContainerTable>
    </LayoutContainer>
  );
};

export default AddTable;