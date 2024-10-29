import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddTestRequest = () => {
  const [formData, setFormData] = useState({
    description: '',
    date: '',
    heure: '',
    statut: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/api/test', formData);
      toast.success(response.data.message); // Affiche une notification de succès
    } catch (error) {
      toast.error('Erreur lors de l’ajout de la demande de test');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
        />
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          placeholder="Date"
        />
        <input
          type="time"
          name="heure"
          value={formData.heure}
          onChange={handleChange}
          placeholder="Heure"
        />
        <select name="statut" value={formData.statut} onChange={handleChange}>
          <option value="actif">Actif</option>
          <option value="inactif">Inactif</option>
        </select>
        <button type="submit">Ajouter Demande</button>
      </form>

      <ToastContainer /> {/* Ce composant doit être inclus pour afficher les notifications */}
    </div>
  );
};

export default AddTestRequest;
