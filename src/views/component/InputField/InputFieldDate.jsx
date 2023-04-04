import React from 'react';
import { DatePicker, Space, Typography } from 'antd';
import dayjs from 'dayjs';

const InputFieldDate = React.forwardRef(({ label, name, handleChangeSearch, value }, ref) => {
  const handleChangeInput = (e, dateString) => {
    console.log(dateString);
    handleChangeSearch('createdAt', dateString);
  };
  return (
    <Space direction="vertical" style={{ width: '100%', marginBottom: '14px' }}>
      <Typography.Title level={5} style={{ margin: 0, fontWeight: 400 }}>
        {label}
      </Typography.Title>
      <DatePicker
        defaultValue={value ? dayjs(value , "YYYY-MM-DD HH:mm:ss") : value}
        showTime
        name={name}
        onChange={handleChangeInput}
        style={{ width: '100%' }}
        ref={ref}
        format="YYYY-MM-DD HH:mm:ss"
      />
    </Space>
  );
});

export default InputFieldDate;
