import React, { useEffect, useState } from 'react';
import { Button, Form, Input, message } from 'antd';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Box from '@mui/material/Box';
import { Paper } from '@mui/material';

const ResetPassword = () => {
  const [form] = Form.useForm();
  const location = useLocation();
  const [token, setToken] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setToken(params.get('token'));
    setEmail(params.get('email'));
  }, [location]);

  const onFinish = async (values) => {
    try {
      // Requête POST à l'API Laravel pour réinitialiser le mot de passe
      const response = await axios.post('http://localhost:8000/api/reset-password', {
        token,
        email,
        password: values.password,
        password_confirmation: values.password_confirmation,
      });

      message.success('Password reset successfully! Redirecting to login...');
      // Rediriger vers la page de connexion ou une autre page
    } catch (error) {
      // Afficher les erreurs
      if (error.response && error.response.status === 422) {
        message.error('Please check your inputs!');
      } else {
        message.error('An error occurred. Please try again.');
      }
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
      }}
    >
      <Paper elevation={8} style={{ padding: 35 }}>
    <Form
      form={form}
      name="reset_password"
      onFinish={onFinish}
    >
      <Form.Item
        label="New Password"
        name="password"
        rules={[{ required: true, message: 'Please input your new password!' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        label="Confirm Password"
        name="password_confirmation"
        rules={[{ required: true, message: 'Please confirm your password!' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Reset Password
        </Button>
      </Form.Item>
    </Form>
    </Paper>
    </Box>
  );
};

export default ResetPassword;
