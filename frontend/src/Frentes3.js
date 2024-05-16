import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import axios from "axios";
import { useTabs } from "./TabsContext";
import { useData } from './context/DataContext';
import { generatePDF } from "./GeneratePDF";

function Frentes3() {
  const { selectedOptionsI, handleSelectChangeI } = useTabs();
  const { data, saveData } = useData();
  const [listProducto, setListProducto] = useState([]);
  const [listSerie, setListSerie] = useState([]);
  const [listArticulo, setListArticulo] = useState([]);
  const [listMaterial, setListMaterial] = useState([]);
  const [listColor, setListColor] = useState([]);
  const [listMedidas, setListMedidas] = useState([]);
  const [listMaterialFranja, setListMaterialFranja] = useState([]);
  const [listColorFranja, setListColorFranja] = useState([]);

  const [selectedProductoId, setSelectedProductoId] = useState(selectedOptionsI.producto?.optionId || "");
  const [selectedProductoNombre, setSelectedProductoNombre] = useState(selectedOptionsI.producto?.optionName || "");
  const [selectedSerieId, setSelectedSerieId] = useState(selectedOptionsI.serie?.optionId || "");
  const [selectedSerieNombre, setSelectedSerieNombre] = useState(selectedOptionsI.serie?.optionName || "");
  const [selectedArticuloId, setSelectedArticuloId] = useState(selectedOptionsI.articulo?.optionId || "");
  const [selectedArticuloNombre, setSelectedArticuloNombre] = useState(selectedOptionsI.articulo?.optionName || "");
  const [selectedMaterialId, setSelectedMaterialId] = useState(selectedOptionsI.material?.optionId || "");
  const [selectedMaterialNombre, setSelectedMaterialNombre] = useState(selectedOptionsI.material?.optionName || "");
  const [selectedColorId, setSelectedColorId] = useState(selectedOptionsI.color?.optionId || "");
  const [selectedColorNombre, setSelectedColorNombre] = useState(selectedOptionsI.color?.optionName || "");
  const [selectedMedidasId, setSelectedMedidasId] = useState(selectedOptionsI.medidas?.optionId || "");
  const [selectedMedidasNombre, setSelectedMedidasNombre] = useState(selectedOptionsI.medidas?.optionName || "");
  const [selectedMaterialFranjaId, setSelectedMaterialFranjaId] = useState(selectedOptionsI.materialFranja?.optionId || "");
  const [selectedMaterialFranjaNombre, setSelectedMaterialFranjaNombre] = useState(selectedOptionsI.materialFranja?.optionName || "");
  const [selectedColorFranjaId, setSelectedColorFranjaId] = useState(selectedOptionsI.colorFranja?.optionId || "");
  const [selectedColorFranjaNombre, setSelectedColorFranjaNombre] = useState(selectedOptionsI.colorFranja?.optionName || "");

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
    selectedColorFranjaNombre,
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
      selectedColorNombre,
      selectedMedidasId,
      selectedMedidasNombre,
      selectedMaterialFranjaId,
      selectedMaterialFranjaNombre,
      selectedColorFranjaId,
      selectedColorFranjaNombre,
    }));
  }, [
    selectedProductoId, selectedProductoNombre, selectedSerieId, selectedSerieNombre,
    selectedArticuloId, selectedArticuloNombre, selectedMaterialId, selectedMaterialNombre,
    selectedColorId, selectedColorNombre, selectedMedidasId, selectedMedidasNombre,
    selectedMaterialFranjaId, selectedMaterialFranjaNombre, selectedColorFranjaId, selectedColorFranjaNombre
  ]);

  useEffect(() => {
    axios.get("http://localhost:6969/producto").then((res) => {
      if (Array.isArray(res.data)) {
        const filteredProducts = res.data.filter((producto) => [1, 4, 5].includes(producto.producto_id));
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
      document.getElementById("medidas").disabled = true;
      document.getElementById("materialFranja").disabled = true;
      document.getElementById("colorFranja").disabled = true;
    }
  }, [selectedProductoId]);

  useEffect(() => {
    if (selectedSerieId) {
      axios.get("http://localhost:6969/articulo", { params: { serieId: selectedSerieId } }).then((res) => {
        if (Array.isArray(res.data)) {
          setListArticulo(res.data);
          const franjaActiva = res.data.some((articulo) => articulo.franja === 1);
          document.getElementById("articulo").disabled = false;
          document.getElementById("material").disabled = false;
          document.getElementById("color").disabled = false;
          document.getElementById("medidas").disabled = true;
          document.getElementById("materialFranja").disabled = !franjaActiva;
          document.getElementById("colorFranja").disabled = !franjaActiva;
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

  useEffect(() => {
    if (selectedArticuloId && selectedMaterialId) {
      axios.get("http://localhost:6969/medidas", {
        params: {
          articuloId: selectedArticuloId,
          materialId: selectedMaterialId,
        },
      }).then((res) => {
        if (Array.isArray(res.data)) {
          setListMedidas(res.data);
          document.getElementById("medidas").disabled = false;
        } else {
          console.error("Error fetching medidas: res.data is not an array");
        }
      }).catch(error => {
        console.error("Error fetching medidas:", error);
      });
    }
  }, [selectedArticuloId, selectedMaterialId]);

  useEffect(() => {
    if (selectedMaterialId) {
      axios.get("http://localhost:6969/materialFranja", { params: { materialId: selectedMaterialId } }).then((res) => {
        if (Array.isArray(res.data)) {
          setListMaterialFranja(res.data);
          document.getElementById("materialFranja").disabled = false;
        } else {
          console.error("Error fetching materialFranja: res.data is not an array");
        }
      }).catch(error => {
        console.error("Error fetching materialFranja:", error);
      });
    }
  }, [selectedMaterialId]);

  useEffect(() => {
    if (selectedMaterialFranjaId) {
      axios.get("http://localhost:6969/colorFranja", { params: { materialFranjaId: selectedMaterialFranjaId } }).then((res) => {
        if (Array.isArray(res.data)) {
          setListColorFranja(res.data);
          document.getElementById("colorFranja").disabled = false;
        } else {
          console.error("Error fetching colorFranja: res.data is not an array");
        }
      }).catch(error => {
        console.error("Error fetching colorFranja:", error);
      });
    }
  }, [selectedMaterialFranjaId]);

  const handleSelectProductChange = (event) => {
    const index = event.target.selectedIndex;
    const nombre = event.target.options[index].text;
    const id = event.target.value;
    setSelectedProductoId(id);
    setSelectedProductoNombre(nombre);
    handleSelectChangeI("producto", id, nombre);
  };

  const handleSelectSerieChange = (event) => {
    const index = event.target.selectedIndex;
    const nombre = event.target.options[index].text;
    const id = event.target.value;
    setSelectedSerieId(id);
    setSelectedSerieNombre(nombre);
    handleSelectChangeI("serie", id, nombre);
  };

  const handleSelectArticuloChange = (event) => {
    const index = event.target.selectedIndex;
    const nombre = event.target.options[index].text;
    const id = event.target.value;
    setSelectedArticuloId(id);
    setSelectedArticuloNombre(nombre);
    handleSelectChangeI("articulo", id, nombre);
  };

  const handleSelectMaterialChange = (event) => {
    const index = event.target.selectedIndex;
    const nombre = event.target.options[index].text;
    const id = event.target.value;
    setSelectedMaterialId(id);
    setSelectedMaterialNombre(nombre);
    handleSelectChangeI("material", id, nombre);
  };

  const handleSelectColorChange = (event) => {
    const index = event.target.selectedIndex;
    const nombre = event.target.options[index].text;
    const id = event.target.value;
    setSelectedColorId(id);
    setSelectedColorNombre(nombre);
    handleSelectChangeI("color", id, nombre);
  };

  const handleSelectMedidasChange = (event) => {
    const index = event.target.selectedIndex;
    const nombre = event.target.options[index].text;
    const id = event.target.value;
    setSelectedMedidasId(id);
    setSelectedMedidasNombre(nombre);
    handleSelectChangeI("medidas", id, nombre);
  };

  const handleSelectMaterialFranjaChange = (event) => {
    const index = event.target.selectedIndex;
    const nombre = event.target.options[index].text;
    const id = event.target.value;
    setSelectedMaterialFranjaId(id);
    setSelectedMaterialFranjaNombre(nombre);
    handleSelectChangeI("materialFranja", id, nombre);
  };

  const handleSelectColorFranjaChange = (event) => {
    const index = event.target.selectedIndex;
    const nombre = event.target.options[index].text;
    const id = event.target.value;
    setSelectedColorFranjaId(id);
    setSelectedColorFranjaNombre(nombre);
    handleSelectChangeI("colorFranja", id, nombre);
  };

  const handleSaveToLocalContext = () => {
    saveData('frentes3', localData);
    console.log(localData);
  };

  useEffect(() => {
    saveData('frentes3', localData);
  }, [localData, saveData]);

  return (
    <div className="container">
      <div className="container2">
        <h1>Frentes 3</h1>
        {/* Producto */}
        <label htmlFor="producto">Producto:</label>
        <select id="producto" onChange={handleSelectProductChange} value={selectedProductoId || ""}>
          <option disabled={selectedProductoId !== ""}>--Selecciona una opción--</option>
          {listProducto.map((producto) => (
            <option key={producto.producto_id} value={producto.producto_id}>
              {producto.nombre}
            </option>
          ))}
        </select>

        {/* Serie */}
        <label htmlFor="serie">Serie:</label>
        <select id="serie" disabled={true} onChange={handleSelectSerieChange} value={selectedSerieId || ""}>
          <option value="" disabled={selectedProductoId === ""}>--Selecciona una opción--</option>
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
      </div>
      <div className="container3">
        {/* Color */}
        <label htmlFor="color">Color:</label>
        <select id="color" disabled={true} onChange={handleSelectColorChange} value={selectedColorId || ""}>
          <option value="" disabled={selectedProductoId === ""}>--Selecciona una opción--</option>
          {listColor.map((color) => (
            <option key={color.color_id} value={color.color_id}>
              {color.nombre}
            </option>
          ))}
        </select>

        {/* Medidas */}
        <label htmlFor="medidas">Medidas:</label>
        <select id="medidas" disabled={true} onChange={handleSelectMedidasChange} value={selectedMedidasId || ""}>
          <option value="" disabled={selectedArticuloId === ""}>--Selecciona una opción--</option>
          {listMedidas.map((medidas) => (
            <option key={medidas.medidas_id} value={medidas.medidas_id}>
              {medidas.medidas}
            </option>
          ))}
        </select>

        {/* Material Franja */}
        <label htmlFor="materialFranja">Material Franja:</label>
        <select id="materialFranja" disabled={true} onChange={handleSelectMaterialFranjaChange} value={selectedMaterialFranjaId || ""}>
          <option value="" disabled={selectedArticuloId === ""}>--Selecciona una opción--</option>
          {listMaterialFranja.map((material) => (
            <option key={material.material_id} value={material.material_id}>
              {material.nombre}
            </option>
          ))}
        </select>

        {/* Color Franja */}
        <label htmlFor="colorFranja">Color Franja:</label>
        <select id="colorFranja" disabled={true} onChange={handleSelectColorFranjaChange} value={selectedColorFranjaId || ""}>
          <option value="" disabled={selectedArticuloId === ""}>--Selecciona una opción--</option>
          {listColorFranja.map((color) => (
            <option key={color.color_id} value={color.color_id}>
              {color.nombre}
            </option>
          ))}
        </select>
        <button onClick={handleSaveToLocalContext}>Guardar y Continuar</button>
      </div>
    </div>
  );
}

export default Frentes3;
