import React, { useRef, useState } from "react";
import { useEffect } from "react";
//Usa Axios para realizar peticiones asincronas HTTP al servidor.
import axios from "axios";
import { useTabs } from "./TabsContext";
import { json } from "react-router-dom";

function Frentes() {
  //Hooks de arreglos con la informacion de las listas
  const { selectedOptionsG, handleSelectChangeG } = useTabs({});
  const [listProducto, setListProducto] = useState([]);
  const [listSerie, setListSerie] = useState([]);
  const [listMaterial, setListMaterial] = useState([]);
  const [listArticulo, setListArticulo] = useState([]);
  const [listColor, setListColor] = useState([]);
  const [listMedidas, setListMedidas] = useState([]);
  const [listMaterialFranja, setListMaterialFranja] = useState([]);
  const [listColorFranja, setListColorFranja] = useState([]);

  //Opciones seleccionadas
  //Coje por defecto los valores que le pasa useTabs()
  const [selectedProductoId, setSelectedProductoId] = useState(
    selectedOptionsG.producto ? selectedOptionsG.producto : ""
  );
  const [selectedSerieId, setSelectedSerieId] = useState(
    selectedOptionsG.serie ? selectedOptionsG.serie : ""
  );
  const [selectedMaterialId, setSelectedMaterialId] = useState(
    selectedOptionsG.material ? selectedOptionsG.material : ""
  );
  const [selectedArticuloId, setSelectedArticuloId] = useState(
    selectedOptionsG.articulo ? selectedOptionsG.articulo : ""
  );
  const [selectedMedidasId, setSelectedMedidasId] = useState(
    selectedOptionsG.medidas ? selectedOptionsG.medidas : ""
  );

  //Al Renderizar
  useEffect(() => {
    if (!selectedProductoId) {
      axios.get("http://localhost:6969/producto").then((res) => {
        // Filtra los productos por ID
        const filteredProducts = res.data.filter((producto) =>
          [6].includes(producto.producto_id)
        );
        setListProducto(filteredProducts);
      });
    } else {
      axios.get("http://localhost:6969/producto").then((res) => {
        // Filtra los productos por ID
        const filteredProducts = res.data.filter((producto) =>
          [6].includes(producto.producto_id)
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
        })
        .catch(error => {
          console.error("Error fetching series:", error);
        });
      // Activar o desactivar los campos de franja según el valor
      

      //Vacia las listas, opciones seleccionadas y desabilita los selects inferiores
      document.getElementById("articulo").disabled = true;
      document.getElementById("material").disabled = true;
      document.getElementById("medidas").disabled = true;
    }
  }, [selectedProductoId]);

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
        // Desactivar otros selects hasta que se verifique la franja
        document.getElementById("articulo").disabled = false;
        document.getElementById("material").disabled = false;
        document.getElementById("medidas").disabled = true;
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
      }

    //Vacia las listas, opciones seleccionadas y desabilita los selects inferiores
    document.getElementById("medidas").disabled = true;
  }, [selectedArticuloId, selectedSerieId, selectedMaterialId]);

  //Cuando cambia selectedMaterialId

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
    }
  }, [selectedArticuloId, selectedMaterialId]);

  //Cuando cambia selectedMedidasId
  useEffect(() => {
    if (selectedMedidasId) {
    }
  }, [selectedMedidasId, selectedMaterialId]);

  //Handlers para guardar las opciones seleccionadas
  const handleSelectProductChange = (event) => {
    setSelectedProductoId(event.target.value);
    handleSelectChangeG("producto", event.target.value);
    console.log(selectedOptionsG);
  };
  const handleSelectSerieChange = (event) => {
    setSelectedSerieId(event.target.value);
    handleSelectChangeG("serie", event.target.value);
    console.log(selectedOptionsG);
  };
  const handleSelectArticuloChange = (event) => {
    setSelectedArticuloId(event.target.value);
    handleSelectChangeG("articulo", event.target.value);
    console.log(selectedOptionsG);
  };
  const handleSelectMaterialChange = (event) => {
    setSelectedMaterialId(event.target.value);
    handleSelectChangeG("material", event.target.value);
    console.log(selectedOptionsG);
  };
  const handleSelectMedidasChange = (event) => {
    setSelectedMedidasId(event.target.value);
    handleSelectChangeG("medidas", event.target.value);
    console.log(selectedOptionsG);
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
          <option value="" disabled={selectedProductoId !== ""}>
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
          <option disabled={selectedProductoId !== ""}>
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
        {/* Medidas */}
        <label htmlFor="medidas">Medidas:</label>
        <select
          id="medidas"
          disabled={true}
          onChange={handleSelectMedidasChange}
          value={selectedMedidasId || ""}
        >
          <option disabled={selectedProductoId !== ""}>
            --Selecciona una opción--
          </option>
          {listMedidas.map((medidas) => (
            <option key={medidas.medidas_id} value={medidas.medidas_id}>
              {medidas.medidas}
            </option>
          ))}
          
        </select>
      </div>
    </div>
  );
}

export default Frentes;
