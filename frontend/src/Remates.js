import React, { useState, useEffect } from "react";
import axios from "axios";
import { useTabs } from "./TabsContext";
import { useData } from './context/DataContext';
import { useNavigate } from 'react-router-dom';

function Remates() {
  const { handleSelectChangeZ } = useTabs();
  const { data, saveData } = useData();
  const [tipoApertura, setTipoApertura] = useState("");
  const [tipoRemate, setTipoRemate] = useState("");
  const [listArticulo, setListArticulo] = useState([]);
  const [selectedArticulos, setSelectedArticulos] = useState(Array(3).fill({ id: "", nombre: "", puntosOriginal: 0, puntos: 0 }));
  const [metros, setMetros] = useState(Array(3).fill(2.5));
  const [listOtros, setListOtros] = useState([]);
  const [selectedOtros, setSelectedOtros] = useState(Array(3).fill({ id: "", nombre: "", puntosOriginal: 0, puntos: 0 }));
  const [cantidadesOtros, setCantidadesOtros] = useState(Array(3).fill(0));
  const backendUrl = 'https://api.adpta.com';
  const user = localStorage.getItem('user');
  const [forceUpdate, setForceUpdate] = useState(false);
  const navigate = useNavigate();
  
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
  useEffect(() => {
    if (tipoApertura) {
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
          // Filtrar los artículos que coinciden con el tipo de apertura seleccionado
          let filteredArticulos = formattedArticulos.filter((articulo) => 
            articulo.nombre.includes(tipoApertura)
          );
          // Filtrar los remates a premarco si solo se han elegido frentes
          if (isFrentesOnly) {
            filteredArticulos = filteredArticulos.filter((articulo) => 
              articulo.nombre.toLowerCase().includes("premarco")
            );
          }
          setListArticulo(filteredArticulos);
        } else {
          console.error("Error fetching articulos: res.data is not an array");
        }
      })
      .catch((error) => {
        console.error("Error fetching articulos:", error);
      });
    }
  }, [tipoApertura, forceUpdate, isFrentesOnly]);

  // Filtrar artículos si es solo frentes
  const filteredArticulos = listArticulo.filter((articulo) => {
    const matchesTipoApertura = tipoApertura ? articulo.nombre.includes(tipoApertura) : true;
    return matchesTipoApertura;
  });

  // Cargar los datos iniciales desde el estado global
  useEffect(() => {
    if (data && data.remates) {
      setSelectedArticulos(data.remates.selectedArticulos || Array(3).fill({ id: "", nombre: "", puntos: 0 }));
      setMetros(data.remates.metros || Array(3).fill(0));
      setSelectedOtros(data.remates.selectedOtros || Array(3).fill({ id: "", nombre: "", puntos: 0 }));
      setCantidadesOtros(data.remates.cantidadesOtros || Array(3).fill(1));
      setTipoApertura(data.remates.tipoApertura || ""); // Restaurar el tipo de apertura
      setTipoRemate(data.remates.tipoRemate || ""); // Restaurar el tipo de remate
    }
  }, []); 

  // Guardar los datos de remates cuando cambian
  useEffect(() => {
    const rematesData = {
      selectedArticulos,
      metros,
      selectedOtros,
      cantidadesOtros,
      tipoApertura,
      tipoRemate
    };
    saveData("remates", rematesData);
  }, [selectedArticulos, metros, selectedOtros, cantidadesOtros, tipoApertura, tipoRemate, saveData]);

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
    setForceUpdate((prev) => !prev); // Forzar la actualización del componente

    const updatedMetros = [...metros];
    updatedMetros[index] = 2.5;  // Reset metros al cambiar el artículo
    setMetros(updatedMetros);
    setTimeout(() => {
        navigate('/Remates');
      }, 10); // Navegar de vuelta a Remates después de 10ms // Retraso de 300ms antes de la navegación rápida
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

  const handleTipoAperturaChange = (event) => {
    const value = event.target.value;
    setTipoApertura(value);
    handleSelectChangeZ("tipoApertura", value, value);
    setForceUpdate((prev) => !prev); // Forzar la actualización del componente
  
    setTimeout(() => {
      navigate('/Frentes');
      setTimeout(() => {
        navigate('/Remates');
      }, 10); // Navegar de vuelta a Remates después de 10ms
    }, 30); // Retraso de 300ms antes de la navegación rápida
  };

  const handleTipoRemateChange = (event) => {
    const value = event.target.value;
    setTipoRemate(value);
    handleSelectChangeZ("tipoRemate", value, value);
    if (tipoApertura) {
      setForceUpdate((prev) => !prev); // Forzar la actualización del componente
    }
  };

  const mapAbbreviationToFull = (value) => {
    switch (value) {
      case "pared a costado v.":
        return "pared a costado visto";
      default:
        return value;
    }
  };

  // Renderizar selectores de artículos
  const renderSelectArticulo = (index) => (
    <div key={index}>
      <label htmlFor={`articulo${index + 1}`}>Remate {index + 1}:</label>
      <select
        id={`articulo${index + 1}`}
        onChange={(event) => handleSelectArticuloChange(index, event)}
        value={selectedArticulos[index].id}
        disabled={!tipoApertura} // Deshabilitar si no se ha seleccionado tipoApertura
      >
        <option value="">--Selecciona una opción--</option>
        {filteredArticulos.map((articulo) => (
          <option key={articulo.id} value={articulo.nombre} data-puntos={articulo.puntos}>
            {articulo.nombre}
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
        disabled={!tipoApertura} // Deshabilitar si no se ha seleccionado tipoApertura
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
          <option key={otro.id} value={otro.id} data-puntos={otro.puntosOriginal}>
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
    <div key={forceUpdate} className="container">
      <div className="container2">
        <h1>Configuración de Remates</h1>
        <div className="field-special">
          <label htmlFor="tipoApertura">Tipo de apertura:</label>
          <select
            id="tipoApertura"
            onChange={handleTipoAperturaChange}
            value={tipoApertura}
          >
            <option value="">--Selecciona una opción--</option>
            <option value="abat.">Abatible</option>
            <option value="corre.">Corredero</option>
          </select>
        </div>
      </div>
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
