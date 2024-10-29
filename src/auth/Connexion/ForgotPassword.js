import React, { useState } from 'react';
import { Button, Form, Input, message } from 'antd';
import { Paper } from '@mui/material';
import Box from '@mui/material/Box';
import axios from 'axios';

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:8000/api/forgot-password', {
        email: values.email,
      });

      if (response.status === 200) {
        message.success('Un email de réinitialisation a été envoyé.');
      } else {
        message.error('Erreur lors de l\'envoi de l\'email.');
      }
    } catch (error) {
      message.error('Erreur lors de l\'envoi de l\'email. Veuillez vérifier l\'adresse email.');
    } finally {
      setLoading(false);
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
          name="forgot-password"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 500 }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                type: 'email',
                message: 'Veuillez saisir un email valide!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit" size="small" loading={loading}  
            style={{
                height: '10 px', // Ajuste la hauteur du bouton
                fontSize: '15px', // Réduit la taille du texte
                padding: '15px', // Ajuste le padding pour un bouton plus petit
              }}>
              Envoyer un email
            </Button>
          </Form.Item>
        </Form>
      </Paper>
    </Box>
  );
};

export default ForgotPassword;
