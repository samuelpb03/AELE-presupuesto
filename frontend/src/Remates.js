import React, { useState, useEffect } from "react";
import axios from "axios";
import { useTabs } from "./TabsContext";
import { useData } from './context/DataContext';
import { useNavigate } from 'react-router-dom';

function Remates() {
  const { handleSelectChangeZ } = useTabs();
  const { data, saveData } = useData();
  const [showGuide, setShowGuide] = useState(false); // Estado para mostrar/ocultar la guía
  const [tipoApertura, setTipoApertura] = useState("");
  const [tipoRemate, setTipoRemate] = useState("");
  const [listArticulo, setListArticulo] = useState([]);
  const [selectedArticulos, setSelectedArticulos] = useState(
    Array(3).fill({ id: "", nombre: "", puntosOriginal: 0, puntos: 0 })
  );
  const [metros, setMetros] = useState(Array(3).fill(2.5));
  const [listOtros, setListOtros] = useState([]);
  const [shouldApplyColorIncrement, setShouldApplyColorIncrement] = useState(false); // Indica si se debe aplicar el incremento
  const [isColorValueAdded, setIsColorValueAdded] = useState(false); // Indica si el incremento ya se aplicó
  const [listColores, setListColores] = useState(Array(3).fill([]));
  const [selectedColores, setSelectedColores] = useState(Array(3).fill(""));
  const [selectedOtros, setSelectedOtros] = useState(Array(3).fill({ id: "", nombre: "", puntosOriginal: 0, puntos: 0 }));
  const [cantidadesOtros, setCantidadesOtros] = useState(Array(3).fill(0));
  const backendUrl = 'https://api.adpta.com';
  const user = localStorage.getItem('user');
  const [forceUpdate, setForceUpdate] = useState(false);
  const navigate = useNavigate();
  
  if (!user) {
    window.location.href = '/login.php';
  }

  // Cargar artículos de remates
  useEffect(() => {
    axios.get(`${backendUrl}/articulo/remates`, {
      headers: { 'ngrok-skip-browser-warning': 'true' }
    })
    .then((res) => {
      if (Array.isArray(res.data)) {
        const formattedArticulos = res.data.map((articulo) => ({
          id: articulo.articulo_id,
          material: articulo.material_id, // Asegúrate de incluir el material
          nombre: `${articulo.articulo_nombre} - ${articulo.material_nombre}`, // Formatear el nombre con el material
          puntosOriginal: articulo.puntos,
          puntos: articulo.puntos,
        }));
        setListArticulo(formattedArticulos);
      } else {
        console.error("Error fetching articulos: res.data is not an array");
      }
    })
    .catch((error) => {
      console.error("Error fetching articulos:", error);
    });
  }, []);

  // Cargar otros artículos
  useEffect(() => {
    axios.get(`${backendUrl}/articulo/otros`, {
      headers: { 'ngrok-skip-browser-warning': 'true' }
    })
    .then((res) => {
      if (Array.isArray(res.data)) {
        const formattedOtros = res.data.map((otro) => ({
          id: otro.articulo_id,
          nombre: `${otro.articulo_nombre} - ${otro.material_nombre}`,
          puntosOriginal: otro.puntos,
          puntos: otro.puntos
        }));
        setListOtros(formattedOtros);
      } else {
        console.error("Error fetching otros articulos: res.data is not an array");
      }
    })
    .catch((error) => {
      console.error("Error fetching otros articulos:", error);
    });
  }, []);
  
  const isFrentesOnly = data && 
  (data.frentes || data.frentes2 || data.frentes3) && // Hay datos en frentes, frentes 2 o frentes 3
  !data.interiores && // No hay datos en interiores
  !data.equipamiento3 && // No hay datos en otras secciones
  !data.baldas;
  useEffect(() => {
    if (tipoApertura) {
      axios.get(`${backendUrl}/articulo/remates`, {
        headers: { 'ngrok-skip-browser-warning': 'true' }
      })
      .then((res) => {
        if (Array.isArray(res.data)) {
          const formattedArticulos = res.data.map((articulo) => ({
            id: articulo.articulo_id,
            material: articulo.material_id, // Asegúrate de incluir el material
            nombre: `${articulo.articulo_nombre} - ${articulo.material_nombre}`, // Formatear el nombre con el material
            puntosOriginal: articulo.puntos,
            puntos: articulo.puntos,
          }));
          // Filtrar los artículos que coinciden con el tipo de apertura seleccionado
          let filteredArticulos = formattedArticulos.filter((articulo) => 
            articulo.nombre.includes(tipoApertura)
          );
          // Filtrar los remates a premarco si solo se han elegido frentes
          if (isFrentesOnly) {
            filteredArticulos = filteredArticulos.filter((articulo) => 
              articulo.nombre.toLowerCase().includes("premarco")
            );
          }
          setListArticulo(filteredArticulos);
        } else {
          console.error("Error fetching articulos: res.data is not an array");
        }
      })
      .catch((error) => {
        console.error("Error fetching articulos:", error);
      });
    }
  }, [tipoApertura, forceUpdate, isFrentesOnly]);

  // Filtrar artículos si es solo frentes
  const filteredArticulos = listArticulo.filter((articulo) => {
    const matchesTipoApertura = tipoApertura ? articulo.nombre.includes(tipoApertura) : true;
    return matchesTipoApertura;
  });

  // Cargar los datos iniciales desde el estado global
  useEffect(() => {
  if (data && data.remates) {
    setSelectedArticulos(data.remates.selectedArticulos || Array(3).fill({ id: "", nombre: "", puntos: 0 }));
    setMetros(data.remates.metros || Array(3).fill(0));
    setSelectedOtros(data.remates.selectedOtros || Array(3).fill({ id: "", nombre: "", puntos: 0 }));
    setCantidadesOtros(data.remates.cantidadesOtros || Array(3).fill(1));
    setTipoApertura(data.remates.tipoApertura || "");
    setTipoRemate(data.remates.tipoRemate || "");
    setSelectedColores(data.remates.selectedColores || Array(3).fill("(color de la puerta)")); // Restaurar los colores seleccionados o usar el color por defecto
    setShouldApplyColorIncrement(data.remates.shouldApplyColorIncrement || false);
    setIsColorValueAdded(data.remates.isColorValueAdded || false);

    // Verificar si el color de los frentes requiere un incremento del 20%
    if (
      data.frentes &&
      (data.frentes.color === "color según muestra" ||
        data.frentes.color === "laca según muestra" ||
        data.frentes.color === "melamina según muestra")
    ) {
      setShouldApplyColorIncrement(true);
      setIsColorValueAdded(true);

      // Aplicar el incremento del 20% a los puntos de los remates
      const updatedArticulos = [...selectedArticulos];
      updatedArticulos.forEach((articulo, index) => {
        const puntosOriginal = articulo.puntosOriginal || 0;
        const metrosActuales = metros[index] || 2.5;
        const puntosConIncremento = Math.ceil(puntosOriginal * 1.2);
        articulo.puntos = metrosActuales < 2.5
          ? puntosConIncremento
          : (metrosActuales / 2.5) * puntosConIncremento;
      });
      setSelectedArticulos(updatedArticulos);
    }
  }
}, []);

  // Guardar los datos de remates cuando cambian
  useEffect(() => {
    const rematesData = {
      selectedArticulos,
      metros,
      selectedOtros,
      cantidadesOtros,
      tipoApertura,
      tipoRemate,
      selectedColores
    };
    saveData("remates", rematesData);
  }, [selectedArticulos, metros, selectedOtros, cantidadesOtros, tipoApertura, tipoRemate, selectedColores, saveData]);

  // Función para calcular puntos
  const calculatePuntos = (articulo, metros) => {
    const puntosOriginal = articulo?.puntosOriginal || 0;
    if (metros < 2.5) {
      return puntosOriginal; // Mantener los puntos originales si los metros son menores a 2.5
    }
    return (metros / 2.5) * puntosOriginal;  // Cálculo basado en los puntos originales si metros >= 2.5
  };

  // Manejar el cambio de selección de artículos
  const handleSelectArticuloChange = (index, event) => {
    const updatedArticulos = [...selectedArticulos];
    const selectedIndex = event.target.selectedIndex;
    const id = event.target.value; // Usar el ID directamente del selector
    const nombre = event.target.options[selectedIndex].text; // Obtener el nombre completo del artículo seleccionado
    const puntosOriginal = parseInt(event.target.options[selectedIndex].getAttribute('data-puntos'), 10) || 0;

    // Extraer el material del nombre (asumiendo que está después de "-")
    const materialNombre = nombre.split(" - ")[1]?.trim() || ""; // Obtener el texto después de "-"
    
    // Convertir el nombre del material en su correspondiente ID
    const materialId = materialNombre.toLowerCase() === "chapa" ? 1 :
                       materialNombre.toLowerCase() === "laca" ? 2 :
                       materialNombre.toLowerCase() === "melamina" ? 3 : null;

    console.log(`Artículo seleccionado: ${nombre}, ID: ${id}, Material: ${materialNombre}, Material ID: ${materialId}`);

    // Actualizar el artículo seleccionado con toda la lógica existente
    updatedArticulos[index] = {
      ...updatedArticulos[index],
      id,
      nombre, // Guardar el nombre seleccionado
      material: materialId, // Guardar el ID del material
      puntosOriginal,
      puntos: puntosOriginal,
    };
    setSelectedArticulos(updatedArticulos);

    // Resetear el color seleccionado
    const updatedColores = [...selectedColores];
    updatedColores[index] = "";
    setSelectedColores(updatedColores);

    // Resetear los metros
    const updatedMetros = [...metros];
    updatedMetros[index] = 2.5;
    setMetros(updatedMetros);

    // Limpia los colores del artículo anterior
    const updatedListColores = [...listColores];
    updatedListColores[index] = [];
    setListColores(updatedListColores);

    // Forzar la actualización del componente
    setForceUpdate((prev) => !prev);
  };

  // Manejar el cambio en metros
  const handleMetrosChange = (index, event) => {
    const value = parseFloat(event.target.value) || 0;
    const updatedMetros = [...metros];
    updatedMetros[index] = value;
    setMetros(updatedMetros);
  
    // Recalcular puntos basados en los metros
    const updatedArticulos = [...selectedArticulos];
    const puntosOriginal = updatedArticulos[index]?.puntosOriginal || 0;
  
    if (isColorValueAdded) {
      // Si el incremento del 20% está activo
      const puntosConIncremento = Math.ceil(puntosOriginal * 1.2);
      updatedArticulos[index].puntos = value < 2.5
        ? puntosConIncremento // Si los metros son menores a 2.5, usar los puntos con incremento
        : (value / 2.5) * puntosConIncremento; // Calcular puntos en función de los metros
    } else {
      // Si el incremento del 20% no está activo
      updatedArticulos[index].puntos = value < 2.5
        ? puntosOriginal // Si los metros son menores a 2.5, usar los puntos originales
        : (value / 2.5) * puntosOriginal; // Calcular puntos en función de los metros
    }
  
    setSelectedArticulos(updatedArticulos);
  };

  // Manejar el cambio de selección de otros artículos
  const handleSelectOtrosChange = (index, event) => {
    const updatedOtros = [...selectedOtros];
    const selectedIndex = event.target.selectedIndex;
    const nombre = event.target.options[selectedIndex].text;
    const id = event.target.value;
    const puntosOriginal = parseInt(event.target.options[selectedIndex].getAttribute('data-puntos'), 10) || 0;

    updatedOtros[index] = { id, nombre, puntosOriginal, puntos: puntosOriginal }; // Guardar los puntos originales y puntos actuales
    setSelectedOtros(updatedOtros);

    const updatedCantidades = [...cantidadesOtros];
    updatedCantidades[index] = id ? 1 : 0;  // Reiniciar a 1 cuando se selecciona un nuevo artículo
    setCantidadesOtros(updatedCantidades);
  };

  // Manejar el cambio de cantidad para otros artículos
  const handleCantidadOtrosChange = (index, event) => {
    const newCantidades = [...cantidadesOtros];
    const value = Math.max(0, parseInt(event.target.value, 10) || 0);
    newCantidades[index] = value;
    setCantidadesOtros(newCantidades);
  };

  const handleTipoAperturaChange = (event) => {
    const value = event.target.value;
    setTipoApertura(value);
    handleSelectChangeZ("tipoApertura", value, value);
    setForceUpdate((prev) => !prev); // Forzar la actualización del componente
  
    setTimeout(() => {
      navigate('/Frentes');
      setTimeout(() => {
        navigate('/Remates');
      }, 10); // Navegar de vuelta a Remates después de 10ms
    }, 30); // Retraso de 300ms antes de la navegación rápida
  };

  const handleTipoRemateChange = (event) => {
    const value = event.target.value;
    setTipoRemate(value);
    handleSelectChangeZ("tipoRemate", value, value);
    if (tipoApertura) {
      setForceUpdate((prev) => !prev); // Forzar la actualización del componente
    }
  };

  const mapAbbreviationToFull = (value) => {
    switch (value) {
      case "pared a costado v.":
        return "pared a costado visto";
      default:
        return value;
    }
  };

  // Renderizar selectores de artículos
  const renderSelectArticulo = (index) => (
    <div key={index}>
      <label htmlFor={`articulo${index + 1}`}>Remate {index + 1}:</label>
      <select
        id={`articulo${index + 1}`}
        onChange={(event) => handleSelectArticuloChange(index, event)}
        value={selectedArticulos[index].nombre || ""} // Usar el nombre completo como valor
        disabled={!tipoApertura} // Deshabilitar si no se ha seleccionado tipoApertura
      >
        <option value="">--Selecciona una opción--</option>
        {filteredArticulos.map((articulo) => (
          <option
            key={`${articulo.id}-${articulo.material}`}
            value={articulo.nombre} // Usar el nombre completo como valor
            data-puntos={articulo.puntosOriginal}
          >
            {articulo.nombre} {/* Mostrar el nombre completo con el material */}
          </option>
        ))}
      </select>
      <p style={{ marginTop: "0.5rem", fontStyle: "italic" }}>
        {selectedArticulos[index].nombre || "--Selecciona--"}
      </p>

      <label htmlFor={`metros${index + 1}`}>Metros:</label>
      <input
        type="number"
        step="0.01"
        id={`metros${index + 1}`}
        value={metros[index]}
        onChange={(event) => handleMetrosChange(index, event)}
        min="0"
        disabled={!tipoApertura} // Deshabilitar si no se ha seleccionado tipoApertura
      />
      <label htmlFor={`puntos${index + 1}`}>Puntos: {selectedArticulos[index].puntos.toFixed(2)}</label>
      {listColores[index] && listColores[index].length > 0 && (
        <>
          <div style={{ marginTop: "1rem", display: "flex", flexDirection: "column" }}> {/* Contenedor con diseño en columna */}
            <label htmlFor={`color${index + 1}`}>Color:</label>
            <select
              id={`color${index + 1}`}
              onChange={(event) => handleSelectColorChange(index, event)}
              value={selectedColores[index]}
            >
              <option value="">--Selecciona un color--</option>
              {listColores[index].map((color, i) => (
                <option key={i} value={color.nombre}>
                  {color.nombre}
                </option>
              ))}
            </select>
          </div>
        </>
      )}
    </div>
  );

  const renderSelectOtros = (index) => (
    <div key={index}>
      <label htmlFor={`otros${index + 1}`}>Otros Artículos {index + 1}:</label>
      <select
        id={`otros${index + 1}`}
        onChange={(event) => handleSelectOtrosChange(index, event)}
        value={selectedOtros[index].id}
      >
        <option value="">--Selecciona una opción--</option>
        {listOtros.map((otro) => (
          <option key={otro.id} value={otro.id} data-puntos={otro.puntosOriginal}>
            {otro.nombre}
          </option>
        ))}
      </select>

      <label htmlFor={`cantidadesOtros${index + 1}`}>Cantidad:</label>
      <input
        type="number"
        id={`cantidadesOtros${index + 1}`}
        value={cantidadesOtros[index]}
        onChange={(e) => handleCantidadOtrosChange(index, e)}
        min="0"
      />

      <label htmlFor={`puntosOtros${index + 1}`}>Puntos: {(selectedOtros[index].puntos * cantidadesOtros[index]).toFixed(2)}</label>
    </div>
  );

  const handleSelectColorChange = (index, event) => {
    const updatedColores = [...selectedColores];
    const selectedColor = event.target.value;
    updatedColores[index] = selectedColor;
    setSelectedColores(updatedColores);
  
    // Verificar si el color seleccionado requiere un incremento del 20%
    const updatedArticulos = [...selectedArticulos];
    const metrosActuales = metros[index] || 2.5; // Usar la medida actual o 2.5 por defecto
    const puntosOriginal = updatedArticulos[index]?.puntosOriginal || 0;
  
    if (selectedColor.toLowerCase() === "laca según muestra" || selectedColor.toLowerCase() === "color según muestra" || selectedColor.toLowerCase() === "melamina según muestra") {
      setShouldApplyColorIncrement(true); // Activar el incremento
      setIsColorValueAdded(true); // Mostrar el mensaje del incremento
  
      // Aplicar el incremento del 20% a los puntos del artículo seleccionado
      const puntosConIncremento = Math.ceil(puntosOriginal * 1.2);
      updatedArticulos[index].puntos = metrosActuales < 2.5
        ? puntosConIncremento // Si los metros son menores a 2.5, usar los puntos con incremento
        : (metrosActuales / 2.5) * puntosConIncremento; // Calcular puntos en función de los metros
    } else {
      setShouldApplyColorIncrement(false); // Desactivar el incremento
      setIsColorValueAdded(false); // Ocultar el mensaje
  
      // Restaurar los puntos originales
      updatedArticulos[index].puntos = metrosActuales < 2.5
        ? puntosOriginal // Si los metros son menores a 2.5, usar los puntos originales
        : (metrosActuales / 2.5) * puntosOriginal; // Calcular puntos en función de los metros
    }
  
    setSelectedArticulos(updatedArticulos);
  };

  useEffect(() => {
    const fetchColors = async () => {
      const updatedListColores = [...listColores];
      for (let i = 0; i < selectedArticulos.length; i++) {
        const articulo = selectedArticulos[i];
        if (articulo.id && articulo.material) {
          try {
            const res = await axios.get(`${backendUrl}/color`, {
              headers: { 'ngrok-skip-browser-warning': 'true' },
              params: { materialId: articulo.material } // Enviar el materialId al backend
            });
            if (Array.isArray(res.data)) {
              updatedListColores[i] = res.data;
            } else {
              console.error("Error: La respuesta del backend no es un array. Respuesta:", res.data);
            }
          } catch (error) {
            console.error("Error fetching colores:", error);
          }
        }
      }
      setListColores(updatedListColores);
    };

    fetchColors();
  }, [selectedArticulos]);

  return (
    <div key={forceUpdate} className="container">
      <div className="container2">
      <button className="guide-button" onClick={() => setShowGuide(true)}>
          Guía
        </button>
        <h1>Configuración de Remates</h1>
        <div className="field-special">
          <label htmlFor="tipoApertura">Tipo de apertura:</label>
          <select
            id="tipoApertura"
            onChange={handleTipoAperturaChange}
            value={tipoApertura}
          >
            <option value="">--Selecciona una opción--</option>
            <option value="abat.">Abatible/Interiores</option>
            <option value="corre.">Corredero</option>
          </select>
        </div>
      </div>
      <div className="container2">
        <h1>Remates</h1>
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
        <h1>Otros Artículos</h1>
        <div className="field-special">
          {renderSelectOtros(0)}
        </div>
        <div className="field-special">
          {renderSelectOtros(1)}
        </div>
        <div className="field-special">
          {renderSelectOtros(2)}
        </div>
        {showGuide && (
        <div
          className="modal-overlay"
          onClick={(e) => {
            if (e.target.className === "modal-overlay") {
              setShowGuide(false);
            }
          }}
        >
          <div className="modal-content">
            <h2>Guía de Uso: Configuración de Remates</h2>
            <ol>
              <li>
                <strong>Seleccionar el Tipo de Apertura</strong>
                <p>En el campo "Tipo de Apertura", selecciona el tipo de apertura que deseas configurar.</p>
                <p>El tipo de apertura de los remates debe coincidir con el tipo de apertura seleccionado en los frentes.</p>
                <p>Si has seleccionado solo interiores para rematar, utiliza el mismo remate que sería para una apertura abatible.</p>
                <p>Si has seleccionado solo frentes, asegúrate de seleccionar los remates a premarco.</p>
              </li>
              <li>
                <strong>Seleccionar el Remate</strong>
                <p>En los campos de "Remate", selecciona el artículo de remate que deseas configurar.</p>
                <p>El listado de remates se filtra automáticamente según el tipo de apertura seleccionado.</p>
              </li>
              <li>
                <strong>Configurar los Metros</strong>
                <p>En el campo "Metros", introduce la longitud del remate en metros.</p>
                <p>El valor predeterminado es 2.5, pero puedes ajustarlo según tus necesidades.</p>
              </li>
              <li>
                <strong>Verificar los Puntos</strong>
                <p>Los puntos totales del remate se calculan automáticamente en función de los metros configurados.</p>
              </li>
              <li>
                <strong>Configuración de Otros Artículos</strong>
                <p>Selecciona los artículos adicionales, configura la cantidad y verifica los puntos totales.</p>
              </li>
            </ol>
            <button onClick={() => setShowGuide(false)}>Cerrar</button>
          </div>
        </div>
      )}
      </div>
    </div>
  );
}

export default Remates;
