import React from 'react';
import styled from 'styled-components';
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

const Input = styled.input`
  width: 90%;
  padding: 8px;
  border: 1px solid #cdcccc;
  outline: none;
  border-radius: 6px;
`;

const TextArea = styled.textarea`
  width: 90%;
  padding: 8px;
  border: 1px solid #cdcccc;
  outline: none;
  border-radius: 6px;
`;

const Detail = ({ setOpenDetail, todo }) => {
  const handleCloseTable = () => {
    setOpenDetail(false);
  };

  return (
    <LayoutContainer>
      <ContainerTable>
        <Title>Detail Table</Title>
        <Times onClick={handleCloseTable}>
          <TiTimes />
        </Times>
        <ContainerInput>
          <Label htmlFor="editText">Content</Label>
          <Input id="editText" name="content" type="text" value={todo.name} disabled />
        </ContainerInput>

        <ContainerInput>
          <Label htmlFor="description">Note</Label>
          <TextArea
            id="description"
            name="description"
            rows="4"
            cols="50"
            type="text"
            value={todo?.note}
            disabled
          />
        </ContainerInput>

        <ContainerInput>
          <Label htmlFor="editText">Status</Label>
          <Input
            id="editText"
            name="Status"
            type="text"
            value={todo.status ? 'Progressing' : 'Not progress'}
            disabled
          />
        </ContainerInput>

        <ContainerInput>
          <Label htmlFor="description">Create Date</Label>
          <TextArea
            id="description"
            name="description"
            value={new Date(todo.createdAt).toLocaleDateString()}
            disabled
          />
        </ContainerInput>

        <ContainerInput>
          <Label htmlFor="editText">Update Date</Label>
          <Input
            id="editText"
            name="content"
            type="text"
            value={new Date(todo.updatedAt).toLocaleDateString()}
            disabled
          />
        </ContainerInput>
      </ContainerTable>
    </LayoutContainer>
  );
};

export default Detail;
