import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import axios from 'axios';
import {
  Button,
  Form,
  Input,
  Upload,
  Select,
  DatePicker,
  Radio,
  message,
} from 'antd';
import { Paper } from '@mui/material'; // Import du composant Paper depuis Material-UI

const { Option } = Select;

const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

const BaliseForm = () => {
  const [fileList, setFileList] = useState([]);
  const [form] = Form.useForm();

  const handleSubmit = (values) => {
    const formData = new FormData();
    formData.append('code_hexa', values.code_hexa);
    formData.append('type', values.type);
    formData.append('modele', values.modele);
    formData.append('fabriquant', values.fabriquant);
    formData.append('enregistrement', values.enregistrement.format('YYYY-MM-DD'));
    formData.append('statut', values.statut);
    if (fileList.length > 0) {
      formData.append('certificat', fileList[0].originFileObj);
    }

    axios.post('http://localhost:8000/api/balises', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then((response) => {
        message.success('Balise ajoutée avec succès !');
        form.resetFields();
        setFileList([]);
      })
      .catch((error) => {
        message.error('Erreur lors de l\'ajout de la balise');
        console.error(error);
      });
  };

  return (
    <Paper 
      elevation={3} // Ajout d'une ombre pour donner du relief au Paper
      style={{ 
        padding: '40px', 
        maxWidth: 2000, // Augmenter la largeur du formulaire
        margin: '40px auto' // Centrer le Paper
      }}
    >
      <Form
        form={form}
        labelCol={{ span: 9 }} // Ajuster la largeur du label
        wrapperCol={{ span: 16 }} // Ajuster la largeur des champs de saisie
        layout="horizontal"
        onFinish={handleSubmit}
      >
        <Form.Item
          label="Code Hexa"
          name="code_hexa"
          
          rules={[{ required: true, message: 'Le code hexa est requis' }]}
        >
          <Input placeholder="Entrez le code hexa" />
        </Form.Item>

        <Form.Item
          label="Type"
          name="type"
          rules={[{ required: true, message: 'Le type est requis' }]}
        >
          <Select placeholder="Sélectionner un type">
            <Option value="Type 1">Type 1</Option>
            <Option value="Type 2">Type 2</Option>
            <Option value="Type 3">Type 3</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Modèle"
          name="modele"
          rules={[{ required: true, message: 'Le modèle est requis' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Fabriquant"
          name="fabriquant"
          rules={[{ required: true, message: 'Le fabriquant est requis' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Enregistrement"
          name="enregistrement"
          rules={[{ required: true, message: 'La date d\'enregistrement est requise' }]}
        >
          <DatePicker />
        </Form.Item>

        <Form.Item
          label="Statut"
          name="statut"
          rules={[{ required: true, message: 'Le statut est requis' }]}
        >
          <Radio.Group>
            <Radio value="actif">Actif</Radio>
            <Radio value="inactif">Inactif</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          label="Certificat"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          rules={[{ required: true, message: 'Le certificat est requis' }]}
        >
          <Upload
            name="certificat"
            listType="picture-card"
            beforeUpload={() => false} // Empêche le téléchargement automatique
            onChange={({ fileList }) => setFileList(fileList)}
            fileList={fileList}
          >
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </div>
          </Upload>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 6, span: 16 }}> {/* Centrer le bouton */}
          <Button type="primary" htmlType="submit">
            Ajouter la Balise
          </Button>
        </Form.Item>
      </Form>
    </Paper>
  );
};

export default BaliseForm;
