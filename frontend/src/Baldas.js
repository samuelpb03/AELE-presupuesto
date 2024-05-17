import React, { useState, useEffect } from "react";
import axios from "axios";
import { useTabs } from "./TabsContext";
import { useData } from "./context/DataContext";

function Baldas() {
  const { selectedOptionsB, handleSelectChangeB } = useTabs();
  const { data, saveData } = useData();
  const [listArticulo, setListArticulo] = useState([]);
  const [listArticuloIluminacion, setListArticuloIluminacion] = useState([]);
  const [cantidades, setCantidades] = useState(Array(12).fill(0));
  const [selectedArticulos, setSelectedArticulos] = useState(
    Array(12).fill({
      id: "",
      nombre: "",
    })
  );

  useEffect(() => {
    // Restore data from context when component mounts
    if (data.baldas) {
      const restoredArticulos = Array(12).fill({ id: "", nombre: "" });
      const restoredCantidades = Array(12).fill(0);

      for (let i = 0; i < 12; i++) {
        restoredArticulos[i] = {
          id: data.baldas[`articulo${i + 1}Id`] || "",
          nombre: data.baldas[`articulo${i + 1}Nombre`] || "",
        };
        restoredCantidades[i] = data.baldas[`cantidad${i + 1}`] || 0;
      }

      setSelectedArticulos(restoredArticulos);
      setCantidades(restoredCantidades);
    }
  }, []);

  useEffect(() => {
    const formattedData = selectedArticulos.reduce((acc, articulo, index) => {
      acc[`articulo${index + 1}Nombre`] = articulo.nombre;
      acc[`articulo${index + 1}Id`] = articulo.id;
      acc[`cantidad${index + 1}`] = cantidades[index];
      return acc;
    }, {});
    saveData("baldas", formattedData);
  }, [selectedArticulos, cantidades, saveData]);

  useEffect(() => {
    axios
      .get("http://localhost:6969/articulo/baldas")
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

    axios
      .get("http://localhost:6969/articulo/iluminacion")
      .then((res) => {
        if (Array.isArray(res.data)) {
          setListArticuloIluminacion(res.data);
        } else {
          console.error("Error fetching articulos: res.data is not an array");
        }
      })
      .catch((error) => {
        console.error("Error fetching articulos:", error);
      });
  }, []);

  const handleSelectArticuloChange = (index, event) => {
    const updatedArticulos = [...selectedArticulos];
    const updatedCantidades = [...cantidades];
    const selectedIndex = event.target.selectedIndex;
    const nombre = event.target.options[selectedIndex].text;
    const id = event.target.value;

    updatedArticulos[index] = { id, nombre };
    setSelectedArticulos(updatedArticulos);

    if (id) {
      updatedCantidades[index] = 1; // Set the initial value to 1 when an article is selected
    } else {
      updatedCantidades[index] = 0; // Reset the value to 0 if no article is selected
    }
    setCantidades(updatedCantidades);

    handleSelectChangeB(`articulo${index + 1}`, id, nombre);
  };

  const handleCantidadChange = (index, event) => {
    const updatedCantidades = [...cantidades];
    updatedCantidades[index] = event.target.value;
    setCantidades(updatedCantidades);
  };

  const renderSelectArticulo = (index, list) => (
    <div key={index}>
      <label htmlFor={`articulo${index + 1}`}>Artículo {index + 1}:</label>
      <select
        id={`articulo${index + 1}`}
        onChange={(event) => handleSelectArticuloChange(index, event)}
        value={selectedArticulos[index].id || ""}
      >
        <option value="">--Selecciona una opción--</option>
        {list.map((articulo) => (
          <option key={articulo.articulo_id} value={articulo.articulo_id}>
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
        min="1"
        disabled={!selectedArticulos[index].id}
      />
    </div>
  );

  return (
    <div className="container">
      <div className="container2">
        <h1>Baldas e Iluminación</h1>
        <h2>Baldas y Divisores</h2>
        {Array.from({ length: 4 }).map((_, i) => renderSelectArticulo(i, listArticulo))}
      </div>
      <div className="container3">
        {Array.from({ length: 2 }).map((_, i) => renderSelectArticulo(i + 4, listArticulo))}
        <h2>Iluminación</h2>
        {Array.from({ length: 2 }).map((_, i) => renderSelectArticulo(i + 6, listArticuloIluminacion))}
      </div>
      <div className="container4">
        {Array.from({ length: 4 }).map((_, i) => renderSelectArticulo(i + 8, listArticuloIluminacion))}
      </div>
    </div>
  );
}

export default Baldas;

