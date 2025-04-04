import React, { useState, useEffect } from "react";
import axios from "axios";
import { useTabs } from "./TabsContext";
import { useData } from "./context/DataContext";
function Baldas() {
  const { handleSelectChangeB } = useTabs();
  const { data, saveData } = useData();
  const [listSensores, setListSensores] = useState([]); // Nueva lista para los sensores
  const [listArticulo, setListArticulo] = useState([]);
  const [showGuide, setShowGuide] = useState(false); // Estado para mostrar/ocultar la guía
  const [listArticuloIluminacion, setListArticuloIluminacion] = useState([]);
  const [listMedidas, setListMedidas] = useState(Array(12).fill([]));
  const [cantidades, setCantidades] = useState(Array(12).fill(0));
  const [selectedColorIluminacion, setSelectedColorIluminacion] = useState("");
  const [selectedArticulos, setSelectedArticulos] = useState(
    Array(12).fill({
      id: "",
      nombre: "",
    })
  );
  const [selectedMedidas, setSelectedMedidas] = useState(
    Array(12).fill({
      id: "",
      nombre: "",
      puntos: 0,
    })
  );
  const [puntosTotales, setPuntosTotales] = useState(Array(12).fill(0));
  const user = localStorage.getItem('user');

  const backendUrl = 'https://api.adpta.com'; // URL de ngrok para el backend
  if (!user) {
    //Redirigir a login.php si no está autenticado
    window.location.href = '/login.php';
  }


  useEffect(() => {
    if (data && data.baldas) {
      console.log("Datos restaurados en Baldas:", data.baldas);
  
      const restoredArticulos = Array(12).fill({ id: "", nombre: "" });
      const restoredMedidas = Array(12).fill({ id: "", nombre: "", puntos: 0 });
      const restoredCantidades = Array(12).fill(0);
      const restoredPuntosTotales = Array(12).fill(0);
      let restoredColorIluminacion = "";
  
      // Detectar el formato de los datos
      if (Array.isArray(data.baldas.selectedArticulos)) {
        // Formato de arrays (restaurado desde la base de datos)
        for (let i = 0; i < 12; i++) {
          const articulo = data.baldas.selectedArticulos[i] || {};
          restoredArticulos[i] = {
            id: articulo.id || "",
            nombre: articulo.nombre || "",
          };
  
          const medida = data.baldas.selectedMedidas?.[i] || {};
          restoredMedidas[i] = {
            id: medida.id || "",
            nombre: medida.nombre || "",
            puntos: medida.puntos || 0,
          };
  
          restoredCantidades[i] = data.baldas.cantidades?.[i] || 0;
          restoredPuntosTotales[i] = data.baldas.puntosTotales?.[i] || 0;
        }
  
        restoredColorIluminacion = data.baldas.colorIluminacion || "";
      } else {
        // Formato de objetos (estado actual)
        for (let i = 0; i < 12; i++) {
          restoredArticulos[i] = {
            id: data.baldas[`articulo${i + 1}Id`] || "",
            nombre: data.baldas[`articulo${i + 1}Nombre`] || "",
          };
  
          restoredMedidas[i] = {
            id: data.baldas[`medidas${i + 1}Id`] || "",
            nombre: data.baldas[`medidas${i + 1}Nombre`] || "",
            puntos: data.baldas[`medidas${i + 1}Puntos`] || 0,
          };
  
          restoredCantidades[i] = data.baldas[`cantidad${i + 1}`] || 0;
          restoredPuntosTotales[i] = data.baldas[`puntosTotales${i + 1}`] || 0;
        }
  
        restoredColorIluminacion = data.baldas.colorIluminacion || "";
      }
  
      setSelectedArticulos(restoredArticulos);
      setSelectedMedidas(restoredMedidas);
      setCantidades(restoredCantidades);
      setPuntosTotales(restoredPuntosTotales);
      setSelectedColorIluminacion(restoredColorIluminacion);
    }
  }, []);

useEffect(() => {
  const fetchArticulos = async () => {
    try {
      const baldasRes = await axios.get(`${backendUrl}/articulo/baldas`, {
        headers: {
          'ngrok-skip-browser-warning': 'true'
        }
      });
      if (Array.isArray(baldasRes.data)) {
        setListArticulo(baldasRes.data);
      } else {
        console.error("Error fetching articulos: res.data is not an array");
      }

      const iluminacionRes = await axios.get(`${backendUrl}/articulo/iluminacion`, {
        headers: {
          'ngrok-skip-browser-warning': 'true'
        }
      });
      if (Array.isArray(iluminacionRes.data)) {
        setListArticuloIluminacion(iluminacionRes.data);
      } else {
        console.error("Error fetching articulos: res.data is not an array");
      }

      const sensoresRes = await axios.get(`${backendUrl}/articulo/sensores`, {
        headers: {
          'ngrok-skip-browser-warning': 'true'
        }
      });
      if (Array.isArray(sensoresRes.data)) {
        setListSensores(sensoresRes.data);
      } else {
        console.error("Error fetching sensores: res.data is not an array");
      }
    } catch (error) {
      console.error("Error fetching articulos:", error);
    }
  };

  fetchArticulos();
}, [backendUrl]);

  useEffect(() => {
    // Fetch medidas for restored articulos
    const fetchMedidas = async () => {
      const updatedListMedidas = [...listMedidas];
      const promises = selectedArticulos.map(async (articulo, index) => {
        if (articulo.id) {
          try {
            const medidasRes = await axios.get(`${backendUrl}/medidas`, {
              headers: {
                'ngrok-skip-browser-warning': 'true'
              },
              params: { articuloId: articulo.id, materialId: 5 },
            });
            if (Array.isArray(medidasRes.data)) {
              updatedListMedidas[index] = medidasRes.data;
            } else {
              console.error("Error fetching medidas: res.data is not an array");
            }
          } catch (error) {
            console.error("Error fetching medidas:", error);
          }
        }
      });
      await Promise.all(promises);
      setListMedidas(updatedListMedidas);
    };

    fetchMedidas();
  }, [selectedArticulos, backendUrl]);

  useEffect(() => {
    const formattedData = selectedArticulos.reduce((acc, articulo, index) => {
      acc[`articulo${index + 1}Nombre`] = articulo.nombre;
      acc[`articulo${index + 1}Id`] = articulo.id;
      acc[`medidas${index + 1}Nombre`] = selectedMedidas[index].nombre;
      acc[`medidas${index + 1}Id`] = selectedMedidas[index].id;
      acc[`medidas${index + 1}Puntos`] = selectedMedidas[index].puntos;
      acc[`cantidad${index + 1}`] = cantidades[index];
      acc[`puntosTotales${index + 1}`] = puntosTotales[index];
      return acc;
    }, {});
    formattedData["colorIluminacion"] = selectedColorIluminacion; // Guardar el color de iluminación
    saveData("baldas", formattedData);
  }, [selectedArticulos, selectedMedidas, cantidades, puntosTotales, selectedColorIluminacion, saveData]);

  const handleSelectArticuloChange = async (index, event) => {
    const updatedArticulos = [...selectedArticulos];
    const updatedCantidades = [...cantidades];
    const selectedIndex = event.target.selectedIndex;
    const nombre = event.target.options[selectedIndex].text;
    const id = event.target.value;

    updatedArticulos[index] = { id, nombre };
    setSelectedArticulos(updatedArticulos);

    if (id) {
      updatedCantidades[index] = 1; // Set the initial value to 1 when an article is selected

      try {
        const medidasRes = await axios.get(`${backendUrl}/medidas`, {
          headers: {
            'ngrok-skip-browser-warning': 'true'
          },
          params: { articuloId: id, materialId: 5 },
        });
        if (Array.isArray(medidasRes.data)) {
          const updatedListMedidas = [...listMedidas];
          updatedListMedidas[index] = medidasRes.data;
          setListMedidas(updatedListMedidas);

          if (medidasRes.data.length > 0) {
            const firstMedida = medidasRes.data[0];
            const updatedSelectedMedidas = [...selectedMedidas];
            updatedSelectedMedidas[index] = {
              id: firstMedida.medidas_id,
              nombre: firstMedida.medidas,
              puntos: firstMedida.puntos,
            };
            setSelectedMedidas(updatedSelectedMedidas);
            handleSelectChangeB(`medidas${index + 1}`, firstMedida.medidas_id, firstMedida.medidas, firstMedida.puntos);

            // Update puntosTotales
            const updatedPuntosTotales = [...puntosTotales];
            updatedPuntosTotales[index] = firstMedida.puntos * updatedCantidades[index];
            setPuntosTotales(updatedPuntosTotales);
          }
        } else {
          console.error("Error fetching medidas: res.data is not an array");
        }
      } catch (error) {
        console.error("Error fetching medidas:", error);
      }
    } else {
      updatedCantidades[index] = 0; // Reset the value to 0 if no article is selected
      const updatedListMedidas = [...listMedidas];
      updatedListMedidas[index] = [];
      setListMedidas(updatedListMedidas);

      // Update puntosTotales
      const updatedPuntosTotales = [...puntosTotales];
      updatedPuntosTotales[index] = 0;
      setPuntosTotales(updatedPuntosTotales);
    }
    setCantidades(updatedCantidades);

    handleSelectChangeB(`articulo${index + 1}`, id, nombre);
  };

  const handleSelectMedidasChange = (index, event) => {
    const updatedMedidas = [...selectedMedidas];
    const updatedPuntosTotales = [...puntosTotales];
    const selectedIndex = event.target.selectedIndex;
    const nombre = event.target.options[selectedIndex].text;
    const id = event.target.value;
    const medidasList = listMedidas[index] || [];
    const selectedMedida = medidasList.find((medida) => medida.medidas_id === parseInt(id)) || {};
    updatedMedidas[index] = { id, nombre, puntos: selectedMedida.puntos || 0 };
    setSelectedMedidas(updatedMedidas);

    // Update puntosTotales
    updatedPuntosTotales[index] = (selectedMedida.puntos || 0) * cantidades[index];
    setPuntosTotales(updatedPuntosTotales);

    handleSelectChangeB(`medidas${index + 1}`, id, nombre, selectedMedida.puntos || 0);
  };

  const handleCantidadChange = (index, event) => {
    const updatedCantidades = [...cantidades];
    const updatedPuntosTotales = [...puntosTotales];
    const value = parseInt(event.target.value, 10);

    updatedCantidades[index] = value;
    setCantidades(updatedCantidades);

    // Update puntosTotales
    updatedPuntosTotales[index] = selectedMedidas[index].puntos * value;
    setPuntosTotales(updatedPuntosTotales);

    handleSelectChangeB(`cantidad${index + 1}`, value);
  };

  const renderSelectArticulo = (index, list, hideMedidas, isSensor = false) => (
    <div className="field-special" key={index}>
      <label className="label" htmlFor={`articulo${index + 1}`}>
        {index <= 5 ? `Baldas y divisores ${index + 1}` : isSensor ? "Sensores" : `Iluminacion ${index + 1 - 6}`}
      </label>
      <select
        id={`articulo${index + 1}`}
        onChange={(event) => handleSelectArticuloChange(index, event)}
        value={selectedArticulos[index].id || ""}
      >
        <option value="">--Selecciona una opción--</option>
        {list.map((articulo) => (
          <option key={articulo.articulo_id} value={articulo.articulo_id}>
            {articulo.nombre}
          </option>
        ))}
      </select>
      {!hideMedidas && (
        <>
          <label htmlFor={`medidas${index + 1}`}>Medidas:</label>
          <select
            id={`medidas${index + 1}`}
            onChange={(event) => handleSelectMedidasChange(index, event)}
            value={selectedMedidas[index].id || ""}
            disabled={!selectedArticulos[index].id}
          >
            <option value="">--Selecciona una opción--</option>
            {(listMedidas[index] || []).map((medida) => (
              <option key={medida.medidas_id} value={medida.medidas_id}>
                {medida.medidas}
              </option>
            ))}
          </select>
        </>
      )}
      <label htmlFor={`puntos${index + 1}`}>Puntos: {puntosTotales[index]}</label>
      <label htmlFor={`cantidad${index + 1}`}>Cantidad:</label>
      <input
        type="number"
        id={`cantidad${index + 1}`}
        value={cantidades[index]}
        onChange={(event) => handleCantidadChange(index, event)}
        min="1"
        disabled={!selectedArticulos[index].id}
      />
    </div>
  );

  return (
    <div className="container">
      <div className="container2">
        <h1>Baldas e Iluminación</h1>
        <button className="guide-button" onClick={() => setShowGuide(true)}>
            Guía
          </button>
        <div className="container2">
          <h2>Baldas y Divisores</h2>
          {Array.from({ length: 3 }).map((_, i) => renderSelectArticulo(i, listArticulo, false))}
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
            <h2>Guía de Uso: Configuración de Baldas y Divisores</h2>
            <ol>
              <li>
                <strong>Seleccionar Baldas y Divisores</strong>
                <p>En los campos de "Baldas y Divisores", selecciona los artículos que deseas configurar.</p>
                <p>Puedes elegir entre las opciones disponibles en el desplegable.</p>
              </li>
              <li>
                <strong>Seleccionar las Medidas</strong>
                <p>En el campo "Medidas", selecciona las dimensiones de las baldas o divisores.</p>
                <p>Este campo se habilitará automáticamente después de seleccionar un artículo válido.</p>
              </li>
              <li>
                <strong>Configurar la Cantidad</strong>
                <p>En el campo "Cantidad", introduce el número de unidades que deseas presupuestar.</p>
                <p>El valor predeterminado es 1, pero puedes ajustarlo según tus necesidades.</p>
              </li>
              <li>
                <strong>Verificar los Puntos</strong>
                <p>Los puntos totales de cada artículo se calculan automáticamente y se muestran al lado del campo "Cantidad".</p>
                <p>Asegúrate de que los puntos reflejen correctamente las configuraciones seleccionadas.</p>
              </li>
              <li>
                <strong>Configuración de Iluminación</strong>
                <p>Selecciona el color de iluminación y los artículos de iluminación que deseas configurar.</p>
                <p>Configura la cantidad y verifica los puntos totales.</p>
              </li>
              <li>
                <strong>Configuración de Sensores</strong>
                <p>Selecciona los sensores que deseas añadir, configura la cantidad y verifica los puntos totales.</p>
              </li>
            </ol>
            <button onClick={() => setShowGuide(false)}>Cerrar</button>
          </div>
        </div>
      )}
        <div className="container3">
          {Array.from({ length: 3 }).map((_, i) => renderSelectArticulo(i + 3, listArticulo, false))}
        </div>
        <div className="container4">
          <h1 style={{ marginTop: "40px" }}>Iluminación</h1>
          <div className="field-special">
            <label htmlFor="colorIluminacion">Color de iluminación:</label>
            <select
              id="colorIluminacion"
              onChange={(event) => {
                const colorIluminacion = event.target.value;
                setSelectedColorIluminacion(colorIluminacion);
                handleSelectChangeB("colorIluminacion", colorIluminacion, colorIluminacion);
              }}
              value={selectedColorIluminacion}
            >
              <option value="">--Selecciona una opción--</option>
              <option value="Fria">Fría</option>
              <option value="Calida">Cálida</option>
              <option value="Media">Media</option>
            </select>
          </div>
          {Array.from({ length: 3 }).map((_, i) => renderSelectArticulo(i + 6, listArticuloIluminacion, true))}
          {Array.from({ length: 1 }).map((_, i) => renderSelectArticulo(i + 9, listArticuloIluminacion, true))}
          {renderSelectArticulo(10, listSensores, true, true)}
        </div>
      </div>
    </div>
  );
}
export default Baldas;