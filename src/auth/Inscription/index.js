import React, { useState } from 'react';
import { Paper } from '@mui/material';

import Box from '@mui/material/Box';
import {
  Button,
  Form,
  Input,
  Mentions,
  Segmented,
  message,
} from 'antd';
import axios from 'axios';

const { Option } = Mentions;

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 6,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 14,
    },
  },
};

const App = () => {
  const [form] = Form.useForm();
  const [componentVariant, setComponentVariant] = useState('filled');

  const onFormVariantChange = ({ variant }) => {
    setComponentVariant(variant);
  };

  const handleSubmit = async (values) => {
    try {
      const response = await axios.post('http://localhost:8000/api/register', values);
      message.success('Registration successful! Please check your email for the confirmation link.');
    } catch (error) {
      message.error('Registration failed. Please try again.');
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
      {...formItemLayout}
      form={form}
      onFinish={handleSubmit}
      onValuesChange={onFormVariantChange}
      variant={componentVariant}
      style={{
        maxWidth: 600,
      }}
      initialValues={{
        variant: componentVariant,
      }}
    >
      <Form.Item label="Form variant" name="variant">
        <Segmented options={['outlined', 'filled', 'borderless']} />
      </Form.Item>

      <Form.Item
        label="Name"
        name="name"
        rules={[
          {
            required: true,
            message: 'Please input your name!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Email"
        name="email"
        rules={[
          {
            required: true,
            type: 'email',
            message: 'Please enter a valid email address!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Phone"
        name="phone"
        rules={[
          {
            required: true,
            message: 'Please input your phone number!',
          },
        ]}
      >
        <Mentions>
          <Option value="216">+216</Option>
        </Mentions>
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
          {
            min: 6,
            message: 'Password must be at least 6 characters long!',
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        label="Confirmation Password"
        name="password_confirmation"
        rules={[
          {
            required: true,
            message: 'Please confirm your password!',
          },
          {
            min: 6,
            message: 'Password must be at least 6 characters long!',
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 6,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Créer un compte
        </Button>
      </Form.Item>
    </Form>
    </Paper>
    </Box>
  );
};

export default App;
