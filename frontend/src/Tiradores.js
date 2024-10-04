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
  // IDs de los tiradores que requieren la advertencia
  const golaIds = [124, 125, 126, 25];

  // Comprobar si algún artículo seleccionado requiere advertencia
  const mostrarAdvertenciaGola = selectedArticulos.some(articulo => golaIds.includes(parseInt(articulo.id)));
  const mostrarAdvertenciaPushCajon = selectedArticulos.some(articulo => parseInt(articulo.id) === 223);

  const backendUrl = 'http://194.164.166.129:6969'; //Url para el backend

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) {
      window.location.href = '/login.php'; // Redirigir a login.php si no está autenticado
    }
  }, []);

  useEffect(() => {
    if (data.tiradores) { //Recoge los datos al volver a la pestaña
      const restoredArticulos = Array(6).fill({ id: "", nombre: "", puntos: 0, serieId: "" });
      const restoredColores = Array(6).fill({ id: "", nombre: "" });
      const restoredCantidades = Array(6).fill(1);
      const restoredPuntos = Array(6).fill(0);

      for (let i = 0; i < 6; i++) { // Bucle que accede a los datos de cada artículo de tiradores. 
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
        restoredCantidades[i] = data.tiradores[`cantidad${i + 1}`] || 0;
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
          // Ordenar alfabéticamente por el nombre del tirador
          const sortedTiradores = res.data.sort((a, b) => a.nombre.localeCompare(b.nombre));
          setListTiradores(sortedTiradores);
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
  const updatedColores = [...selectedColores]; // Añadido para actualizar los colores también
  const updatedCantidades = [...cantidades];
  const selectedIndex = event.target.selectedIndex;
  const nombre = event.target.options[selectedIndex].text;
  const id = event.target.value;
  const serieId = event.target.options[selectedIndex].getAttribute('data-serie-id');

  // Si se selecciona "--Selecciona una opción--", restablecer el artículo y el color a vacío
  if (id === "") {
    updatedArticulos[index] = { id: "", nombre: "", puntos: 0, serieId: "" };
    updatedColores[index] = { id: "", nombre: "" }; // Limpiar el color asociado
    updatedCantidades[index] = 0;
    setSelectedArticulos(updatedArticulos);
    setSelectedColores(updatedColores); // Limpiar el estado del color también
    setCantidades(updatedCantidades);
    setPuntos(prevPuntos => {
      const newPuntos = [...prevPuntos];
      newPuntos[index] = 0; // Restablecer los puntos a 0
      return newPuntos;
    });

    // Actualizar en el contexto
    handleSelectChangeF(`articulo${index + 1}`, "", "");
    handleSelectChangeF(`color${index + 1}`, "", ""); // Limpiar el color en el contexto también
    return; // Salir de la función si se selecciona "--Selecciona una opción--"
  }

  // Si se selecciona un artículo válido, procesarlo normalmente
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


  /**
   * Manejar el cambio de selección de colores
   * @param {number} index índice del color que se está modificando
   * @param {Event} event Evento que se desencadena al cambiar la selección
   */
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
            {renderSelectArticulo(0)}
          </div>
          <div className="field">
            {renderSelectArticulo(1)}
          </div>
          <div className="field">
            {renderSelectArticulo(2)}
          </div>
          <div className="field">
            {renderSelectArticulo(3)}
          </div>
          {selectedArticulos.some(articulo => golaIds.includes(parseInt(articulo.id))) && (
            <div style={{ color: 'red', textAlign: 'right', marginTop: '10px', marginLeft: '480px', fontWeight: 'bold' }}>
              Los tiradores Gola solo pueden seleccionarse con puertas Kanto en laca.
            </div>
          )}
          {mostrarAdvertenciaPushCajon && (
            <div style={{ color: 'red', textAlign: 'left', marginTop: '10px', marginLeft: '10px', fontWeight: 'bold' }}>
              Push cajón solo disponible con cajones soft.
            </div>
          )}
        </div>
        <div className="container2">
          <div className="section">

            <h1>Cerraduras</h1>
            <div className="field-special">
              {renderSelectArticulo(4, true)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tiradores;

