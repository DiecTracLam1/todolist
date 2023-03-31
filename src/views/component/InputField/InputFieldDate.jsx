import { DatePicker, Space, Typography } from 'antd';

const InputFieldDate = ({ label, name, handleChangeSearch }) => {
  const handleChangeInput = (e , dateString) => {
    console.log(dateString);
    handleChangeSearch("createdAt", dateString);
  };
  return (
    <Space direction="vertical" style={{ width: '100%' ,  marginBottom: '14px'}}>
      <Typography.Title level={5} style={{margin: 0 , fontWeight:400}}> {label}</Typography.Title>
      <DatePicker name={name} onChange={handleChangeInput} style={{ width: '100%' }} />
    </Space>
  );
};

export default InputFieldDate;
