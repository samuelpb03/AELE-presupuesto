import React, { useState, useEffect } from "react";
import axios from "axios";
import { useTabs } from './TabsContext';
import { useData } from './context/DataContext';

function Tiradores() {
  const { handleSelectChangeF } = useTabs();
  const { data, saveData } = useData();
  const [listTiradores, setListTiradores] = useState([]);
  const [listCerraduras, setListCerraduras] = useState([]);
  const [listColor, setListColor] = useState(Array(6).fill([])); // Inicializar como array de arrays
  const [selectedArticulos, setSelectedArticulos] = useState(Array(6).fill({ id: "", nombre: "", puntos: 0, serieId: "" }));
  const [selectedColores, setSelectedColores] = useState(Array(6).fill({ id: "", nombre: "" }));
  var [cantidades, setCantidades] = useState(Array(6).fill(0));
  const [puntos, setPuntos] = useState(Array(6).fill(0));

  const backendUrl = 'http://194.164.166.129:6969'; // URL de ngrok para el backend
  
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) {
      window.location.href = '/login.php'; // Redirigir a login.php si no está autenticado
    }
  }, []);

  useEffect(() => {
    if (data.tiradores) {
      const restoredArticulos = Array(6).fill({ id: "", nombre: "", puntos: 0, serieId: "" });
      const restoredColores = Array(6).fill({ id: "", nombre: "" });
      const restoredCantidades = Array(6).fill(1);
      const restoredPuntos = Array(6).fill(0);

      for (let i = 0; i < 6; i++) {
        restoredArticulos[i] = {
          id: data.tiradores[`articulo${i + 1}Id`] || "",
          nombre: data.tiradores[`articulo${i + 1}Nombre`] || "",
          puntos: data.tiradores[`articulo${i + 1}Puntos`] || 0,
          serieId: data.tiradores[`articulo${i + 1}SerieId`] || "",
        };
        restoredColores[i] = {
          id: data.tiradores[`color${i + 1}Id`] || "",
          nombre: data.tiradores[`color${i + 1}Nombre`] || "",
        };
        restoredCantidades[i] = data.tiradores[`cantidad${i + 1}`] || 1;
        restoredPuntos[i] = data.tiradores[`puntos${i + 1}`] || 0;
      }

      setSelectedArticulos(restoredArticulos);
      setSelectedColores(restoredColores);
      setCantidades(restoredCantidades);
      setPuntos(restoredPuntos);
    }
  }, []);

  useEffect(() => {
    const formattedData = selectedArticulos.reduce((acc, articulo, index) => {
      acc[`articulo${index + 1}Nombre`] = articulo.nombre;
      acc[`articulo${index + 1}Id`] = articulo.id;
      acc[`articulo${index + 1}Puntos`] = articulo.puntos;
      acc[`articulo${index + 1}SerieId`] = articulo.serieId;
      acc[`color${index + 1}Nombre`] = selectedColores[index].nombre;
      acc[`color${index + 1}Id`] = selectedColores[index].id;
      acc[`cantidad${index + 1}`] = cantidades[index];
      acc[`puntos${index + 1}`] = puntos[index];
      return acc;
    }, {});
    saveData("tiradores", formattedData);
  }, [selectedArticulos, selectedColores, cantidades, puntos, saveData]);

  useEffect(() => {
    axios.get(`${backendUrl}/articulo/tiradores`, {
      headers: {
        'ngrok-skip-browser-warning': 'true'
      }
    })
      .then((res) => {
        if (Array.isArray(res.data)) {
          setListTiradores(res.data);
        } else {
          console.error("Error fetching tiradores: res.data is not an array");
        }
      })
      .catch((error) => {
        console.error("Error fetching tiradores:", error);
      });

    axios.get(`${backendUrl}/articulo/cerraduras`, {
      headers: {
        'ngrok-skip-browser-warning': 'true'
      }
    })
      .then((res) => {
        if (Array.isArray(res.data)) {
          setListCerraduras(res.data);
        } else {
          console.error("Error fetching cerraduras: res.data is not an array");
        }
      })
      .catch((error) => {
        console.error("Error fetching cerraduras:", error);
      });
  }, [backendUrl]);

  useEffect(() => {
    selectedArticulos.forEach((articulo, index) => {
      if (articulo.id) {
        axios.get(`${backendUrl}/materialesPorArticulo`, {
          headers: {
            'ngrok-skip-browser-warning': 'true'
          },
          params: { articuloId: articulo.id }
        })
          .then((materialRes) => {
            const materialId = materialRes.data.length > 0 ? materialRes.data[0].material : null;
            if (materialId) {
              axios.get(`${backendUrl}/color`, {
                headers: {
                  'ngrok-skip-browser-warning': 'true'
                },
                params: { materialId }
              })
                .then((coloresRes) => {
                  if (Array.isArray(coloresRes.data)) {
                    setListColor((prevListColor) => {
                      const newListColor = [...prevListColor];
                      newListColor[index] = coloresRes.data;
                      return newListColor;
                    });
                  } else {
                    console.error("Error fetching colores: res.data is not an array");
                  }
                })
                .catch((error) => {
                  console.error("Error fetching colores:", error);
                });
            }
          })
          .catch((error) => {
            console.error("Error fetching material:", error);
          });
      }
    });
  }, [selectedArticulos, backendUrl]);

  const handleSelectArticuloChange = async (index, event, isCerradura = false) => {
    const updatedArticulos = [...selectedArticulos];
    const updatedCantidades = [...cantidades];
    const selectedIndex = event.target.selectedIndex;
    const nombre = event.target.options[selectedIndex].text;
    const id = event.target.value;
    const serieId = event.target.options[selectedIndex].getAttribute('data-serie-id');
    updatedArticulos[index] = { id, nombre, puntos: 0, serieId };
    setSelectedArticulos(updatedArticulos);

    // Set cantidad to 1 if an article is selected
    if (id) {
      updatedCantidades[index] = 1;
    }
    setCantidades(updatedCantidades);

    try {
      const materialRes = await axios.get(`${backendUrl}/materialesPorArticulo`, {
        headers: {
          'ngrok-skip-browser-warning': 'true'
        },
        params: { articuloId: id }
      });
      const materialId = materialRes.data.length > 0 ? materialRes.data[0].material : null;
      if (materialId) {
        console.log(`Material ID for articuloId ${id}: ${materialId}`);
        const medidasRes = await axios.get(`${backendUrl}/medidasConPuntos`, {
          headers: {
            'ngrok-skip-browser-warning': 'true'
          },
          params: { articuloId: id, materialId }
        });
        const selectedArticulo = medidasRes.data.length > 0 ? medidasRes.data[0] : { puntos: 0 };
        const puntos = selectedArticulo.puntos;

        updatedArticulos[index].puntos = puntos; // Actualizar los puntos en el estado de selectedArticulos
        setSelectedArticulos(updatedArticulos);

        setPuntos(prevPuntos => {
          const newPuntos = [...prevPuntos];
          newPuntos[index] = puntos * updatedCantidades[index];
          return newPuntos;
        });

        const coloresRes = await axios.get(`${backendUrl}/color`, {
          headers: {
            'ngrok-skip-browser-warning': 'true'
          },
          params: { materialId }
        });
        if (Array.isArray(coloresRes.data)) {
          setListColor(prevListColor => {
            const newListColor = [...prevListColor];
            newListColor[index] = coloresRes.data; // Actualizar solo el índice correspondiente
            return newListColor;
          });

          // Guardar los colores en el estado local para que se mantengan al cambiar de pestaña
          const updatedColores = [...selectedColores];
          if (updatedColores[index].id === "") {
            updatedColores[index] = { id: coloresRes.data[0].color_id, nombre: coloresRes.data[0].nombre };
            setSelectedColores(updatedColores);
            handleSelectChangeF(`color${index + 1}`, coloresRes.data[0].color_id, coloresRes.data[0].nombre);
          }
        } else {
          console.error("Error fetching colores: res.data is not an array");
        }
      }
    } catch (error) {
      console.error("Error fetching puntos o colores:", error);
    }

    handleSelectChangeF(`articulo${index + 1}`, id, nombre);
  };

  const handleSelectColorChange = (index, event) => {
    const updatedColores = [...selectedColores];
    const selectedIndex = event.target.selectedIndex;
    const nombre = event.target.options[selectedIndex].text;
    const id = event.target.value;

    updatedColores[index] = { id, nombre };
    setSelectedColores(updatedColores);

    handleSelectChangeF(`color${index + 1}`, id, nombre);
  };

  const handleCantidadChange = (index, event) => {
    const value = parseInt(event.target.value, 10);
    const updatedCantidades = [...cantidades];
    updatedCantidades[index] = isNaN(value) ? 1 : value;
    setCantidades(updatedCantidades);

    setPuntos(prevPuntos => {
      const newPuntos = [...prevPuntos];
      newPuntos[index] = selectedArticulos[index].puntos * updatedCantidades[index];
      return newPuntos;
    });
  };

  const renderSelectArticulo = (index, isCerradura = false) => (
    <div key={index}>
      <label htmlFor={`articulo${index + 1}`}>Artículo {index + 1}:</label>
      <select
        id={`articulo${index + 1}`}
        onChange={(event) => handleSelectArticuloChange(index, event, isCerradura)}
        value={selectedArticulos[index].id || ""}
      >
        <option value="">--Selecciona una opción--</option>
        {(isCerradura ? listCerraduras : listTiradores).map((articulo) => (
          <option key={articulo.articulo_id} value={articulo.articulo_id} data-serie-id={articulo.serie_id}>
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
        <option value="">--Selecciona una opción--</option>
        {(listColor[index] || []).map((color) => (
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
        min="1"
      />
      <label htmlFor={`puntos${index + 1}`}>Puntos: {puntos[index]}</label>
    </div>
  );

  return (
    <div className="container">
      <div className="section">
      <div className="container2">
        <h1>Tiradores</h1>
        <div className="field">
        {renderSelectArticulo(2)}
        </div>
        <div className="field">
        {renderSelectArticulo(3)}
        </div>
        <div className="field">
        {renderSelectArticulo(4)}
        </div>
        <div className="field">
        {renderSelectArticulo(5)}
        </div>
        </div>
      <div className="container2">
      <div className="section">
      
        <h1>Cerraduras</h1>
        <div className="field-special">
        {renderSelectArticulo(0, true)}
        </div>
      </div>
    </div>
    </div>
    </div>
  );
}

export default Tiradores;

