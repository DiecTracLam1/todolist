import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { unwrapResult } from '@reduxjs/toolkit';
import { Button, Form, Input, message, Typography } from 'antd';
import { useFormik } from 'formik';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import '../../assets/css/Login.css';
import { loginThunk } from '../../features/user/userSlice';
import { validate } from '../../useCustom/useValidateForm';

const Login = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const error = useSelector((state) => state.user.error);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validate,
    onSubmit: async (values) => {
      const resultAction = await dispatch(loginThunk(values));
      const user = unwrapResult(resultAction);
      if (user.status === 200) {
        navigate('/');
      }
    },
  });

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
      <Form
        className="form"
        onSubmitCapture={formik.handleSubmit}
        wrapperCol={{ span: 24 }}
        labelCol={{ span: 24 }}
        name="basic"
      >
        <Typography.Title level={2} style={{ textAlign: 'center' }}>
          Login
        </Typography.Title>
        <Form.Item
          label="Username"
          rules={[{ message: 'Please input your username!' }]}
          validateStatus={formik.errors.username && 'error'}
          help={formik.errors.username && formik.errors.username}
          hasFeedback
        >
          <Input
            id="Username"
            name="username"
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Type your username"
            status={formik.errors.username && 'error'}
            onChange={formik.handleChange}
            value={formik.values.username}
          />
        </Form.Item>

        <Form.Item
          label="Password"
          rules={[{ message: 'Please input your password!' }]}
          validateStatus={formik.errors.password && 'error'}
          help={formik.errors.password && formik.errors.password}
          hasFeedback
        >
          <Input.Password
            id="Password"
            name="password"
            prefix={<LockOutlined className="site-form-item-icon" />}
            placeholder="Type your password"
            status={formik.errors.password && 'error'}
            onChange={formik.handleChange}
            value={formik.values.password}
          />
        </Form.Item>

        <Form.Item className="wrapperLogin">
          <Button className="buttonLogin" type="primary" htmlType="submit" size="large">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
