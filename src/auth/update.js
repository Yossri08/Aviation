import React, { useEffect, useState } from 'react';
import { Drawer, Button, Form, Input, Select, DatePicker, Radio, message, Upload } from 'antd';
import axios from 'axios';
import { PlusOutlined } from '@ant-design/icons';
import moment from 'moment';


const { Option } = Select;

const Update = ({ visible, onClose, baliseData, onEditSuccess }) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };
  

  useEffect(() => {
    if (baliseData) {
      // Charger les données dans le formulaire si une balise est sélectionnée
      form.setFieldsValue({
        code_hexa: baliseData.code_hexa,
        type: baliseData.type,
        modele: baliseData.modele,
        fabriquant: baliseData.fabriquant,
        enregistrement: baliseData.enregistrement ? moment(baliseData.enregistrement) : null,
        statut: baliseData.statut,
      });

      // Charger la liste des fichiers si un certificat est présent
      if (baliseData.certificat) {
        setFileList([
          {
            uid: '-1',
            name: baliseData.certificat.split('/').pop(),
            status: 'done',
            url: `http://localhost:8000/storage/${baliseData.certificat}`,
          },
        ]);
      }
    }
  }, [baliseData, form]);

  const handleSubmit = async (values) => {
    try {
      const formData = new FormData();
      formData.append('code_hexa', values.code_hexa);
      formData.append('type', values.type);
      formData.append('modele', values.modele);
      formData.append('fabriquant', values.fabriquant);
      formData.append('enregistrement', values.enregistrement.format('YYYY-MM-DD'));
      formData.append('statut', values.statut);
      if (fileList.length > 0 && fileList[0].originFileObj) {
        formData.append('certificat', fileList[0].originFileObj);
      }

      await axios.post(`http://localhost:8000/api/balises/${baliseData.id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'X-HTTP-Method-Override': 'PUT', // Pour forcer l'utilisation de la méthode PUT
        },
      });

      message.success('Balise modifiée avec succès !');
      form.resetFields();
      setFileList([]);
      onClose();
      onEditSuccess(); // Notifier le succès de l'édition pour rafraîchir la table
    } catch (error) {
      message.error('Erreur lors de la modification de la balise');
      console.error(error);
    }
  };

  return (
    <Drawer
      title="Modifier la Balise"
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
            Modifier
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default Update;
