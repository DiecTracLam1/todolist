import { CaretDownOutlined } from '@ant-design/icons';
import { Dropdown, Form, Space, Typography } from 'antd';
import { useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import styled from 'styled-components';
import { items } from '~/features/antd/dropdownItems';
import InputSearchContainer from '~/views/component/InputField/InputSearchContainer';
import Times from '../../component/Times/times';

const Container = styled.div`
  display: flex;
  margin: 8px 0;
`;
const InputContainer = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  background-color: white;
  border-radius: 6px;
  overflow: hidden;
`;
const Input = styled.input`
  padding: 8px;
  border: none;
  outline: none;
  flex: 1;
`;

const Button = styled.button`
  padding: 6px 10px;
  text-transform: uppercase;
  font-weight: 600;
  background-color: #855b85;
  color: white;
  border: none;
  border-radius: 6px;
  margin-left: 2px;
  font-size: 16px;
  cursor: pointer;
`;

const SearchContainer = ({ searchParams, setSearchParams, setPageCount, table }) => {
  const [searchText, setSearchText] = useState(searchParams.name || '');

  const handleChangeSearchInput = (e) => {
    setSearchText(e.target.value);
  };

  function handleSearchButton() {
    if (!searchText) {
      setSearchParams({ ...searchParams, name: '' });
      return;
    }
    setSearchParams({ ...searchParams, name: searchText, _offset: 0, _page: 1 });
    setPageCount(0);
  }

  const handleDeleteSearchInput = () => {
    setSearchText('');
    setSearchParams({ ...searchParams, name: '' });
  };
  return (
    <Container>
      <InputContainer>
        <Input
          placeholder="Search name ..."
          value={searchText}
          onChange={handleChangeSearchInput}
          onKeyUp={(e) => e.key === 'Enter' && handleSearchButton()}
        />
        {searchText && <Times handleDeleteSearchInput={handleDeleteSearchInput} />}

        <Dropdown
          menu={{ items }}
          placement="bottomRight"
          dropdownRender={() => (
            <div className="dropdown">
              <Typography.Title style={{ color: '#fff' }} className="dropdown_topic" level={5}>
                Search
              </Typography.Title>
              <div>
                <Form layout="vertical" size="" style={{ padding: '0px 12px' }}>
                  <InputSearchContainer
                    searchParams={searchParams}
                    setSearchParams={setSearchParams}
                    searchText={searchText}
                    setSearchText={setSearchText}
                    fields={table?.current.getFilter() ?? []}
                  />
                </Form>
              </div>
            </div>
          )}
          trigger={['click']}
        >
          <Space>
            <CaretDownOutlined className="dropdown_icon" />
          </Space>
        </Dropdown>
      </InputContainer>

      <Button onClick={handleSearchButton}>
        <BiSearch />
      </Button>
    </Container>
  );
};

export default SearchContainer;
