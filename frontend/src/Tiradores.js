import React, { useState, useEffect } from "react";
import axios from "axios";
import { useTabs } from "./TabsContext";
import { useData } from './context/DataContext';

function Tiradores() {
  const { handleSelectChangeF } = useTabs();
  const { data, saveData } = useData();
  const [listTiradores, setListTiradores] = useState([]);
  const [listCerraduras, setListCerraduras] = useState([]);
  const [listColor, setListColor] = useState([]);

  const [selectedArticulos, setSelectedArticulos] = useState(Array(6).fill({ id: "", nombre: "", puntos: 0 }));
  const [selectedColores, setSelectedColores] = useState(Array(6).fill({ id: "", nombre: "" }));
  const [cantidades, setCantidades] = useState(Array(6).fill(1));
  const [puntos, setPuntos] = useState(Array(6).fill(0));

  useEffect(() => {
    // Restore data from context when component mounts
    if (data.tiradores) {
      const restoredArticulos = Array(6).fill({ id: "", nombre: "", puntos: 0 });
      const restoredColores = Array(6).fill({ id: "", nombre: "" });
      const restoredCantidades = Array(6).fill(1);
      const restoredPuntos = Array(6).fill(0);

      for (let i = 0; i < 6; i++) {
        restoredArticulos[i] = {
          id: data.tiradores[`articulo${i + 1}Id`] || "",
          nombre: data.tiradores[`articulo${i + 1}Nombre`] || "",
          puntos: data.tiradores[`articulo${i + 1}Puntos`] || 0,
        };
        restoredColores[i] = {
          id: data.tiradores[`color${i + 1}Id`] || "",
          nombre: data.tiradores[`color${i + 1}Nombre`] || "",
        };
        restoredCantidades[i] = data.tiradores[`cantidad${i + 1}`] || 1;
        restoredPuntos[i] = data.tiradores[`puntos${i + 1}`] || 0;
      }

      setSelectedArticulos(restoredArticulos);
      setSelectedColores(restoredColores);
      setCantidades(restoredCantidades);
      setPuntos(restoredPuntos);
    }
  }, []);

  useEffect(() => {
    const formattedData = selectedArticulos.reduce((acc, articulo, index) => {
      acc[`articulo${index + 1}Nombre`] = articulo.nombre;
      acc[`articulo${index + 1}Id`] = articulo.id;
      acc[`articulo${index + 1}Puntos`] = articulo.puntos;
      acc[`color${index + 1}Nombre`] = selectedColores[index].nombre;
      acc[`color${index + 1}Id`] = selectedColores[index].id;
      acc[`cantidad${index + 1}`] = cantidades[index];
      acc[`puntos${index + 1}`] = puntos[index];
      return acc;
    }, {});
    saveData("tiradores", formattedData);
  }, [selectedArticulos, selectedColores, cantidades, puntos, saveData]);

  useEffect(() => {
    // Fetching articles for tiradores
    axios.get("http://localhost:6969/articulo/tiradores")
      .then((res) => {
        if (Array.isArray(res.data)) {
          setListTiradores(res.data);
        } else {
          console.error("Error fetching tiradores: res.data is not an array");
        }
      })
      .catch((error) => {
        console.error("Error fetching tiradores:", error);
      });

    // Fetching articles for cerraduras
    axios.get("http://localhost:6969/articulo/cerraduras")
      .then((res) => {
        if (Array.isArray(res.data)) {
          setListCerraduras(res.data);
        } else {
          console.error("Error fetching cerraduras: res.data is not an array");
        }
      })
      .catch((error) => {
        console.error("Error fetching cerraduras:", error);
      });

    axios.get("http://localhost:6969/color", { params: { materialId: 5 } })
      .then((res) => {
        if (Array.isArray(res.data)) {
          setListColor(res.data);
        } else {
          console.error("Error fetching colores: res.data is not an array");
        }
      })
      .catch((error) => {
        console.error("Error fetching colores:", error);
      });
  }, []);

  const handleSelectArticuloChange = (index, event, isCerradura = false) => {
    const updatedArticulos = [...selectedArticulos];
    const selectedIndex = event.target.selectedIndex;
    const nombre = event.target.options[selectedIndex].text;
    const id = event.target.value;

    // Fetch puntos for the selected article
    axios.get("http://localhost:6969/medidasConPuntos", {
      params: {
        articuloId: id,
        materialId: 5 // Assuming materialId 5 is always used
      }
    }).then((res) => {
      const selectedArticulo = res.data.length > 0 ? res.data[0] : { puntos: 0 };
      const puntos = selectedArticulo.puntos;

      updatedArticulos[index] = { id, nombre, puntos };
      setSelectedArticulos(updatedArticulos);

      handleSelectChangeF(`articulo${index + 1}`, id, nombre);

      // Update points
      setPuntos(prevPuntos => {
        const newPuntos = [...prevPuntos];
        newPuntos[index] = puntos * cantidades[index];
        return newPuntos;
      });
    }).catch((error) => {
      console.error("Error fetching puntos:", error);
    });
  };

  const handleSelectColorChange = (index, event) => {
    const updatedColores = [...selectedColores];
    const selectedIndex = event.target.selectedIndex;
    const nombre = event.target.options[selectedIndex].text;
    const id = event.target.value;

    updatedColores[index] = { id, nombre };
    setSelectedColores(updatedColores);

    handleSelectChangeF(`color${index + 1}`, id, nombre);
  };

  const handleCantidadChange = (index, event) => {
    const value = parseInt(event.target.value, 10);
    const updatedCantidades = [...cantidades];
    updatedCantidades[index] = isNaN(value) ? 1 : value;
    setCantidades(updatedCantidades);

    // Update points
    setPuntos(prevPuntos => {
      const newPuntos = [...prevPuntos];
      newPuntos[index] = selectedArticulos[index].puntos * updatedCantidades[index];
      return newPuntos;
    });
  };

  const renderSelectArticulo = (index, isCerradura = false) => (
    <div key={index}>
      <label htmlFor={`articulo${index + 1}`}>Artículo {index + 1}:</label>
      <select
        id={`articulo${index + 1}`}
        onChange={(event) => handleSelectArticuloChange(index, event, isCerradura)}
        value={selectedArticulos[index].id || ""}
      >
        <option value="">--Selecciona una opción--</option>
        {(isCerradura ? listCerraduras : listTiradores).map((articulo) => (
          <option key={articulo.articulo_id} value={articulo.articulo_id}>
            {articulo.nombre}
          </option>
        ))}
      </select>
      <label htmlFor={`color${index + 1}`}>Color:</label>
      <select
        id={`color${index + 1}`}
        onChange={(event) => handleSelectColorChange(index, event)}
        value={selectedColores[index].id || ""}
      >
        <option value="">--Selecciona una opción--</option>
        {listColor.map((color) => (
          <option key={color.color_id} value={color.color_id}>
            {color.nombre}
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
      />
      <label htmlFor={`puntos${index + 1}`}>Puntos: {puntos[index]}</label>
    </div>
  );

  return (
    <div className="container">
      <div className="container2">
        <h1>Tiradores</h1>
        {renderSelectArticulo(0)}
        {renderSelectArticulo(1)}
      </div>
      <div className="container3">
        {renderSelectArticulo(2, true)}
        {renderSelectArticulo(3)}
      </div>
      <div className="container4">
        {renderSelectArticulo(4)}
        {renderSelectArticulo(5)}
      </div>
    </div>
  );
}

export default Tiradores;
