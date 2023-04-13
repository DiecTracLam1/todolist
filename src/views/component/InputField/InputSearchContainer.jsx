import { Button, Divider, Space } from 'antd';
import { useEffect, useState } from 'react';
import InputFieldDate from './InputFieldDate';
import InputSearch from './InputSearch';

const InputSearchContainer = ({ searchParams, setSearchParams, fields = [], setSearchText }) => {
  const [searchField, setSearchField] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const { id, name, fullName, createdAt } = searchParams;
    setSearchField({
      id: id ?? '',
      name: name ?? '',
      fullName: fullName ?? '',
      createdAt: createdAt ?? '',
    });
    setLoading(false);
  }, [searchParams]);


  const handleChangeSearchFields = (name, value) => {
    setSearchField({ ...searchField, [name]: value });
  };

  const handleDelSearchFields = (name, value) => {
    setSearchField({ ...searchField, [name]: value });
    if (name === 'name') setSearchText('');
    if (searchParams[name]) setSearchParams({ ...searchParams, [name]: value });
  };

  const handleButtonSearch = () => {
    const { id, name, fullName, createdAt } = searchField;
    if (
      !id &&
      !name &&
      !fullName &&
      !createdAt &&
      !searchParams.id &&
      !searchParams.name &&
      !searchParams.fullName &&
      !searchParams.createdAt
    )
      return;
    setSearchParams({ ...searchParams, ...searchField });
    setSearchText(name);
  };

  if (loading) return;

  return (
    <>
      {fields.map((column, i) => {
        if (column.filterKey) {
          if (column.filterKey === 'createdAt') {
            return (
              <InputFieldDate
                key={column.key}
                handleChangeSearch={handleChangeSearchFields}
                handleDelSearchFields={handleDelSearchFields}
                name="createdAt"
                label={column.title}
                value={searchField?.createdAt}
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
            />
          );
        }
        return '';
      })}

      <Divider style={{ margin: 0 }} />
      
      <div style={{ textAlign: 'end' }}>
        <Space style={{ padding: '12px 0' }} direction="horizontal">
          <Space.Compact>
            <Button onClick={handleButtonSearch} type="primary">
              Apply
            </Button>
          </Space.Compact>
        </Space>
      </div>
    </>
  );
};

export default InputSearchContainer;
