import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, Typography } from 'antd';
import { useFormik } from 'formik';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginThunk } from '../../features/user/userSlice';
import { validate } from '../../useCustom/useValidateForm';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validate,
    onSubmit: (values) => {
      dispatch(loginThunk(values));
      navigate("/todolist");
    },
  });
  return (
    <div>
      <Typography.Title level={2}>Login</Typography.Title>
      <Form
        onSubmitCapture={formik.handleSubmit}
        wrapperCol={{ span: 24 }}
        labelCol={{ span: 24 }}
        name="basic"
        style={{ maxWidth: 600 }}
      >
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

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
