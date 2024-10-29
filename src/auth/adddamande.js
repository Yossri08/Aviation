import React, { useState, useEffect } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Col, DatePicker, Drawer, Form, Input, Row, Select, Space, TimePicker } from 'antd';
import axios from 'axios';
import { toast } from 'react-toastify';
import dayjs from 'dayjs';

const { Option } = Select;

const AddDemandeTest = ({ onSuccess }) => {
  const [form] = Form.useForm();
  const [balises, setBalises] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/balises')
      .then(response => {
        setBalises(response.data);
      })
      .catch(error => {
        console.error('Erreur lors du chargement des balises:', error);
      });
  }, []);

  const onFinish = async (values) => {
    try {
      if (!values.time) {
        toast.error('Veuillez choisir l\'heure');
        return;
      }

      const formattedDate = values.date ? dayjs(values.date).format('YYYY-MM-DD') : '';
      const formattedTime = values.time ? dayjs(values.time).format('HH:mm') : '';

      const response = await axios.post('http://localhost:8000/api/test', {
        description: values.description,
        date: formattedDate,
        heure: formattedTime,
        balise_id: values.balise,
        statut: values.statut,
      });

      console.log('Demande de test créée avec succès:', response.data);
      form.resetFields(); // Réinitialiser les champs du formulaire
      onSuccess(); // Appeler la fonction onSuccess pour notifier le parent
    } catch (error) {
      console.error('Erreur lors de la création de la demande de test:', error);
      if (error.response) {
        const { errors } = error.response.data;
        if (errors) {
          for (const key in errors) {
            toast.error(errors[key][0]); // Affiche le premier message d'erreur
          }
        }
      } else {
        toast.error('Erreur lors de la création de la demande de test');
      }
    }
  };

  return (
    <Form layout="vertical" form={form} onFinish={onFinish} hideRequiredMark>
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: 'Veuillez entrer la description' }]}
          >
            <Input.TextArea rows={4} placeholder="Veuillez entrer la description" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="date"
            label="Date"
            rules={[{ required: true, message: 'Veuillez choisir la date' }]}
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="time"
            label="Heure"
            rules={[{ required: true, message: 'Veuillez choisir l\'heure' }]}
          >
            <TimePicker style={{ width: '100%' }} format="HH:mm" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="balise"
            label="Balise"
            rules={[{ required: true, message: 'Veuillez sélectionner une balise' }]}
          >
            <Select placeholder="Sélectionnez une balise">
              {balises.map(balise => (
                <Option key={balise.id} value={balise.id}>
                  {balise.modele}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="statut"
            label="Statut"
            rules={[{ required: true, message: 'Veuillez sélectionner un statut' }]}
            initialValue="en_attente"
          >
            <Select>
              <Option value="en_attente">En attente</Option>
              <Option value="validee">Validée</Option>
              <Option value="refusee">Refusée</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Form.Item>
        <Button type="primary" htmlType="submit" icon={<PlusOutlined />}>
          Ajouter une demande de test
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddDemandeTest;
