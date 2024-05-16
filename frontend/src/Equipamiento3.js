import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import axios from "axios";
import { useTabs } from "./TabsContext";
import { useData } from './context/DataContext';
import { generatePDF } from "./GeneratePDF";

function Equipamiento3() {
  const { selectedOptionsE3, handleSelectChangeE3 } = useTabs();
  const { data, saveData } = useData();
  const [listProducto, setListProducto] = useState([]);
  const [listSerie, setListSerie] = useState([]);
  const [listArticulo, setListArticulo] = useState([]);
  const [listMaterial, setListMaterial] = useState([]);

  const [selectedProductoId, setSelectedProductoId] = useState(selectedOptionsE3.producto?.optionId || "");
  const [selectedProductoNombre, setSelectedProductoNombre] = useState(selectedOptionsE3.producto?.optionName || "");
  const [selectedSerieId, setSelectedSerieId] = useState(selectedOptionsE3.serie?.optionId || "");
  const [selectedSerieNombre, setSelectedSerieNombre] = useState(selectedOptionsE3.serie?.optionName || "");
  const [selectedArticuloId, setSelectedArticuloId] = useState(selectedOptionsE3.articulo?.optionId || "");
  const [selectedArticuloNombre, setSelectedArticuloNombre] = useState(selectedOptionsE3.articulo?.optionName || "");
  const [selectedMaterialId, setSelectedMaterialId] = useState(selectedOptionsE3.material?.optionId || "");
  const [selectedMaterialNombre, setSelectedMaterialNombre] = useState(selectedOptionsE3.material?.optionName || "");

  const [localData, setLocalData] = useState({
    selectedProductoId,
    selectedProductoNombre,
    selectedSerieId,
    selectedSerieNombre,
    selectedArticuloId,
    selectedArticuloNombre,
    selectedMaterialId,
    selectedMaterialNombre,
  });

  useEffect(() => {
    setLocalData(prevLocalData => ({
      ...prevLocalData,
      selectedProductoId,
      selectedProductoNombre,
      selectedSerieId,
      selectedSerieNombre,
      selectedArticuloId,
      selectedArticuloNombre,
      selectedMaterialId,
      selectedMaterialNombre,
    }));
  }, [
    selectedProductoId, selectedProductoNombre, selectedSerieId, selectedSerieNombre,
    selectedArticuloId, selectedArticuloNombre, selectedMaterialId, selectedMaterialNombre
  ]);

  useEffect(() => {
    axios.get("http://localhost:6969/producto").then((res) => {
      if (Array.isArray(res.data)) {
        const filteredProducts = res.data.filter((producto) => [7].includes(producto.producto_id));
        setListProducto(filteredProducts);
      } else {
        console.error("Error fetching productos: res.data is not an array");
      }
    }).catch(error => {
      console.error("Error fetching productos:", error);
    });
  }, []);

  useEffect(() => {
    if (selectedProductoId) {
      axios.get("http://localhost:6969/serie", { params: { productoId: selectedProductoId } }).then((res) => {
        if (Array.isArray(res.data)) {
          setListSerie(res.data);
          document.getElementById("serie").disabled = false;
        } else {
          console.error("Error fetching series: res.data is not an array");
        }
      }).catch(error => {
        console.error("Error fetching series:", error);
      });
      document.getElementById("articulo").disabled = true;
      document.getElementById("material").disabled = true;
    }
  }, [selectedProductoId]);

  useEffect(() => {
    if (selectedSerieId) {
      axios.get("http://localhost:6969/articulo", { params: { serieId: selectedSerieId } }).then((res) => {
        if (Array.isArray(res.data)) {
          setListArticulo(res.data);
          document.getElementById("articulo").disabled = false;
        } else {
          console.error("Error fetching articulos: res.data is not an array");
        }
      }).catch(error => {
        console.error("Error fetching articulos:", error);
      });
    }
  }, [selectedSerieId]);

  useEffect(() => {
    if (selectedArticuloId) {
      axios.get("http://localhost:6969/material", { params: { serieId: selectedSerieId } }).then((res) => {
        if (Array.isArray(res.data)) {
          setListMaterial(res.data);
          document.getElementById("material").disabled = false;
        } else {
          console.error("Error fetching materiales: res.data is not an array");
        }
      }).catch(error => {
        console.error("Error fetching materiales:", error);
      });
    }
  }, [selectedArticuloId, selectedSerieId]);

  const handleSelectProductChange = (event) => {
    const index = event.target.selectedIndex;
    const nombre = event.target.options[index].text;
    const id = event.target.value;
    setSelectedProductoId(id);
    setSelectedProductoNombre(nombre);
    handleSelectChangeE3("producto", id, nombre);
  };

  const handleSelectSerieChange = (event) => {
    const index = event.target.selectedIndex;
    const nombre = event.target.options[index].text;
    const id = event.target.value;
    setSelectedSerieId(id);
    setSelectedSerieNombre(nombre);
    handleSelectChangeE3("serie", id, nombre);
  };

  const handleSelectArticuloChange = (event) => {
    const index = event.target.selectedIndex;
    const nombre = event.target.options[index].text;
    const id = event.target.value;
    setSelectedArticuloId(id);
    setSelectedArticuloNombre(nombre);
    handleSelectChangeE3("articulo", id, nombre);
  };

  const handleSelectMaterialChange = (event) => {
    const index = event.target.selectedIndex;
    const nombre = event.target.options[index].text;
    const id = event.target.value;
    setSelectedMaterialId(id);
    setSelectedMaterialNombre(nombre);
    handleSelectChangeE3("material", id, nombre);
  };

  const handleSaveToLocalContext = () => {
    saveData('equipamiento3', localData);
    console.log(localData);
  };

  useEffect(() => {
    saveData('equipamiento3', localData);
  }, [localData, saveData]);

  const handleGeneratePDF = () => {
    generatePDF(data);
  };

  return (
    <div className="container">
      <div className="container2">
        <h1>Equipamiento 3</h1>
        <label htmlFor="producto">Producto:</label>
        <select id="producto" onChange={handleSelectProductChange} value={selectedProductoId || ""}>
          <option disabled={selectedProductoId !== ""}>--Selecciona una opción--</option>
          {listProducto.map((producto) => (
            <option key={producto.producto_id} value={producto.producto_id}>
              {producto.nombre}
            </option>
          ))}
        </select>

        <label htmlFor="serie">Serie:</label>
        <select id="serie" disabled={true} onChange={handleSelectSerieChange} value={selectedSerieId || ""}>
          <option value="" disabled={selectedProductoId === ""}>--Selecciona una opción--</option>
          {listSerie.map((serie) => (
            <option key={serie.serie_id} value={serie.serie_id}>
              {serie.nombre}
            </option>
          ))}
        </select>

        <label htmlFor="articulo">Artículo:</label>
        <select id="articulo" disabled={true} onChange={handleSelectArticuloChange} value={selectedArticuloId || ""}>
          <option value="" disabled={selectedProductoId === ""}>--Selecciona una opción--</option>
          {listArticulo.map((articulo) => (
            <option key={articulo.articulo_id} value={articulo.articulo_id}>
              {articulo.nombre}
            </option>
          ))}
        </select>
      </div>
      <div className="container3">
        <label htmlFor="material">Material:</label>
        <select id="material" disabled={true} onChange={handleSelectMaterialChange} value={selectedMaterialId || ""}>
          <option value="" disabled={selectedArticuloId === ""}>--Selecciona una opción--</option>
          {listMaterial.map((material) => (
            <option key={material.material_id} value={material.material_id}>
              {material.nombre}
            </option>
          ))}
        </select>
        <button id="generatePDF" onClick={handleGeneratePDF}> Generar PDF</button>
      </div>
    </div>
  );
}

export default Equipamiento3;
