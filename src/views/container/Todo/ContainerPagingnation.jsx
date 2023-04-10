import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import PaginatedItems from './Pagingnation';

const Container = styled.div`
  display: flex;
  justify-content: center;
  margin: 22px 0;
  align-items: center;
`;
const Select = styled.select`
  margin-left: 12px;
  outline: none;
  padding: 4px 8px;
  justify-items: right;
`;

const ItemCount = styled.p`
  margin: 0 0 0 10px;
  font-size: 14px;
  color: #9b9898;
  line-height: 14px;
  height: 14px;
  justify-items: right;
`;

const ContainerPagingnation = ({
  searchParams,
  setSearchParams,
  setPageCount,
  pageCount,
  limit,
  setLimit,
}) => {
  const totalList = useSelector((state) => state.todo.data.total);
  const pageTotal = useMemo(() => Math.ceil(totalList / limit), [totalList, limit]);

  let itemCountList = useMemo(() => {
    const initialList = [5, 10, 15, 20];
    if (totalList === 0 || initialList.includes(totalList)) return initialList;

    const list = [totalList, ...initialList];
    return list;
  }, [totalList]);

  const handleChangeLimit = (e) => {
    setLimit(e.target.value);
    delete searchParams._page;
    setSearchParams({ ...searchParams, _limit: e.target.value, _offset: 0 });
    setPageCount(0);
  };

  return (
    <Container>
      <PaginatedItems
        pageCount={pageCount}
        pageTotalCount={pageTotal}
        setPagecount={setPageCount}
        setSearchparams={setSearchParams}
        searchParams={searchParams}
      />

      <Select value={limit} onChange={handleChangeLimit}>
        {itemCountList.map((item, index) => (
          <option key={index} value={item}>
            {item} items
          </option>
        ))}
      </Select>

      <ItemCount>Have {totalList} items</ItemCount>
    </Container>
  );
};

export default ContainerPagingnation;
