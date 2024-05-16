import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { useLocation } from 'react-router-dom';
//Usa Axios para realizar peticiones asincronas HTTP al servidor.
import axios from "axios";
import { generatePDF } from "./GeneratePDF";
import { useTabs } from "./TabsContext";
import { json } from "react-router-dom";
import { useData } from './context/DataContext';

function Equipamiento() {
  //Hooks de arreglos con la informacion de las listas
  const { selectedOptionsE, handleSelectChangeE} = useTabs({});
  const [listProducto, setListProducto] = useState([]);
  const [listSerie, setListSerie] = useState([]);
  const [listArticulo, setListArticulo] = useState([]);
  const [listMaterial, setListMaterial] = useState([]);
  const { data, updateData } = useData();
  //Opciones seleccionadas
  //Coje por defecto los valores que le pasa useTabs()
  const [selectedProductoId, setSelectedProductoId] = useState(
    selectedOptionsE.producto ? selectedOptionsE.producto : ""
  );
  const [selectedSerieId, setSelectedSerieId] = useState(
    selectedOptionsE.serie ? selectedOptionsE.serie : ""
  );
  const [selectedArticuloId, setSelectedArticuloId] = useState(
    selectedOptionsE.articulo ? selectedOptionsE.articulo : ""
  );
  const [selectedMaterialId, setSelectedMaterialId] = useState(
    selectedOptionsE.material ? selectedOptionsE.material : ""
  );
  const [selectedProductoNombre, setSelectedProductoNombre] = useState("");
  const [selectedSerieNombre, setSelectedSerieNombre] = useState("");
  const [selectedArticuloNombre, setSelectedArticuloNombre] = useState("");
  const handleSaveToLocalContext = () => {
    saveData('frentes', localData);
    console.log(localData);
  };
  useEffect(() => {
    setLocalData({
      selectedProductoId: selectedOptionsE.producto || "",
      selectedProductoNombre: selectedProductoNombre || "",
      selectedSerieId: selectedOptionsE.serie || "",
      selectedArticuloId: selectedOptionsE.articulo || "",
      selectedMaterialId: selectedOptionsE.material || "",
    });
  }, [selectedOptionsE]);
  

    const [localData, setLocalData] = useState({
      selectedProductoId: selectedOptionsE.producto || "",
      selectedProductoNombre: selectedProductoNombre || "",
      selectedSerieId: selectedOptionsE.serie || "",
      selectedArticuloId: selectedOptionsE.articulo || "",
      selectedMaterialId: selectedOptionsE.material || "",
    });
    const location = useLocation();
    const { saveData } = useData();
    useEffect(() => {
      // Función para guardar los datos
      const saveChanges = () => {
          saveData('equipamiento', localData);  // Asume que localData es tu estado local que se necesita guardar
      };

      // Ejecutar saveChanges cuando el componente se va a desmontar
      return () => {
          saveChanges();
      };
  }, [location]);

  //Al Renderizar
  useEffect(() => {
    if (!selectedProductoId) {
      axios.get("http://localhost:6969/producto").then((res) => {
        // Filtra los productos por ID
        const filteredProducts = res.data.filter((producto) =>
          [7, 5].includes(producto.producto_id)
        );
        setListProducto(filteredProducts);
      });
    } else {
      axios.get("http://localhost:6969/producto").then((res) => {
        // Filtra los productos por ID
        const filteredProducts = res.data.filter((producto) =>
          [7, 5].includes(producto.producto_id)
        );
        setListProducto(filteredProducts);
      });
    }
  }, [selectedProductoId]);
  useEffect(() => {
    setLocalData({
      selectedProductoId: selectedOptionsE.producto || "",
      selectedProductoNombre: selectedProductoNombre || "",
      selectedSerieId: selectedOptionsE.serie || "",
      selectedArticuloId: selectedOptionsE.articulo || "",
      selectedMaterialId: selectedOptionsE.material || "",
    });
  }, [selectedOptionsE]);

  //Cuando cambia selectedProductoId
  useEffect(() => {
    if (selectedProductoId) {
      axios
        .get("http://localhost:6969/serie", {
          params: { productoId: selectedProductoId },
        })
        .then((res) => {
          //Actualiza la Lista
          setListSerie(res.data);
          //Activa el select
          document.getElementById("serie").disabled = false;
        });

      //Vacia las listas, opciones seleccionadas y desabilita los selects inferiores
      document.getElementById("articulo").disabled = true;
    }
  }, [selectedProductoId]);

  //Cuando cambia selectedSerieId
  useEffect(() => {
    if (selectedSerieId) {
      axios
        .get("http://localhost:6969/articulo", {
          params: { serieId: selectedSerieId },
        })
        .then((res) => {
          //Actualiza la Lista
          setListArticulo(res.data);
          //Activa el select
          document.getElementById("articulo").disabled = false;
        });
    }
  }, [selectedOptionsE.serie, selectedSerieId]);

  //Cuando cambia selectedArticuloId

  //Cuando cambia selectedMaterialId
  useEffect(() => {
    if (selectedArticuloId) {
      axios
        .get("http://localhost:6969/material", {
          params: { serieId: selectedSerieId },
        })
        .then((res) => {
          //Actualiza la Lista
          setListMaterial(res.data);
          //Activa el select
          document.getElementById("material").disabled = false;
        });
      }

      //Vacia las listas, opciones seleccionadas y desabilita los selects inferiores
      //setSelectedColorId(null);
      //setListColor([]);
  
      //setSelectedMedidasId(null);
      //setListMedidas([]);
      //setSelectedColorFranjaId(null);
      //setListColorFranja([]);
    }, [selectedArticuloId, selectedSerieId, selectedMaterialId]);

  //Cuando cambia selectedMedidasId

  //Handlers para guardar las opciones seleccionadas
  const handleSelectProductChange = (event) => {
    const selectedIndex = event.target.selectedIndex; // Obtiene el índice del elemento seleccionado
    const selectedOption = event.target.options[selectedIndex]; // Accede a la opción seleccionada
    const value = selectedOption.value; // ID del producto
    const nombre = selectedOption.text; // Nombre del producto
  
    console.log("Producto seleccionado:", nombre, value); // Registro de depuración
  
    setSelectedProductoId(value); // Actualiza el estado con el ID
    setSelectedProductoNombre(nombre); // Actualiza el estado con el nombre
  
    // Actualiza localData con el nuevo ID y nombre del producto
    //ahora está recogiendo bien el nombre
    console.log(selectedProductoNombre)
    console.log("localData después de actualizar:", localData); // Verificar el estado de localData
  
    // Pasa el ID y el nombre al contexto o realiza acciones adicionales si es necesario
    handleSelectChangeE("producto", value);
  };
  useEffect(() => {
    setLocalData(prev => ({
      ...prev,
      selectedProductoId: selectedProductoId,
      selectedProductoNombre: selectedProductoNombre,
      // Incluir otros estados necesarios si se requiere
    }));
  }, [selectedProductoId, selectedProductoNombre]);
  
  
  const handleSelectSerieChange = (event) => {
    const value = event.target.value;
    setSelectedSerieId(value);
    setLocalData(prev => ({
      ...prev,
      selectedSerieId: value
    }));
    handleSelectChangeE("serie", value);
  };
  
  const handleSelectArticuloChange = (event) => {
    const value = event.target.value;
    setSelectedArticuloId(value);
    setLocalData(prev => ({
      ...prev,
      selectedArticuloId: value
    }));
    handleSelectChangeE("articulo", value);
  };
  
  const handleSelectMaterialChange = (event) => {
    const value = event.target.value;
    setSelectedMaterialId(value);
    setLocalData(prev => ({
      ...prev,
      selectedMaterialId: value
    }));
    handleSelectChangeE("material", value);
  };
  useEffect(() => {
    console.log("Datos actualizados:", data);
  }, [data]); 
  const handleGeneratePDF = () => {
    if (!selectedProductoId || !selectedSerieId) {
      console.error("Datos necesarios para el PDF no están disponibles.");
      return;
    }
    
    generatePDF(data); // Pasa el objeto de datos directamente
  };
  return (
  
    <div className="container">
      <div className="container2">
        <h1>Equipamiento</h1>
        {/* Producto */}
        <label htmlFor="producto">Producto:</label>
        <select
          id="producto"
          onChange={handleSelectProductChange}
          value={selectedProductoId || ""}
        >
          <option disabled={selectedProductoId !== ""}>
            --Selecciona una opción--
          </option>
          {listProducto.map((producto) => (
            <option key={producto.producto_id} value={producto.producto_id}>
              {producto.nombre}
            </option>
          ))}
        </select>

        {/* Serie */}
        <label htmlFor="serie">Serie:</label>
        <select
          id="serie"
          disabled={true}
          onChange={handleSelectSerieChange}
          value={selectedSerieId || ""}
        >
          <option disabled={selectedProductoId !== ""}>
            --Selecciona una opción--
          </option>
          {listSerie.map((serie) => (
            <option key={serie.serie_id} value={serie.serie_id}>
              {serie.nombre}
            </option>
          ))}
        </select>

        {/* Articulo */}
        <label htmlFor="articulo">Artículo:</label>
        <select
          id="articulo"
          disabled={true}
          onChange={handleSelectArticuloChange}
          value={selectedArticuloId || ""}
        >
          <option value="" disabled={selectedProductoId == ""}>
            --Selecciona una opción--
          </option>
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
        <select
          id="material"
          disabled={true}
          onChange={handleSelectMaterialChange}
          value={selectedMaterialId || ""}
        >
          <option disabled={selectedProductoId == ""}>
            --Selecciona una opción--
          </option>
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

export default Equipamiento;