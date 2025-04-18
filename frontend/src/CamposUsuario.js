import React from 'react';
import { useTabs } from './TabsContext';  // Importamos el contexto

function CamposUsuario() {
  const { userInfo, handleUserInfoChange } = useTabs();  // Obtenemos la info del usuario y el manejador del contexto

  const handleDownloadGuide = () => {
    // Ruta relativa al archivo en la carpeta raíz
    const fileUrl = '/Guía del nuevo presupuestador AELE.docx';
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = 'Guía del nuevo presupuestador AELE.docx';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadTarifa = () => {
    // Ruta relativa al archivo en la carpeta raíz
    const fileUrl = '/TarifaAele2025';
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = 'TarifaAele2025';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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
      <div className="download-section">
        <button className="download-guide-button" onClick={handleDownloadGuide}>
          Descargar guía completa (en desarrollo)
        </button>
        <button className="download-guide-button" style={{ marginLeft: '10px' }} onClick={handleDownloadTarifa}>
          Descargar tarifa 2025
        </button>
        <p className="restore-budget-text">
          <strong> * Para restaurar un presupuesto, diríjase a la pestaña de Instalación</strong>
        </p>
      </div>
    </div>
  );
}

export default CamposUsuario;



