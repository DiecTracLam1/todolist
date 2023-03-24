import { message } from 'antd';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import '../../../assets/css/Login.css';
import LoginForm from '../../presentation/Form/LoginForm';

const Login = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const error = useSelector((state) => state.user.error);
  const navigate = useNavigate();

  useEffect(()=>{
    if(!!error.errorCode){
      messageApi.open({
        type: 'error',
        content: 'Username or password is wrong',
      });
    }
  },[error , messageApi])

  useEffect(() => {
    if (localStorage.getItem('user_token')) {
      navigate('/list');
      return;
    }
  }, [navigate]);

  return (
    <div className="ContainerLogin">
      {contextHolder}
      <LoginForm/>
    </div>
  );
};

export default Login;
