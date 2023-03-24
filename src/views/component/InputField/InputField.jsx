import React from 'react';
import styled from 'styled-components';

const Input = styled.input`
  width: 90%;
  padding: 8px;
  border: 1px solid #cdcccc;
  outline: none;
  border-radius: 6px;
  border-color: ${(props) => !!props.textError && '#dd1d1d'};
`;

const TextError = styled.p`
  color: #dd1d1d;
  margin-top: 4px;
  font-weight: 600;
`;

const InputField = ({ todo, textError , handleChangeInput , placeholder }) => {
  
  return (
    <>
      <Input
        id="editText"
        name="name"
        type="text"
        textError={textError}
        placeholder={placeholder}
        value={todo.name}
        onChange={handleChangeInput}
        required
      />

      <TextError>{textError}</TextError>
    </>
  );
};

export default InputField;
