import React, { useState, useEffect } from "react";
import axios from "axios";
import { useTabs } from "./TabsContext";
import { useData } from './context/DataContext';

function Remates() {
  const { handleSelectChangeZ } = useTabs();
  const { data, saveData } = useData();
  const [listArticulo, setListArticulo] = useState([]);
  const [selectedArticulos, setSelectedArticulos] = useState(Array(3).fill({ id: "", nombre: "", puntosOriginal: 0, puntos: 0 }));
  const [metros, setMetros] = useState(Array(3).fill(2.5));
  const [listOtros, setListOtros] = useState([]);
  const [selectedOtros, setSelectedOtros] = useState(Array(3).fill({ id: "", nombre: "", puntosOriginal: 0, puntos: 0 }));
  const [cantidadesOtros, setCantidadesOtros] = useState(Array(3).fill(0));
  const backendUrl = 'http://194.164.166.129:6969';
  const user = localStorage.getItem('user');
  
  if (!user) {
    window.location.href = '/login.php';
  }

  // Cargar artículos de remates
  useEffect(() => {
    axios.get(`${backendUrl}/articulo/remates`, {
      headers: { 'ngrok-skip-browser-warning': 'true' }
    })
    .then((res) => {
      if (Array.isArray(res.data)) {
        const formattedArticulos = res.data.map((articulo) => ({
          id: articulo.articulo_id,
          nombre: `${articulo.articulo_nombre} - ${articulo.material_nombre}`,
          puntosOriginal: articulo.puntos, // Guardar el valor original de los puntos
          puntos: articulo.puntos // Inicialmente, los puntos son los originales
        }));
        setListArticulo(formattedArticulos);
      } else {
        console.error("Error fetching articulos: res.data is not an array");
      }
    })
    .catch((error) => {
      console.error("Error fetching articulos:", error);
    });
  }, []);

  // Cargar otros artículos
  useEffect(() => {
    axios.get(`${backendUrl}/articulo/otros`, {
      headers: { 'ngrok-skip-browser-warning': 'true' }
    })
    .then((res) => {
      if (Array.isArray(res.data)) {
        const formattedOtros = res.data.map((otro) => ({
          id: otro.articulo_id,
          nombre: `${otro.articulo_nombre} - ${otro.material_nombre}`,
          puntosOriginal: otro.puntos,
          puntos: otro.puntos
        }));
        setListOtros(formattedOtros);
      } else {
        console.error("Error fetching otros articulos: res.data is not an array");
      }
    })
    .catch((error) => {
      console.error("Error fetching otros articulos:", error);
    });
  }, []);
const isFrentesOnly = data && 
    (data.frentes || data.frentes2 || data.frentes3) && // Hay datos en frentes, frentes 2 o frentes 3
    !data.interiores && // No hay datos en interiores
    !data.equipamiento3 && // No hay datos en otras secciones
    !data.baldas;

  // Filtrar artículos si es solo frentes
  const filteredArticulos = isFrentesOnly 
    ? listArticulo.filter((articulo) => [205, 209].includes(parseInt(articulo.id))) 
    : listArticulo;

  // Cargar los datos iniciales desde el estado global
  useEffect(() => {
    if (data && data.remates) {
      setSelectedArticulos(data.remates.selectedArticulos || Array(3).fill({ id: "", nombre: "", puntos: 0 }));
      setMetros(data.remates.metros || Array(3).fill(0));
      setSelectedOtros(data.remates.selectedOtros || Array(3).fill({ id: "", nombre: "", puntos: 0 }));
      setCantidadesOtros(data.remates.cantidadesOtros || Array(3).fill(1));
    }
  }, []); 
  // Guardar los datos de remates cuando cambian
  useEffect(() => {
    const rematesData = {
      selectedArticulos,
      metros,
      selectedOtros,
      cantidadesOtros
    };
    saveData("remates", rematesData);
  }, [selectedArticulos, metros, selectedOtros, cantidadesOtros, saveData]);

  // Función para calcular puntos
  const calculatePuntos = (articulo, metros) => {
    const puntosOriginal = articulo?.puntosOriginal || 0;
    if (metros < 2.5) {
      return puntosOriginal; // Mantener los puntos originales si los metros son menores a 2.5
    }
    return (metros / 2.5) * puntosOriginal;  // Cálculo basado en los puntos originales si metros >= 2.5
  };

  // Manejar el cambio de selección de artículos
  const handleSelectArticuloChange = (index, event) => {
    const updatedArticulos = [...selectedArticulos];
    const selectedIndex = event.target.selectedIndex;
    const nombre = event.target.options[selectedIndex].text;
    const id = event.target.value;
    const puntosOriginal = parseInt(event.target.options[selectedIndex].getAttribute('data-puntos'), 10) || 0;

    updatedArticulos[index] = { id, nombre, puntosOriginal, puntos: puntosOriginal }; // Guardar los puntos originales y puntos actuales
    setSelectedArticulos(updatedArticulos);

    const updatedMetros = [...metros];
    updatedMetros[index] = 2.5;  // Reset metros al cambiar el artículo
    setMetros(updatedMetros);
  };

  // Manejar el cambio en metros
  const handleMetrosChange = (index, event) => {
    const value = parseFloat(event.target.value) || 0;
    const updatedMetros = [...metros];
    updatedMetros[index] = value;
    setMetros(updatedMetros);

    // Recalcular puntos basados en los metros
    const updatedArticulos = [...selectedArticulos];
    updatedArticulos[index].puntos = calculatePuntos(updatedArticulos[index], value);
    setSelectedArticulos(updatedArticulos);
  };

  // Manejar el cambio de selección de otros artículos
  const handleSelectOtrosChange = (index, event) => {
    const updatedOtros = [...selectedOtros];
    const selectedIndex = event.target.selectedIndex;
    const nombre = event.target.options[selectedIndex].text;
    const id = event.target.value;
    const puntosOriginal = parseInt(event.target.options[selectedIndex].getAttribute('data-puntos'), 10) || 0;

    updatedOtros[index] = { id, nombre, puntosOriginal, puntos: puntosOriginal }; // Guardar los puntos originales y puntos actuales
    setSelectedOtros(updatedOtros);

    const updatedCantidades = [...cantidadesOtros];
    updatedCantidades[index] = id ? 1 : 0;  // Reiniciar a 1 cuando se selecciona un nuevo artículo
    setCantidadesOtros(updatedCantidades);
  };

  // Manejar el cambio de cantidad para otros artículos
  const handleCantidadOtrosChange = (index, event) => {
    const newCantidades = [...cantidadesOtros];
    const value = Math.max(0, parseInt(event.target.value, 10) || 0);
    newCantidades[index] = value;
    setCantidadesOtros(newCantidades);
  };

  // Renderizar selectores de artículos
  const renderSelectArticulo = (index) => (
    <div key={index}>
      <label htmlFor={`articulo${index + 1}`}>Remate {index + 1}:</label>
      <select
        id={`articulo${index + 1}`}
        onChange={(event) => handleSelectArticuloChange(index, event)}
        value={selectedArticulos[index].id}
      >
        <option value="">--Selecciona una opción--</option>
        {filteredArticulos.map((articulo) => (
          <option key={articulo.id} value={articulo.nombre} data-puntos={articulo.puntos}>
            {articulo.nombre} {/* Mostrar nombre completo del artículo y material */}
          </option>
        ))}
      </select>

      <label htmlFor={`metros${index + 1}`}>Metros:</label>
      <input
        type="number"
        step="0.01"
        id={`metros${index + 1}`}
        value={metros[index]}
        onChange={(event) => handleMetrosChange(index, event)}
        min="0"
      />
      <label htmlFor={`puntos${index + 1}`}>Puntos: {selectedArticulos[index].puntos.toFixed(2)}</label>
    </div>
  );

  const renderSelectOtros = (index) => (
    <div key={index}>
      <label htmlFor={`otros${index + 1}`}>Otros Artículos {index + 1}:</label>
      <select
        id={`otros${index + 1}`}
        onChange={(event) => handleSelectOtrosChange(index, event)}
        value={selectedOtros[index].id}
      >
        <option value="">--Selecciona una opción--</option>
        {listOtros.map((otro) => (
          <option key={otro.id} value={otro.nombre} data-puntos={otro.puntosOriginal}>
            {otro.nombre}
          </option>
        ))}
      </select>

      <label htmlFor={`cantidadesOtros${index + 1}`}>Cantidad:</label>
      <input
        type="number"
        id={`cantidadesOtros${index + 1}`}
        value={cantidadesOtros[index]}
        onChange={(e) => handleCantidadOtrosChange(index, e)}
        min="0"
      />

      <label htmlFor={`puntosOtros${index + 1}`}>Puntos: {(selectedOtros[index].puntos * cantidadesOtros[index]).toFixed(2)}</label>
    </div>
  );

  return (
    <div className="container">
      <div className="container2">
        <h1>Remates</h1>
        <div className="field-special">
          {renderSelectArticulo(0)}
        </div>
        <div className="field-special">
          {renderSelectArticulo(1)}
        </div>
        <div className="field-special">
          {renderSelectArticulo(2)}
        </div>
      </div>
      <div className="container2">
        <h1>Otros Artículos</h1>
        <div className="field-special">
          {renderSelectOtros(0)}
        </div>
        <div className="field-special">
          {renderSelectOtros(1)}
        </div>
        <div className="field-special">
          {renderSelectOtros(2)}
        </div>
      </div>
    </div>
  );
}

export default Remates;
