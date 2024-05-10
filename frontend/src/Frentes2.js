import React, { useRef, useState } from "react";
import { useEffect } from "react";
//Usa Axios para realizar peticiones asincronas HTTP al servidor.
import axios from "axios";
import { useTabs } from "./TabsContext";
import { json } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import { useData } from './context/DataContext';
import { generatePDF } from "./GeneratePDF";

function Frentes() {
  //Hooks de arreglos con la informacion de las listas
  const { selectedOptionsH, handleSelectChangeH, handleGlobalSelectChange } = useTabs({});
  const [listProducto, setListProducto] = useState([]);
  const [listSerie, setListSerie] = useState([]);
  const [listMaterial, setListMaterial] = useState([]);
  const [listArticulo, setListArticulo] = useState([]);
  const [listColor, setListColor] = useState([]);
  const [listMedidas, setListMedidas] = useState([]);
  const [listMaterialFranja, setListMaterialFranja] = useState([]);
  const [listColorFranja, setListColorFranja] = useState([]);
  const { data, saveData } = useData();
  //Coje por defecto los valores que le pasa useTabs()
  const [selectedProductoId, setSelectedProductoId] = useState(
    selectedOptionsH.producto ? selectedOptionsH.producto : ""
  );
  const [selectedSerieId, setSelectedSerieId] = useState(
    selectedOptionsH.serie ? selectedOptionsH.serie : ""
  );
  const [selectedMaterialId, setSelectedMaterialId] = useState(
    selectedOptionsH.material ? selectedOptionsH.material : ""
  );
  const [selectedArticuloId, setSelectedArticuloId] = useState(
    selectedOptionsH.articulo ? selectedOptionsH.articulo : ""
  );
  const [selectedColorId, setSelectedColorId] = useState(
    selectedOptionsH.color ? selectedOptionsH.color : ""
  );
  const [selectedMedidasId, setSelectedMedidasId] = useState(
    selectedOptionsH.medidas ? selectedOptionsH.medidas : ""
  );
  const [selectedMaterialFranjaId, setSelectedMaterialFranjaId] = useState(
    selectedOptionsH.materialFranja ? selectedOptionsH.materialFranja : ""
  );
  const [selectedColorFranjaId, setSelectedColorFranjaId] = useState(
    selectedOptionsH.colorFranja ? selectedOptionsH.colorFranja : ""
  );
  const [selectedProductoNombre, setSelectedProductoNombre] = useState("");
  const [selectedSerieNombre, setSelectedSerieNombre] = useState("");
  const [selectedArticuloNombre, setSelectedArticuloNombre] = useState("");
  const [selectedMaterialNombre, setSelectedMaterialNombre] = useState("");
  const [selectedColorNombre, setSelectedColorNombre] = useState("");
  const [selectedMedidasNombre, setSelectedMedidasNombre] = useState("");
  const [selectedMaterialFranjaNombre, setSelectedMaterialFranjaNombre] = useState("");
  const [selectedColorFranjaNombre, setSelectedColorFranjaNombre] = useState("");
  
  const handleSaveToLocalContext = () => {
    saveData('frentes2', localData);
    console.log(localData);
  };
  const handleLocalSelectChange = (event) => {
    const { name, value } = event.target;
    setLocalData(prev => ({
      ...prev,
      [name]: value
    }));
    // Puedes decidir si también necesitas actualizar el estado global inmediatamente
    handleGlobalSelectChange(name, value);
  };
  //Variable que determina si hay Franja o No
  var [franjaActiva, setFranjaActiva] = useState(false);
  const handleSave = (newData) => {
    saveData('producto', newData);  // Asegúrate de que newData contenga los datos correctos
  };
  //Estados para los datos de material y color de la franja
  const [colorFranjaActivo, setColorFranjaActivo] = useState(false);

  //Al Renderizar
  useEffect(() => {
    if (!selectedProductoId) {
      axios.get("http://localhost:6969/producto").then((res) => {
        // Filtra los productos por ID
        const filteredProducts = res.data.filter((producto) =>
          [1, 4, 5].includes(producto.producto_id)
        );
        setListProducto(filteredProducts);
      });
    } else {
      axios.get("http://localhost:6969/producto").then((res) => {
        // Filtra los productos por ID
        const filteredProducts = res.data.filter((producto) =>
          [1, 4, 5].includes(producto.producto_id)
        );
        setListProducto(filteredProducts);
      });
    }
  }, [selectedProductoId]);

  //Cuando cambia selectedProductoId
  useEffect(() => {
    
    if (selectedProductoId) {
      axios
        .get("http://localhost:6969/serie", {
          params: { productoId: selectedProductoId },
        })
        .then((res) => {
          setListSerie(res.data);
          document.getElementById("serie").disabled = false;
    
          // Corrección aquí: asegurarte de que estás usando correctamente la función callback
          res.data.forEach((serie) => {
            console.log(`Franja value for serie ${serie.id}:`, serie.franja);
          });
        })
        .catch(error => {
          console.error("Error fetching series:", error);
        });
      //Vacia las listas, opciones seleccionadas y desabilita los selects inferiores
      document.getElementById("articulo").disabled = true;
      document.getElementById("material").disabled = false;
      document.getElementById("color").disabled = false;
      document.getElementById("medidas").disabled = false;
      document.getElementById("materialFranja").disabled = false;
      document.getElementById("colorFranja").disabled = false;
    }
  }, [selectedProductoId]);
  const [localData, setLocalData] = useState({
    selectedProductoId: selectedOptionsH.producto || "",
    selectedSerieId: selectedOptionsH.serie || "",
    selectedArticuloId: selectedOptionsH.articulo || "",
    selectedMaterialId: selectedOptionsH.material || "",
    selectedColorId: selectedOptionsH.color || "",
    selectedMedidasId: selectedOptionsH.medidas || "",
    selectedMaterialFranjaId: selectedOptionsH.materialFranja || "",
    selectedColorFranjaId: selectedOptionsH.colorFranja || ""
  });
  useEffect(() => {
    setLocalData({
      selectedProductoId: selectedProductoId || "",
      selectedProductoNombre: selectedProductoNombre || "",
      selectedSerieId: selectedOptionsH.serie || "",
      selectedSerieNombre: selectedSerieNombre || "",
      selectedArticuloId: selectedOptionsH.articulo || "",
      selectedArticuloNombre: selectedArticuloNombre || "",
      selectedMaterialId: selectedOptionsH.material || "",
      selectedMaterialNombre : selectedMaterialNombre || "",
      selectedColorId: selectedOptionsH.color || "",
      selectedMedidasId: selectedOptionsH.medidas || "",
      selectedMaterialFranjaId: selectedOptionsH.materialFranja || "",
      selectedColorFranjaId: selectedOptionsH.colorFranja || "",
    });
  }, [selectedOptionsH]);
  const location = useLocation();
useEffect(() => {
    // Función para guardar los datos
    const saveChanges = () => {
        saveData('frentes2', localData);  // Asume que localData es tu estado local que se necesita guardar
    };

    // Ejecutar saveChanges cuando el componente se va a desmontar
    return () => {
        saveChanges();
    };
}, [location]);
  //Opciones selecc
  //Cuando cambia selectedSerieId
  useEffect(() => {
    if (selectedSerieId) {
      axios.get("http://localhost:6969/articulo", {
        params: { serieId: selectedSerieId },
      })
      .then((res) => {
        // Actualiza la lista de artículos
        setListArticulo(res.data);
  
        // Aquí asumimos que quieres activar o desactivar los campos relacionados con franja
        franjaActiva = res.data.length > 0 ? res.data[0].franja === 1 : false;
        setFranjaActiva(franjaActiva);
  
        // Mostrar por consola el estado de franja activa
        console.log(`Franja activa para la serie seleccionada: ${franjaActiva}`);
  
        // Desactivar otros selects hasta que se verifique la franja
        document.getElementById("articulo").disabled = false;
        document.getElementById("material").disabled = false;
        document.getElementById("color").disabled = false;
        document.getElementById("medidas").disabled = false;
        document.getElementById("materialFranja").disabled = !franjaActiva;
        document.getElementById("colorFranja").disabled = !franjaActiva;
      })
      .catch(error => {
        console.error("Error fetching articles:", error);
      });
    }
  }, [selectedSerieId]);

  //Cuando cambia selectedArticuloId
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
    if (franjaActiva === true) 
      axios.get("http://localhost:6969/materialFranja").then((res) => {
        setListMaterialFranja(res.data);
        document.getElementById("materialFranja").disabled = false;
      });
    }

    //Vacia las listas, opciones seleccionadas y desabilita los selects inferiores
    document.getElementById("color").disabled = false;
    document.getElementById("medidas").disabled = false;
    document.getElementById("colorFranja").disabled = false;
  }, [selectedArticuloId, selectedSerieId, selectedMaterialId, franjaActiva]);

  //Cuando cambia selectedMaterialId
  useEffect(() => {
    if (selectedMaterialId) {
      axios
        .get("http://localhost:6969/color", {
          params: { materialId: selectedMaterialId },
        })
        .then((res) => {
          //Actualiza la lista
          setListColor(res.data);
          //Activa el select
          document.getElementById("color").disabled = false;
        });
    }
  }, [selectedMaterialId]);

  //Cuando cambia selectedColorId
  useEffect(() => {
    if (selectedArticuloId && selectedMaterialId) {
      axios
        .get("http://localhost:6969/medidas", {
          params: {
            articuloId: selectedArticuloId,
            materialId: selectedMaterialId,
          },
        })
        .then((res) => {
          setListMedidas(res.data);
          document.getElementById("medidas").disabled = false;
        })
        .catch((error) => {
          console.error("Error fetching medidas:", error);
        });
        document.getElementById("materialFranja").disabled = !franjaActiva;
        document.getElementById("colorFranja").disabled = !franjaActiva;
    }
  }, [selectedArticuloId, selectedMaterialId]);

  //Cuando cambia selectedMedidasId
  useEffect(() => {
    if (selectedMedidasId) {
    }
  }, [selectedMedidasId, selectedMaterialId]);

  //Cuando cambia selectedMaterialFranjaId
  useEffect(() => {
    if (selectedMaterialFranjaId) {
      axios
        .get("http://localhost:6969/colorFranja", {
          params: { materialFranjaId: selectedMaterialFranjaId },
        })
        .then((res) => {
          //Actualiza la lista
          setListColorFranja(res.data);
          //Activa el select
          document.getElementById("colorFranja").disabled = false;
        });
    }
  }, [selectedMaterialFranjaId]);

  //Cuando cambia selectedColorFranjaId
  useEffect(() => {
    if (selectedColorFranjaId) {
    }
  }, [selectedColorFranjaId]);
  
  //Handlers para guardar las opciones seleccionadas
  const handleSelectProductChange = (event) => {
    const index = event.target.selectedIndex;
    const nombre = event.target.options[index].text;
    const id = event.target.value;
    setSelectedProductoId(id);
    setSelectedProductoNombre(nombre);
    handleSelectChangeH("producto", id);
  };
  const handleSelectSerieChange = (event) => {
    const index = event.target.selectedIndex;
    const nombre = event.target.options[index].text;
    const id = event.target.value;
    setSelectedSerieId(id);
    setSelectedSerieNombre(nombre);
    handleSelectChangeH("serie", id);
  };
  const handleSelectArticuloChange = (event) => {
    const index = event.target.selectedIndex;
    const nombre = event.target.options[index].text;
    const id = event.target.value;
    setSelectedArticuloId(event.target.value);
    handleSelectChangeH("articulo", id);
    console.log(selectedOptionsH);
  };
  const handleSelectMaterialChange = (event) => {
    setSelectedMaterialId(event.target.value);
    handleSelectChangeH("material", event.target.value);
    console.log(selectedOptionsH);
  };
  const handleSelectColorChange = (event) => {
    setSelectedColorId(event.target.value);
    handleSelectChangeH("color", event.target.value);
    console.log(selectedOptionsH);
  };
  const handleSelectMedidasChange = (event) => {
    setSelectedMedidasId(event.target.value);
    handleSelectChangeH("medidas", event.target.value);
    console.log(selectedOptionsH);
  };
  const handleSelectMaterialFranjaChange = (event) => {
    setSelectedMaterialFranjaId(event.target.value);
    handleSelectChangeH("materialFranja", event.target.value);
    console.log(selectedOptionsH);
  };
  const handleSelectColorFranjaChange = (event) => {
    setSelectedColorFranjaId(event.target.value);
    handleSelectChangeH("colorFranja", event.target.value);
  };
  return (
    <div className="container">
      <div className="container2">
        <h1>Frentes</h1>
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
          <option disabled={selectedProductoId == ""}>
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
      </div>
      <div className="container3">
        {/* Color */}
        <label htmlFor="color">Color:</label>
        <select
          id="color"
          disabled={true}
          onChange={handleSelectColorChange}
          value={selectedColorId || ""}
        >
          <option disabled={selectedProductoId == ""}>
            --Selecciona una opción--
          </option>
          {listColor.map((color) => (
            <option key={color.color_id} value={color.color_id}>
              {color.nombre}
            </option>
          ))}
        </select>

        {/* Medidas */}
        <label htmlFor="medidas">Medidas:</label>
        <select
          id="medidas"
          disabled={true}
          onChange={handleSelectMedidasChange}
          value={selectedMedidasId || ""}
        >
          <option disabled={selectedProductoId == ""}>
            --Selecciona una opción--
          </option>
          {listMedidas.map((medidas) => (
            <option key={medidas.medidas_id} value={medidas.medidas_id}>
              {medidas.medidas}
            </option>
          ))}
        </select>

        {/* Material Franja */}
        <label htmlFor="materialFranja">Material Franja:</label>
        <select
          id="materialFranja"
          disabled={!franjaActiva}
          onChange={handleSelectMaterialFranjaChange}
          value = {selectedMaterialFranjaId || ""}
        >
          <option disabled={selectedProductoId !== ""}>
            --Selecciona una opción--
          </option>
          {listMaterialFranja.map((material) => (
            <option key={material.material_id} value={material.material_id}>
              {material.nombre}
            </option>
          ))}
        </select>

        {/* Color Franja */}
        <label htmlFor="colorFranja">Color Franja:</label>
        <select
          id="colorFranja"
          disabled={!franjaActiva}
          onChange={handleSelectColorFranjaChange}
          value = {selectedColorFranjaId || ""}
        >
          <option disabled={selectedProductoId !== ""}>
            --Selecciona una opción--
          </option>
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

