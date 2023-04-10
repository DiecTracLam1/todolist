import React from 'react';
import { TiTimes } from 'react-icons/ti';
import styled from 'styled-components';
const TimesWrapper = styled.div`
  cursor: pointer;
  opacity: 0.4;
  margin: 2px 4px 0 0;

  &:hover {
    opacity: 1;
  }
`;
const Times = ({handleDeleteSearchInput}) => {
  return (
    <TimesWrapper  onClick={handleDeleteSearchInput}>
      <TiTimes />
    </TimesWrapper>
  );
};

export default Times;
