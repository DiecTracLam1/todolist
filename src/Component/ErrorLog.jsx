import styled from "styled-components"

const LayoutContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom:0;
    background-color: rgba(39, 36, 36, 0.5);
    display: flex;
    justify-content: center;
`

const ContainerTable = styled.div`
    position: absolute;
    width: 600px;
    background-color: #fff;
    padding: 12px 14px;
    margin-top: 10%;
    
`
const Title = styled.h1`
    color:#d31d1d;
    margin: 0 0 10px 0;
    border-bottom: 1px solid #c5c5c5;
`
const Content = styled.p`
    margin-bottom: 16px;
`
const Button = styled.button`
    display: block;
  padding: 8px 16px;
  text-transform: uppercase;
  font-weight: 600;
  background-color: #838282;
  color: white;
  border: none;
  border-radius: 6px;
  margin-left: 2px;
  font-size: 14px;
  cursor: pointer;
  margin: 0 auto;
  outline: none;
  &:hover{
        background-color: #4fbee4;
    }
`;
const ErrorLog = ({ setOpenErrorLog}) => {
    const handleClickOK = () =>{
        setOpenErrorLog(false)
    }
    return (
        <LayoutContainer>
            <ContainerTable >
                <Title>Error</Title>
                <Content>The content already existed</Content>
                <Button onClick={handleClickOK}>OK</Button>
            </ContainerTable>
        </LayoutContainer>
    );
};

export default ErrorLog;