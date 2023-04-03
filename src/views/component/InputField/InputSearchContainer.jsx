import { Button, Divider, Space } from 'antd';
import { useState } from 'react';
import InputFieldDate from './InputFieldDate';
import InputSearch from './InputSearch';

const InputSearchContainer = ({ searchParams, setSearchParams, ref }) => {
  const [searchField, setSearchField] = useState({
    id: searchParams.id ?? '',
    fullName: searchParams.fullName ?? '',
    createdAt: '',
  });

  const handleChangeSearchFields = (name, value) => {
    setSearchField({ ...searchField, [name]: value });
  };

  const handleDelSearchFields = (name, value) => {
    setSearchField({ ...searchField, [name]: value });
    if (searchParams[name]) setSearchParams({ ...searchParams, [name]:value });
  };

  const handleButtonSearch = () => {
    const { id, fullName, createdAt } = searchField;
    if (!id && !fullName && !createdAt) return;
    setSearchParams({ ...searchParams, ...searchField });
  };

  console.log(ref);

  return (
    <>
      <InputSearch
        handleChangeSearch={handleChangeSearchFields}
        handleDelSearchFields={handleDelSearchFields}
        name="id"
        label="ID Todo"
        value={searchField.id}
      />
      <InputSearch
        handleChangeSearch={handleChangeSearchFields}
        handleDelSearchFields={handleDelSearchFields}
        name="fullname"
        label="Owner"
        value={searchField.fullname}
      />
      <InputFieldDate
        handleChangeSearch={handleChangeSearchFields}
        handleDelSearchFields={handleDelSearchFields}
        name="createdAt"
        label="Date"
        value={searchField.createdAt}
      />
      <Divider style={{ margin: 0 }} />
      <Space style={{ padding: '12px 0' }} align="end" direction="horizontal">
        <Space.Compact>
          <Button onClick={handleButtonSearch} type="primary">
            Apply
          </Button>
        </Space.Compact>
      </Space>
    </>
  );
};

export default InputSearchContainer;
