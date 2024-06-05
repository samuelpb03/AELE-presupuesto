import React, { useState, useEffect } from "react";
import { useTabs } from "./TabsContext";
import { useData } from './context/DataContext';
import { generatePDF } from "./GeneratePDF";

function Instalacion() {
  const { handleSelectChangeI } = useTabs();
  const { data, saveData } = useData();
  const [numFrentesInteriores, setNumFrentesInteriores] = useState(0);
  const [numArmariosCompletos, setNumArmariosCompletos] = useState(0);
  const [montajeAcarreo, setMontajeAcarreo] = useState(false);

  useEffect(() => {
    if (data.instalacion) {
      setNumFrentesInteriores(data.instalacion.numFrentesInteriores || 0);
      setNumArmariosCompletos(data.instalacion.numArmariosCompletos || 0);
      setMontajeAcarreo(data.instalacion.montajeAcarreo || false);
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
    generatePDF(data);
  };
  return (
    <div className="container">
      <div className="container2">
        <h1>Instalación</h1>
        <div className="field">
          <label htmlFor="numFrentesInteriores">Número de frentes/interiores:</label>
          <input
            type="number"
            id="numFrentesInteriores"
            value={numFrentesInteriores}
            min={0}
            onChange={(e) => setNumFrentesInteriores(parseInt(e.target.value, 10) || 0)}
          />
        </div>
        <div className="field">
          <label htmlFor="numArmariosCompletos">Armarios completos:</label>
          <input
            type="number"
            id="numArmariosCompletos"
            value={numArmariosCompletos}
            min={0}
            onChange={(e) => setNumArmariosCompletos(parseInt(e.target.value, 10) || 0)}
          />
        </div>
      </div>
      <div className="container3">
        <div className="field checkbox-field">
          <input
            type="checkbox"
            id="montajeAcarreo"
            checked={montajeAcarreo}
            onChange={(e) => setMontajeAcarreo(e.target.checked)}
          />
          <label htmlFor="montajeAcarreo">Montaje + acarreo</label>
          <button onClick={handleGeneratePDF} style={{ marginTop: "20px" }}>Generar PDF</button>
        </div>
      </div>
    </div>
  );
}

export default Instalacion;
