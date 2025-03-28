import React from 'react';
import { useTabs } from './TabsContext';  // Importamos el contexto

function CamposUsuario() {
  const { userInfo, handleUserInfoChange } = useTabs();  // Obtenemos la info del usuario y el manejador del contexto

  return (
    <div className="campos-usuario">
      <label>
        Cliente:
        <input
          type="text"
          value={userInfo.cliente}
          onChange={(e) => handleUserInfoChange('cliente', e.target.value)}  // Actualizamos el contexto
        />
      </label>
      <label>
        Teléfono:
        <input
          type="text"
          value={userInfo.telefono}
          onChange={(e) => handleUserInfoChange('telefono', e.target.value)}  // Actualizamos el contexto
        />
      </label>
      <label>
        Email (opcional):
        <input
          type="text"
          value={userInfo.email}
          onChange={(e) => handleUserInfoChange('email', e.target.value)}  // Actualizamos el contexto
        />
      </label>
    </div>
  );
}

export default CamposUsuario;



