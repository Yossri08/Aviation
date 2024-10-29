import axios from 'axios';
import React, { useRef, useState, useEffect } from 'react';
import { ProTable } from '@ant-design/pro-components';
import { Button, ConfigProvider, Drawer, Space, Typography } from 'antd';
import { PlusOutlined, EditOutlined } from '@ant-design/icons';
import frFR from 'antd/lib/locale/fr_FR';
import { useNavigate } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AddDemandeTest from './adddamande'; // Importer le composant pour ajouter une demande de test
import { toast } from 'react-toastify';
import Box from '@mui/material/Box';

const createColumns = (navigate, onEdit) => [
  {
    title: 'Description',
    dataIndex: 'description',
  },
  {
    title: 'Date',
    dataIndex: 'date',
  },
  {
    title: 'Heure',
    dataIndex: 'heure',
  },
  {
    title: 'Statut',
    dataIndex: 'statut',
    valueEnum: {
      en_attente: {
        text: 'En attente',
        status: 'Default',
      },
      validee: {
        text: 'Validée',
        status: 'Success',
      },
      refusee: {
        text: 'Refusée',
        status: 'Error',
      },
    },
  },
  {
    title: 'Balise',
    dataIndex: 'balise',
    render: (_, record) => `${record.balise.modele} - ${record.balise.code_hexa}`,
  },

];

const MainComponent = () => {
  const actionRef = useRef();
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  const columns = createColumns(navigate);

  const handleSuccess = () => {
    toast.success('Demande de test ajoutée avec succès !'); // Notification de succès
    actionRef.current.reload(); // Recharger les données
    setDrawerVisible(false); // Fermer le Drawer
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      if (user && user.email) {
        setUserEmail(user.email);
      }
    }
  }, []);

  return (
    <Box sx={{ padding: 1 }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: 1,
          padding: 1,
          border: '1px solid #ccc',
          borderRadius: 2,
          boxShadow: 1,
        }}
      >
        <Typography variant="h8" sx={{ color: 'black' }}>
          Probpriétaire de la balise / Liste demande de test
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: 'auto' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <AccountCircleIcon sx={{ fontSize: 30, color: 'black' }} />
            <Typography variant="body2" sx={{ color: 'black', fontSize: '10px', marginTop: 0.5 }}>
              {userEmail ? `${userEmail}` : 'Utilisateur non connecté'}
            </Typography>
          </Box>
        </Box>
      </Box>

      <ConfigProvider locale={frFR}>
        <ProTable
          className="custom-pro-table"
          columns={columns}
          actionRef={actionRef}
          rowKey="id"
          request={async (params) => {
            const searchParams = {
              description: params.description || '',
              date: params.date || '',
              statut: params.statut || '',
            };

            try {
              const response = await axios.get('http://localhost:8000/api/dtest', {
                params: searchParams,
              });

              return {
                data: response.data,
                success: true,
              };
            } catch (error) {
              return {
                data: [],
                success: false,
              };
            }
          }}
          search={{
            labelWidth: 'auto',
            defaultCollapsed: false,
          }}
          pagination={{ pageSize: 5 }}
          options={{
            fullScreen: false,
            reload: true,
            setting: false,
            density: false,
            display: false,
          }}
          headerTitle="Liste des Demandes de Test"
          toolBarRender={() => [
            <Button key="button" type="primary" icon={<PlusOutlined />} onClick={() => setDrawerVisible(true)}>
              Enregistrer une demande de test
            </Button>,
          ]}
          locale={frFR}
        />
      </ConfigProvider>

      {/* Drawer pour ajouter une demande de test */}
      <Drawer
        title="Ajouter une nouvelle demande de test"
        width={720}
        onClose={() => setDrawerVisible(false)}
        visible={drawerVisible}
        extra={
          <Space>
            <Button onClick={() => setDrawerVisible(false)}>Annuler</Button>
            <Button type="primary" onClick={() => actionRef.current.reload()}>
              Soumettre
            </Button>
          </Space>
        }
      >
        <AddDemandeTest onSuccess={handleSuccess} /> {/* Passer la fonction handleSuccess */}
      </Drawer>
    </Box>
  );
};

export default MainComponent;
