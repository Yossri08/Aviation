import axios from 'axios';
import React, { useRef, useState, useEffect } from 'react';
import { ProTable } from '@ant-design/pro-components';
import { Button, ConfigProvider } from 'antd';
import { PlusOutlined, EditOutlined } from '@ant-design/icons';
import frFR from 'antd/lib/locale/fr_FR';
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Ajoutb from './ajoutb';
import Update from './update';
import UserProfile from '../UserProfile';



const createColumns = (navigate, onEdit) => [
  {
    title: 'Code Hexa',
    dataIndex: 'code_hexa',
  },
  {
    title: 'Type',
    dataIndex: 'type',
  },
  {
    title: 'Modèle',
    dataIndex: 'modele',
  },
  {
    title: 'Fabriquant',
    dataIndex: 'fabriquant',
  },
  {
    title: 'Certificat',
    dataIndex: 'certificat',
    render: (_, record) => {
      const fileName = record.certificat ? record.certificat.split('/').pop() : 'Aucun certificat';
      return record.certificat ? (
        <a href={`http://localhost:8000/storage/${record.certificat}`} target="_blank" rel="noopener noreferrer">
          {fileName}
        </a>
      ) : 'Aucun certificat';
    },
  },
  {
    title: 'Statut',
    dataIndex: 'statut',
    valueType: 'select',
    valueEnum: {
      actif: {
        text: 'Actif',
        status: 'Success',
      },
      inactif: {
        text: 'Inactif',
        status: 'Default',
      },
    },
  },
  {
    title: 'Enregistrement',
    dataIndex: 'enregistrement',
    valueType: 'date',
  },
  {
    title: 'Action',
    valueType: 'option',
    render: (_, record) => [
      <Button key="edit" type="link" icon={<EditOutlined />} onClick={() => onEdit(record)} />,
    ],
  },
];

const MainComponent = () => {
  const actionRef = useRef();
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);
  const [selectedBalise, setSelectedBalise] = useState(null);
  const [userEmail, setUserEmail] = useState('');

  const handleEditBalise = (record) => {
    setSelectedBalise(record);
    setEditVisible(true);
  };

  const columns = createColumns(navigate, handleEditBalise);

  useEffect(() => {
    // Récupérer les informations de l'utilisateur depuis le localStorage
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
      Propriétaire de la balise / liste
    </Typography>

    <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: 'auto' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <AccountCircleIcon sx={{ fontSize: 30, color: 'black' }} />
        {/* Afficher l'email de l'utilisateur */}
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
              code_hexa: params.code_hexa || '',
              type: params.type || '',
              modele: params.modele || '',
              fabriquant: params.fabriquant || '',
            };

            try {
              const response = await axios.get('http://localhost:8000/api/balises', {
                params: searchParams,
              });

              return {
                data: response.data,
                success: true,
              };
            } catch (error) {
              console.error('Erreur lors de la récupération des données:', error);
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
          headerTitle="Liste de mes Balises"
          toolBarRender={() => [
            <Button key="button" icon={<PlusOutlined />} onClick={() => setVisible(true)} type="primary">
              Enregister une balise
            </Button>,
          ]}
          locale={frFR}
        />
      </ConfigProvider>

      <Ajoutb
        visible={visible}
        onClose={() => {
          setVisible(false);
          actionRef.current?.reload(); // Rafraîchir la table après l'ajout
        }}
      />

      <Update
        visible={editVisible}
        onClose={() => setEditVisible(false)}
        baliseData={selectedBalise}
        onEditSuccess={() => {
          actionRef.current.reload();
        }}
      />
    </Box>
  );
};

export default MainComponent;
