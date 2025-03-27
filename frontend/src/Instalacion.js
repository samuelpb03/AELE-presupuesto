import React, { useState, useEffect } from "react";
import { useTabs } from "./TabsContext";
import { useData } from './context/DataContext';
import { generatePDF } from "./GeneratePDF";
import { useNavigate } from 'react-router-dom';

function Instalacion() {
  const { userInfo } = useTabs();
  const { data, saveData } = useData();
  const [numFrentesInteriores, setNumFrentesInteriores] = useState("");
  const [numArmariosCompletos, setNumArmariosCompletos] = useState("");
  const [numDesmontaje, setNumDesmontaje] = useState(""); // Nuevo estado para el número de desmontajes
  const [montajeAcarreo, setMontajeAcarreo] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (data.instalacion) {
      setNumFrentesInteriores(data.instalacion.numFrentesInteriores || "");
      setNumArmariosCompletos(data.instalacion.numArmariosCompletos || "");
      setNumDesmontaje(data.instalacion.numDesmontaje || ""); // Restaurar estado de desmontajes
    }
  }, []);

  useEffect(() => {
    const formattedData = {
      numFrentesInteriores: numFrentesInteriores === "" ? 0 : parseFloat(numFrentesInteriores).toFixed(2),
      numArmariosCompletos: numArmariosCompletos === "" ? 0 : parseFloat(numArmariosCompletos).toFixed(2),
      numDesmontaje: numDesmontaje === "" ? 0 : parseFloat(numDesmontaje), // Guardar el número de desmontajes
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
    window.location.href = '/'; // Navegar de vuelta a la página principal
  };

  const handleEditar = () => {
    setShowModal(false); // Navegar de vuelta a la página principal
  };

  const handleNumArmariosCompletosChange = (e) => {
    const value = e.target.value;
    setNumArmariosCompletos(value === "" ? "" : parseFloat(value));
  };

  const handleNumFrentesInterioresChange = (e) => {
    const value = e.target.value;
    setNumFrentesInteriores(value === "" ? "" : parseFloat(value));
  };

  const handleNumDesmontajeChange = (e) => {
    const value = e.target.value;
    setNumDesmontaje(value === "" ? "" : parseFloat(value));
  };

  return (
    <div className="container">
      <div className="container2">
        <h1>Instalación</h1>
        <div className="field-instalacion">
          <label htmlFor="numArmariosCompletos">Armarios completos por metro lineal:</label>
          <input
            type="number"
            step="0.01" // Permitir decimales
            id="numArmariosCompletos"
            value={numArmariosCompletos}
            min={0}
            onChange={handleNumArmariosCompletosChange}
          />
        </div>
        <div className="field-instalacion">
          <label htmlFor="numFrentesInteriores">Frentes/interiores/vestidores/equipamientos por metro lineal:</label>
          <input
            type="number"
            step="0.01" // Permitir decimales
            id="numFrentesInteriores"
            value={numFrentesInteriores}
            min={0}
            onChange={handleNumFrentesInterioresChange}
          />
        </div>
        <div className="field-instalacion">
          <label htmlFor="numDesmontaje">Desmontaje de armarios:</label>
          <input
            type="number"
            id="numDesmontaje"
            value={numDesmontaje}
            min={0}
            onChange={handleNumDesmontajeChange}
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
            <button onClick={handleEditar}>Editar presupuesto</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Instalacion;