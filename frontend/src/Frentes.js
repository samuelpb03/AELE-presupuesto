import React, { useRef, useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import axios from "axios";
import { generatePDF } from "./GeneratePDF";
import { useTabs } from "./TabsContext";
import { useData } from './context/DataContext';

function Frentes() {
  const { selectedOptions, handleSelectChange } = useTabs();
  const [listProducto, setListProducto] = useState([]);
  const [listSerie, setListSerie] = useState([]);
  const [listMaterial, setListMaterial] = useState([]);
  const [listArticulo, setListArticulo] = useState([]);
  const [listColor, setListColor] = useState([]);
  const [listMedidas, setListMedidas] = useState([]);
  const [listMaterialFranja, setListMaterialFranja] = useState([]);
  const [listColorFranja, setListColorFranja] = useState([]);
  const { data, saveData } = useData();

  const [selectedProductoId, setSelectedProductoId] = useState(selectedOptions.producto?.optionId || "");
  const [selectedProductoNombre, setSelectedProductoNombre] = useState(selectedOptions.producto?.optionName || "");
  const [selectedSerieId, setSelectedSerieId] = useState(selectedOptions.serie?.optionId || "");
  const [selectedSerieNombre, setSelectedSerieNombre] = useState(selectedOptions.serie?.optionName || "");
  const [selectedArticuloId, setSelectedArticuloId] = useState(selectedOptions.articulo?.optionId || "");
  const [selectedArticuloNombre, setSelectedArticuloNombre] = useState(selectedOptions.articulo?.optionName || "");
  const [selectedMaterialId, setSelectedMaterialId] = useState(selectedOptions.material?.optionId || "");
  const [selectedMaterialNombre, setSelectedMaterialNombre] = useState(selectedOptions.material?.optionName || "");
  const [selectedColorId, setSelectedColorId] = useState(selectedOptions.color?.optionId || "");
  const [selectedColorNombre, setSelectedColorNombre] = useState(selectedOptions.color?.optionName || "");
  const [selectedMedidasId, setSelectedMedidasId] = useState(selectedOptions.medidas?.optionId || "");
  const [selectedMedidasNombre, setSelectedMedidasNombre] = useState(selectedOptions.medidas?.optionName || "");
  const [selectedMaterialFranjaId, setSelectedMaterialFranjaId] = useState(selectedOptions.materialFranja?.optionId || "");
  const [selectedMaterialFranjaNombre, setSelectedMaterialFranjaNombre] = useState(selectedOptions.materialFranja?.optionName || "");
  const [selectedColorFranjaId, setSelectedColorFranjaId] = useState(selectedOptions.colorFranja?.optionId || "");
  const [selectedColorFranjaNombre, setSelectedColorFranjaNombre] = useState(selectedOptions.colorFranja?.optionName || "");

  var [franjaActiva, setFranjaActiva] = useState(false);

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
    selectedMedidasId,
    selectedMedidasNombre,
    selectedMaterialFranjaId,
    selectedMaterialFranjaNombre,
    selectedColorFranjaId,
    selectedColorFranjaNombre
  });

  const location = useLocation();

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
      selectedColorNombre,
      selectedMedidasId,
      selectedMedidasNombre,
      selectedMaterialFranjaId,
      selectedMaterialFranjaNombre,
      selectedColorFranjaId,
      selectedColorFranjaNombre
    }));
  }, [
    selectedProductoId, selectedProductoNombre, selectedSerieId, selectedSerieNombre,
    selectedArticuloId, selectedArticuloNombre, selectedMaterialId, selectedMaterialNombre,
    selectedColorId, selectedColorNombre, selectedMedidasId, selectedMedidasNombre,
    selectedMaterialFranjaId, selectedMaterialFranjaNombre, selectedColorFranjaId, selectedColorFranjaNombre
  ]);

  useEffect(() => {
    saveData('frentes', localData);
  }, [localData]);

  useEffect(() => {
    axios.get("http://localhost:6969/producto").then((res) => {
      setListProducto(res.data);
    });
  }, []);

  useEffect(() => {
    if (selectedProductoId) {
      axios.get("http://localhost:6969/serie", { params: { productoId: selectedProductoId } }).then((res) => {
        setListSerie(res.data);
        document.getElementById("serie").disabled = false;
      });
      document.getElementById("articulo").disabled = true;
      document.getElementById("material").disabled = true;
      document.getElementById("color").disabled = true;
      document.getElementById("medidas").disabled = true;
      document.getElementById("materialFranja").disabled = true;
      document.getElementById("colorFranja").disabled = true;
    }
  }, [selectedProductoId]);

  useEffect(() => {
    if (selectedSerieId) {
      axios.get("http://localhost:6969/articulo", { params: { serieId: selectedSerieId } }).then((res) => {
        setListArticulo(res.data);
        franjaActiva = res.data.length > 0 ? res.data[0].franja === 1 : false;
        setFranjaActiva(franjaActiva);
        document.getElementById("articulo").disabled = false;
        document.getElementById("material").disabled = false;
        document.getElementById("color").disabled = false;
        document.getElementById("medidas").disabled = false;
        document.getElementById("materialFranja").disabled = !franjaActiva;
        document.getElementById("colorFranja").disabled = !franjaActiva;
      });
    }
  }, [selectedSerieId]);

  useEffect(() => {
    if (selectedArticuloId) {
      axios.get("http://localhost:6969/material", { params: { serieId: selectedSerieId } }).then((res) => {
        setListMaterial(res.data);
        document.getElementById("material").disabled = false;
      });
      if (franjaActiva) {
        axios.get("http://localhost:6969/materialFranja").then((res) => {
          setListMaterialFranja(res.data);
          document.getElementById("materialFranja").disabled = false;
        });
      }
    }
  }, [selectedArticuloId, selectedSerieId, franjaActiva]);

  useEffect(() => {
    if (selectedMaterialId) {
      axios.get("http://localhost:6969/color", { params: { materialId: selectedMaterialId } }).then((res) => {
        setListColor(res.data);
        document.getElementById("color").disabled = false;
      });
    }
  }, [selectedMaterialId]);

  useEffect(() => {
    if (selectedArticuloId && selectedMaterialId) {
      axios.get("http://localhost:6969/medidas", { params: { articuloId: selectedArticuloId, materialId: selectedMaterialId } }).then((res) => {
        setListMedidas(res.data);
        document.getElementById("medidas").disabled = false;
      });
    }
  }, [selectedArticuloId, selectedMaterialId]);

  useEffect(() => {
    if (selectedMaterialFranjaId) {
      axios.get("http://localhost:6969/colorFranja", { params: { materialFranjaId: selectedMaterialFranjaId } }).then((res) => {
        setListColorFranja(res.data);
        document.getElementById("colorFranja").disabled = false;
      });
    }
  }, [selectedMaterialFranjaId]);

  const handleSelectProductChange = (event) => {
    const index = event.target.selectedIndex;
    const nombre = event.target.options[index].text;
    setSelectedProductoId(event.target.value);
    setSelectedProductoNombre(nombre);
    handleSelectChange("producto", event.target.value, nombre);
  };

  const handleSelectSerieChange = (event) => {
    const index = event.target.selectedIndex;
    const nombre = event.target.options[index].text;
    setSelectedSerieId(event.target.value);
    setSelectedSerieNombre(nombre);
    handleSelectChange("serie", event.target.value, nombre);
  };

  const handleSelectArticuloChange = (event) => {
    const index = event.target.selectedIndex;
    const nombre = event.target.options[index].text;
    setSelectedArticuloNombre(nombre);
    setSelectedArticuloId(event.target.value);
    handleSelectChange("articulo", event.target.value, nombre);
  };

  const handleSelectMaterialChange = (event) => {
    const index = event.target.selectedIndex;
    const nombre = event.target.options[index].text;
    setSelectedMaterialNombre(nombre);
    setSelectedMaterialId(event.target.value);
    handleSelectChange("material", event.target.value, nombre);
  };

  const handleSelectColorChange = (event) => {
    const index = event.target.selectedIndex;
    const nombre = event.target.options[index].text;
    setSelectedColorNombre(nombre);
    setSelectedColorId(event.target.value);
    handleSelectChange("color", event.target.value, nombre);
  };

  const handleSelectMedidasChange = (event) => {
    const index = event.target.selectedIndex;
    const nombre = event.target.options[index].text;
    setSelectedMedidasNombre(nombre);
    setSelectedMedidasId(event.target.value);
    handleSelectChange("medidas", event.target.value, nombre);
  };

  const handleSelectMaterialFranjaChange = (event) => {
    const index = event.target.selectedIndex;
    const nombre = event.target.options[index].text;
    setSelectedMaterialFranjaNombre(nombre);
    setSelectedMaterialFranjaId(event.target.value);
    handleSelectChange("materialFranja", event.target.value, nombre);
  };

  const handleSelectColorFranjaChange = (event) => {
    const index = event.target.selectedIndex;
    const nombre = event.target.options[index].text;
    setSelectedColorFranjaNombre(nombre);
    setSelectedColorFranjaId(event.target.value);
    handleSelectChange("colorFranja", event.target.value, nombre);
  };

  useEffect(() => {
    console.log("Datos actualizados:", data);
  }, [data]);

  const handleGeneratePDF = () => {
    if (!selectedProductoId || !selectedSerieId) {
      console.error("Datos necesarios para el PDF no están disponibles.");
      return;
    }
    generatePDF(data);
  };

  return (
    <div className="container">
      <div className="container2">
        <h1>Frentes</h1>
        
        {/* Producto */}
        <label htmlFor="producto">Producto:</label>
        <select id="producto" onChange={handleSelectProductChange} value={localData.selectedProductoId}>
          <option disabled={selectedProductoId !== ""}>--Selecciona una opción--</option>
          {listProducto.map((producto) => (
            <option key={producto.producto_id} value={producto.producto_id}>{producto.nombre}</option>
          ))}
        </select>

        {/* Serie */}
        <label htmlFor="serie">Serie:</label>
        <select id="serie" disabled={true} onChange={handleSelectSerieChange} value={selectedSerieId || ""}>
          <option value="" disabled={selectedProductoId !== ""}>--Selecciona una opción--</option>
          {listSerie.map((serie) => (
            <option key={serie.serie_id} value={serie.serie_id}>{serie.nombre}</option>
          ))}
        </select>

        {/* Articulo */}
        <label htmlFor="articulo">Artículo:</label>
        <select id="articulo" disabled={true} onChange={handleSelectArticuloChange} value={selectedArticuloId || ""}>
          <option value="" disabled={selectedProductoId === ""}>--Selecciona una opción--</option>
          {listArticulo.map((articulo) => (
            <option key={articulo.articulo_id} value={articulo.articulo_id}>{articulo.nombre}</option>
          ))}
        </select>

        {/* Material */}
        <label htmlFor="material">Material:</label>
        <select id="material" disabled={true} onChange={handleSelectMaterialChange} value={selectedMaterialId || ""}>
          <option disabled={selectedProductoId === ""}>--Selecciona una opción--</option>
          {listMaterial.map((material) => (
            <option key={material.material_id} value={material.material_id}>{material.nombre}</option>
          ))}
        </select>
      </div>
      <div className="container3">
        {/* Color */}
        <label htmlFor="color">Color:</label>
        <select id="color" disabled={true} onChange={handleSelectColorChange} value={selectedColorId || ""}>
          <option disabled={selectedProductoId === ""}>--Selecciona una opción--</option>
          {listColor.map((color) => (
            <option key={color.color_id} value={color.color_id}>{color.nombre}</option>
          ))}
        </select>

        {/* Medidas */}
        <label htmlFor="medidas">Medidas:</label>
        <select id="medidas" disabled={true} onChange={handleSelectMedidasChange} value={selectedMedidasId || ""}>
          <option disabled={selectedProductoId === ""}>--Selecciona una opción--</option>
          {listMedidas.map((medidas) => (
            <option key={medidas.medidas_id} value={medidas.medidas_id}>{medidas.medidas}</option>
          ))}
        </select>

        {/* Material Franja */}
        <label htmlFor="materialFranja">Material Franja:</label>
        <select id="materialFranja" disabled={!franjaActiva} onChange={handleSelectMaterialFranjaChange} value={selectedMaterialFranjaId || ""}>
          <option disabled={selectedProductoId === ""}>--Selecciona una opción--</option>
          {listMaterialFranja.map((material) => (
            <option key={material.material_id} value={material.material_id}>{material.nombre}</option>
          ))}
        </select>

        {/* Color Franja */}
        <label htmlFor="colorFranja">Color Franja:</label>
        <select id="colorFranja" disabled={!franjaActiva} onChange={handleSelectColorFranjaChange} value={selectedColorFranjaId || ""}>
          <option disabled={selectedProductoId === ""}>--Selecciona una opción--</option>
          {listColorFranja.map((color) => (
            <option key={color.color_id} value={color.color_id}>{color.nombre}</option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default Frentes;



