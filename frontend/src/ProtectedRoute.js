import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
  const isRegistered = localStorage.getItem('isRegistered'); // Leer del localStorage si el usuario ha completado el registro.

  return isRegistered ? children : <Navigate to="/registro" />;
}

export default ProtectedRoute;
