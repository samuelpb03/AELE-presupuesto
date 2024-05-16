import React, { useState, useEffect } from "react";
import axios from "axios";
import { useTabs } from "./TabsContext";
import { useLocation } from 'react-router-dom';
import { useData } from './context/DataContext';
import { generatePDF } from "./GeneratePDF";

function Frentes() {
  const { selectedOptionsH, handleSelectChangeH, handleGlobalSelectChange } = useTabs();
  const [listProducto, setListProducto] = useState([]);
  const [listSerie, setListSerie] = useState([]);
  const [listMaterial, setListMaterial] = useState([]);
  const [listArticulo, setListArticulo] = useState([]);
  const [listColor, setListColor] = useState([]);
  const [listMedidas, setListMedidas] = useState([]);
  const [listMaterialFranja, setListMaterialFranja] = useState([]);
  const [listColorFranja, setListColorFranja] = useState([]);
  const { data, saveData } = useData();

  const [selectedProductoId, setSelectedProductoId] = useState(selectedOptionsH.producto?.optionId || "");
  const [selectedProductoNombre, setSelectedProductoNombre] = useState(selectedOptionsH.producto?.optionName || "");
  const [selectedSerieId, setSelectedSerieId] = useState(selectedOptionsH.serie?.optionId || "");
  const [selectedSerieNombre, setSelectedSerieNombre] = useState(selectedOptionsH.serie?.optionName || "");
  const [selectedArticuloId, setSelectedArticuloId] = useState(selectedOptionsH.articulo?.optionId || "");
  const [selectedArticuloNombre, setSelectedArticuloNombre] = useState(selectedOptionsH.articulo?.optionName || "");
  const [selectedMaterialId, setSelectedMaterialId] = useState(selectedOptionsH.material?.optionId || "");
  const [selectedMaterialNombre, setSelectedMaterialNombre] = useState(selectedOptionsH.material?.optionName || "");
  const [selectedColorId, setSelectedColorId] = useState(selectedOptionsH.color?.optionId || "");
  const [selectedColorNombre, setSelectedColorNombre] = useState(selectedOptionsH.color?.optionName || "");
  const [selectedMedidasId, setSelectedMedidasId] = useState(selectedOptionsH.medidas?.optionId || "");
  const [selectedMedidasNombre, setSelectedMedidasNombre] = useState("");
  const [selectedMaterialFranjaId, setSelectedMaterialFranjaId] = useState(selectedOptionsH.materialFranja?.optionId || "");
  const [selectedMaterialFranjaNombre, setSelectedMaterialFranjaNombre] = useState("");
  const [selectedColorFranjaId, setSelectedColorFranjaId] = useState(selectedOptionsH.colorFranja?.optionId || "");
  const [selectedColorFranjaNombre, setSelectedColorFranjaNombre] = useState("");

  const [franjaActiva, setFranjaActiva] = useState(false);

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
    saveData('frentes2', localData);
  }, [localData, saveData]);

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
          const franjaActiva = res.data.length > 0 ? res.data[0].franja === 1 : false;
          setFranjaActiva(franjaActiva);
          document.getElementById("articulo").disabled = false;
          document.getElementById("material").disabled = false;
          document.getElementById("color").disabled = false;
          document.getElementById("medidas").disabled = false;
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
      if (franjaActiva) {
        axios.get("http://localhost:6969/materialFranja").then((res) => {
          if (Array.isArray(res.data)) {
            setListMaterialFranja(res.data);
            document.getElementById("materialFranja").disabled = false;
          } else {
            console.error("Error fetching materialesFranja: res.data is not an array");
          }
        }).catch(error => {
          console.error("Error fetching materialesFranja:", error);
        });
      }
    }
    document.getElementById("color").disabled = false;
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
    const id = event.target.value;
    setSelectedProductoId(id);
    setSelectedProductoNombre(nombre);
    handleSelectChangeH("producto", id, nombre);
  };

  const handleSelectSerieChange = (event) => {
    const index = event.target.selectedIndex;
    const nombre = event.target.options[index].text;
    const id = event.target.value;
    setSelectedSerieId(id);
    setSelectedSerieNombre(nombre);
    handleSelectChangeH("serie", id, nombre);
  };

  const handleSelectArticuloChange = (event) => {
    const index = event.target.selectedIndex;
    const nombre = event.target.options[index].text;
    const id = event.target.value;
    setSelectedArticuloId(id);
    setSelectedArticuloNombre(nombre);
    handleSelectChangeH("articulo", id, nombre);
  };

  const handleSelectMaterialChange = (event) => {
    const index = event.target.selectedIndex;
    const nombre = event.target.options[index].text;
    const id = event.target.value;
    setSelectedMaterialId(id);
    setSelectedMaterialNombre(nombre);
    handleSelectChangeH("material", id, nombre);
  };

  const handleSelectColorChange = (event) => {
    const index = event.target.selectedIndex;
    const nombre = event.target.options[index].text;
    const id = event.target.value;
    setSelectedColorId(id);
    setSelectedColorNombre(nombre);
    handleSelectChangeH("color", id, nombre);
  };

  const handleSelectMedidasChange = (event) => {
    const index = event.target.selectedIndex;
    const nombre = event.target.options[index].text;
    const id = event.target.value;
    setSelectedMedidasId(id);
    setSelectedMedidasNombre(nombre);
    handleSelectChangeH("medidas", id, nombre);
  };

  const handleSelectMaterialFranjaChange = (event) => {
    const index = event.target.selectedIndex;
    const nombre = event.target.options[index].text;
    const id = event.target.value;
    setSelectedMaterialFranjaId(id);
    setSelectedMaterialFranjaNombre(nombre);
    handleSelectChangeH("materialFranja", id, nombre);
  };

  const handleSelectColorFranjaChange = (event) => {
    const index = event.target.selectedIndex;
    const nombre = event.target.options[index].text;
    const id = event.target.value;
    setSelectedColorFranjaId(id);
    setSelectedColorFranjaNombre(nombre);
    handleSelectChangeH("colorFranja", id, nombre);
  };
  const handleSaveToLocalContext = () => {
    saveData('frentes2', localData);
    console.log(localData);
  };


  useEffect(() => {
    console.log("Datos actualizados:", data);
  }, [data]);

  return (
    <div className="container">
      <div className="container2">
        <h1>Frentes</h1>
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
          <option value="" disabled={selectedMaterialId === ""}>--Selecciona una opción--</option>
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
        <select id="materialFranja" disabled={!franjaActiva} onChange={handleSelectMaterialFranjaChange} value={selectedMaterialFranjaId || ""}>
          <option disabled={selectedProductoId === ""}>--Selecciona una opción--</option>
          {listMaterialFranja.map((material) => (
            <option key={material.material_id} value={material.material_id}>
              {material.nombre}
            </option>
          ))}
        </select>

        {/* Color Franja */}
        <label htmlFor="colorFranja">Color Franja:</label>
        <select id="colorFranja" disabled={!franjaActiva} onChange={handleSelectColorFranjaChange} value={selectedColorFranjaId || ""}>
          <option disabled={selectedProductoId === ""}>--Selecciona una opción--</option>
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

export default Frentes;
