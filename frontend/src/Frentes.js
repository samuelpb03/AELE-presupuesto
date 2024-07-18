import React, { useState, useEffect } from "react";
import axios from "axios";
import { useTabs } from "./TabsContext";
import { useData } from './context/DataContext';

function Frentes() {
  const { handleSelectChange } = useTabs();
  const { data, saveData } = useData();
  const [listProducto, setListProducto] = useState([]);
  const [listSerie, setListSerie] = useState([]);
  const [listArticulo, setListArticulo] = useState([]);
  const [listMaterial, setListMaterial] = useState([]);
  const [listColor, setListColor] = useState([]);
  const [listMedidas, setListMedidas] = useState([]);
  const [listMaterialFranja, setListMaterialFranja] = useState([]);
  const [listColorFranja, setListColorFranja] = useState([]);
  const [listEspeciales, setListEspeciales] = useState([]);

  const [selectedProducto, setSelectedProducto] = useState({ id: "", nombre: "" });
  const [selectedSerie, setSelectedSerie] = useState({ id: "", nombre: "" });
  const [selectedArticulo, setSelectedArticulo] = useState({ id: "", nombre: "" });
  const [selectedMaterial, setSelectedMaterial] = useState({ id: "", nombre: "" });
  const [selectedColor, setSelectedColor] = useState({ id: "", nombre: "" });
  const [selectedMedidas, setSelectedMedidas] = useState({ id: "", nombre: "", puntos: 0 });
  const [selectedMaterialFranja, setSelectedMaterialFranja] = useState({ id: "", nombre: "" });
  const [selectedColorFranja, setSelectedColorFranja] = useState({ id: "", nombre: "" }); // Estado para cantidad
  const [puntos, setPuntos] = useState(0); // Estado para puntos

  const [selectedEspecial1, setSelectedEspecial1] = useState({ id: "", nombre: "", puntos: 0 });
  const [selectedEspecial2, setSelectedEspecial2] = useState({ id: "", nombre: "", puntos: 0 });
  const [puntosEspecial1, setPuntosEspecial1] = useState(0);
  const [puntosEspecial2, setPuntosEspecial2] = useState(0);
  const [cantidadEspecial1, setCantidadEspecial1] = useState(0);
  const [cantidadEspecial2, setCantidadEspecial2] = useState(0);
  const [franjaActiva, setFranjaActiva] = useState(false);
  var [cantidad, setCantidad] = useState(0);
  const backendUrl = 'http://194.164.166.129:6969'; // URL de ngrok para el backend
        // Verificar si el usuario está autenticado
        const user = localStorage.getItem('user');
        //if (!user) {
            // Redirigir a login.php si no está autenticado
            //window.location.href = '/login.php';
        //}

  useEffect(() => {
    if (data.frentes) {
      setSelectedProducto({
        id: data.frentes.selectedProductoId || "",
        nombre: data.frentes.selectedProductoNombre || "",
      });
      setSelectedSerie({
        id: data.frentes.selectedSerieId || "",
        nombre: data.frentes.selectedSerieNombre || "",
      });
      setSelectedArticulo({
        id: data.frentes.selectedArticuloId || "",
        nombre: data.frentes.selectedArticuloNombre || "",
      });
      setSelectedMaterial({
        id: data.frentes.selectedMaterialId || "",
        nombre: data.frentes.selectedMaterialNombre || "",
      });
      setSelectedColor({
        id: data.frentes.selectedColorId || "",
        nombre: data.frentes.selectedColorNombre || "",
      });
      setSelectedMedidas({
        id: data.frentes.selectedMedidasId || "",
        nombre: data.frentes.selectedMedidasNombre || "",
        puntos: data.frentes.selectedMedidasPuntos || 0,
      });
      setSelectedMaterialFranja({
        id: data.frentes.selectedMaterialFranjaId || "",
        nombre: data.frentes.selectedMaterialFranjaNombre || "",
      });
      setSelectedColorFranja({
        id: data.frentes.selectedColorFranjaId || "",
        nombre: data.frentes.selectedColorFranjaNombre || "",
      });
      setSelectedEspecial1({
        id: data.frentes.selectedEspecial1Id || "",
        nombre: data.frentes.selectedEspecial1Nombre || "",
        puntos: data.frentes.selectedEspecial1Puntos || 0,
      });
      setSelectedEspecial2({
        id: data.frentes.selectedEspecial2Id || "",
        nombre: data.frentes.selectedEspecial2Nombre || "",
        puntos: data.frentes.selectedEspecial2Puntos || 0,
      });
      setCantidad(data.frentes.cantidad || 1);
      setPuntos(data.frentes.selectedMedidasPuntos || 0);
      setPuntosEspecial1((data.frentes.selectedEspecial1Puntos || 0) * (data.frentes.cantidadEspecial1 || 0));
      setPuntosEspecial2((data.frentes.selectedEspecial2Puntos || 0) * (data.frentes.cantidadEspecial2 || 0));
      setCantidadEspecial1(data.frentes.cantidadEspecial1 || 0);
      setCantidadEspecial2(data.frentes.cantidadEspecial2 || 0);
    }
  }, []);

  useEffect(() => {
    const formattedData = {
      selectedProductoId: selectedProducto.id,
      selectedProductoNombre: selectedProducto.nombre,
      selectedSerieId: selectedSerie.id,
      selectedSerieNombre: selectedSerie.nombre,
      selectedArticuloId: selectedArticulo.id,
      selectedArticuloNombre: selectedArticulo.nombre,
      selectedMaterialId: selectedMaterial.id,
      selectedMaterialNombre: selectedMaterial.nombre,
      selectedColorId: selectedColor.id,
      selectedColorNombre: selectedColor.nombre,
      selectedMedidasId: selectedMedidas.id,
      selectedMedidasNombre: selectedMedidas.nombre,
      selectedMedidasPuntos: selectedMedidas.puntos,
      selectedMaterialFranjaId: selectedMaterialFranja.id,
      selectedMaterialFranjaNombre: selectedMaterialFranja.nombre,
      selectedColorFranjaId: selectedColorFranja.id,
      selectedColorFranjaNombre: selectedColorFranja.nombre,
      selectedEspecial1Id: selectedEspecial1.id,
      selectedEspecial1Nombre: selectedEspecial1.nombre,
      selectedEspecial1Puntos: selectedEspecial1.puntos,
      selectedEspecial2Id: selectedEspecial2.id,
      selectedEspecial2Nombre: selectedEspecial2.nombre,
      selectedEspecial2Puntos: selectedEspecial2.puntos,
      cantidad,
      puntos: selectedMedidas.puntos * cantidad,
      cantidadFrente: cantidad, // Añadir cantidadFrente
      cantidadEspecial1,
      cantidadEspecial2,
      puntosEspecial1: selectedEspecial1.puntos * cantidadEspecial1,
      puntosEspecial2: selectedEspecial2.puntos * cantidadEspecial2,
    };
    console.log('formattedData:', formattedData); // Añadir log para verificar datos
    saveData("frentes", formattedData);
  }, [
    selectedProducto,
    selectedSerie,
    selectedArticulo,
    selectedMaterial,
    selectedColor,
    selectedMedidas,
    selectedMaterialFranja,
    selectedColorFranja,
    selectedEspecial1,
    selectedEspecial2,
    cantidad,
    cantidadEspecial1,
    cantidadEspecial2,
    puntosEspecial1,
    puntosEspecial2,
    saveData,
  ]);

  useEffect(() => {
    axios.get(`${backendUrl}/producto`).then((res) => {
      console.log('Full response:', res); // Registrar la respuesta completa
      if (Array.isArray(res.data)) {
        const filteredProducts = res.data.filter((producto) => [1, 4, 5].includes(producto.producto_id));
        setListProducto(filteredProducts);
      } else {
        console.error("Error fetching productos: res.data is not an array", res.data);
      }
    }).catch(error => {
      console.error("Error fetching productos:", error);
    });

    axios.get(`${backendUrl}/especialesConPuntosFrentes`).then((res) => {
      console.log('Full response:', res); // Registrar la respuesta completa
      if (Array.isArray(res.data)) {
        setListEspeciales(res.data);
      } else {
        console.error("Error fetching articulos especiales: res.data is not an array", res.data);
      }
    }).catch(error => {
      console.error("Error fetching articulos especiales:", error);
    });
  }, [backendUrl]);

  useEffect(() => {
    if (selectedProducto.id) {
      axios.get(`${backendUrl}/serie`, {
        params: { productoId: selectedProducto.id }
      }).then((res) => {
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
  }, [selectedProducto.id, backendUrl]);

  useEffect(() => {
    if (selectedSerie.id) {
      axios.get(`${backendUrl}/articulo`, {
        headers: {
          'ngrok-skip-browser-warning': 'true'
        },
        params: { serieId: selectedSerie.id }
      }).then((res) => {
        if (Array.isArray(res.data)) {
          setListArticulo(res.data);
          const franja = res.data.some((articulo) => articulo.franja === 1);
          setFranjaActiva(franja);
          document.getElementById("articulo").disabled = false;
          document.getElementById("material").disabled = false;
          document.getElementById("color").disabled = false;
          document.getElementById("medidas").disabled = true;

          // Restablecer el material y color de franja si la serie no tiene franja
          if (!franja) {
            setSelectedMaterialFranja({ id: "", nombre: "" });
            setSelectedColorFranja({ id: "", nombre: "" });
          }
        } else {
          console.error("Error fetching articulos: res.data is not an array");
        }
      }).catch(error => {
        console.error("Error fetching articulos:", error);
      });
    }
  }, [selectedSerie.id, backendUrl]);

  useEffect(() => {
    if (selectedArticulo.id) {
      axios.get(`${backendUrl}/material`, {
        headers: {
          'ngrok-skip-browser-warning': 'true'
        },
        params: { serieId: selectedSerie.id }
      }).then((res) => {
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
  }, [selectedArticulo.id, selectedSerie.id, backendUrl]);

  useEffect(() => {
    if (selectedMaterial.id) {
      axios.get(`${backendUrl}/color`, {
        headers: {
          'ngrok-skip-browser-warning': 'true'
        },
        params: { materialId: selectedMaterial.id }
      }).then((res) => {
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
  }, [selectedMaterial.id, backendUrl]);

  useEffect(() => {
    if (selectedArticulo.id && selectedMaterial.id) {
      axios.get(`${backendUrl}/medidasConPuntos`, {
        headers: {
          'ngrok-skip-browser-warning': 'true'
        },
        params: {
          articuloId: selectedArticulo.id,
          materialId: selectedMaterial.id,
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
  }, [selectedArticulo.id, selectedMaterial.id, backendUrl]);

  useEffect(() => {
    if (franjaActiva) {
      axios.get(`${backendUrl}/materialFranja`, {
        headers: {
          'ngrok-skip-browser-warning': 'true'
        },
        params: { materialId: selectedMaterial.id }
      }).then((res) => {
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
  }, [franjaActiva, selectedMaterial.id, backendUrl]);

  useEffect(() => {
    if (selectedMaterialFranja.id) {
      axios.get(`${backendUrl}/colorFranja`, {
        headers: {
          'ngrok-skip-browser-warning': 'true'
        },
        params: { materialFranjaId: selectedMaterialFranja.id }
      }).then((res) => {
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
  }, [selectedMaterialFranja.id, backendUrl]);

  const handleSelectProductChange = (event) => {
    const index = event.target.selectedIndex;
    const nombre = event.target.options[index].text;
    const id = event.target.value;
    setSelectedProducto({ id, nombre });
    handleSelectChange("producto", id, nombre);
  };

  const handleSelectSerieChange = (event) => {
    const index = event.target.selectedIndex;
    const nombre = event.target.options[index].text;
    const id = event.target.value;
    setSelectedSerie({ id, nombre });
    handleSelectChange("serie", id, nombre);
  };

  const handleSelectArticuloChange = (event) => {
    const index = event.target.selectedIndex;
    const nombre = event.target.options[index].text;
    const id = event.target.value;
    setSelectedArticulo({ id, nombre });
    handleSelectChange("articulo", id, nombre);
  };

  const handleSelectMaterialChange = (event) => {
    const index = event.target.selectedIndex;
    const nombre = event.target.options[index].text;
    const id = event.target.value;
    setSelectedMaterial({ id, nombre });
    handleSelectChange("material", id, nombre);
  };

  const handleSelectColorChange = (event) => {
    const index = event.target.selectedIndex;
    const nombre = event.target.options[index].text;
    const id = event.target.value;
    setSelectedColor({ id, nombre });
    handleSelectChange("color", id, nombre);
  };

  const handleSelectMedidasChange = (event) => {
    const index = event.target.selectedIndex;
    const nombre = event.target.options[index].text;
    const id = event.target.value;
    const selectedMedida = listMedidas.find(medida => medida.medidas_id === parseInt(id));
    setSelectedMedidas({ id, nombre, puntos: selectedMedida.puntos });
    setPuntos(selectedMedida.puntos); // Actualiza los puntos
    handleSelectChange("medidas", id, nombre);
  };

  const handleSelectMaterialFranjaChange = (event) => {
    const index = event.target.selectedIndex;
    const nombre = event.target.options[index].text;
    const id = event.target.value;
    setSelectedMaterialFranja({ id, nombre });
    handleSelectChange("materialFranja", id, nombre);
  };

  const handleSelectColorFranjaChange = (event) => {
    const index = event.target.selectedIndex;
    const nombre = event.target.options[index].text;
    const id = event.target.value;
    setSelectedColorFranja({ id, nombre });
    handleSelectChange("colorFranja", id, nombre);
  };

  const handleSelectEspecialChange = (especialIndex, event) => {
    const index = event.target.selectedIndex;
    const nombre = event.target.options[index].text;
    const id = event.target.value;
    const selectedEspecial = listEspeciales.find(especial => especial.articulo_id === parseInt(id));

    if (especialIndex === 1) {
      setSelectedEspecial1({ id, nombre, puntos: selectedEspecial.puntos });
      setPuntosEspecial1(selectedEspecial.puntos);
      setCantidadEspecial1(1);
    } else if (especialIndex === 2) {
      setSelectedEspecial2({ id, nombre, puntos: selectedEspecial.puntos });
      setPuntosEspecial2(selectedEspecial.puntos);
      setCantidadEspecial2(1);
    }
  };

  const handleCantidadEspecialChange = (especialIndex, event) => {
    const value = parseInt(event.target.value, 10);

    if (especialIndex === 1) {
      setCantidadEspecial1(isNaN(value) ? 1 : value);
      setPuntosEspecial1(selectedEspecial1.puntos * (isNaN(value) ? 1 : value));
    } else if (especialIndex === 2) {
      setCantidadEspecial2(isNaN(value) ? 1 : value);
      setPuntosEspecial2(selectedEspecial2.puntos * (isNaN(value) ? 1 : value));
    }
  };

  const handleCantidadChange = (event) => {
    const newCantidad = parseInt(event.target.value, 10);
    setCantidad(newCantidad);
  };

  return (
    <div className="container">
      <div className="section">
        <div className="container2">
          <h1>Frentes</h1>
          <div className="field">
            <label htmlFor="producto">Tipo de Frente:</label>
            <select id="producto" onChange={handleSelectProductChange} value={selectedProducto.id || ""}>
              <option disabled={selectedProducto.id !== ""}>--Selecciona una opción--</option>
              {listProducto.map((producto) => (
                <option key={producto.producto_id} value={producto.producto_id}>
                  {producto.nombre}
                </option>
              ))}
            </select>
          </div>
          <div className="field">
            <label htmlFor="serie">Serie:</label>
            <select id="serie" disabled={true} onChange={handleSelectSerieChange} value={selectedSerie.id || ""}>
              <option value="" disabled={selectedProducto.id === ""}>--Selecciona una opción--</option>
              {listSerie.map((serie) => (
                <option key={serie.serie_id} value={serie.serie_id}>
                  {serie.nombre}
                </option>
              ))}
            </select>
          </div>
          <div className="field">
            <label htmlFor="articulo">Modelo:</label>
            <select id="articulo" disabled={true} onChange={handleSelectArticuloChange} value={selectedArticulo.id || ""}>
              <option value="" disabled={selectedProducto.id === ""}>--Selecciona una opción--</option>
              {listArticulo.map((articulo) => (
                <option key={articulo.articulo_id} value={articulo.articulo_id}>
                  {articulo.nombre}
                </option>
              ))}
            </select>
          </div>
          <div className="field">
            <label htmlFor="material">Material:</label>
            <select id="material" disabled={true} onChange={handleSelectMaterialChange} value={selectedMaterial.id || ""}>
              <option value="" disabled={selectedArticulo.id === ""}>--Selecciona una opción--</option>
              {listMaterial.map((material) => (
                <option key={material.material_id} value={material.material_id}>
                  {material.nombre}
                </option>
              ))}
            </select>
          </div>
          <div className="field">
            <label htmlFor="color">Color Principal:</label>
            <select id="color" disabled={true} onChange={handleSelectColorChange} value={selectedColor.id || ""}>
              <option value="" disabled={selectedProducto.id === ""}>--Selecciona una opción--</option>
              {listColor.map((color) => (
                <option key={color.color_id} value={color.color_id}>
                  {color.nombre}
                </option>
              ))}
            </select>
          </div>
          <div className="field">
            <label htmlFor="medidas">Medidas:</label>
            <select id="medidas" disabled={true} onChange={handleSelectMedidasChange} value={selectedMedidas.id || ""}>
              <option value="" disabled={selectedArticulo.id === ""}>--Selecciona una opción--</option>
              {listMedidas.map((medidas) => (
                <option key={medidas.medidas_id} value={medidas.medidas_id}>
                  {medidas.medidas}
                </option>
              ))}
            </select>
          </div>
          <div className="field">
            <label htmlFor="materialFranja">Material Franja:</label>
            <select id="materialFranja" disabled={!franjaActiva} onChange={handleSelectMaterialFranjaChange} value={selectedMaterialFranja.id || ""}>
              <option value="" >--Selecciona una opción--</option>
              {listMaterialFranja.map((material) => (
                <option key={material.material_id} value={material.material_id}>
                  {material.nombre}
                </option>
              ))}
            </select>
          </div>
          <div className="field">
            <label htmlFor="colorFranja">Color Franja:</label>
            <select id="colorFranja" disabled={!franjaActiva} onChange={handleSelectColorFranjaChange} value={selectedColorFranja.id || ""}>
              <option value="" disabled={selectedArticulo.id === ""}>--Selecciona una opción--</option>
              {listColorFranja.map((color) => (
                <option key={color.color_id} value={color.color_id}>
                  {color.nombre}
                </option>
              ))}
            </select>
          </div>
          <div className="field-centered">
            <label htmlFor="cantidad">Cantidad:</label>
            <input type="number" id="cantidad" value={cantidad} onChange={handleCantidadChange} min="0" />
          </div>
          <div className="field-centered">
            <label htmlFor="puntos">Puntos: {puntos * cantidad}</label>
          </div>
        </div>
      </div>
  
      <div className="section">
        <div className="container4">
          <h2>Especiales a Medida</h2>
          <div className="field-special">
            <label htmlFor="especial1">Artículo Especial 1:</label>
            <select
              id="especial1"
              onChange={(event) => handleSelectEspecialChange(1, event)}
              value={selectedEspecial1.id || ""}
            >
              <option value="" disabled={selectedEspecial1.id !== ""}>--Selecciona una opción--</option>
              {listEspeciales.map((especial) => (
                <option key={especial.articulo_id} value={especial.articulo_id}>
                  {especial.articulo_nombre}
                </option>
              ))}
            </select>
          </div>
          
          <div className="field-special">
            <label htmlFor="cantidadEspecial1">Cantidad:</label>
            <input
              type="number"
              id="cantidadEspecial1"
              value={cantidadEspecial1}
              onChange={(event) => handleCantidadEspecialChange(1, event)}
              min="0"
            />
          </div>
          <div className="fake-field-special">
            <label htmlFor="especial2">Puntos:</label>
            <select disabled>
              <option value="" disabled>{puntosEspecial1}</option>
            </select>
            
          </div>
          <div className="field-special">
            <label htmlFor="especial2">Artículo Especial 2:</label>
            <select
              id="especial2"
              onChange={(event) => handleSelectEspecialChange(2, event)}
              value={selectedEspecial2.id || ""}
            >
              <option value="" disabled={selectedEspecial2.id !== ""}>--Selecciona una opción--</option>
              {listEspeciales.map((especial) => (
                <option key={especial.articulo_id} value={especial.articulo_id}>
                  {especial.articulo_nombre}
                </option>
              ))}
            </select>
          </div>
          
          <div className="field-special">
            <label htmlFor="cantidadEspecial2">Cantidad:</label>
            <input
              type="number"
              id="cantidadEspecial2"
              value={cantidadEspecial2}
              onChange={(event) => handleCantidadEspecialChange(2, event)}
              min="0"
            />
          </div>
          <div className="fake-field-special">
            <label htmlFor="especial2">Puntos:</label>
            <select disabled>
              <option value="" disabled>{puntosEspecial2}</option>
            </select>
            
          </div>
        </div>
      </div>
    </div>
  );
  
  
  
  

}

export default Frentes;
