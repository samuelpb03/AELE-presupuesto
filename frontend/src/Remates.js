import React, { useState, useEffect } from "react";
import axios from "axios";
import { useTabs } from "./TabsContext";
import { useData } from './context/DataContext';

function Remates() {
  const { handleSelectChangeZ } = useTabs();
  const { data, saveData } = useData();
  const [listArticulo, setListArticulo] = useState([]);
  const [selectedArticulos, setSelectedArticulos] = useState(Array(3).fill({ id: "", nombre: "", puntos: 0 }));
  const [cantidades, setCantidades] = useState(Array(3).fill(0));
  const [puntos, setPuntos] = useState(Array(3).fill(0));

  useEffect(() => {
    axios
      .get("http://localhost:6969/articulo/remates")
      .then((res) => {
        if (Array.isArray(res.data)) {
          setListArticulo(res.data);
        } else {
          console.error("Error fetching articulos: res.data is not an array");
        }
      })
      .catch((error) => {
        console.error("Error fetching articulos:", error);
      });
  }, []);

  useEffect(() => {
    if (data && data.remates) {
      const restoredArticulos = Array(3).fill({ id: "", nombre: "", puntos: 0 });
      const restoredCantidades = Array(3).fill(0);
      const restoredPuntos = Array(3).fill(0);

      for (let i = 0; i < 3; i++) {
        restoredArticulos[i] = {
          id: data.remates[`articulo${i + 1}Id`] || "",
          nombre: data.remates[`articulo${i + 1}Nombre`] || "",
          puntos: data.remates[`articulo${i + 1}Puntos`] || 0,
        };
        restoredCantidades[i] = data.remates[`cantidad${i + 1}`] || 0;
        restoredPuntos[i] = (data.remates[`articulo${i + 1}Puntos`] || 0) * (data.remates[`cantidad${i + 1}`] || 0);
      }

      setSelectedArticulos(restoredArticulos);
      setCantidades(restoredCantidades);
      setPuntos(restoredPuntos);
    }
  }, []);

  useEffect(() => {
    const formattedData = selectedArticulos.reduce((acc, articulo, index) => {
      acc[`articulo${index + 1}Nombre`] = articulo.nombre;
      acc[`articulo${index + 1}Id`] = articulo.id;
      acc[`articulo${index + 1}Puntos`] = articulo.puntos;
      acc[`cantidad${index + 1}`] = cantidades[index];
      acc[`puntos${index + 1}`] = puntos[index];
      return acc;
    }, {});

    saveData("remates", formattedData);
  }, [selectedArticulos, cantidades, puntos, saveData]);

  const handleSelectArticuloChange = (index, event) => {
    const updatedArticulos = [...selectedArticulos];
    const selectedIndex = event.target.selectedIndex;
    const nombre = event.target.options[selectedIndex].text;
    const id = event.target.value;
    const puntos = parseInt(event.target.options[selectedIndex].getAttribute('data-puntos'), 10);

    updatedArticulos[index] = { id, nombre, puntos };
    setSelectedArticulos(updatedArticulos);

    if (id) {
      const updatedCantidades = [...cantidades];
      updatedCantidades[index] = 1;
      setCantidades(updatedCantidades);
      setPuntos((prevPuntos) => {
        const newPuntos = [...prevPuntos];
        newPuntos[index] = puntos;
        return newPuntos;
      });
    }

    handleSelectChangeZ(`articulo${index + 1}`, id, nombre);
  };

  const handleCantidadChange = (index, event) => {
    const updatedCantidades = [...cantidades];
    const value = parseInt(event.target.value, 10);
    updatedCantidades[index] = isNaN(value) ? 1 : value;
    setCantidades(updatedCantidades);
    setPuntos((prevPuntos) => {
      const newPuntos = [...prevPuntos];
      newPuntos[index] = selectedArticulos[index].puntos * updatedCantidades[index];
      return newPuntos;
    });
  };

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
          <option key={articulo.articulo_id} value={articulo.articulo_id} data-puntos={articulo.puntos}>
            {articulo.nombre}
          </option>
        ))}
      </select>
      <label htmlFor={`cantidad${index + 1}`}>Cantidad:</label>
      <input
        type="number"
        id={`cantidad${index + 1}`}
        value={cantidades[index]}
        onChange={(event) => handleCantidadChange(index, event)}
        min="0"
      />
      <label htmlFor={`puntos${index + 1}`}>Puntos: {puntos[index]}</label>
    </div>
  );

  return (
    <div className="container">
      <div className="container2">
        <h1>Remates</h1>
        {renderSelectArticulo(0)}
        {renderSelectArticulo(1)}
      </div>
      <div className="container3">
        {renderSelectArticulo(2)}
      </div>
    </div>
  );
}

export default Remates;






