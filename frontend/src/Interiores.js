import React, { useState, useEffect } from "react";
import axios from "axios";
import { useTabs } from "./TabsContext";
import { useData } from './context/DataContext';

function Interiores() {
  const { handleSelectChangeG } = useTabs();
  const { data, saveData } = useData();
  const [listArticulo, setListArticulo] = useState([]);
  const [listMedidas, setListMedidas] = useState([]);

  const [selectedArticulos, setSelectedArticulos] = useState(Array(3).fill({ id: "", nombre: "" }));
  const [selectedMedidas, setSelectedMedidas] = useState(Array(3).fill({ id: "", nombre: "", puntos: 0 }));
  const [cantidades, setCantidades] = useState(Array(3).fill(1));
  const [puntos, setPuntos] = useState(Array(3).fill(0));

  useEffect(() => {
    // Restore data from context when component mounts
    if (data.interiores) {
      const restoredArticulos = Array(3).fill({ id: "", nombre: "" });
      const restoredMedidas = Array(3).fill({ id: "", nombre: "", puntos: 0 });
      const restoredCantidades = Array(3).fill(1);
      const restoredPuntos = Array(3).fill(0);

      for (let i = 0; i < 3; i++) {
        restoredArticulos[i] = {
          id: data.interiores[`articulo${i + 1}Id`] || "",
          nombre: data.interiores[`articulo${i + 1}Nombre`] || "",
        };
        restoredMedidas[i] = {
          id: data.interiores[`medidas${i + 1}Id`] || "",
          nombre: data.interiores[`medidas${i + 1}Nombre`] || "",
          puntos: data.interiores[`medidas${i + 1}Puntos`] || 0,
        };
        restoredCantidades[i] = data.interiores[`cantidad${i + 1}`] || 1;
        restoredPuntos[i] = data.interiores[`puntos${i + 1}`] || 0;
      }

      setSelectedArticulos(restoredArticulos);
      setSelectedMedidas(restoredMedidas);
      setCantidades(restoredCantidades);
      setPuntos(restoredPuntos);
    }
  }, []);

  useEffect(() => {
    const formattedData = selectedArticulos.reduce((acc, articulo, index) => {
      acc[`articulo${index + 1}Nombre`] = articulo.nombre;
      acc[`articulo${index + 1}Id`] = articulo.id;
      acc[`medidas${index + 1}Nombre`] = selectedMedidas[index].nombre;
      acc[`medidas${index + 1}Id`] = selectedMedidas[index].id;
      acc[`medidas${index + 1}Puntos`] = selectedMedidas[index].puntos;
      acc[`cantidad${index + 1}`] = cantidades[index];
      acc[`puntos${index + 1}`] = puntos[index];
      return acc;
    }, {});
    saveData("interiores", formattedData);
  }, [selectedArticulos, selectedMedidas, cantidades, puntos, saveData]);

  useEffect(() => {
    axios
      .get("http://localhost:6969/articulo/interiores")
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

  const handleSelectArticuloChange = (index, event) => {
    const updatedArticulos = [...selectedArticulos];
    const selectedIndex = event.target.selectedIndex;
    const nombre = event.target.options[selectedIndex].text;
    const id = event.target.value;

    updatedArticulos[index] = { id, nombre };
    setSelectedArticulos(updatedArticulos);

    if (id) {
      axios
        .get("http://localhost:6969/medidas", { params: { articuloId: id, materialId: 3 } })
        .then((res) => {
          if (Array.isArray(res.data)) {
            const updatedMedidasList = [...listMedidas];
            updatedMedidasList[index] = res.data;
            setListMedidas(updatedMedidasList);
          } else {
            console.error("Error fetching medidas: res.data is not an array");
          }
        })
        .catch((error) => {
          console.error("Error fetching medidas:", error);
        });
    }

    handleSelectChangeG(`articulo${index + 1}`, id, nombre);
  };

  const handleSelectMedidasChange = (index, event) => {
    const updatedMedidas = [...selectedMedidas];
    const selectedIndex = event.target.selectedIndex;
    const nombre = event.target.options[selectedIndex].text;
    const id = event.target.value;
    const medidasList = listMedidas[index] || [];
    const selectedMedida = medidasList.find((medida) => medida.medidas_id === parseInt(id)) || {};
    updatedMedidas[index] = { id, nombre, puntos: selectedMedida.puntos || 0 };
    setSelectedMedidas(updatedMedidas);
    setPuntos((prevPuntos) => {
      const newPuntos = [...prevPuntos];
      newPuntos[index] = selectedMedida.puntos || 0;
      return newPuntos;
    });
  };

  const handleCantidadChange = (index, event) => {
    const updatedCantidades = [...cantidades];
    const value = parseInt(event.target.value, 10);
    updatedCantidades[index] = isNaN(value) ? 1 : value;
    setCantidades(updatedCantidades);
    setPuntos((prevPuntos) => {
      const newPuntos = [...prevPuntos];
      newPuntos[index] = selectedMedidas[index].puntos * updatedCantidades[index];
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
        <option value="">--Selecciona una opción--</option>
        {listArticulo.map((articulo) => (
          <option key={articulo.articulo_id} value={articulo.articulo_id}>
            {articulo.nombre}
          </option>
        ))}
      </select>
      <label htmlFor={`medidas${index + 1}`}>Medidas:</label>
      <select
        id={`medidas${index + 1}`}
        onChange={(event) => handleSelectMedidasChange(index, event)}
        value={selectedMedidas[index].id || ""}
        disabled={!selectedArticulos[index].id}
      >
        <option value="">--Selecciona una opción--</option>
        {(listMedidas[index] || []).map((medida) => (
          <option key={medida.medidas_id} value={medida.medidas_id}>
            {medida.medidas}
          </option>
        ))}
      </select>
      <label htmlFor={`puntos${index + 1}`}>Puntos: {puntos[index]}</label>
    </div>
  );

  return (
    <div className="container">
      <div className="container2">
        <h1>Interiores</h1>
        {renderSelectArticulo(0)}
        {renderSelectArticulo(1)}
      </div>
      <div className="container3">
        {renderSelectArticulo(2)}
      </div>
    </div>
  );
}

export default Interiores;


