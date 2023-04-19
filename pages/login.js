import { Button, Checkbox, Form, Input, message } from 'antd';
import styles from '../styles/login.module.css';
import React, { useEffect } from 'react';
import Link from 'next/link';
import useAuthService from '@/common/hooks/useAuthService';
import utils from '@/common/utils';
import { useRouter } from 'next/router';

const Login = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const router = useRouter();
  const { authData, checkLogin, setAuthData, authService } = useAuthService();
  console.log('🚀  authData:', authData);
  const isLogin = checkLogin();

  const onFinish = async (values) => {
    const [data, error] = await authService.login(values);
    if (data) {
      messageApi.open({
        type: 'success',
        content: 'Login successfully!',
      });

      router.replace('/dashboard');
    }

    if (error) {
      messageApi.open({
        type: 'error',
        content: `Login fail! Error: ${error.message}`,
      });
    }
  };

  useEffect(() => {
    isLogin && router.replace('/dashboard');
  }, [isLogin]);

  return (
    <div className={styles.loginContainer}>
      {contextHolder}
      <div className={styles.formContainer}>
        <h2 className={styles.formHeader}>Login</h2>
        <div className={styles.form}>
          <Form
            name="basic"
            // initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete="off"
            layout="vertical"
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block loading={authData.isLoading}>
                Login
              </Button>
              Or <Link href={'/register'}> Register now!</Link>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
