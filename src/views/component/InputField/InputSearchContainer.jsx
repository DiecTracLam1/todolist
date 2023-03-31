import React, { useState } from 'react';
import InputFieldDate from './InputFieldDate';
import InputSearch from './InputSearch';

const InputSearchContainer = () => {
  const [searchField, setSearchField] = useState({
    id: '',
    fullname: '',
    createdAt: '',
  });

  const handleChangeSearchFields = (name, value) => {
    setSearchField({ ...searchField, [name]: value });
  };
  console.log(searchField)

  return (
    <>
      <InputSearch handleChangeSearch={handleChangeSearchFields} name="id" label="ID Todo" />
      <InputSearch handleChangeSearch={handleChangeSearchFields} name="fullname" label="Owner" />
      <InputFieldDate handleChangeSearch={handleChangeSearchFields} name="createdAt" label="Date" />
    </>
  );
};

export default InputSearchContainer;
