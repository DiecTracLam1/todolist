import { Button, Divider, Space } from 'antd';
import { useRef, useState } from 'react';
import InputFieldDate from './InputFieldDate';
import InputSearch from './InputSearch';
import { columns } from '~/features/antd/tableColumn';
import { useMemo } from 'react';
import { createRef } from 'react';

const InputSearchContainer = ({ searchParams, setSearchParams }) => {
  const [searchField, setSearchField] = useState({
    id: searchParams.id ?? '',
    name: '',
    fullName: searchParams.fullName ?? '',
    createdAt: searchParams.createdAt ?? '',
  });

  const table = useRef([]);
  table.current = useMemo(() => {
    return columns().map((_, i) => table.current[i] ?? createRef());
  }, [table]);
  const handleChangeSearchFields = (name, value) => {
    setSearchField({ ...searchField, [name]: value });
  };

  const handleDelSearchFields = (name, value) => {
    setSearchField({ ...searchField, [name]: value });
    if (searchParams[name]) setSearchParams({ ...searchParams, [name]: value });
  };

  const handleButtonSearch = () => {
    const { id, name, fullName, createdAt } = searchField;
    if (!id && !name && !fullName && !createdAt) return;
    setSearchParams({ ...searchParams, ...searchField });
  };

  console.log(searchField)

  return (
    <>
      {columns().map((column, i) => {
        if (column.filterKey) {
          if (column.filterKey === 'createdAt') {
            return (
              <InputFieldDate
                key={column.key}
                handleChangeSearch={handleChangeSearchFields}
                handleDelSearchFields={handleDelSearchFields}
                name="createdAt"
                label={column.title}
                value={searchField.createdAt}
                ref={table.current[i]}
              />
            );
          }
          return (
            <InputSearch
              key={column.key}
              handleChangeSearch={handleChangeSearchFields}
              handleDelSearchFields={handleDelSearchFields}
              name={column.filterKey}
              label={column.title}
              value={searchField[column.filterKey]}
              ref={table.current[i]}
            />
          );
        }
        return '';
      })}
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
