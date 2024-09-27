import React, { useState, useEffect } from "react";
import axios from "axios";
import { useTabs } from "./TabsContext";
import { useData } from './context/DataContext';

function Remates() {
  const { handleSelectChangeZ } = useTabs();
  const { data, saveData } = useData();
  const [listArticulo, setListArticulo] = useState([]);
  const [selectedArticulos, setSelectedArticulos] = useState(Array(3).fill({ id: "", nombre: "", puntos: 0 }));
  const [metros, setMetros] = useState(Array(3).fill(0));
  const [puntos, setPuntos] = useState(Array(3).fill(0));
  const [listOtros, setListOtros] = useState([]);
  const [selectedOtros, setSelectedOtros] = useState(Array(3).fill({ id: "", nombre: "", puntos: 0 }));
  const [cantidadesOtros, setCantidadesOtros] = useState(Array(3).fill(1));
  const [puntosOtros, setPuntosOtros] = useState(Array(3).fill(0));
  const backendUrl = 'http://194.164.166.129:6969';
  const user = localStorage.getItem('user');
  if (!user) {
    //Redirigir a login.php si no está autenticado
    window.location.href = '/login.php';
  }
  useEffect(() => {
    axios
      .get(`${backendUrl}/articulo/remates`, {
        headers: {
          'ngrok-skip-browser-warning': 'true'
        }
      })
      .then((res) => {
        if (Array.isArray(res.data)) {
          const formattedArticulos = res.data.map((articulo) => ({
            id: articulo.articulo_id,
            nombre: `${articulo.articulo_nombre} - ${articulo.material_nombre}`,
            puntos: articulo.puntos
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
  useEffect(() => {
    axios.get(`${backendUrl}/articulo/otros`, {
      headers: {
        'ngrok-skip-browser-warning': 'true'
      }
    })
      .then((res) => {
        if (Array.isArray(res.data)) {
          const formattedOtros = res.data.map((otro) => ({
            id: otro.articulo_id,
            nombre: `${otro.articulo_nombre} - ${otro.material_nombre}`,
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

  useEffect(() => {
    if (data && data.remates) {
      // Asumir que data.remates ya incluye todos los campos necesarios
      setSelectedArticulos(data.remates.selectedArticulos || Array(3).fill({ id: "", nombre: "", puntos: 0 }));
      setMetros(data.remates.metros || Array(3).fill(0));
      setPuntos(data.remates.puntos || Array(3).fill(0));
      setSelectedOtros(data.remates.selectedOtros || Array(3).fill({ id: "", nombre: "", puntos: 0 }));
      setCantidadesOtros(data.remates.cantidadesOtros || Array(3).fill(1));
      setPuntosOtros(data.remates.puntosOtros || Array(3).fill(0));
    }
  }, [data]);

  useEffect(() => {
    const rematesData = {
      selectedArticulos,
      metros,
      puntos,
      selectedOtros,
      cantidadesOtros,
      puntosOtros
    };
    saveData("remates", rematesData);
  }, [selectedArticulos, metros, puntos, selectedOtros, cantidadesOtros, puntosOtros]);

  useEffect(() => {
    const formattedData = selectedArticulos.reduce((acc, articulo, index) => {
      acc[`articulo${index + 1}Nombre`] = articulo.nombre;
      acc[`articulo${index + 1}Id`] = articulo.id;
      acc[`articulo${index + 1}Puntos`] = articulo.puntos;
      acc[`metros${index + 1}`] = metros[index];
      acc[`puntos${index + 1}`] = puntos[index];
      return acc;
    }, {});

    saveData("remates", formattedData);
  }, [selectedArticulos, metros, puntos, saveData]);

  const handleSelectArticuloChange = (index, event) => {
    const updatedArticulos = [...selectedArticulos];
    const selectedIndex = event.target.selectedIndex;
    const nombre = event.target.options[selectedIndex].text;
    const id = event.target.value;
    const puntos = parseInt(event.target.options[selectedIndex].getAttribute('data-puntos'), 10);

    updatedArticulos[index] = { id, nombre, puntos };
    setSelectedArticulos(updatedArticulos);

    if (id) {
      const updatedMetros = [...metros];
      updatedMetros[index] = 0;
      setMetros(updatedMetros);
      setPuntos((prevPuntos) => {
        const newPuntos = [...prevPuntos];
        newPuntos[index] = 0;
        return newPuntos;
      });
    }

    handleSelectChangeZ(`articulo${index + 1}`, id, nombre);
  };

  const handleMetrosChange = (index, event) => {
    const updatedMetros = [...metros];
    const value = parseFloat(event.target.value);
    updatedMetros[index] = isNaN(value) ? 0 : value;
    setMetros(updatedMetros);
    setPuntos((prevPuntos) => {
      const newPuntos = [...prevPuntos];
      newPuntos[index] = (selectedArticulos[index].puntos * updatedMetros[index]) / 2.5;
      return newPuntos;
    });
  };
  // Cuando cambias la selección de otros artículos
  const handleSelectOtrosChange = (index, event) => {
    const updatedOtros = [...selectedOtros];
    const selectedIndex = event.target.selectedIndex;
    const nombre = event.target.options[selectedIndex].text;
    const id = event.target.value;
    const puntos = parseInt(event.target.options[selectedIndex].getAttribute('data-puntos'), 10) || 0;
  
    updatedOtros[index] = { id, nombre, puntos };
    setSelectedOtros(updatedOtros);
  
    // Establecer cantidad a 1 automáticamente si se selecciona un artículo, o a 0 si se selecciona la opción por defecto
    const updatedCantidades = [...cantidadesOtros];
    updatedCantidades[index] = id ? 1 : 0;
    setCantidadesOtros(updatedCantidades);
  
    const updatedPuntos = [...puntosOtros];
    updatedPuntos[index] = id ? puntos * updatedCantidades[index] : 0;
    setPuntosOtros(updatedPuntos);
  };
  
  useEffect(() => {
    const newPuntos = selectedOtros.map((otro, index) => otro.puntos * cantidadesOtros[index]);
    setPuntosOtros(newPuntos);
  }, [selectedOtros, cantidadesOtros]);
  // Calcula los puntos basados en la cantidad seleccionada


  const renderSelectOtros = (index) => (
    <div key={index}>
      <label htmlFor={`otros${index + 1}`}>Otros Artículo {index + 1}:</label>
      <select
        id={`otros${index + 1}`}
        onChange={(event) => handleSelectOtrosChange(index, event)}
        value={selectedOtros[index].id || ""}
      >
        <option value="">--Selecciona una opción--</option>
        {listOtros.map((otro) => (
          <option key={otro.id} value={otro.id} data-puntos={otro.puntos}>
            {otro.nombre}
          </option>
        ))}
      </select>

      <label htmlFor={`cantidadesOtros${index + 1}`}>Cantidad:</label>
      <input
        type="number"
        id={`cantidadesOtros${index + 1}`}
        value={cantidadesOtros[index]}
        onChange={(e) => {
          const newCantidades = [...cantidadesOtros];
          newCantidades[index] = Math.max(0, parseInt(e.target.value, 10) || 0);
          setCantidadesOtros(newCantidades);
        }}
        min="0"
      />

      <label htmlFor={`puntosOtros${index + 1}`}>Puntos: {puntosOtros[index].toFixed(2)}</label>
    </div>
  );
  const renderSelectArticulo = (index) => (
    <div key={index}>
      <label htmlFor={`articulo${index + 1}`}>Artículo {index + 1}:</label>
      <select
        id={`articulo${index + 1}`}
        onChange={(event) => handleSelectArticuloChange(index, event)}
        value={selectedArticulos[index].id || ""}
      >
        <option value="" disabled={selectedArticulos[index].id !== ""}>--Selecciona una opción--</option>
        {listArticulo.map((articulo) => (
          <option key={articulo.id} value={articulo.id} data-puntos={articulo.puntos}>
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
      />
      <label htmlFor={`puntos${index + 1}`}>Puntos: {puntos[index].toFixed(2)}</label>
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

