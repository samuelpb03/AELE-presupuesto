import React, { useState, useEffect } from "react";
import axios from "axios";
import { useTabs } from "./TabsContext";
import { useData } from './context/DataContext';



function Interiores() {
  const { handleSelectChangeG } = useTabs();
  const { data, saveData } = useData();
  const [listArticulo, setListArticulo] = useState([]);
  const [listEspeciales, setListEspeciales] = useState([]);
  const [listColores, setListColores] = useState([]);  // Estado para los colores
  const [listInterioresOtros, setListInterioresOtros] = useState([]);
  const [selectedInterioresOtros, setSelectedInterioresOtros] = useState(Array(4).fill({ id: "", nombre: "", puntos: 0 }));
  const [cantidadesInterioresOtros, setCantidadesInterioresOtros] = useState(Array(4).fill(0));
  const [puntosInterioresOtros, setPuntosInterioresOtros] = useState(Array(4).fill(0));

  const [selectedArticulos, setSelectedArticulos] = useState(Array(6).fill({ id: "", nombre: "", puntos: 0 }));
  const [selectedColores, setSelectedColores] = useState(Array(6).fill({ id: "", nombre: "" }));  // Estado para los colores seleccionados
  const [cantidades, setCantidades] = useState(Array(6).fill(0));
  const [puntos, setPuntos] = useState(Array(6).fill(0));

  const [selectedEspecial1, setSelectedEspecial1] = useState({ id: "", nombre: "", puntos: 0 });
  const [selectedEspecial2, setSelectedEspecial2] = useState({ id: "", nombre: "", puntos: 0 });
  const [selectedEspecial3, setSelectedEspecial3] = useState({ id: "", nombre: "", puntos: 0 });
  const [selectedEspecial4, setSelectedEspecial4] = useState({ id: "", nombre: "", puntos: 0 });
  const [selectedEspecial5, setSelectedEspecial5] = useState({ id: "", nombre: "", puntos: 0 });
  const [cantidadEspecial3, setCantidadEspecial3] = useState(0);
  const [cantidadEspecial4, setCantidadEspecial4] = useState(0);
  const [cantidadEspecial5, setCantidadEspecial5] = useState(0);
  const [puntosEspecial3, setPuntosEspecial3] = useState(0);
  const [puntosEspecial4, setPuntosEspecial4] = useState(0);
  const [puntosEspecial5, setPuntosEspecial5] = useState(0);
  const [cantidadEspecial1, setCantidadEspecial1] = useState(0);
  const [cantidadEspecial2, setCantidadEspecial2] = useState(0);
  const [puntosEspecial1, setPuntosEspecial1] = useState(0);
  const [puntosEspecial2, setPuntosEspecial2] = useState(0);

  const backendUrl = 'http://194.164.166.129:6969'; // URL de ngrok para el backend
  const user = localStorage.getItem('user');
  if (!user) {
    //Redirigir a login.php si no está autenticado
    window.location.href = '/login.php';
  }
  useEffect(() => {
    axios
      .get(`${backendUrl}/articulo/interiores`, {
        headers: {
          'ngrok-skip-browser-warning': 'true'
        }
      })
      .then((res) => {
        if (Array.isArray(res.data)) {
          const sortedArticulos = res.data.sort((a, b) => a.nombre.localeCompare(b.nombre));
          setListArticulo(sortedArticulos);
        } else {
          console.error("Error fetching articulos: res.data is not an array");
        }
      })
      .catch((error) => {
        console.error("Error fetching articulos:", error);
      });

    axios
      .get(`${backendUrl}/especialesConPuntos`, {
        headers: {
          'ngrok-skip-browser-warning': 'true'
        }
      })
      .then((res) => {
        if (Array.isArray(res.data)) {
          setListEspeciales(res.data);
        } else {
          console.error("Error fetching especiales: res.data is not an array");
        }
      })
      .catch((error) => {
        console.error("Error fetching especiales:", error);
      });

    // Obtener la lista de colores
    axios.get(`${backendUrl}/color`, {
      headers: {
        'ngrok-skip-browser-warning': 'true'
      },
      params: { materialId: 3 }  // Material ID fijo en 3
    }).then((res) => {
      if (Array.isArray(res.data)) {
        setListColores(res.data);
      } else {
        console.error("Error fetching colores: res.data is not an array");
      }
    }).catch(error => {
      console.error("Error fetching colores:", error);
    });
  }, [backendUrl]);
  useEffect(() => {
    axios
      .get(`${backendUrl}/articulo/interioresOtros`, {
        headers: {
          'ngrok-skip-browser-warning': 'true'
        }
      })
      .then((res) => {
        if (Array.isArray(res.data)) {
          const sortedArticulos = res.data.sort((a, b) => a.nombre.localeCompare(b.nombre));
          setListInterioresOtros(sortedArticulos);  // Cambia aquí para guardar en el estado correcto
        } else {
          console.error("Error fetching interioresOtros: res.data is not an array");
        }
      })
      .catch((error) => {
        console.error("Error fetching interioresOtros:", error);
      });
  }, [backendUrl]);
  useEffect(() => {
    if (data && data.interiores) {
      const restoredArticulos = Array(6).fill({ id: "", nombre: "", puntos: 0 });
      const restoredColores = Array(6).fill({ id: "", nombre: "" });
      const restoredCantidades = Array(6).fill(0);
      const restoredPuntos = Array(6).fill(0);
      
      const restoredInterioresOtros = Array(4).fill({ id: "", nombre: "", puntos: 0 });
      const restoredCantidadesOtros = Array(4).fill(0);
      const restoredPuntosOtros = Array(4).fill(0);
  
      for (let i = 0; i < 6; i++) {
        restoredArticulos[i] = {
          id: data.interiores[`articulo${i + 1}Id`] || "",
          nombre: data.interiores[`articulo${i + 1}Nombre`] || "",
          puntos: data.interiores[`articulo${i + 1}Puntos`] || 0,
        };
        restoredColores[i] = {
          id: data.interiores[`color${i + 1}Id`] || "",
          nombre: data.interiores[`color${i + 1}Nombre`] || "",
        };
        restoredCantidades[i] = data.interiores[`cantidad${i + 1}`] || 0;
        restoredPuntos[i] = (data.interiores[`articulo${i + 1}Puntos`] || 0) * (data.interiores[`cantidad${i + 1}`] || 0);
      }
  
      for (let i = 0; i < 4; i++) {
        restoredInterioresOtros[i] = {
          id: data.interiores[`interioresOtros${i + 1}Id`] || "",
          nombre: data.interiores[`interioresOtros${i + 1}Nombre`] || "",
          puntos: data.interiores[`interioresOtros${i + 1}Puntos`] || 0,
        };
        restoredCantidadesOtros[i] = data.interiores[`cantidadInterioresOtros${i + 1}`] || 0;
        restoredPuntosOtros[i] = data.interiores[`puntosInterioresOtros${i + 1}`] || 0;
      }
  
      setSelectedArticulos(restoredArticulos);
      setSelectedColores(restoredColores);
      setCantidades(restoredCantidades);
      setPuntos(restoredPuntos);
      
      setSelectedInterioresOtros(restoredInterioresOtros);
      setCantidadesInterioresOtros(restoredCantidadesOtros);
      setPuntosInterioresOtros(restoredPuntosOtros);

      setSelectedEspecial1({
        id: data.interiores.selectedEspecial1Id || "",
        nombre: data.interiores.selectedEspecial1Nombre || "",
        puntos: data.interiores.selectedEspecial1Puntos || 0,
      });
      setSelectedEspecial2({
        id: data.interiores.selectedEspecial2Id || "",
        nombre: data.interiores.selectedEspecial2Nombre || "",
        puntos: data.interiores.selectedEspecial2Puntos || 0,
      });
      setSelectedEspecial3({
        id: data.interiores.selectedEspecial3Id || "",
        nombre: data.interiores.selectedEspecial3Nombre || "",
        puntos: data.interiores.selectedEspecial3Puntos || 0,
      });
      setSelectedEspecial4({
        id: data.interiores.selectedEspecial4Id || "",
        nombre: data.interiores.selectedEspecial4Nombre || "",
        puntos: data.interiores.selectedEspecial4Puntos || 0,
      });
      setSelectedEspecial5({
        id: data.interiores.selectedEspecial5Id || "",
        nombre: data.interiores.selectedEspecial5Nombre || "",
        puntos: data.interiores.selectedEspecial5Puntos || 0,
      });
      setCantidadEspecial3(data.interiores.cantidadEspecial3 || 0);
      setCantidadEspecial4(data.interiores.cantidadEspecial4 || 0);
      setCantidadEspecial5(data.interiores.cantidadEspecial5 || 0);
      setPuntosEspecial3((data.interiores.selectedEspecial3Puntos || 0) * (data.interiores.cantidadEspecial3 || 0));
      setPuntosEspecial4((data.interiores.selectedEspecial4Puntos || 0) * (data.interiores.cantidadEspecial4 || 0));
      setPuntosEspecial5((data.interiores.selectedEspecial5Puntos || 0) * (data.interiores.cantidadEspecial5 || 0));
      setCantidadEspecial1(data.interiores.cantidadEspecial1 || 0);
      setCantidadEspecial2(data.interiores.cantidadEspecial2 || 0);
      setPuntosEspecial1((data.interiores.selectedEspecial1Puntos || 0) * (data.interiores.cantidadEspecial1 || 0));
      setPuntosEspecial2((data.interiores.selectedEspecial2Puntos || 0) * (data.interiores.cantidadEspecial2 || 0));
    }
  }, []);

  useEffect(() => {
    const formattedData = selectedArticulos.reduce((acc, articulo, index) => {
      acc[`articulo${index + 1}Nombre`] = articulo.nombre;
      acc[`articulo${index + 1}Id`] = articulo.id;
      acc[`articulo${index + 1}Puntos`] = articulo.puntos;
      acc[`color${index + 1}Nombre`] = selectedColores[index].nombre;  // Guardar el nombre del color
      acc[`color${index + 1}Id`] = selectedColores[index].id;  // Guardar el ID del color
      acc[`cantidad${index + 1}`] = cantidades[index];
      acc[`puntos${index + 1}`] = puntos[index];
      
      return acc;
    }, {});
    // Guardar datos de interioresOtros
  selectedInterioresOtros.forEach((articulo, index) => {
    formattedData[`interioresOtros${index + 1}Nombre`] = articulo.nombre;
    formattedData[`interioresOtros${index + 1}Id`] = articulo.id;
    formattedData[`interioresOtros${index + 1}Puntos`] = articulo.puntos;
    formattedData[`cantidadInterioresOtros${index + 1}`] = cantidadesInterioresOtros[index];
    formattedData[`puntosInterioresOtros${index + 1}`] = puntosInterioresOtros[index];
  });
    formattedData.selectedEspecial1Id = selectedEspecial1.id;
    formattedData.selectedEspecial1Nombre = selectedEspecial1.nombre;
    formattedData.selectedEspecial1Puntos = selectedEspecial1.puntos;
    formattedData.selectedEspecial2Id = selectedEspecial2.id;
    formattedData.selectedEspecial2Nombre = selectedEspecial2.nombre;
    formattedData.selectedEspecial2Puntos = selectedEspecial2.puntos;
    formattedData.cantidadEspecial1 = cantidadEspecial1;
    formattedData.cantidadEspecial2 = cantidadEspecial2;
    formattedData.puntosEspecial1 = puntosEspecial1;
    formattedData.puntosEspecial2 = puntosEspecial2;
    formattedData.selectedEspecial3Id = selectedEspecial3.id;
    formattedData.selectedEspecial3Nombre = selectedEspecial3.nombre;
    formattedData.selectedEspecial3Puntos = selectedEspecial3.puntos;
    formattedData.selectedEspecial4Id = selectedEspecial4.id;
    formattedData.selectedEspecial4Nombre = selectedEspecial4.nombre;
    formattedData.selectedEspecial4Puntos = selectedEspecial4.puntos;
    formattedData.selectedEspecial5Id = selectedEspecial5.id;
    formattedData.selectedEspecial5Nombre = selectedEspecial5.nombre;
    formattedData.selectedEspecial5Puntos = selectedEspecial5.puntos;
    formattedData.cantidadEspecial3 = cantidadEspecial3;
    formattedData.cantidadEspecial4 = cantidadEspecial4;
    formattedData.cantidadEspecial5 = cantidadEspecial5;
    formattedData.puntosEspecial3 = puntosEspecial3;
    formattedData.puntosEspecial4 = puntosEspecial4;
    formattedData.puntosEspecial5 = puntosEspecial5;

    saveData("interiores", formattedData);
  }, [
    selectedArticulos,
    selectedColores,
    cantidades,
    puntos,
    selectedEspecial1,
    selectedEspecial2,
    cantidadEspecial1,
    cantidadEspecial2,
    puntosEspecial1,
    selectedInterioresOtros,
    puntosEspecial2,
    saveData
    
  ]);

/**
 * Handles a change in the articulo select input.
 * @param {number} index The index of the changed articulo.
 * @param {Event} event The change event.
 */
  const handleSelectArticuloChange = (index, event) => {
    const selectedIndex = event.target.selectedIndex;
    const articuloNombre = event.target.options[selectedIndex].text;
    const articuloId = event.target.value;
    const articuloPuntos = parseInt(
      event.target.options[selectedIndex].getAttribute('data-puntos'),
      10
    );

    setSelectedArticulos((prevArticulos) => {
      const newArticulos = [...prevArticulos];
      newArticulos[index] = { id: articuloId, nombre: articuloNombre, puntos: articuloPuntos };
      return newArticulos;
    });

    if (articuloId) {
      setCantidades((prevCantidades) => {
        const newCantidades = [...prevCantidades];
        newCantidades[index] = 1;
        return newCantidades;
      });

      setPuntos((prevPuntos) => {
        const newPuntos = [...prevPuntos];
        newPuntos[index] = articuloPuntos;
        return newPuntos;
      });
    }

    handleSelectChangeG(`articulo${index + 1}`, articuloId, articuloNombre);
  };

  const handleSelectColorChange = (index, event) => {
    const updatedColores = [...selectedColores];
    const selectedIndex = event.target.selectedIndex;
    const nombre = event.target.options[selectedIndex].text;
    const id = event.target.value;

    updatedColores[index] = { id, nombre };
    setSelectedColores(updatedColores);

    handleSelectChangeG(`color${index + 1}`, id, nombre);
  };

  const handleCantidadChange = (index, event) => {
    const updatedCantidades = [...cantidades];
    const value = parseInt(event.target.value, 10);
    updatedCantidades[index] = isNaN(value) ? 1 : value;
    setCantidades(updatedCantidades);
    setPuntos((prevPuntos) => {
      const newPuntos = [...prevPuntos];
      newPuntos[index] = selectedArticulos[index].puntos * updatedCantidades[index];
      return newPuntos;
    });
  };

  const handleSelectEspecialChange = (especialIndex, event) => {
    const index = event.target.selectedIndex;
    const nombre = event.target.options[index].text;
    const id = event.target.value;
    const selectedEspecial = listEspeciales.find((especial) => especial.articulo_id === parseInt(id));

    if (selectedEspecial) {
      if (especialIndex === 1) {
        setSelectedEspecial1({ id, nombre, puntos: selectedEspecial.puntos });
        setCantidadEspecial1(1);
        setPuntosEspecial1(selectedEspecial.puntos);
      } else if (especialIndex === 2) {
        setSelectedEspecial2({ id, nombre, puntos: selectedEspecial.puntos });
        setCantidadEspecial2(1);
        setPuntosEspecial2(selectedEspecial.puntos);
      }
      else if (especialIndex === 3) {
        setSelectedEspecial3({ id, nombre, puntos: selectedEspecial.puntos });
        setCantidadEspecial3(1);
        setPuntosEspecial3(selectedEspecial.puntos);
      }
      else if (especialIndex === 4) {
        setSelectedEspecial4({ id, nombre, puntos: selectedEspecial.puntos });
        setCantidadEspecial4(1);
        setPuntosEspecial4(selectedEspecial.puntos);
      }
      else if (especialIndex === 5) {
        setSelectedEspecial5({ id, nombre, puntos: selectedEspecial.puntos });
        setCantidadEspecial5(1);
        setPuntosEspecial5(selectedEspecial.puntos);
      }
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
    else if (especialIndex === 3) {
      setCantidadEspecial3(isNaN(value) ? 1 : value);
      setPuntosEspecial3(selectedEspecial3.puntos * (isNaN(value) ? 1 : value));
    }
    else if (especialIndex === 4) {
      setCantidadEspecial4(isNaN(value) ? 1 : value);
      setPuntosEspecial4(selectedEspecial4.puntos * (isNaN(value) ? 1 : value));
    }
    else if (especialIndex === 5) {
      setCantidadEspecial5(isNaN(value) ? 1 : value);
      setPuntosEspecial5(selectedEspecial5.puntos * (isNaN(value) ? 1 : value));
    }
  };
  /**
   * Manejar el cambio de selecci n de los art culos de interiores "otros"
   * @param {number} index indice del artículo que se está modificando
   * @param {Event} event Evento que se desencadena al cambiar la selección
   */
  const handleSelectInterioresOtrosChange = (index, event) => {
    const updatedInterioresOtros = [...selectedInterioresOtros];
    const selectedIndex = event.target.selectedIndex;
    const nombre = event.target.options[selectedIndex].text;
    const id = event.target.value;
    const puntos = parseInt(event.target.options[selectedIndex].getAttribute('data-puntos'), 10);
  
    updatedInterioresOtros[index] = { id, nombre, puntos };
    setSelectedInterioresOtros(updatedInterioresOtros);
  
    console.log("Seleccionado:", updatedInterioresOtros); // Log para verificar el cambio de selección
  
    if (id) {
      const updatedCantidades = [...cantidadesInterioresOtros];
      updatedCantidades[index] = 1;
      setCantidadesInterioresOtros(updatedCantidades);
      setPuntosInterioresOtros((prevPuntos) => {
        const newPuntos = [...prevPuntos];
        newPuntos[index] = puntos;
        return newPuntos;
      });
    }
  
    handleSelectChangeG(`interioresOtros${index + 1}`, id, nombre);
  };
  /**
   * Manejar el cambio de cantidad de los artículos de interiores "otros"
   * @param {number} index indice del art culo que se está modificando
   * @param {Event} event Evento que se desencadena al cambiar la cantidad
   */
  const handleCantidadInterioresOtrosChange = (index, event) => {
    const updatedCantidades = [...cantidadesInterioresOtros];
    const value = parseInt(event.target.value, 10);
    updatedCantidades[index] = isNaN(value) ? 1 : value;
    setCantidadesInterioresOtros(updatedCantidades);
    setPuntosInterioresOtros((prevPuntos) => {
      const newPuntos = [...prevPuntos];
      newPuntos[index] = selectedInterioresOtros[index].puntos * updatedCantidades[index];
      return newPuntos;
    });
  };

  /**
   * Renderizar selectores de artículos de interiores
   * @param {number} index Indice del artículo que se está renderizando
   * @returns {JSX.Element} Elemento JSX que contiene los selectores de artículos y colores, y el input de cantidad
   */
  const renderSelectArticulo = (index) => (
    <div key={index}>
      <label htmlFor={`articulo${index + 1}`}>Artículo {index + 1}:</label>
      <select
        id={`articulo${index + 1}`}
        onChange={(event) => handleSelectArticuloChange(index, event)}
        value={selectedArticulos[index].id || ""}
      >
        <option value="">--Selecciona una opción--</option>
        {listArticulo.map((articulo) => (
          <option key={articulo.articulo_id} value={articulo.articulo_id} data-puntos={articulo.puntos}>
            {articulo.nombre}
          </option>
        ))}
      </select>
      <label htmlFor={`color${index + 1}`}>Color:</label>
      <select
        id={`color${index + 1}`}
        onChange={(event) => handleSelectColorChange(index, event)}
        value={selectedColores[index].id || ""}
      >
        <option value="">--Selecciona un color--</option>
        {listColores.map((color) => (
          <option key={color.color_id} value={color.color_id}>
            {color.nombre}
          </option>
        ))}
      </select>
      <label htmlFor={`cantidad${index + 1}`}>Cantidad:</label>
      <input
        type="number"
        id={`cantidad${index + 1}`}
        value={cantidades[index]}
        onChange={(event) => handleCantidadChange(index, event)}
        min="0"
      />
      <label htmlFor={`puntos${index + 1}`}>Puntos: {puntos[index]}</label>
    </div>
  );
  /**
   * Renderizar selectores de artículos de interiores "otros"
   * @param {number} index Indice del artículo que se está renderizando
   * @returns {JSX.Element} Elemento JSX que contiene los selectores de artículos y colores, y el input de cantidad
   */
  const renderSelectInterioresOtros = (index) => (
    <div key={index}>
      <label htmlFor={`interioresOtros${index + 1}`}>Otros Artículo {index + 1}:</label>
      <select
        id={`interioresOtros${index + 1}`}
        onChange={(event) => handleSelectInterioresOtrosChange(index, event)}
        value={selectedInterioresOtros[index].id || ""}
      >
        <option value="">--Selecciona una opción--</option>
        {listInterioresOtros.map((articulo) => (
          <option key={articulo.articulo_id} value={articulo.articulo_id} data-puntos={articulo.puntos}>
            {articulo.nombre}
          </option>
        ))}
      </select>
      <label htmlFor={`cantidadInterioresOtros${index + 1}`}>Cantidad:</label>
      <input
        type="number"
        id={`cantidadInterioresOtros${index + 1}`}
        value={cantidadesInterioresOtros[index]}
        onChange={(event) => handleCantidadInterioresOtrosChange(index, event)}
        min="0"
      />
      <label htmlFor={`puntosInterioresOtros${index + 1}`}>Puntos: {puntosInterioresOtros[index]}</label>
    </div>
  );

  /**
   * Renderizar selectores de artículos especiales
   * @param {number} especialIndex Indice del artículo especial que se está renderizando (1 o 2)
   * @returns {JSX.Element} Elemento JSX que contiene los selectores de artículos especiales, y los inputs de cantidad y puntos
   */
  const renderEspecialSelect = (especialIndex) => {
    const selectedEspecial = especialIndex === 1 ? selectedEspecial1 : selectedEspecial2;
    const cantidadEspecial = especialIndex === 1 ? cantidadEspecial1 : cantidadEspecial2;
    const puntosEspecial = especialIndex === 1 ? puntosEspecial1 : puntosEspecial2;

    return (
      <div>
        <div className="field-special">
          <label htmlFor={`especial${especialIndex}`}>Artículo Especial {especialIndex}:</label>
          <select
            id={`especial${especialIndex}`}
            onChange={(event) => handleSelectEspecialChange(especialIndex, event)}
            value={selectedEspecial.id || ""}
          >
            <option value="">--Selecciona una opción--</option>
            {listEspeciales.map((especial) => (
              <option key={especial.articulo_id} value={especial.articulo_id}>
                {especial.articulo_nombre}
              </option>
            ))}
          </select>
        </div>
        <div className="field-special">
          <label htmlFor={`cantidadEspecial${especialIndex}`}>Cantidad:</label>
          <input
            type="number"
            id={`cantidadEspecial${especialIndex}`}
            value={cantidadEspecial}
            onChange={(event) => handleCantidadEspecialChange(especialIndex, event)}
            min="0"
          />
        </div>
        <div className="fake-field-special">
          <label htmlFor={`puntosEspecial${especialIndex}`}>Puntos:</label>
          <input type="text" disabled value={puntosEspecial} />
        </div>
      </div>
    );
  };
  return (
    <div className="container">
      <div className="section">
        <div className="container2">
          <h1>Interiores</h1>
          <div className="field-special">
            {renderSelectArticulo(0)}
          </div>
          <div className="field-special">
            {renderSelectArticulo(1)}
          </div>
          <div className="field-special">
            {renderSelectArticulo(2)}
          </div>
        </div>
        <div className="container2">
          <div className="field-special">
            {renderSelectArticulo(3)}
          </div>
          <div className="field-special">
            {renderSelectArticulo(4)}
          </div>
          <div className="field-special">
            {renderSelectArticulo(5)}
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
              <option value="">--Selecciona una opción--</option>
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
            <label htmlFor="puntosEspecial1">Puntos:</label>
            <select disabled>
              <option value="">{puntosEspecial1}</option>
            </select>
          </div>
          <div className="field-special">
            <label htmlFor="especial2">Artículo Especial 2:</label>
            <select
              id="especial2"
              onChange={(event) => handleSelectEspecialChange(2, event)}
              value={selectedEspecial2.id || ""}
            >
              <option value="">--Selecciona una opción--</option>
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
            <label htmlFor="puntosEspecial2">Puntos:</label>
            <select disabled>
              <option value="">{puntosEspecial2}</option>
            </select>
          </div>
          <div className="field-special">
            <label htmlFor="especial3">Artículo Especial 3:</label>
            <select
              id="especial3"
              onChange={(event) => handleSelectEspecialChange(3, event)}
              value={selectedEspecial3.id || ""}
            >
              <option value="">--Selecciona una opción--</option>
              {listEspeciales.map((especial) => (
                <option key={especial.articulo_id} value={especial.articulo_id}>
                  {especial.articulo_nombre}
                </option>
              ))}
            </select>
          </div>
          <div className="field-special">
            <label htmlFor="cantidadEspecial3">Cantidad:</label>
            <input
              type="number"
              id="cantidadEspecial3"
              value={cantidadEspecial3}
              onChange={(event) => handleCantidadEspecialChange(3, event)}
              min="0"
            />
          </div>
          <div className="fake-field-special">
            <label htmlFor="puntosEspecial2">Puntos:</label>
            <select disabled>
              <option value="">{puntosEspecial3}</option>
            </select>
          </div>
          <div className="field-special">
            <label htmlFor="especial4">Artículo Especial 4:</label>
            <select
              id="especial4"
              onChange={(event) => handleSelectEspecialChange(4, event)}
              value={selectedEspecial4.id || ""}
            >
              <option value="">--Selecciona una opción--</option>
              {listEspeciales.map((especial) => (
                <option key={especial.articulo_id} value={especial.articulo_id}>
                  {especial.articulo_nombre}
                </option>
              ))}
            </select>
          </div>
          <div className="field-special">
            <label htmlFor="cantidadEspecial4">Cantidad:</label>
            <input
              type="number"
              id="cantidadEspecial4"
              value={cantidadEspecial4}
              onChange={(event) => handleCantidadEspecialChange(4, event)}
              min="0"
            />
          </div>
          <div className="fake-field-special">
            <label htmlFor="puntosEspecial4">Puntos:</label>
            <select disabled>
              <option value="">{puntosEspecial4}</option>
            </select>
          </div>
          <div className="field-special">
            <label htmlFor="especial5">Artículo Especial 5:</label>
            <select
              id="especial5"
              onChange={(event) => handleSelectEspecialChange(5, event)}
              value={selectedEspecial5.id || ""}
            >
              <option value="">--Selecciona una opción--</option>
              {listEspeciales.map((especial) => (
                <option key={especial.articulo_id} value={especial.articulo_id}>
                  {especial.articulo_nombre}
                </option>
              ))}
            </select>
          </div>
          <div className="field-special">
            <label htmlFor="cantidadEspecial5">Cantidad:</label>
            <input
              type="number"
              id="cantidadEspecial5"
              value={cantidadEspecial5}
              onChange={(event) => handleCantidadEspecialChange(5, event)}
              min="0"
            />
          </div>
          <div className="fake-field-special">
            <label htmlFor="puntosEspecial5">Puntos:</label>
            <select disabled>
              <option value="">{puntosEspecial5}</option>
            </select>
          </div>
        </div>
          <div className="section">
            <div className="container2">
              <h2>Otros Artículos</h2>
              <div className="field">
                {renderSelectInterioresOtros(0)}
              </div>
              <div className="field">
                {renderSelectInterioresOtros(1)}
              </div>
              <div className="field">
                {renderSelectInterioresOtros(2)}
              </div>
              <div className="field">
                {renderSelectInterioresOtros(3)}
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Interiores;