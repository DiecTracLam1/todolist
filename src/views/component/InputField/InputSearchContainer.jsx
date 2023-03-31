import { Button, Divider, Space } from 'antd';
import React, { useRef, useState } from 'react';
import InputFieldDate from './InputFieldDate';
import InputSearch from './InputSearch';

const InputSearchContainer = ({searchParams, setSearchParams}) => {

  const [searchField, setSearchField] = useState({
    id: searchParams.id,
    fullname: '',
    createdAt: '',
  });

  const handleChangeSearchFields = (name, value) => {
    setSearchField({ ...searchField, [name]: value });
  };

  const handleButtonSearch = ()=>{
    const {id , fullname, createdAt} = searchField
    if(!id && !fullname && !createdAt) return;
    setSearchParams({...searchParams, ...searchField})
  }

  
  return (
    <>
      <InputSearch handleChangeSearch={handleChangeSearchFields} name="id" label="ID Todo" value={searchField.id}/>
      <InputSearch handleChangeSearch={handleChangeSearchFields} name="fullname" label="Owner" value={searchField.fullname}/>
      <InputFieldDate handleChangeSearch={handleChangeSearchFields} name="createdAt" label="Date" value={searchField.createdAt}/>
      <Divider style={{ margin: 0 }} />
      <Space style={{ padding: 12 }} align="end" direction="horizontal">
        <Space.Compact>
          <Button onClick={handleButtonSearch} type="primary">Apply</Button>
        </Space.Compact>
      </Space>
    </>
  );
};

export default InputSearchContainer;
