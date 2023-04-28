import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { TiTimes } from 'react-icons/ti';
import InputField from '../../component/InputField/InputField';
import { Spin } from 'antd';
import userApi from '~/api/userApi';
import { useDispatch } from 'react-redux';
import { addEmploySheetThunk } from '~/features/timesheet/employSheetSlice';

const LayoutContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(39, 36, 36, 0.5);
  display: flex;
  justify-content: center;
`;

const ContainerTable = styled.div`
  position: absolute;
  width: 600px;
  background-color: #fff;
  padding: 12px 14px;
  margin: 10% 0 0 300px;
  z-index: 10;
`;
const Title = styled.h1`
  text-transform: uppercase;
  color: #cbcb26;
  margin: 0 0 30px 0;
`;

const Times = styled.div`
  position: absolute;
  cursor: pointer;
  opacity: 0.4;
  font-size: 24px;
  right: 4%;
  top: 2%;

  &:hover {
    opacity: 1;
  }
`;

const ContainerInput = styled.div`
  display: flex;
  flex-direction: column;
  margin: 8px 0;
`;

const Label = styled.label`
  margin-bottom: 8px;
  color: #8f8585;
  font-weight: 600;
`;

const ContainerButton = styled.div`
  display: flex;
  margin: 22px 36px 0 0;
  justify-content: right;
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
  font-size: 14px;
  cursor: pointer;
  margin: 0 6px;
  outline: none;
  &:hover {
    opacity: 0.8;
  }
`;

const SaveButton = styled(Button)`
  background-color: #1baa1b;
`;
const CancelButton = styled(Button)`
  background-color: #312e2ec9;
`;
const TimesheetForm = ({ openForm, setOpenForm , currentContent='' }) => {
  const [employee, setEmployee] = useState();
  const [content, setContent] = useState(currentContent);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getTimeSheet = async () => {
      const employStorage = JSON.parse(localStorage.getItem('employee'));
      const employeeApi = await userApi.getUser(employStorage.id);
      setEmployee(employeeApi.data.data.doc.employee);
      setLoading(false);
    };
    getTimeSheet();
  }, []);
  const handleCloseTable = () => {
    setOpenForm('');
  };

  const handleChangeContent = (e) => {
    setContent(e.target.value);
  };

  const handleButtonDone = async () => {
    const date = new Date();
    const data = {
      employeeId: employee.id,
      positionId: employee.positionId,
      departmentId: employee.departmentId,
      month: date.getMonth(),
      year: date.getFullYear(),
      content: content ?? '',
    };
    console.log(data);
    await dispatch(addEmploySheetThunk(data));
  };

  return (
    <LayoutContainer>
      <ContainerTable>
        <Spin spinning={loading}>
          <Title>{openForm} Table</Title>
          <Times onClick={handleCloseTable}>
            <TiTimes />
          </Times>

          <ContainerInput>
            <Label>Mã nhân viên</Label>
            <InputField name="employID" value={employee?.id ?? ''} isdisabled={true} />
          </ContainerInput>

          <ContainerInput>
            <Label>Mã chức danh</Label>
            <InputField name="positionID" value={employee?.positionId ?? ''} isdisabled={true} />
          </ContainerInput>

          <ContainerInput>
            <Label>Mã bộ phận</Label>
            <InputField
              name="departmentID"
              value={employee?.departmentId ?? ''}
              isdisabled={true}
            />
          </ContainerInput>

          <ContainerInput>
            <Label>Nội dung</Label>
            <InputField
              name="content"
              value={content}
              handleChangeInput={handleChangeContent}
              isdisabled={openForm === 'Detail'}
            />
          </ContainerInput>

          <ContainerButton>
            <CancelButton onClick={handleCloseTable}>Hủy</CancelButton>
            <SaveButton onClick={handleButtonDone}>
              {openForm === 'Add' ? 'Thêm' : 'Cập nhật'}
            </SaveButton>
          </ContainerButton>
        </Spin>
      </ContainerTable>
    </LayoutContainer>
  );
};

export default TimesheetForm;
