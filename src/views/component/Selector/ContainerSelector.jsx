import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: block;
  margin-top: 34px;
  position: relative;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  &::before {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    border-width: 1px;
    border-style: solid;
    border-color: transparent transparent #ada9a9 transparent;
  }
`;
const ContainerButtonSelector = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  text-align: center;
`;

const WrapperButtonSelector = styled.div`
  background: lightgray;
  display: inline-block;
`;
const ButtonSelector = styled.button`
  margin: 0 10px;
  border: none;
  outline: none;
  background: lightgray;
  color: #8d8d8d;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    text-decoration: underline #037ef1 2px;
    color: #037ef1;
  }
`;

const ButtonAll = styled(ButtonSelector)`
  text-decoration: ${(props) => props.checkButton === 'all' && 'underline #037ef1 2px'};
  color: ${(props) => props.checkButton === 'all' && '#037ef1'};
`;

const ButtonDone = styled(ButtonSelector)`
  text-decoration: ${(props) => props.checkButton === 'done' && 'underline #037ef1 2px'};
  color: ${(props) => props.checkButton === 'done' && '#037ef1'};
`;

const ButtonUnDone = styled(ButtonSelector)`
  text-decoration: ${(props) => props.checkButton === 'undone' && 'underline #037ef1 2px'};
  color: ${(props) => props.checkButton === 'undone' && '#037ef1'};
`;

const ContainerSelector = ({setSearchParams , searchParams , TodoList = {}}) => {

  const handleChangeActionLog = (e) => {
    delete searchParams._searchText;
    setSearchParams({ ...searchParams, _actionLog: e.target.name, _page: 1 });
    // setPageCount(0);
  };

  return (
    <Container>
      <ContainerButtonSelector>
        <WrapperButtonSelector>
          <ButtonAll
            checkButton={searchParams._actionLog}
            onClick={handleChangeActionLog}
            name="all"
          >
            All ({TodoList.length})
          </ButtonAll>

          <ButtonDone
            checkButton={searchParams._actionLog}
            onClick={handleChangeActionLog}
            name="done"
          >
            Done ({TodoList.filter((todo) => !todo.status).length})
          </ButtonDone>

          <ButtonUnDone
            checkButton={searchParams._actionLog}
            onClick={handleChangeActionLog}
            name="undone"
          >
            Undone ({TodoList.filter((todo) => todo.status).length})
          </ButtonUnDone>
        </WrapperButtonSelector>
      </ContainerButtonSelector>
    </Container>
  );
};

export default ContainerSelector;
