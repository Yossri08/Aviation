import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import axios from 'axios';
import { Button, Form, Input, Upload, Select, DatePicker, Radio, message, Drawer } from 'antd';

const { Option } = Select;

const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

const Ajoutb = ({ visible, onClose }) => {
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
        onClose(); // Fermer le Drawer après succès
      })
      .catch((error) => {
        message.error('Erreur lors de l\'ajout de la balise');
        console.error(error);
      });
  };

  return (
    <Drawer
      title="Ajouter une Balise"
      placement="right"
      onClose={onClose}
      visible={visible}
      width={500} // Largeur du Drawer
    >
      <Form
        form={form}
        labelCol={{ span: 6 }} // Ajuster la largeur du label
        wrapperCol={{ span: 18 }} // Ajuster la largeur des champs de saisie
        layout="vertical"
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
          name="certificat"
          label="Certificat"
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <Upload
            name="file"
            listType="picture"
            beforeUpload={() => false}
            fileList={fileList}
            onChange={({ fileList }) => setFileList(fileList)}
          >
            <Button icon={<PlusOutlined />}>Télécharger le certificat</Button>
          </Upload>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Ajouter
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default Ajoutb;
