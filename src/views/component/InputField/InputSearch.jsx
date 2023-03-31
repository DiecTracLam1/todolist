import { Form, Input } from 'antd';
import React from 'react';

const InputSearch = ({ label, name, handleChangeSearch }) => {
  const handleChangeInput = (e) => {
    handleChangeSearch(e.target.name, e.target.value);
  };
  return (
    <Form.Item label={label} style={{ marginBottom: '14px' }}>
      <Input name={name} onChange={handleChangeInput} />
    </Form.Item>
  );
};

export default InputSearch;
