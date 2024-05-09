import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { useLocation } from 'react-router-dom';
//Usa Axios para realizar peticiones asincronas HTTP al servidor.
import axios from "axios";
import { generatePDF } from "./GeneratePDF";
import { useTabs } from "./TabsContext";
import { json } from "react-router-dom";
import { useData } from './context/DataContext';

function Tiradores() {
  //Hooks de arreglos con la informacion de las listas
  const { selectedOptionsF, handleSelectChangeF,  handleGlobalSelectChange } = useTabs({});
  const initialState = 'Selecciona un producto';
  const [listProducto, setListProducto] = useState([]);
  const [listSerie, setListSerie] = useState([]);
  const [listMaterial, setListMaterial] = useState([]);
  const [listArticulo, setListArticulo] = useState([]);
  const [listColor, setListColor] = useState([]);
  const { data, updateData } = useData();

  const [selectedProductoId, setSelectedProductoId] = useState(
    selectedOptionsF.producto ? selectedOptionsF.producto : ""
  );
  const [selectedProductoNombre, setSelectedProductoNombre] = useState("");
  const [selectedSerieNombre, setSelectedSerieNombre] = useState("");
  const [selectedArticuloNombre, setSelectedArticuloNombre] = useState("");
  const [selectedMaterialNombre, setSelectedMaterialNombre] = useState("");
  const [selectedColorNombre, setSelectedColorNombre] = useState("");
  const [selectedSerieId, setSelectedSerieId] = useState(
    selectedOptionsF.serie ? selectedOptionsF.serie : ""
  );
  const [selectedMaterialId, setSelectedMaterialId] = useState(
    selectedOptionsF.material ? selectedOptionsF.material : ""
  );
  const [selectedArticuloId, setSelectedArticuloId] = useState(
    selectedOptionsF.articulo ? selectedOptionsF.articulo : ""
  );
  const [selectedColorId, setSelectedColorId] = useState(
    selectedOptionsF.color ? selectedOptionsF.color : ""
  );
  const location = useLocation();
  const { saveData } = useData();

  
  const [localData, setLocalData] = useState({
    selectedProductoId: selectedOptionsF.producto || "",
    selectedProductoNombre: selectedProductoNombre || "",
    selectedSerieId: selectedOptionsF.serie || "",
    selectedArticuloId: selectedOptionsF.articulo || "",
    selectedMaterialId: selectedOptionsF.material || "",
    selectedColorId: selectedOptionsF.color || "",
  });
  const handleLocalSelectChange = (event) => {
    const { name, value } = event.target;
    setLocalData(prev => ({
      ...prev,
      [name]: value
    }));
    // Puedes decidir si también necesitas actualizar el estado global inmediatamente
    handleGlobalSelectChange(name, value);
  };
  const handleSaveToLocalContext = () => {
    saveData('frentes', localData);
    console.log(localData);
  };
    useEffect(() => {
      // Función para guardar los datos
      const saveChanges = () => {
          saveData('tiradores', localData);  // Asume que localData es tu estado local que se necesita guardar
      };

      // Ejecutar saveChanges cuando el componente se va a desmontar
      return () => {
          saveChanges();
      };
  }, [location]);

  //Al Renderizarlos
  useEffect(() => {
    if (!selectedProductoId) {
      axios.get("http://localhost:6969/producto").then((res) => {
        // Filtra los productos por ID
        const filteredProducts = res.data.filter((producto) =>
          [2].includes(producto.producto_id, producto.producto_nombre)
        );
        setListProducto(filteredProducts);
      });
    } else {
      axios.get("http://localhost:6969/producto").then((res) => {
        // Filtra los productos por ID
        const filteredProducts = res.data.filter((producto) =>
          [2].includes(producto.producto_id)
        );
        setListProducto(filteredProducts);
      });
    }
  }, [selectedProductoId]);
  useEffect(() => {
    setLocalData({
      selectedProductoId: selectedProductoId || "",
      selectedProductoNombre: selectedProductoNombre || "",
      selectedSerieId: selectedOptionsF.serie || "",
      selectedSerieNombre: selectedSerieNombre || "",
      selectedArticuloId: selectedOptionsF.articulo || "",
      selectedArticuloNombre: selectedArticuloNombre || "",
      selectedMaterialId: selectedOptionsF.material || "",
      selectedMaterialNombre : selectedMaterialNombre || "",
      selectedColorId: selectedOptionsF.color || "",
    });
  }, [selectedOptionsF]);
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
          });
        })
        .catch(error => {
          console.error("Error fetching series:", error);
        });
      // Activar o desactivar los campos de franja según el valor


      //Vacia las listas, opciones seleccionadas y desabilita los selects inferiores
      //setSelectedArticuloId("");
      //selectedOptions.articulo = "";
      //setListArticulo([]);
      document.getElementById("articulo").disabled = true;

      //setSelectedMaterialId("");
      //selectedOptions.material = "";
      //setListMaterial([]);
      document.getElementById("material").disabled = false;

      //setSelectedColorId("");
      //selectedOptions.color = "";
      //setListColor([]);
      document.getElementById("color").disabled = false;

      //setSelectedMedidasId("");
      //selectedOptions.medidas = "";
      //setListMedidas([]);
    }
  }, [selectedProductoId]);
  //Cuando cambia selectedSerieId
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
          // basándote en la información de la serie seleccionada. Si la estructura de datos
          // incluye 'franja' en cada 'artículo', puedes ajustar esto aquí.

          // Mostrar por consola el estado de franja activa

          // Desactivar otros selects hasta que se verifique la franja
          document.getElementById("articulo").disabled = false;
          document.getElementById("material").disabled = false;
          document.getElementById("color").disabled = false;
        })
        .catch(error => {
          console.error("Error fetching articles:", error);
        });
      // Resetea los campos de franja cuando cambia la serie
      //setSelectedMaterialFranjaId("");
      //setSelectedColorFranjaId("");
      //setListMaterialFranja([]);
      //setListColorFranja([]);
    }
  }, [selectedSerieId]);

  //Cuando cambia selectedArticuloId
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
    }

    //Vacia las listas, opciones seleccionadas y desabilita los selects inferiores
    //setSelectedColorId(null);
    //setListColor([]);
    document.getElementById("color").disabled = false;

  }, [selectedArticuloId, selectedSerieId, selectedMaterialId]);

  //Cuando cambia selectedMaterialId
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
    if (selectedColorId) {
    }
  }, [selectedColorId]);

  //Handlers para guardar las opciones seleccionadas
  const handleSelectProductChange = (event) => {
    const index = event.target.selectedIndex;
    const nombre = event.target.options[index].text;
    setSelectedProductoId(event.target.value);
    setSelectedProductoNombre(nombre);
     // Guarda el nombre
  
    // Asegúrate de que handleSelectChange pueda manejar un nombre además del valor
    handleSelectChangeF("producto", index, nombre);
  };
  const handleSelectSerieChange = (event) => {
    const index = event.target.selectedIndex;
    const nombre = event.target.options[index].text;
    setSelectedSerieId(event.target.value);
    setSelectedSerieNombre(nombre); // Guarda el nombre
    handleSelectChangeF("serie", event.target.value);
    document.getElementById("serie").disabled = true;
  };
  const handleSelectArticuloChange = (event) => {
    const index = event.target.selectedIndex;
    const nombre = event.target.options[index].text;
    setSelectedArticuloNombre(nombre);
    setSelectedArticuloId(event.target.value);
    handleSelectChangeF("articulo", event.target.value);
    console.log(selectedOptionsF);
    console.log(selectedProductoNombre);
  };
  const handleSelectMaterialChange = (event) => {
    const index = event.target.selectedIndex;
    const nombre = event.target.options[index].text;
    setSelectedMaterialNombre(nombre);
    setSelectedMaterialId(event.target.value);
    handleSelectChangeF("material", event.target.value);
    console.log(selectedOptionsF);
  };
  const handleSelectColorChange = (event) => {
    setSelectedColorId(event.target.value);
    handleSelectChangeF("color", event.target.value);
  };
  useEffect(() => {
    console.log("Datos actualizados:", data);
  }, [data]); 

  return (

    <div className="container">
      <div className="container2">
        <h1>Tiradores</h1>
       {/* Producto */}
       <label htmlFor="producto">Producto:</label>
        <select
          id="producto"
          onChange={handleSelectProductChange}
          value={localData.selectedProductoId}
          name="selectedProductoId"
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
          name="selectedSerieId"
        >
          <option value="" disabled={selectedProductoId !== ""}>
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
        >
          <option disabled={selectedSerieId !== ''} onChange={handleSelectProductChange}>--Selecciona una opción--</option>
          {listMaterial.map((row, index) => (
            <option key={index} value={row.material_id}>
              {row.nombre}
            </option>
          ))}
        </select>

        {/* Color */}
        <label htmlFor="color">Color:</label>
        <select id="color" disabled={true} onChange={handleSelectColorChange}>
          {listColor.map((row, index) => (
            <option key={index} value={row.nombre}>
              {row.nombre}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
export default Tiradores;
