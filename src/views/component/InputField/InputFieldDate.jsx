import React from 'react';
import { DatePicker, Space, Typography } from 'antd';

const InputFieldDate = React.forwardRef(({ label, name, handleChangeSearch } , ref) => {
  const handleChangeInput = (e , dateString) => {
    console.log(dateString);
    handleChangeSearch("createdAt", dateString);
  };
  return (
    <Space direction="vertical" style={{ width: '100%' ,  marginBottom: '14px'}}>
      <Typography.Title level={5} style={{margin: 0 , fontWeight:400}}> {label}</Typography.Title>
      <DatePicker name={name} onChange={handleChangeInput} style={{ width: '100%' }} ref={ref}/>
    </Space>
  );
});

export default InputFieldDate;
