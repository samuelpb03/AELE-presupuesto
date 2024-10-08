import React, { useState, useEffect } from "react";
import { useTabs } from "./TabsContext";
import { useData } from './context/DataContext';
import { generatePDF } from "./GeneratePDF";
import { useNavigate } from 'react-router-dom';

function Instalacion() {
  const { userInfo } = useTabs();
  const { data, saveData } = useData();
  const [numFrentesInteriores, setNumFrentesInteriores] = useState(0);
  const [numArmariosCompletos, setNumArmariosCompletos] = useState(0);
  const [numDesmontaje, setNumDesmontaje] = useState(0); // Nuevo estado para el número de desmontajes
  const [montajeAcarreo, setMontajeAcarreo] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (data.instalacion) {
      setNumFrentesInteriores(data.instalacion.numFrentesInteriores || 0);
      setNumArmariosCompletos(data.instalacion.numArmariosCompletos || 0);
      setNumDesmontaje(data.instalacion.numDesmontaje || 0); // Restaurar estado de desmontajes
    }
  }, []);

  useEffect(() => {
    const formattedData = {
      numFrentesInteriores,
      numArmariosCompletos,
      numDesmontaje, // Guardar el número de desmontajes
      montajeAcarreo,
    };
    saveData("instalacion", formattedData);
  }, [numFrentesInteriores, numArmariosCompletos, numDesmontaje, montajeAcarreo, saveData]);

  const handleGeneratePDF = () => {
    if (!userInfo.cliente.trim() || !userInfo.telefono.trim()) {
      alert("Por favor, rellena los campos Cliente y Teléfono antes de generar el presupuesto.");
      return;
    }
    
    // Pasar la cantidad de desmontajes como parte del objeto data
    generatePDF({ ...data, instalacion: {...data.instalacion, numDesmontaje }}, userInfo);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    window.location.href = '/';// Navegar de vuelta a la página principal
  };

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
        </div>
        <div className="field-instalacion">
          <label htmlFor="numDesmontaje">Desmontaje de armarios:</label>
          <input
            type="number"
            id="numDesmontaje"
            value={numDesmontaje}
            min={0}
            onChange={(e) => setNumDesmontaje(parseInt(e.target.value, 10) || 0)}
          />
        </div>
        <div className="field-instalacion">
          <button onClick={handleGeneratePDF} className="generate-button" style={{ marginTop: "20px" }}>Crear presupuesto</button>
        </div>
      </div>
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Su presupuesto ha sido realizado con éxito</h2>
            <p>Lo encontrará en su carpeta de descargas</p>
            <button onClick={handleCloseModal}>Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
}


export default Instalacion;

