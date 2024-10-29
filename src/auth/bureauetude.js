import React, { useEffect, useState } from 'react';
import { BulbFilled } from '@ant-design/icons';
import { Dropdown, Menu, Badge, Spin, Typography, message } from 'antd';
import axios from 'axios';
import { ConfigProvider } from 'antd';
import frFR from 'antd/lib/locale/fr_FR';
import { ProTable } from '@ant-design/pro-components';
import Box from '@mui/material/Box';

const BureauDetude = () => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true); // État de chargement
  const [testRequests, setTestRequests] = useState([]); // État des demandes de test

  useEffect(() => {
    // Fetch notifications from the API
    axios.get('http://localhost:8000/api/notifications')
      .then(response => {
        if (response.data.length > 0) {
          setNotifications(response.data);
          setUnreadCount(response.data.length); // Set unread notifications count
        } else {
          console.log('No notifications');
        }
        setLoading(false); // Arrête le chargement
      })
      .catch(error => {
        console.error('Error fetching notifications:', error);
        setLoading(false); // Arrête le chargement même en cas d'erreur
      });

    // Fetch test requests from the API
    axios.get('http://localhost:8000/api/dtest') // Replace with your actual API endpoint
      .then(response => {
        setTestRequests(response.data); // Set the data for the test requests
      })
      .catch(error => {
        console.error('Error fetching test requests:', error);
      });
  }, []);

  // Fonction pour mettre à jour le statut d'une demande de test
  const updateTestRequestStatus = (id, statut) => {
    axios.put(`http://localhost:8000/api/demande-tests/${id}/status`, { statut })
      .then(response => {
        message.success('Statut mis à jour avec succès!');
        // Mettre à jour l'état local après la modification
        setTestRequests(prevRequests => 
          prevRequests.map(request => 
            request.id === id ? { ...request, statut } : request
          )
        );
      })
      .catch(error => {
        console.error('Error updating status:', error);
        message.error('Erreur lors de la mise à jour du statut.');
      });
  };

  // Create menu for Dropdown
  const menu = (
    <Menu>
      {notifications.length > 0 ? (
        notifications.map((notification, index) => {
          // Parse the JSON string in 'data' field
          const notificationData = JSON.parse(notification.data);

          return (
            <Menu.Item key={index}>
              {notificationData.message} {/* Affichage du message de notification */}
            </Menu.Item>
          );
        })
      ) : (
        <Menu.Item>Aucune notification</Menu.Item>
      )}
    </Menu>
  );

  // Define the columns for ProTable
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Heure',
      dataIndex: 'heure',
      key: 'heure',
    },
    {
      title: 'Statut',
      dataIndex: 'statut',
      key: 'statut',
      render: (text, record) => (
        <Dropdown
          overlay={
            <Menu onClick={(e) => updateTestRequestStatus(record.id, e.key)}>
              <Menu.Item key="en_attente">En attente</Menu.Item>
              <Menu.Item key="validé">Validé</Menu.Item>
              <Menu.Item key="refusé">Refusé</Menu.Item>
              <Menu.Item key="en_cours">En cours</Menu.Item>
              <Menu.Item key="terminé">Terminé</Menu.Item>
            </Menu>
          }
          trigger={['click']}
        >
          <a onClick={e => e.preventDefault()}>
            {text} <span style={{ marginLeft: '8px' }}>▼</span>
          </a>
        </Dropdown>
      )
    }
  ];

  return (
    <div style={{ position: 'relative', minHeight: '100vh', padding: '20px' }}>
      {/* Encadrement du titre avec bulle de notification */}
      <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          border: '2px solid black', 
          borderRadius: '10px', 
          padding: '10px', 
          marginBottom: '20px',
          backgroundColor: '#f5f5f5',
          width: '100%' // Force l'encadré à prendre toute la largeur
      }}>
        {/* Titre Bureau d'étude */}
        <Typography style={{ fontSize: '24px', fontWeight: 'bold', color: 'black' }}>
          Bureau d'étude
        </Typography>

        {/* Icone de notification */}
        <div style={{ border: '2px solid #ccc', borderRadius: '10px', padding: '5px' }}>
          <Dropdown overlay={menu} trigger={['click', 'hover']} placement="bottomRight">
            <Badge count={unreadCount}>
              {loading ? (
                <Spin /> // Affiche un spinner pendant le chargement
              ) : (
                <BulbFilled style={{ fontSize: '30px', color: '#08c', cursor: 'pointer' }} />
              )}
            </Badge>
          </Dropdown>
        </div>
      </div>

      {/* Tableau des demandes de test */}
      <Box sx={{ padding: 2 }}>
        <Typography variant="h6" sx={{ marginBottom: 2 }}>
          Liste des demandes de test
        </Typography>

        <ConfigProvider locale={frFR}>
          <ProTable
            columns={columns}
            dataSource={testRequests}
            rowKey="id"
            search={false} // Disable search for simplicity, can be enabled if needed
            pagination={{
              pageSize: 5, // Nombre d'éléments par page
            }}
          />
        </ConfigProvider>
      </Box>
    </div>
  );
};

export default BureauDetude;
