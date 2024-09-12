import React, { useState, useEffect } from "react";
import { useTabs } from "./TabsContext";  // Usamos el contexto de TabsProvider
import { useData } from './context/DataContext';
import { generatePDF } from "./GeneratePDF";
import { useNavigate } from 'react-router-dom'; // Para redirigir al index.js

function Instalacion() {
  const { userInfo } = useTabs();  // Obtenemos la info del usuario del contexto
  const { data, saveData } = useData();
  const [numFrentesInteriores, setNumFrentesInteriores] = useState(0);
  const [numArmariosCompletos, setNumArmariosCompletos] = useState(0);
  const [montajeAcarreo, setMontajeAcarreo] = useState(true);
  const [showModal, setShowModal] = useState(false); // Estado para controlar el modal
  const navigate = useNavigate(); // Para redirigir

  const user = localStorage.getItem('user');
  if (!user) {
      // Redirigir a login.php si no está autenticado
      window.location.href = '/login.php';
  }

  useEffect(() => {
    if (data.instalacion) {
      setNumFrentesInteriores(data.instalacion.numFrentesInteriores || 0);
      setNumArmariosCompletos(data.instalacion.numArmariosCompletos || 0);
      setMontajeAcarreo(true);
    }
  }, []);

  useEffect(() => {
    const formattedData = {
      numFrentesInteriores,
      numArmariosCompletos,
      montajeAcarreo,
    };
    saveData("instalacion", formattedData);
  }, [numFrentesInteriores, numArmariosCompletos, montajeAcarreo, saveData]);

  const handleGeneratePDF = () => {
    if (!userInfo.tienda.trim() || !userInfo.cliente.trim() || !userInfo.telefono.trim()) {
      alert("Por favor, rellena los campos de Tienda, Cliente y Teléfono antes de generar el presupuesto.");
      return;
    }
    
    generatePDF(data, userInfo);
    setShowModal(true); // Mostrar el modal después de generar el PDF
  };

  const handleCloseModal = () => {
    window.location.href = '/'; // Cambiar a la pestaña del configurador
     // Refrescar la página después de cambiar a "index"
  }  // Redirigir al index.js (cambia la ruta según lo necesites

  return (
    <div className="container">
      <div className="container2">
        <h1>Instalación</h1>
        <div className="field-instalacion">
          <label htmlFor="numFrentesInteriores">Número de frentes/interiores:</label>
          <input
            type="number"
            id="numFrentesInteriores"
            value={numFrentesInteriores}
            min={0}
            onChange={(e) => setNumFrentesInteriores(parseInt(e.target.value, 10) || 0)}
          />
        </div>
        <div className="field-instalacion">
          <label htmlFor="numArmariosCompletos">Armarios completos:</label>
          <input
            type="number"
            id="numArmariosCompletos"
            value={numArmariosCompletos}
            min={0}
            onChange={(e) => setNumArmariosCompletos(parseInt(e.target.value, 10) || 0)}
          />
          <button onClick={handleGeneratePDF} style={{ marginTop: "20px" }}>Crear presupuesto</button>
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Su presupuesto ha sido realizado con éxito</h2>
            <p>Lo encontrará en su carpeta de descargas</p>
            <button onClick={handleCloseModal}>Nuevo presupuesto</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Instalacion;
