import { Form, Input } from 'antd';
import React from 'react';
import Times from '~/views/component/Times/times.jsx';

const InputSearch = React.forwardRef(({ label, name, handleChangeSearch, value , handleDelSearchFields },ref) => {
  const handleChangeInput = (e) => {
    handleChangeSearch(e.target.name, e.target.value);
  };

  const handleDeleteSearchInput = () => {
    handleDelSearchFields(name, '');
  };
  return (
    <Form.Item label={label} style={{ marginBottom: '14px' }}>
      <Input
        name={name}
        onChange={handleChangeInput}
        value={value}
        suffix={<Times handleDeleteSearchInput={handleDeleteSearchInput} />}
        ref={ref}
      />
    </Form.Item>
  );
});

export default InputSearch;
