import React, { useState, useEffect } from "react";
import axios from "axios";
import { useTabs } from "./TabsContext";
import { useData } from "./context/DataContext";

function Baldas() {
  const { handleSelectChangeB } = useTabs();
  const { data, saveData } = useData();
  const [listArticulo, setListArticulo] = useState([]);
  const [listArticuloIluminacion, setListArticuloIluminacion] = useState([]);
  const [listMedidas, setListMedidas] = useState(Array(12).fill([]));
  const [cantidades, setCantidades] = useState(Array(12).fill(0));
  const [selectedArticulos, setSelectedArticulos] = useState(
    Array(12).fill({
      id: "",
      nombre: "",
    })
  );
  const [selectedMedidas, setSelectedMedidas] = useState(
    Array(12).fill({
      id: "",
      nombre: "",
      puntos: 0,
    })
  );
  const [puntosTotales, setPuntosTotales] = useState(Array(12).fill(0));

  useEffect(() => {
    // Restore data from context when component mounts
    const restoredArticulos = Array(12).fill({ id: "", nombre: "" });
    const restoredMedidas = Array(12).fill({ id: "", nombre: "", puntos: 0 });
    const restoredCantidades = Array(12).fill(0);
    const restoredPuntosTotales = Array(12).fill(0);

    for (let i = 0; i < 12; i++) {
      restoredArticulos[i] = {
        id: data.baldas?.[`articulo${i + 1}Id`] || "",
        nombre: data.baldas?.[`articulo${i + 1}Nombre`] || "",
      };
      restoredMedidas[i] = {
        id: data.baldas?.[`medidas${i + 1}Id`] || "",
        nombre: data.baldas?.[`medidas${i + 1}Nombre`] || "",
        puntos: data.baldas?.[`medidas${i + 1}Puntos`] || 0,
      };
      restoredCantidades[i] = data.baldas?.[`cantidad${i + 1}`] || 0;
      restoredPuntosTotales[i] = data.baldas?.[`puntosTotales${i + 1}`] || 0;
    }

    setSelectedArticulos(restoredArticulos);
    setSelectedMedidas(restoredMedidas);
    setCantidades(restoredCantidades);
    setPuntosTotales(restoredPuntosTotales);
  }, []);

  useEffect(() => {
    const fetchArticulos = async () => {
      try {
        const baldasRes = await axios.get("http://localhost:6969/articulo/baldas");
        if (Array.isArray(baldasRes.data)) {
          setListArticulo(baldasRes.data);
        } else {
          console.error("Error fetching articulos: res.data is not an array");
        }

        const iluminacionRes = await axios.get("http://localhost:6969/articulo/iluminacion");
        if (Array.isArray(iluminacionRes.data)) {
          setListArticuloIluminacion(iluminacionRes.data);
        } else {
          console.error("Error fetching articulos: res.data is not an array");
        }
      } catch (error) {
        console.error("Error fetching articulos:", error);
      }
    };

    fetchArticulos();
  }, []);

  useEffect(() => {
    // Fetch medidas for restored articulos
    const fetchMedidas = async () => {
      const updatedListMedidas = [...listMedidas];
      const promises = selectedArticulos.map(async (articulo, index) => {
        if (articulo.id) {
          try {
            const medidasRes = await axios.get("http://localhost:6969/medidas", {
              params: { articuloId: articulo.id, materialId: 5 },
            });
            if (Array.isArray(medidasRes.data)) {
              updatedListMedidas[index] = medidasRes.data;
            } else {
              console.error("Error fetching medidas: res.data is not an array");
            }
          } catch (error) {
            console.error("Error fetching medidas:", error);
          }
        }
      });
      await Promise.all(promises);
      setListMedidas(updatedListMedidas);
    };

    fetchMedidas();
  }, [selectedArticulos]);

  useEffect(() => {
    const formattedData = selectedArticulos.reduce((acc, articulo, index) => {
      acc[`articulo${index + 1}Nombre`] = articulo.nombre;
      acc[`articulo${index + 1}Id`] = articulo.id;
      acc[`medidas${index + 1}Nombre`] = selectedMedidas[index].nombre;
      acc[`medidas${index + 1}Id`] = selectedMedidas[index].id;
      acc[`medidas${index + 1}Puntos`] = selectedMedidas[index].puntos;
      acc[`cantidad${index + 1}`] = cantidades[index];
      acc[`puntosTotales${index + 1}`] = puntosTotales[index];
      return acc;
    }, {});
    saveData("baldas", formattedData);
  }, [selectedArticulos, selectedMedidas, cantidades, puntosTotales, saveData]);

  const handleSelectArticuloChange = async (index, event) => {
    const updatedArticulos = [...selectedArticulos];
    const updatedCantidades = [...cantidades];
    const selectedIndex = event.target.selectedIndex;
    const nombre = event.target.options[selectedIndex].text;
    const id = event.target.value;

    updatedArticulos[index] = { id, nombre };
    setSelectedArticulos(updatedArticulos);

    if (id) {
      updatedCantidades[index] = 1; // Set the initial value to 1 when an article is selected

      try {
        const medidasRes = await axios.get("http://localhost:6969/medidas", {
          params: { articuloId: id, materialId: 5 },
        });
        if (Array.isArray(medidasRes.data)) {
          const updatedListMedidas = [...listMedidas];
          updatedListMedidas[index] = medidasRes.data;
          setListMedidas(updatedListMedidas);

          if (medidasRes.data.length > 0) {
            const firstMedida = medidasRes.data[0];
            const updatedSelectedMedidas = [...selectedMedidas];
            updatedSelectedMedidas[index] = {
              id: firstMedida.medidas_id,
              nombre: firstMedida.medidas,
              puntos: firstMedida.puntos,
            };
            setSelectedMedidas(updatedSelectedMedidas);
            handleSelectChangeB(`medidas${index + 1}`, firstMedida.medidas_id, firstMedida.medidas, firstMedida.puntos);

            // Update puntosTotales
            const updatedPuntosTotales = [...puntosTotales];
            updatedPuntosTotales[index] = firstMedida.puntos * updatedCantidades[index];
            setPuntosTotales(updatedPuntosTotales);
          }
        } else {
          console.error("Error fetching medidas: res.data is not an array");
        }
      } catch (error) {
        console.error("Error fetching medidas:", error);
      }
    } else {
      updatedCantidades[index] = 0; // Reset the value to 0 if no article is selected
      const updatedListMedidas = [...listMedidas];
      updatedListMedidas[index] = [];
      setListMedidas(updatedListMedidas);

      // Update puntosTotales
      const updatedPuntosTotales = [...puntosTotales];
      updatedPuntosTotales[index] = 0;
      setPuntosTotales(updatedPuntosTotales);
    }
    setCantidades(updatedCantidades);

    handleSelectChangeB(`articulo${index + 1}`, id, nombre);
  };

  const handleSelectMedidasChange = (index, event) => {
    const updatedMedidas = [...selectedMedidas];
    const updatedPuntosTotales = [...puntosTotales];
    const selectedIndex = event.target.selectedIndex;
    const nombre = event.target.options[selectedIndex].text;
    const id = event.target.value;
    const medidasList = listMedidas[index] || [];
    const selectedMedida = medidasList.find((medida) => medida.medidas_id === parseInt(id)) || {};
    updatedMedidas[index] = { id, nombre, puntos: selectedMedida.puntos || 0 };
    setSelectedMedidas(updatedMedidas);

    // Update puntosTotales
    updatedPuntosTotales[index] = (selectedMedida.puntos || 0) * cantidades[index];
    setPuntosTotales(updatedPuntosTotales);

    handleSelectChangeB(`medidas${index + 1}`, id, nombre, selectedMedida.puntos || 0);
  };

  const handleCantidadChange = (index, event) => {
    const updatedCantidades = [...cantidades];
    const updatedPuntosTotales = [...puntosTotales];
    const value = parseInt(event.target.value, 10);

    updatedCantidades[index] = value;
    setCantidades(updatedCantidades);

    // Update puntosTotales
    updatedPuntosTotales[index] = selectedMedidas[index].puntos * value;
    setPuntosTotales(updatedPuntosTotales);

    handleSelectChangeB(`cantidad${index + 1}`, value);
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
      <label htmlFor={`puntos${index + 1}`}>Puntos: {puntosTotales[index]}</label>
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




