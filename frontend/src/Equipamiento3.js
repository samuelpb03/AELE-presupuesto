import React, { useState, useEffect } from "react";
import axios from "axios";
import { useTabs } from "./TabsContext";
import { useData } from "./context/DataContext";

function Equipamiento3() {
  const { handleSelectChangeE3 } = useTabs();
  const { data, saveData } = useData();
  const [listArticuloEquipamiento, setListArticuloEquipamiento] = useState([]);
  const [fronteraLacadaCajon, setFronteraLacadaCajon] = useState({ id: "", nombre: "" });
const [cantidadFronteraLacadaCajon, setCantidadFronteraLacadaCajon] = useState(0);
const [puntosFronteraLacadaCajon, setPuntosFronteraLacadaCajon] = useState(0);
  const [listArticuloAntracita, setListArticuloAntracita] = useState([]);
  const [listMedidas, setListMedidas] = useState(Array(15).fill([]));
  const [cantidades, setCantidades] = useState(Array(15).fill(0));
  const [selectedArticulos, setSelectedArticulos] = useState(
    Array(15).fill({
      id: "",
      nombre: "",
    })
  );
  const [selectedMedidas, setSelectedMedidas] = useState(
    Array(15).fill({
      id: "",
      nombre: "",
      puntos: 0,
    })
  );
  const [puntos, setPuntos] = useState(Array(15).fill(0));
  const user = localStorage.getItem('user');
  const backendUrl = 'https://api.adpta.com';
  if (!user) {
    // Redirigir a login.php si no está autenticado
    window.location.href = '/login.php';
  }

  useEffect(() => {
    if (data.equipamiento3) {
      const restoredArticulos = Array(15).fill({ id: "", nombre: "" });
      const restoredMedidas = Array(15).fill({ id: "", nombre: "", puntos: 0 });
      const restoredCantidades = Array(15).fill(0);
      const restoredPuntos = Array(15).fill(0);
  
      for (let i = 0; i < 15; i++) {
        restoredArticulos[i] = {
          id: data.equipamiento3[`articulo${i + 1}Id`] || "",
          nombre: data.equipamiento3[`articulo${i + 1}Nombre`] || "",
        };
        restoredMedidas[i] = {
          id: data.equipamiento3[`medidas${i + 1}Id`] || "",
          nombre: data.equipamiento3[`medidas${i + 1}Nombre`] || "",
          puntos: data.equipamiento3[`medidas${i + 1}Puntos`] || 0,
        };
        restoredCantidades[i] = data.equipamiento3[`cantidad${i + 1}`] || 0;
        restoredPuntos[i] = data.equipamiento3[`puntos${i + 1}`] || 0;
      }
  
      setSelectedArticulos(restoredArticulos);
      setSelectedMedidas(restoredMedidas);
      setCantidades(restoredCantidades);
      setPuntos(restoredPuntos);
      setFronteraLacadaCajon({
        id: data.equipamiento3.fronteraLacadaCajonId || "",
        nombre: data.equipamiento3.fronteraLacadaCajonNombre || "",
      });
      setCantidadFronteraLacadaCajon(data.equipamiento3.cantidadFronteraLacadaCajon || 0);
    }
  }, []);

  useEffect(() => {
    const formattedData = selectedArticulos.reduce((acc, articulo, index) => {
      acc[`articulo${index + 1}Nombre`] = articulo.nombre;
      acc[`articulo${index + 1}Id`] = articulo.id;
      acc[`medidas${index + 1}Nombre`] = selectedMedidas[index].nombre;
      acc[`medidas${index + 1}Id`] = selectedMedidas[index].id;
      acc[`medidas${index + 1}Puntos`] = selectedMedidas[index].puntos;
      acc[`cantidad${index + 1}`] = cantidades[index];
      acc[`puntos${index + 1}`] = puntos[index];
      return acc;
    }, {});
    formattedData["fronteraLacadaCajonNombre"] = fronteraLacadaCajon.nombre;
    formattedData["fronteraLacadaCajonId"] = fronteraLacadaCajon.id;
    formattedData["cantidadFronteraLacadaCajon"] = cantidadFronteraLacadaCajon;
    formattedData["puntosFronteraLacadaCajon"] = puntosFronteraLacadaCajon; // Añadir los puntos de la frontera lacada del cajón
    saveData("equipamiento3", formattedData);
  }, [selectedArticulos, selectedMedidas, cantidades, puntos, fronteraLacadaCajon, cantidadFronteraLacadaCajon, puntosFronteraLacadaCajon, saveData]);

  useEffect(() => {
    axios
      .get(`${backendUrl}/articulo/equipamiento`, {
        headers: {
          'ngrok-skip-browser-warning': 'true'
        }
      })
      .then((res) => {
        if (Array.isArray(res.data)) {
          const sortedArticulos = res.data.sort((a, b) => a.nombre.localeCompare(b.nombre));
          setListArticuloEquipamiento(sortedArticulos);
        } else {
          console.error("Error fetching articulos: res.data is not an array");
        }
      })
      .catch((error) => {
        console.error("Error fetching articulos:", error);
      });
  
    axios
      .get(`${backendUrl}/articulo/antracita`, {
        headers: {
          'ngrok-skip-browser-warning': 'true'
        }
      })
      .then((res) => {
        if (Array.isArray(res.data)) {
          const sortedArticulos = res.data.sort((a, b) => a.nombre.localeCompare(b.nombre));
          setListArticuloAntracita(sortedArticulos);
        } else {
          console.error("Error fetching articulos: res.data is not an array");
        }
      })
      .catch((error) => {
        console.error("Error fetching articulos:", error);
      });
  }, []);

  useEffect(() => {
    selectedArticulos.forEach((articulo, index) => {
      if (articulo.id) {
        axios
          .get(`${backendUrl}/medidas`, {
            headers: {
              'ngrok-skip-browser-warning': 'true'
            },
            params: { articuloId: articulo.id, materialId: 5 }
          })
          .then((res) => {
            if (Array.isArray(res.data)) {
              setListMedidas((prevListMedidas) => {
                const updatedListMedidas = [...prevListMedidas];
                updatedListMedidas[index] = res.data;
                return updatedListMedidas;
              });
            } else {
              console.error("Error fetching medidas: res.data is not an array");
            }
          })
          .catch((error) => {
            console.error("Error fetching medidas:", error);
          });
      }
    });
  }, [selectedArticulos]);

  const handleSelectArticuloChange = (index, event) => {
    const updatedArticulos = [...selectedArticulos];
    const updatedCantidades = [...cantidades];
    const selectedIndex = event.target.selectedIndex;
    const nombre = event.target.options[selectedIndex].text;
    const id = event.target.value;

    updatedArticulos[index] = { id, nombre };
    setSelectedArticulos(updatedArticulos);

    if (id) {
      updatedCantidades[index] = 1;

      axios
        .get(`${backendUrl}/medidas`, {
          headers: {
            'ngrok-skip-browser-warning': 'true'
          },
          params: { articuloId: id, materialId: 5 }
        })
        .then((res) => {
          if (Array.isArray(res.data)) {
            const updatedListMedidas = [...listMedidas];
            updatedListMedidas[index] = res.data;
            setListMedidas(updatedListMedidas);

            if (res.data.length > 0) {
              const firstMedida = res.data[0];
              const updatedSelectedMedidas = [...selectedMedidas];
              const updatedPuntos = [...puntos];

              updatedSelectedMedidas[index] = {
                id: firstMedida.medidas_id,
                nombre: firstMedida.medidas,
                puntos: firstMedida.puntos,
              };
              updatedPuntos[index] = firstMedida.puntos * updatedCantidades[index];

              setSelectedMedidas(updatedSelectedMedidas);
              setPuntos(updatedPuntos);
            }
          } else {
            console.error("Error fetching medidas: res.data is not an array");
          }
        })
        .catch((error) => {
          console.error("Error fetching medidas:", error);
        });
    } else {
      updatedCantidades[index] = 0;
      const updatedListMedidas = [...listMedidas];
      updatedListMedidas[index] = [];
      setListMedidas(updatedListMedidas);
      setPuntos((prevPuntos) => {
        const newPuntos = [...prevPuntos];
        newPuntos[index] = 0;
        return newPuntos;
      });
    }
    setCantidades(updatedCantidades);

    handleSelectChangeE3(`articulo${index + 1}`, id, nombre);
  };

  const handleSelectMedidasChange = (index, event) => {
    const updatedMedidas = [...selectedMedidas];
    const updatedPuntos = [...puntos];
    const selectedIndex = event.target.selectedIndex;
    const nombre = event.target.options[selectedIndex].text;
    const id = event.target.value;
    const medidasList = listMedidas[index] || [];
    const selectedMedida = medidasList.find((medida) => medida.medidas_id === parseInt(id)) || {};
    updatedMedidas[index] = { id, nombre, puntos: selectedMedida.puntos || 0 };
    updatedPuntos[index] = (selectedMedida.puntos || 0) * cantidades[index];

    setSelectedMedidas(updatedMedidas);
    setPuntos(updatedPuntos);

    handleSelectChangeE3(`medidas${index + 1}`, id, nombre, selectedMedida.puntos || 0);
  };
  const handleCantidadFronteraLacadaCajonChange = (event) => {
    const cantidad = parseInt(event.target.value, 10);
    setCantidadFronteraLacadaCajon(cantidad);
    setPuntosFronteraLacadaCajon(cantidad * 118); // Sumar 118 puntos por unidad
  };
  const handleCantidadChange = (index, event) => {
    const updatedCantidades = [...cantidades];
    const updatedPuntos = [...puntos];
    updatedCantidades[index] = event.target.value;
    updatedPuntos[index] = selectedMedidas[index].puntos * updatedCantidades[index];
    setCantidades(updatedCantidades);
    setPuntos(updatedPuntos);

    handleSelectChangeE3(`cantidad${index + 1}`, updatedCantidades[index]);
  };
  
  const renderFronteraLacadaCajon = () => (
    <div className="field-special">
      <label htmlFor="fronteraLacadaCajon">Frontera lacada cajón:</label>
      <label htmlFor="cantidadFronteraLacadaCajon">Cantidad:</label>
      <input
        type="number"
        id="cantidadFronteraLacadaCajon"
        value={cantidadFronteraLacadaCajon}
        onChange={handleCantidadFronteraLacadaCajonChange} // Utilizar el manejador aquí
        min="0"
      />
    </div>
  );

  const renderSelectArticulo = (index, list) => (
    <div key={index} className="field-special"> {/* Aplicar la clase "field" */}
      <label htmlFor={`articulo${index + 1}`}>Artículo {index + 1}:</label>
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
      <label htmlFor={`cantidad${index + 1}`}>Cantidad:</label>
      <input
        type="number"
        id={`cantidad${index + 1}`}
        value={cantidades[index]}
        onChange={(event) => handleCantidadChange(index, event)}
        min="1"
        disabled={!selectedArticulos[index].id}
      />
      <label>Puntos: {puntos[index]}</label>
    </div>
    
  );

  return (
    <div className="container">
      <div className="container2">
        <h1>Equipamiento y Antracita</h1>
        <h2>Equipamiento</h2>
        {Array.from({ length: 3 }).map((_, i) => renderSelectArticulo(i, listArticuloEquipamiento))}
      </div>
      <div className="container2">
        {Array.from({ length: 3 }).map((_, i) => renderSelectArticulo(i + 3, listArticuloEquipamiento))}
      </div>
      <div className="container2">
        {Array.from({ length: 3 }).map((_, i) => renderSelectArticulo(i + 6, listArticuloEquipamiento))}
        {renderFronteraLacadaCajon()}
      </div>
      <div className="container3">
        <h1>Antracita</h1>
        
        {Array.from({ length: 2 }).map((_, i) => renderSelectArticulo(i + 9, listArticuloAntracita))}
        {Array.from({ length: 3 }).map((_, i) => renderSelectArticulo(i + 11, listArticuloAntracita))}
      </div>
    </div>
  );
}

export default Equipamiento3;
