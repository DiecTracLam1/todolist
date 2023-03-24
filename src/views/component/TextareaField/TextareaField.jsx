import React from 'react';
import styled from 'styled-components';

const TextArea = styled.textarea`
  width: 90%;
  padding: 8px;
  border: 1px solid #cdcccc;
  outline: none;
  border-radius: 6px;
`;
const TextareaField = ({todo , handleChangeInput}) => {
    return (
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
    );
};

export default TextareaField;