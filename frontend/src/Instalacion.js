import React, { useState, useEffect } from "react";
import { useTabs } from "./TabsContext";
import { useData } from './context/DataContext';
import { generatePDF } from "./GeneratePDF";
import { useNavigate } from 'react-router-dom';

function Instalacion() {
  const { userInfo, restoreUserInfo } = useTabs();
  const { data, saveData } = useData();
  const [numFrentesInteriores, setNumFrentesInteriores] = useState("");
  const [numArmariosCompletos, setNumArmariosCompletos] = useState("");
  const [showHelp, setShowHelp] = useState(false); // Estado para mostrar/ocultar el cuadro de ayuda
  const [isFinished, setIsFinished] = useState(false); // Estado para la ventana de finalización
  const [showRestoreModal, setShowRestoreModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [presupuestoId, setPresupuestoId] = useState("");
  const [numDesmontaje, setNumDesmontaje] = useState(""); // Nuevo estado para el número de desmontajes
  const [montajeAcarreo, setMontajeAcarreo] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const tabs = [
    "/Frentes",
    "/Frentes2",
    "/Frentes3",
    "/Interiores",
    "/Baldas",
    "/Equipamiento3",
    "/Tiradores",
    "/Remates",
    "/Instalacion",
  ];
  useEffect(() => {
    if (data.instalacion) {
      setNumFrentesInteriores(data.instalacion.numFrentesInteriores || "");
      setNumArmariosCompletos(data.instalacion.numArmariosCompletos || "");
      setNumDesmontaje(data.instalacion.numDesmontaje || ""); // Restaurar estado de desmontajes
    }
  }, []);

  useEffect(() => {
    const formattedData = {
      numFrentesInteriores: numFrentesInteriores === "" ? 0 : parseFloat(numFrentesInteriores).toFixed(2),
      numArmariosCompletos: numArmariosCompletos === "" ? 0 : parseFloat(numArmariosCompletos).toFixed(2),
      numDesmontaje: numDesmontaje === "" ? 0 : parseFloat(numDesmontaje), // Guardar el número de desmontajes
      montajeAcarreo,
    };
    saveData("instalacion", formattedData);
  }, [numFrentesInteriores, numArmariosCompletos, numDesmontaje, montajeAcarreo, saveData]);

  const handleGeneratePDF = () => {
    if (!userInfo.cliente.trim() || !userInfo.telefono.trim()) {
      alert("Por favor, rellena los campos Cliente y Teléfono antes de generar el presupuesto.");
      return;
    }

    // Pasar la cantidad de desmontajes como parte del objeto data
    generatePDF({ ...data, instalacion: { ...data.instalacion, numDesmontaje } }, userInfo);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    window.location.href = '/'; // Navegar de vuelta a la página principal
  };

  const handleEditar = () => {
    setShowModal(false); // Navegar de vuelta a la página principal
  };

  const handleNumArmariosCompletosChange = (e) => {
    const value = e.target.value;
    setNumArmariosCompletos(value === "" ? "" : parseFloat(value));
  };

  const handleNumFrentesInterioresChange = (e) => {
    const value = e.target.value;
    setNumFrentesInteriores(value === "" ? "" : parseFloat(value));
  };

  const handleNumDesmontajeChange = (e) => {
    const value = e.target.value;
    setNumDesmontaje(value === "" ? "" : parseFloat(value));
  };

  const handleRestorePresupuesto = async () => {
    if (!presupuestoId.trim()) {
      alert("Por favor, introduce un ID de presupuesto válido.");
      return;
    }
    setIsLoading(true); // Mostrar la ventana de carga

    try {
      //console.log("Solicitando presupuesto con ID:", presupuestoId); // Log del ID solicitado
      const response = await fetch(`https://api.adpta.com/presupuesto/${presupuestoId}`);
      if (!response.ok) {
        throw new Error("No se pudo encontrar el presupuesto con el ID proporcionado.");
      }

      const presupuesto = await response.json();
      //console.log("Presupuesto recibido:", presupuesto); // Log del presupuesto recibido

      // Verifica si el ID está presente
      if (!presupuesto.idPresupuestos) {
        console.error("El presupuesto no contiene un ID válido:", presupuesto);
        alert("Error: El presupuesto no contiene un ID válido.");
        setIsLoading(false);
        return;
      }

      // Obtener el centro del usuario activo (codigoTienda) desde la tienda
      const user = JSON.parse(localStorage.getItem('user'));
      const tiendaUsuario = user?.tienda; // Identificador de la tienda del usuario
      const codigoTiendaUsuario = await obtenerCodigoTienda(tiendaUsuario); // Obtener el codigoTienda

      //console.log("Código de la tienda del usuario activo:", codigoTiendaUsuario); // Log del código de la tienda del usuario
      //console.log("Centro del presupuesto:", presupuesto.Centro); // Log del centro del presupuesto

      // Comprobar si el codigoTienda del usuario activo coincide con el centro del presupuesto
      if (codigoTiendaUsuario !== "AC1" && codigoTiendaUsuario !== presupuesto.Centro) {
        setIsLoading(false); // Ocultar la ventana de carga
        alert("Error, este presupuesto no es de esta tienda.");
        return;
      }

      // Restaurar datos del presupuesto si los centros coinciden o si el centro es AC1
      if (presupuesto.cliente) {
        userInfo.cliente = presupuesto.cliente;
      }
      if (presupuesto.telefono) {
        userInfo.telefono = presupuesto.telefono;
      }
      if (presupuesto.email) {
        userInfo.email = presupuesto.email;
      }
      //console.log("Datos de usuario restaurados:", {
        //cliente: userInfo.cliente,
        //telefono: userInfo.telefono,
        //email: userInfo.email,
      //});
      restoreUserInfo(presupuesto.cliente, presupuesto.telefono, presupuesto.email);

      // Procesar y guardar los datos del presupuesto (mantén el resto de la lógica existente)
      if (presupuesto.frentes3) {
        const frentes3Data = typeof presupuesto.frentes3 === "string"
          ? JSON.parse(presupuesto.frentes3)
          : presupuesto.frentes3;

        const formattedFrentes3 = {
          selectedProductoId: frentes3Data.selectedProductoId || "",
          selectedProductoNombre: frentes3Data.selectedProductoNombre || "",
          selectedSerieId: frentes3Data.selectedSerieId || "",
          selectedSerieNombre: frentes3Data.selectedSerieNombre || "",
          selectedArticuloId: frentes3Data.selectedArticuloId || "",
          selectedArticuloNombre: frentes3Data.selectedArticuloNombre || "",
          selectedMaterialId: frentes3Data.selectedMaterialId || "",
          selectedMaterialNombre: frentes3Data.selectedMaterialNombre || "",
          selectedColorId: frentes3Data.selectedColorId || "",
          selectedColorNombre: frentes3Data.selectedColorNombre || "",
          selectedMedidasId: frentes3Data.selectedMedidasId || "",
          selectedMedidasNombre: frentes3Data.selectedMedidasNombre || "",
          selectedMedidasPuntos: frentes3Data.selectedMedidasPuntos || 0,
          selectedMaterialFranjaId: frentes3Data.selectedMaterialFranjaId || "",
          selectedMaterialFranjaNombre: frentes3Data.selectedMaterialFranjaNombre || "",
          selectedColorFranjaId: frentes3Data.selectedColorFranjaId || "",
          selectedColorFranjaNombre: frentes3Data.selectedColorFranjaNombre || "",
          selectedEspecial1Id: frentes3Data.selectedEspecial1Id || "",
          selectedEspecial1Nombre: frentes3Data.selectedEspecial1Nombre || "",
          selectedEspecial1Puntos: frentes3Data.selectedEspecial1Puntos || 0,
          selectedEspecial2Id: frentes3Data.selectedEspecial2Id || "",
          selectedEspecial2Nombre: frentes3Data.selectedEspecial2Nombre || "",
          selectedEspecial2Puntos: frentes3Data.selectedEspecial2Puntos || 0,
          cantidad: frentes3Data.cantidad || 0,
          cantidadEspecial1: frentes3Data.cantidadEspecial1 || 0,
          cantidadEspecial2: frentes3Data.cantidadEspecial2 || 0,
          puntos: frentes3Data.puntos || 0,
          puntosEspecial1: frentes3Data.puntosEspecial1 || 0,
          puntosEspecial2: frentes3Data.puntosEspecial2 || 0,
          selectedColorPerfil: frentes3Data.selectedColorPerfil || "",
          brakesChecked: frentes3Data.brakesChecked || false,
          isColorValueAdded: frentes3Data.isColorValueAdded || false,
          shouldApplyColorIncrement: frentes3Data.shouldApplyColorIncrement || false,
        };

        saveData("frentes3", formattedFrentes3);
        //console.log("Datos guardados en frentes3:", formattedFrentes3);
      }

      // Procesar datos de frentes
      if (presupuesto.frentes) {
        const frentesData = typeof presupuesto.frentes === "string"
          ? JSON.parse(presupuesto.frentes)
          : presupuesto.frentes;

        const formattedFrentes = {
          selectedProductoId: frentesData.selectedProductoId || "",
          selectedProductoNombre: frentesData.selectedProductoNombre || "",
          selectedSerieId: frentesData.selectedSerieId || "",
          selectedSerieNombre: frentesData.selectedSerieNombre || "",
          selectedArticuloId: frentesData.selectedArticuloId || "",
          selectedArticuloNombre: frentesData.selectedArticuloNombre || "",
          selectedMaterialId: frentesData.selectedMaterialId || "",
          selectedMaterialNombre: frentesData.selectedMaterialNombre || "",
          selectedColorId: frentesData.selectedColorId || "",
          selectedColorNombre: frentesData.selectedColorNombre || "",
          selectedMedidasId: frentesData.selectedMedidasId || "",
          selectedMedidasNombre: frentesData.selectedMedidasNombre || "",
          selectedMedidasPuntos: frentesData.selectedMedidasPuntos || 0,
          selectedMaterialFranjaId: frentesData.selectedMaterialFranjaId || "",
          selectedMaterialFranjaNombre: frentesData.selectedMaterialFranjaNombre || "",
          selectedColorFranjaId: frentesData.selectedColorFranjaId || "",
          selectedColorFranjaNombre: frentesData.selectedColorFranjaNombre || "",
          selectedEspecial1Id: frentesData.selectedEspecial1Id || "",
          selectedEspecial1Nombre: frentesData.selectedEspecial1Nombre || "",
          selectedEspecial1Puntos: frentesData.selectedEspecial1Puntos || 0,
          selectedEspecial2Id: frentesData.selectedEspecial2Id || "",
          selectedEspecial2Nombre: frentesData.selectedEspecial2Nombre || "",
          selectedEspecial2Puntos: frentesData.selectedEspecial2Puntos || 0,
          cantidad: frentesData.cantidad || 0,
          cantidadEspecial1: frentesData.cantidadEspecial1 || 0,
          cantidadEspecial2: frentesData.cantidadEspecial2 || 0,
          puntos: frentesData.puntos || 0,
          puntosEspecial1: frentesData.puntosEspecial1 || 0,
          puntosEspecial2: frentesData.puntosEspecial2 || 0,
          selectedColorPerfil: frentesData.selectedColorPerfil || "",
          brakesChecked: frentesData.brakesChecked || false,
          isColorValueAdded: frentesData.isColorValueAdded || false,
          shouldApplyColorIncrement: frentesData.shouldApplyColorIncrement || false,
        };

        saveData("frentes", formattedFrentes);
        //console.log("Datos guardados en frentes:", formattedFrentes);
      }

      // Procesar datos de frentes2
      if (presupuesto.frentes2) {
        const frentes2Data = typeof presupuesto.frentes2 === "string"
          ? JSON.parse(presupuesto.frentes2)
          : presupuesto.frentes2;

        const formattedFrentes2 = {
          selectedProductoId: frentes2Data.selectedProductoId || "",
          selectedProductoNombre: frentes2Data.selectedProductoNombre || "",
          selectedSerieId: frentes2Data.selectedSerieId || "",
          selectedSerieNombre: frentes2Data.selectedSerieNombre || "",
          selectedArticuloId: frentes2Data.selectedArticuloId || "",
          selectedArticuloNombre: frentes2Data.selectedArticuloNombre || "",
          selectedMaterialId: frentes2Data.selectedMaterialId || "",
          selectedMaterialNombre: frentes2Data.selectedMaterialNombre || "",
          selectedColorId: frentes2Data.selectedColorId || "",
          selectedColorNombre: frentes2Data.selectedColorNombre || "",
          selectedMedidasId: frentes2Data.selectedMedidasId || "",
          selectedMedidasNombre: frentes2Data.selectedMedidasNombre || "",
          selectedMedidasPuntos: frentes2Data.selectedMedidasPuntos || 0,
          selectedMaterialFranjaId: frentes2Data.selectedMaterialFranjaId || "",
          selectedMaterialFranjaNombre: frentes2Data.selectedMaterialFranjaNombre || "",
          selectedColorFranjaId: frentes2Data.selectedColorFranjaId || "",
          selectedColorFranjaNombre: frentes2Data.selectedColorFranjaNombre || "",
          selectedEspecial1Id: frentes2Data.selectedEspecial1Id || "",
          selectedEspecial1Nombre: frentes2Data.selectedEspecial1Nombre || "",
          selectedEspecial1Puntos: frentes2Data.selectedEspecial1Puntos || 0,
          selectedEspecial2Id: frentes2Data.selectedEspecial2Id || "",
          selectedEspecial2Nombre: frentes2Data.selectedEspecial2Nombre || "",
          selectedEspecial2Puntos: frentes2Data.selectedEspecial2Puntos || 0,
          cantidad: frentes2Data.cantidad || 0,
          cantidadEspecial1: frentes2Data.cantidadEspecial1 || 0,
          cantidadEspecial2: frentes2Data.cantidadEspecial2 || 0,
          puntos: frentes2Data.puntos || 0,
          puntosEspecial1: frentes2Data.puntosEspecial1 || 0,
          puntosEspecial2: frentes2Data.puntosEspecial2 || 0,
          selectedColorPerfil: frentes2Data.selectedColorPerfil || "",
          brakesChecked: frentes2Data.brakesChecked || false,
          isColorValueAdded: frentes2Data.isColorValueAdded || false,
          shouldApplyColorIncrement: frentes2Data.shouldApplyColorIncrement || false,
        };


        saveData("frentes2", formattedFrentes2);
        //console.log("Datos guardados en frentes2:", formattedFrentes2);
      }
      // Procesar datos de remates
      if (presupuesto.remates) {
        const rematesData = typeof presupuesto.remates === "string"
          ? JSON.parse(presupuesto.remates)
          : presupuesto.remates;

        const formattedRemates = {
          selectedArticulos: rematesData.selectedArticulos || Array(3).fill({ id: "", nombre: "", puntos: 0 }),
          metros: rematesData.metros || Array(3).fill(0),
          selectedOtros: rematesData.selectedOtros || Array(3).fill({ id: "", nombre: "", puntos: 0 }),
          cantidadesOtros: rematesData.cantidadesOtros || Array(3).fill(1),
          tipoApertura: rematesData.tipoApertura || "",
          tipoRemate: rematesData.tipoRemate || "",
          selectedColores: rematesData.colorRemates || Array(3).fill(""), // Asigna colorRemates a selectedColores
        };

        console.log("Datos de remates guardados:", formattedRemates); // Log para verificar los datos
        saveData("remates", formattedRemates);
      }
      if (presupuesto.interiores) {
        const interioresData = typeof presupuesto.interiores === "string"
          ? JSON.parse(presupuesto.interiores)
          : presupuesto.interiores;

        const formattedInteriores = {
          selectedArticulos: Array(6).fill({}).map((_, i) => ({
            id: interioresData[`articulo${i + 1}Id`] || "",
            nombre: interioresData[`articulo${i + 1}Nombre`] || "",
            puntos: interioresData[`articulo${i + 1}Puntos`] || 0,
          })),
          selectedColores: Array(6).fill({}).map((_, i) => ({
            id: interioresData[`color${i + 1}Id`] || "",
            nombre: interioresData[`color${i + 1}Nombre`] || "",
          })),
          cantidades: Array(6).fill(0).map((_, i) => interioresData[`cantidad${i + 1}`] || 0),
          puntos: Array(6).fill(0).map((_, i) => interioresData[`puntos${i + 1}`] || 0),
          selectedInterioresOtros: Array(4).fill({}).map((_, i) => ({
            id: interioresData[`interioresOtros${i + 1}Id`] || "",
            nombre: interioresData[`interioresOtros${i + 1}Nombre`] || "",
            puntos: interioresData[`interioresOtros${i + 1}Puntos`] || 0,
          })),
          cantidadesInterioresOtros: Array(4).fill(0).map((_, i) => interioresData[`cantidadInterioresOtros${i + 1}`] || 0),
          puntosInterioresOtros: Array(4).fill(0).map((_, i) => interioresData[`puntosInterioresOtros${i + 1}`] || 0),
          selectedEspecial1: {
            id: interioresData.selectedEspecial1Id || "",
            nombre: interioresData.selectedEspecial1Nombre || "",
            puntos: interioresData.selectedEspecial1Puntos || 0,
          },
          selectedEspecial2: {
            id: interioresData.selectedEspecial2Id || "",
            nombre: interioresData.selectedEspecial2Nombre || "",
            puntos: interioresData.selectedEspecial2Puntos || 0,
          },
          selectedEspecial3: {
            id: interioresData.selectedEspecial3Id || "",
            nombre: interioresData.selectedEspecial3Nombre || "",
            puntos: interioresData.selectedEspecial3Puntos || 0,
          },
          selectedEspecial4: {
            id: interioresData.selectedEspecial4Id || "",
            nombre: interioresData.selectedEspecial4Nombre || "",
            puntos: interioresData.selectedEspecial4Puntos || 0,
          },
          selectedEspecial5: {
            id: interioresData.selectedEspecial5Id || "",
            nombre: interioresData.selectedEspecial5Nombre || "",
            puntos: interioresData.selectedEspecial5Puntos || 0,
          },
          cantidadEspecial1: interioresData.cantidadEspecial1 || 0,
          cantidadEspecial2: interioresData.cantidadEspecial2 || 0,
          cantidadEspecial3: interioresData.cantidadEspecial3 || 0,
          cantidadEspecial4: interioresData.cantidadEspecial4 || 0,
          cantidadEspecial5: interioresData.cantidadEspecial5 || 0,
          puntosEspecial1: interioresData.puntosEspecial1 || 0,
          puntosEspecial2: interioresData.puntosEspecial2 || 0,
          puntosEspecial3: interioresData.puntosEspecial3 || 0,
          puntosEspecial4: interioresData.puntosEspecial4 || 0,
          puntosEspecial5: interioresData.puntosEspecial5 || 0,
        };

        saveData("interiores", formattedInteriores);
        //console.log("Datos guardados en interiores:", formattedInteriores);
      }
      if (presupuesto.tiradores) {
        const tiradoresData = typeof presupuesto.tiradores === "string"
          ? JSON.parse(presupuesto.tiradores)
          : presupuesto.tiradores;

        const formattedTiradores = {
          selectedArticulos: Array(6).fill({}).map((_, i) => ({
            articuloId: tiradoresData[`articulo${i + 1}Id`] ? String(tiradoresData[`articulo${i + 1}Id`]) : "",
            nombre: tiradoresData[`articulo${i + 1}Nombre`] || "",
            puntos: tiradoresData[`articulo${i + 1}Puntos`] || 0,
            serieId: tiradoresData[`articulo${i + 1}SerieId`] ? String(tiradoresData[`articulo${i + 1}SerieId`]) : "",
          })),
          selectedColores: Array(6).fill({}).map((_, i) => ({
            id: tiradoresData[`color${i + 1}Id`] ? String(tiradoresData[`color${i + 1}Id`]) : "",
            nombre: tiradoresData[`color${i + 1}Nombre`] || "",
          })),
          cantidades: Array(6).fill(0).map((_, i) => tiradoresData[`cantidad${i + 1}`] ? parseInt(tiradoresData[`cantidad${i + 1}`], 10) : 0),
          puntos: Array(6).fill(0).map((_, i) => tiradoresData[`puntos${i + 1}`] ? parseInt(tiradoresData[`puntos${i + 1}`], 10) : 0),
        };

        saveData("tiradores", formattedTiradores);
        //console.log("Datos guardados en tiradores:", formattedTiradores);
      }
      if (presupuesto.baldas) {
        const baldasData = typeof presupuesto.baldas === "string"
          ? JSON.parse(presupuesto.baldas)
          : presupuesto.baldas;

        const formattedBaldas = {
          selectedArticulos: Array(12).fill({}).map((_, i) => ({
            id: baldasData[`articulo${i + 1}Id`] || "",
            nombre: baldasData[`articulo${i + 1}Nombre`] || "",
          })),
          selectedMedidas: Array(12).fill({}).map((_, i) => ({
            id: baldasData[`medidas${i + 1}Id`] || "",
            nombre: baldasData[`medidas${i + 1}Nombre`] || "",
            puntos: baldasData[`medidas${i + 1}Puntos`] || 0,
          })),
          cantidades: Array(12).fill(0).map((_, i) => baldasData[`cantidad${i + 1}`] || 0),
          puntosTotales: Array(12).fill(0).map((_, i) => baldasData[`puntosTotales${i + 1}`] || 0),
          colorIluminacion: baldasData.colorIluminacion || "",
        };

        saveData("baldas", formattedBaldas);
        //console.log("Datos guardados en baldas:", formattedBaldas);
      }
      if (presupuesto.equipamiento) {
        const equipamiento3Data = typeof presupuesto.equipamiento === "string"
          ? JSON.parse(presupuesto.equipamiento)
          : presupuesto.equipamiento;

        const formattedEquipamiento3 = {
          selectedArticulos: Array(15).fill({}).map((_, i) => ({
            id: equipamiento3Data[`articulo${i + 1}Id`] || "",
            nombre: equipamiento3Data[`articulo${i + 1}Nombre`] || "",
          })),
          selectedMedidas: Array(15).fill({}).map((_, i) => ({
            id: equipamiento3Data[`medidas${i + 1}Id`] || "",
            nombre: equipamiento3Data[`medidas${i + 1}Nombre`] || "",
            puntos: equipamiento3Data[`medidas${i + 1}Puntos`] || 0,
          })),
          cantidades: Array(15).fill(0).map((_, i) => equipamiento3Data[`cantidad${i + 1}`] || 0),
          puntos: Array(15).fill(0).map((_, i) => equipamiento3Data[`puntos${i + 1}`] || 0),
          fronteraLacadaCajon: {
            id: equipamiento3Data.fronteraLacadaCajonId || "",
            nombre: equipamiento3Data.fronteraLacadaCajonNombre || "",
          },
          cantidadFronteraLacadaCajon: equipamiento3Data.cantidadFronteraLacadaCajon || 0,
          puntosFronteraLacadaCajon: equipamiento3Data.puntosFronteraLacadaCajon || 0,
        };

        saveData("equipamiento3", formattedEquipamiento3);
        //console.log("Datos guardados en equipamiento3:", formattedEquipamiento3);
      }
      alert("Datos restaurados correctamente. AVISO: La instalación y el nombre del cliente deben añadirse manualmente.");
      setShowRestoreModal(false); // Cerrar el modal
      // Pasar por todas las pestañas
      tabs.forEach((tab, index) => {
        setTimeout(() => {
          navigate(tab); // Cambiar a la pestaña activa
          if (index === tabs.length - 1) {
            setIsLoading(false); // Ocultar la ventana de carga al final
            setIsFinished(true); // Mostrar la ventana de finalización
          }
        }, index * 100); // 0.1 segundos por pestaña
      });
    } catch (error) {
      console.error("Error al restaurar el presupuesto:", error.message);
      alert(`Hubo un error al intentar restaurar el presupuesto: ${error.message}`);
      setIsLoading(false); // Ocultar la ventana de carga en caso de error
    }
  };
  return (
    <div className="container">
      {isLoading && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Cargando datos del presupuesto...</h2>
          </div>
        </div>
      )}

      {isFinished && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Datos cargados</h2>
            <p>AVISO: Esta funcionalidad está en fase de pruebas, es recomendable revisar todas las pestañas para asegurarse de que están todos los datos.</p>
            <button onClick={() => setIsFinished(false)}>Cerrar</button>
          </div>
        </div>
      )}
      <div className="container2">
        <h1>Instalación</h1>
        <div className="field-instalacion">
          <label htmlFor="numArmariosCompletos">Armarios completos por metro lineal:</label>
          <input
            type="number"
            step="0.01" // Permitir decimales
            id="numArmariosCompletos"
            value={numArmariosCompletos}
            min={0}
            onChange={handleNumArmariosCompletosChange}
          />
        </div>
        <div className="field-instalacion">
          <label htmlFor="numFrentesInteriores">Frentes/interiores/vestidores/equipamientos por metro lineal:</label>
          <input
            type="number"
            step="0.01" // Permitir decimales
            id="numFrentesInteriores"
            value={numFrentesInteriores}
            min={0}
            onChange={handleNumFrentesInterioresChange}
          />
        </div>
        <div className="field-instalacion">
          <label htmlFor="numDesmontaje">Desmontaje de armarios:</label>
          <input
            type="number"
            id="numDesmontaje"
            value={numDesmontaje}
            min={0}
            onChange={handleNumDesmontajeChange}
          />
        </div>
        <div className="field-instalacion">
          <button onClick={handleGeneratePDF} className="generate-button" style={{ marginTop: "20px" }}>Crear presupuesto</button>
        </div>
      </div>
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Su presupuesto ha sido realizado con éxito</h2>
            <p>Lo encontrará en su carpeta de descargas</p>
            <button onClick={handleCloseModal}>Cerrar</button>
            <button onClick={handleEditar}>Editar presupuesto</button>
          </div>
        </div>
      )}
      <button
        id="restoreButton"
        onClick={() => setShowRestoreModal(true)}
      >
        Restaurar presupuesto (experimental)
      </button>
      {showRestoreModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Restaurar Presupuesto</h2>
            <p>Introduce el ID del presupuesto que deseas restaurar:</p>
            <input
              type="text"
              value={presupuestoId}
              onChange={(e) => setPresupuestoId(e.target.value)}
              placeholder="ID del presupuesto"
            />
            <div style={{ marginTop: "20px" }}>
              <button onClick={handleRestorePresupuesto}>Restaurar</button>
              <button onClick={() => setShowRestoreModal(false)}>Cancelar</button>
            </div>
            <div style={{ marginTop: "10px" }}>
              <button
                style={{
                  background: "none",
                  border: "none",
                  color: "blue",
                  textDecoration: "underline",
                  cursor: "pointer",
                }}
                onClick={() => setShowHelp(!showHelp)}
              >
                ¿Dónde encuentro el ID?
              </button>
              {showHelp && (
                <div style={{ marginTop: "10px", border: "1px solid #ccc", padding: "10px", borderRadius: "5px" }}>
                  <p>Al descargar un presupuesto, el ID de este son los últimos números que aparecen en el nombre.</p>
                  <img
                    src="idpresupuesto.png" // Cambia esta ruta por la ubicación real de tu imagen
                    alt="Ejemplo de ID en el nombre del presupuesto"
                    style={{ maxWidth: "100%", height: "auto", marginTop: "10px" }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Instalacion;

const obtenerCodigoTienda = async (tiendaId) => {
  try {
    const response = await fetch(`https://api.adpta.com/getCodigoTienda?idTienda=${tiendaId}`);
    const data = await response.json();

    if (response.ok) {
      return data.codigoTienda;  // Devolver el código de la tienda
    } else {
      console.error("Error al obtener el código de la tienda:", data.message);
      return 'Código no encontrado';
    }
  } catch (error) {
    console.error("Error en la solicitud:", error);
    return 'Error al obtener código';
  }
};

const saveData = (key, value) => {
  //console.log(`Guardando datos en ${key}:`, value); // Log de los datos que se están guardando
  localStorage.setItem(key, JSON.stringify(value));
};