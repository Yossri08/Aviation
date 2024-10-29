import React from 'react';
import { Button, Checkbox, Form, Input, message } from 'antd';
import { Paper } from '@mui/material';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const App = () => {
  const navigate = useNavigate();

  // Fonction exécutée lors de la soumission du formulaire
  const onFinish = async (values) => {
    try {
      // Requête POST à l'API Laravel pour la connexion
      const response = await axios.post('http://localhost:8000/api/login', {
        email: values.username, // Utilisation de "username" comme "email" (ajustement selon vos besoins)
        password: values.password,
      });

      const token = response.data.access_token;
      console.log('Token from response:', token);

      const user = response.data.user;

      localStorage.setItem('user', JSON.stringify(user));

      console.log('Utilisateur stocké dans le localStorage:', user);
  
      // Stocke le token dans le localStorage
      localStorage.setItem('access_token', token);
  
      // Vérifie que le token est bien stocké dans le localStorage
      console.log('Token in localStorage:', localStorage.getItem('access_token'));

      // Afficher un message de succès si la connexion réussit
      message.success('Login successful! Redirecting...');
      
      // Rediriger l'utilisateur vers une page protégée (ex: tableau de bord)
      navigate('/liste'); // Modifier cette route en fonction de votre application
    } catch (error) {
      // Gérer les erreurs (ex: mot de passe incorrect)
      message.error('Login failed. Please check your credentials.');
    }
  };

  // Fonction exécutée en cas d'échec de la soumission du formulaire
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
    message.error('Please complete the form correctly.');
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
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 500,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Email"
            name="username" // Nom du champ pour correspondre à `email`
            rules={[
              {
                required: true,
                type: 'email', // Ajout de la validation de type email
                message: 'Please input a valid email!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 4,
              span: 30,
            }}
          >
            <Button type="primary" htmlType="submit" size="large">
              Se connecter
            </Button>
            <p>
              <Link to="/register">Créer un compte</Link>
            </p>
            <p>
              <Link to="/forgot-password">Mot de passe oublié ?</Link>
            </p>
          </Form.Item>
        </Form>
      </Paper>
    </Box>
  );
};

export default App;
