import React, { useRef, useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import axios from "axios";
import { useTabs } from "./TabsContext";
import { useData } from './context/DataContext';

function Tiradores() {
  const { selectedOptionsF, handleSelectChangeF } = useTabs();
  const [listProducto, setListProducto] = useState([]);
  const [listSerie, setListSerie] = useState([]);
  const [listMaterial, setListMaterial] = useState([]);
  const [listArticulo, setListArticulo] = useState([]);
  const [listColor, setListColor] = useState([]);
  const { data, saveData } = useData();

  const [selectedProductoId, setSelectedProductoId] = useState(selectedOptionsF.producto?.optionId || "");
  const [selectedProductoNombre, setSelectedProductoNombre] = useState(selectedOptionsF.producto?.optionName || "");
  const [selectedSerieId, setSelectedSerieId] = useState(selectedOptionsF.serie?.optionId || "");
  const [selectedSerieNombre, setSelectedSerieNombre] = useState(selectedOptionsF.serie?.optionName || "");
  const [selectedArticuloId, setSelectedArticuloId] = useState(selectedOptionsF.articulo?.optionId || "");
  const [selectedArticuloNombre, setSelectedArticuloNombre] = useState(selectedOptionsF.articulo?.optionName || "");
  const [selectedMaterialId, setSelectedMaterialId] = useState(selectedOptionsF.material?.optionId || "");
  const [selectedMaterialNombre, setSelectedMaterialNombre] = useState(selectedOptionsF.material?.optionName || "");
  const [selectedColorId, setSelectedColorId] = useState(selectedOptionsF.color?.optionId || "");
  const [selectedColorNombre, setSelectedColorNombre] = useState(selectedOptionsF.color?.optionName || "");

  const location = useLocation();

  const [localData, setLocalData] = useState({
    selectedProductoId,
    selectedProductoNombre,
    selectedSerieId,
    selectedSerieNombre,
    selectedArticuloId,
    selectedArticuloNombre,
    selectedMaterialId,
    selectedMaterialNombre,
    selectedColorId,
    selectedColorNombre,
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
      selectedColorId,
      selectedColorNombre
    }));
  }, [
    selectedProductoId, selectedProductoNombre, selectedSerieId, selectedSerieNombre,
    selectedArticuloId, selectedArticuloNombre, selectedMaterialId, selectedMaterialNombre,
    selectedColorId, selectedColorNombre
  ]);

  useEffect(() => {
    saveData('tiradores', localData);
  }, [localData, saveData]);

  useEffect(() => {
    axios.get("http://localhost:6969/producto").then((res) => {
      if (Array.isArray(res.data)) {
        const filteredProducts = res.data.filter((producto) => [2].includes(producto.producto_id));
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
      document.getElementById("color").disabled = true;
    }
  }, [selectedProductoId]);

  useEffect(() => {
    if (selectedSerieId) {
      axios.get("http://localhost:6969/articulo", { params: { serieId: selectedSerieId } }).then((res) => {
        if (Array.isArray(res.data)) {
          setListArticulo(res.data);
          document.getElementById("articulo").disabled = false;
          document.getElementById("material").disabled = false;
          document.getElementById("color").disabled = false;
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

  useEffect(() => {
    if (selectedMaterialId) {
      axios.get("http://localhost:6969/color", { params: { materialId: selectedMaterialId } }).then((res) => {
        if (Array.isArray(res.data)) {
          setListColor(res.data);
          document.getElementById("color").disabled = false;
        } else {
          console.error("Error fetching colores: res.data is not an array");
        }
      }).catch(error => {
        console.error("Error fetching colores:", error);
      });
    }
  }, [selectedMaterialId]);

  const handleSelectProductChange = (event) => {
    const index = event.target.selectedIndex;
    const nombre = event.target.options[index].text;
    const value = event.target.value;
    setSelectedProductoId(value);
    setSelectedProductoNombre(nombre);
    handleSelectChangeF("producto", value, nombre);
  };

  const handleSelectSerieChange = (event) => {
    const index = event.target.selectedIndex;
    const nombre = event.target.options[index].text;
    const value = event.target.value;
    setSelectedSerieId(value);
    setSelectedSerieNombre(nombre);
    handleSelectChangeF("serie", value, nombre);
  };

  const handleSelectArticuloChange = (event) => {
    const index = event.target.selectedIndex;
    const nombre = event.target.options[index].text;
    const value = event.target.value;
    setSelectedArticuloNombre(nombre);
    setSelectedArticuloId(value);
    handleSelectChangeF("articulo", value, nombre);
  };

  const handleSelectMaterialChange = (event) => {
    const index = event.target.selectedIndex;
    const nombre = event.target.options[index].text;
    const value = event.target.value;
    setSelectedMaterialNombre(nombre);
    setSelectedMaterialId(value);
    handleSelectChangeF("material", value, nombre);
  };

  const handleSelectColorChange = (event) => {
    const index = event.target.selectedIndex;
    const nombre = event.target.options[index].text;
    const value = event.target.value;
    setSelectedColorNombre(nombre);
    setSelectedColorId(value);
    handleSelectChangeF("color", value, nombre);
  };

  return (
    <div className="container">
      <div className="container2">
        <h1>Tiradores</h1>
        {/* Producto */}
        <label htmlFor="producto">Producto:</label>
        <select id="producto" onChange={handleSelectProductChange} value={selectedProductoId} name="selectedProductoId">
          <option disabled={selectedProductoId !== ""}>--Selecciona una opción--</option>
          {listProducto.map((producto) => (
            <option key={producto.producto_id} value={producto.producto_id}>
              {producto.nombre}
            </option>
          ))}
        </select>

        {/* Serie */}
        <label htmlFor="serie">Serie:</label>
        <select id="serie" disabled={true} onChange={handleSelectSerieChange} value={selectedSerieId || ""} name="selectedSerieId">
          <option value="" disabled={selectedProductoId !== ""}>--Selecciona una opción--</option>
          {listSerie.map((serie) => (
            <option key={serie.serie_id} value={serie.serie_id}>
              {serie.nombre}
            </option>
          ))}
        </select>

        {/* Articulo */}
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
        {/* Material */}
        <label htmlFor="material">Material:</label>
        <select id="material" disabled={true} onChange={handleSelectMaterialChange} value={selectedMaterialId || ""}>
          <option value="" disabled={selectedArticuloId === ""}>--Selecciona una opción--</option>
          {listMaterial.map((material) => (
            <option key={material.material_id} value={material.material_id}>
              {material.nombre}
            </option>
          ))}
        </select>

        {/* Color */}
        <label htmlFor="color">Color:</label>
        <select id="color" disabled={true} onChange={handleSelectColorChange} value={selectedColorId || ""}>
          <option value="" disabled={selectedMaterialId === ""}>--Selecciona una opción--</option>
          {listColor.map((color) => (
            <option key={color.color_id} value={color.color_id}>
              {color.nombre}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default Tiradores;
