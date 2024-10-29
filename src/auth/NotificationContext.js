// src/NotificationContext.js
import React, { createContext, useContext, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [message, setMessage] = useState('');

  const notify = (msg) => {
    setMessage(msg);
    toast.success(msg);  // Affiche la notification
  };

  return (
    <NotificationContext.Provider value={{ notify }}>
      {children}
      {/* Ajoutez le ToastContainer ici */}
      <ToastContainer />
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  return useContext(NotificationContext);
};
