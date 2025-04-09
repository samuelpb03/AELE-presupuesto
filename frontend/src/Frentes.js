import React, { useState, useEffect } from "react";
import axios from "axios";
import { useTabs } from "./TabsContext";
import { useData } from './context/DataContext';
// Constantes que guardarán los datos del frente
function Frentes() {
  const { handleSelectChange } = useTabs();
  const { data, saveData } = useData();
  const [listProducto, setListProducto] = useState([]);
  const [showGuide, setShowGuide] = useState(false);
  const [listSerie, setListSerie] = useState([]);
  const [showImageModal, setShowImageModal] = useState(false);
  const [listArticulo, setListArticulo] = useState([]);
  const [selectedColorPerfil, setSelectedColorPerfil] = useState("");
  const [showColorPerfil, setShowColorPerfil] = useState(false);
  const [listMaterial, setListMaterial] = useState([]);
  const [listColor, setListColor] = useState([]);
  const [listMedidas, setListMedidas] = useState([]);
  const [imageAvailable, setImageAvailable] = useState(true);
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
  const [selectedColorFranja, setSelectedColorFranja] = useState({ id: "", nombre: "" });
  const [puntos, setPuntos] = useState(0);
  const [selectedEspecial1, setSelectedEspecial1] = useState({ id: "", nombre: "", puntos: 0 });
  const [selectedEspecial2, setSelectedEspecial2] = useState({ id: "", nombre: "", puntos: 0 });
  const [puntosEspecial1, setPuntosEspecial1] = useState(0);
  const [puntosEspecial2, setPuntosEspecial2] = useState(0);
  const [cantidadEspecial1, setCantidadEspecial1] = useState(0);
  const [cantidadEspecial2, setCantidadEspecial2] = useState(0);
  const [franjaActiva, setFranjaActiva] = useState(false);
  var [cantidad, setCantidad] = useState(0);
  const [isColorValueAdded, setIsColorValueAdded] = useState(false);
  const [brakesChecked, setBrakesChecked] = useState(false);
  const [brakesPointsApplied, setBrakesPointsApplied] = useState(false);
  const [shouldApplyColorIncrement, setShouldApplyColorIncrement] = useState(false);

  // Conectar con el backend en localhost para hacer pruebas
  //const backendUrl = "http://localhost:3306";
  //Backend real
  const backendUrl = "https://api.adpta.com";
  //URL a la que se está conectando esta clase
  // Verificación del usuario, si no ha iniciado sesión, no puede entrar directamente a esta clase
  const user = localStorage.getItem('user');
  if (!user) {
    //Redirigir a login.php si no está autenticado
    window.location.href = '/login.php';
  }
  // Este código devuelve los valores a los campos al cambiar de pestaña y volver, o, en su defecto, los mantiene vacíos
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
      const restoredCantidad = data.frentes.cantidad || 0;
      setCantidad(restoredCantidad);

      // Lógica para restaurar los puntos correctamente
      let restoredPuntos = data.frentes.puntos || 0;
      if (restoredCantidad > 1) {
        restoredPuntos = restoredPuntos / restoredCantidad; // Dividir por la cantidad si es mayor a 1
      }
      setPuntos(restoredPuntos);
      setIsColorValueAdded(data.frentes.isColorValueAdded || false);  // Restaurar el estado del incremento del 20%
      setPuntosEspecial1((data.frentes.selectedEspecial1Puntos || 0) * (data.frentes.cantidadEspecial1 || 0));
      setPuntosEspecial2((data.frentes.selectedEspecial2Puntos || 0) * (data.frentes.cantidadEspecial2 || 0));
      setCantidadEspecial1(data.frentes.cantidadEspecial1 || 0);
      setCantidadEspecial2(data.frentes.cantidadEspecial2 || 0);
      setBrakesChecked(data.frentes.brakesChecked || false);
      if (data.frentes.brakesChecked) {
        setPuntos((prevPuntos) => prevPuntos - 73); // Restar 73 puntos si los frenos estaban activados
      }
      //console.log("Id producto:", data.frentes.selectedProductoId);
      if (data.frentes.selectedProductoId === "4" || data.frentes.selectedProductoId === "5" || data.frentes.selectedSerieId === "1") {
        setShowColorPerfil(true); // Mostrar el selector de color del perfil si el producto es 4 o 5
        setSelectedColorPerfil(data.frentes.selectedColorPerfil || ""); // Restaurar el color del perfil
      } else {
        setShowColorPerfil(false); // Ocultar el selector de color del perfil si no es 4 o 5
        setSelectedColorPerfil(""); // Restablecer el color del
      }
    }
  }, []);
  // Guardar los datos formateados en el estado 
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
      brakesChecked,
      puntos: puntos * cantidad, // Guardar puntos actualizados
      isColorValueAdded, // Guardar el estado del incremento
      brakesChecked,
      cantidadEspecial1,
      cantidadEspecial2,
      puntosEspecial1: selectedEspecial1.puntos * cantidadEspecial1,
      puntosEspecial2: selectedEspecial2.puntos * cantidadEspecial2,
      selectedColorPerfil, // Guardar el color del perfil
    };
    saveData("frentes", formattedData);
    //Lista de dependencias de estos datos
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
    puntos,
    isColorValueAdded,
    saveData,
    brakesChecked,
    selectedColorPerfil, // Añadir el color del perfil a las dependencias
  ]);

  // Fragmento que recoge del backend los datos del producto (la tabla Producto de la base de datos)
  useEffect(() => {
    axios.get(`${backendUrl}/producto`).then((res) => {
      //console.log('Full response:', res); // Muestra en la consola la respuesta completa
      if (Array.isArray(res.data)) {
        const filteredProducts = res.data.filter((producto) => [1, 4, 5].includes(producto.producto_id));
        const sortedProducts = filteredProducts.sort((a, b) => a.nombre.localeCompare(b.nombre));
        setListProducto(sortedProducts);
      } else {
        console.error("Error fetching productos: res.data is not an array", res.data);
      }
    }).catch(error => {
      console.error("Error fetching productos:", error);
    });
    // Este fragmento recoge del backend los datos de los especiales para frentes
    axios.get(`${backendUrl}/especialesConPuntosFrentes`).then((res) => {
      //console.log('Full response:', res); // Muestra en la consola la respuesta completa
      if (Array.isArray(res.data)) {
        setListEspeciales(res.data);
      } else { // En caso de error, también se muestra en la consola
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
          // Separar "Kanto" y ponerlo primero
          const kantoSeries = res.data.filter(serie => serie.nombre === "kanto");
          const otherSeries = res.data.filter(serie => serie.nombre !== "kanto");
          const sortedSeries = [...kantoSeries, ...otherSeries]; // Poner Kanto primero

          setListSerie(sortedSeries);
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
          console.log("Franja activa:", franja);
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

    // Actualizar el producto seleccionado
    setSelectedProducto({ id, nombre });
    handleSelectChange("producto", id, nombre);

    // Limpiar los especiales seleccionados
    setSelectedEspecial1({ id: "", nombre: "", puntos: 0 });
    setSelectedEspecial2({ id: "", nombre: "", puntos: 0 });
    setCantidadEspecial1(0);
    setCantidadEspecial2(0);
    setPuntosEspecial1(0);
    setPuntosEspecial2(0);

    // 🔹 Si se selecciona "--Selecciona una opción--", desactivar todos los selectores
    if (id === "") {
      document.getElementById("serie").disabled = true;
      document.getElementById("articulo").disabled = true;
      document.getElementById("material").disabled = true;
      document.getElementById("color").disabled = true;
      document.getElementById("medidas").disabled = true;
      document.getElementById("materialFranja").disabled = true;
      document.getElementById("colorFranja").disabled = true;

      // También limpiar los valores seleccionados
      setSelectedSerie({ id: "", nombre: "" });
      setSelectedArticulo({ id: "", nombre: "" });
      setSelectedMaterial({ id: "", nombre: "" });
      setSelectedColor({ id: "", nombre: "" });
      setSelectedMedidas({ id: "", nombre: "", puntos: 0 });
      setSelectedMaterialFranja({ id: "", nombre: "" });
      setSelectedColorFranja({ id: "", nombre: "" });
      setPuntos(0);
      setShowColorPerfil(false); // Ocultar el selector de color del perfil
      setSelectedColorPerfil(""); // Restablecer el color del perfil
      return; // Salir de la función
    }

    // 🔹 Si se elige un producto válido, cargar las series normalmente
    if (id === "4" || id === "5") {
      const especialGranAltura = listEspeciales.find(especial => especial.articulo_id === 195);
      setListEspeciales([especialGranAltura]); // Mostrar solo "Gran Altura"
      setShowColorPerfil(true); // Mostrar el selector de color del perfil
    } else {
      axios.get(`${backendUrl}/especialesConPuntosFrentes`).then((res) => {
        if (Array.isArray(res.data)) {
          setListEspeciales(res.data);
        }
      }).catch(error => {
        console.error("Error fetching articulos especiales:", error);
      });
      setShowColorPerfil(false); // Ocultar el selector de color del perfil
      setSelectedColorPerfil(""); // Restablecer el color del perfil
    }

    // Resetear los demás campos relacionados con puntos
    setSelectedArticulo({ id: "", nombre: "" });
    setSelectedMaterial({ id: "", nombre: "" });
    setSelectedColor({ id: "", nombre: "" });
    setSelectedMedidas({ id: "", nombre: "", puntos: 0 });
    setSelectedMaterialFranja({ id: "", nombre: "" });
    setSelectedColorFranja({ id: "", nombre: "" });
    setPuntos(0);
  };


  const handleSelectSerieChange = (event) => {
    const index = event.target.selectedIndex;
    const nombre = event.target.options[index].text;
    const id = event.target.value;

    setSelectedSerie({ id, nombre });
    handleSelectChange("serie", id, nombre);
    // Si es otro producto, restaurar todos los especiales
    axios.get(`${backendUrl}/especialesConPuntosFrentes`).then((res) => {
      if (Array.isArray(res.data)) {
        setListEspeciales(res.data); // Restaurar la lista de especiales
      }
    }).catch(error => {
      console.error("Error fetching articulos especiales:", error);
    });
    if (id === "1") {
      setShowColorPerfil(true); // Mostrar el selector de color del perfil si la serie es 1
    } else if (selectedProducto.id === "4" || selectedProducto.id === "5") {
      setShowColorPerfil(true); // Mostrar el selector de color del perfil si el producto es 4 o 5
    } else {
      setShowColorPerfil(false); // Ocultar el selector de color del perfil si no es 4 o 5
      setSelectedColorPerfil(""); // Restablecer el color del perfil
    }
    // Restablecer los campos siguientes y los puntos al cambiar la serie
    setSelectedArticulo({ id: "", nombre: "" }); // Restablecer artículo
    setSelectedMaterial({ id: "", nombre: "" }); // Restablecer material
    setSelectedColor({ id: "", nombre: "" }); // Restablecer color
    setSelectedMedidas({ id: "", nombre: "", puntos: 0 }); // Restablecer medidas
    setSelectedMaterialFranja({ id: "", nombre: "" }); // Restablecer material franja
    setSelectedColorFranja({ id: "", nombre: "" }); // Restablecer color franja
    setSelectedEspecial1({ id: "", nombre: "", cantidad: 0 });
    setSelectedEspecial2({ id: "", nombre: "", cantidad: 0 });
    setCantidadEspecial1(0);
    setPuntosEspecial1(0);
    setCantidadEspecial2(0);
    setPuntosEspecial2(0);
    setPuntos(0); // Restablecer puntos

  };

  const handleSelectArticuloChange = (event) => {
    const index = event.target.selectedIndex;
    const nombre = event.target.options[index].text;
    const id = event.target.value;

    if (id === "") {
      // Si se selecciona "--Selecciona una opción--", limpiar todos los campos relacionados
      setSelectedArticulo({ id: "", nombre: "" });
      setSelectedMaterial({ id: "", nombre: "" });
      setSelectedColor({ id: "", nombre: "" });
      setSelectedMedidas({ id: "", nombre: "", puntos: 0 });
      setSelectedMaterialFranja({ id: "", nombre: "" });
      setSelectedColorFranja({ id: "", nombre: "" });
      setPuntos(0); // Restablecer puntos

      // También actualizar el contexto para que no aparezcan en el PDF
      handleSelectChange("articulo", "", "");
      handleSelectChange("material", "", "");
      handleSelectChange("color", "", "");
      handleSelectChange("medidas", "", "");
      handleSelectChange("materialFranja", "", "");
      handleSelectChange("colorFranja", "", "");
    } else {
      // Si se selecciona un artículo válido, continuar normalmente
      setSelectedArticulo({ id, nombre });
      handleSelectChange("articulo", id, nombre);

      // Restablecer los otros campos porque el artículo ha cambiado
      setSelectedMaterial({ id: "", nombre: "" });
      setSelectedColor({ id: "", nombre: "" });
      setSelectedMedidas({ id: "", nombre: "", puntos: 0 });
      setSelectedMaterialFranja({ id: "", nombre: "" });
      setSelectedColorFranja({ id: "", nombre: "" });
      setPuntos(0); // Restablecer puntos
    }
  };

  const handleSelectMaterialChange = (event) => {
    const index = event.target.selectedIndex;
    const nombre = event.target.options[index].text;
    const id = event.target.value;
    setSelectedMaterial({ id, nombre });
    handleSelectChange("material", id, nombre);
    setSelectedColor({ id: "", nombre: "" }); // Restablecer color
    setSelectedMedidas({ id: "", nombre: "", puntos: 0 }); // Restablecer medidas
    setSelectedMaterialFranja({ id: "", nombre: "" }); // Restablecer material franja
    setSelectedColorFranja({ id: "", nombre: "" }); // Restablecer color franja
    setSelectedEspecial1({ id: "", nombre: "", puntos: 0 });
    setSelectedEspecial2({ id: "", nombre: "", puntos: 0 });
    setCantidadEspecial1(0);
    setPuntosEspecial1(0);
    setCantidadEspecial2(0);
    setPuntosEspecial2(0);
    setPuntos(0); // Restablecer puntos

    // Añadir logs en la respuesta del backend
    //console.log("Selected material ID:", id);
    if (nombre.toLowerCase() === 'melamina') {
      axios.get(`${backendUrl}/especialesConPuntosMelamina`).then((res) => {
        //console.log("Response from /especialesConPuntosMelamina:", res.data);
        if (Array.isArray(res.data)) {
          // Filtrar duplicados
          const uniqueEspeciales = res.data.filter((especial, index, self) =>
            index === self.findIndex((e) => (
              e.articulo_nombre === especial.articulo_nombre
            ))
          );
          setListEspeciales(uniqueEspeciales);
        } else {
          console.error("Error fetching articulos especiales: res.data is not an array");
        }
      }).catch(error => {
        console.error("Error fetching articulos especiales:", error);
      });
    } else {
      axios.get(`${backendUrl}/especialesConPuntosFrentes`, {
        params: { materialId: id } // Pasar el material seleccionado
      }).then((res) => {
        //console.log("Response from /especialesConPuntosFrentes:", res.data);
        if (Array.isArray(res.data)) {
          // Filtrar duplicados
          const uniqueEspeciales = res.data.filter((especial, index, self) =>
            index === self.findIndex((e) => (
              e.articulo_id === especial.articulo_id
            ))
          );
          setListEspeciales(uniqueEspeciales);
        } else {
          console.error("Error fetching articulos especiales: res.data is not an array");
        }
      }).catch(error => {
        console.error("Error fetching articulos especiales:", error);
      });
    }
  };
  const handleSelectColorChange = (event) => {
    const index = event.target.selectedIndex;
    const nombre = event.target.options[index].text;
    const id = event.target.value;

    setSelectedColor({ id, nombre });
    handleSelectChange("color", id, nombre);

    if (id === '55' || id === '56' || id === '60') {
      setShouldApplyColorIncrement(true);  // Marcar que se debe aplicar el incremento cuando haya puntos
      setIsColorValueAdded(true);  // Activar el mensaje del 20%

      // Si las medidas ya están seleccionadas, aplicar el incremento inmediatamente
      if (selectedMedidas.id) {
        setPuntos(Math.ceil(selectedMedidas.puntos * 1.2));  // Aplicar incremento si ya hay medidas seleccionadas
      }
    } else {
      setShouldApplyColorIncrement(false);  // No aplicar incremento
      setIsColorValueAdded(false);  // Desactivar el mensaje
      setPuntos(selectedMedidas.puntos);  // Restablecer los puntos originales si no aplica
    }
  };
  const handleSelectMedidasChange = (event) => {
    const index = event.target.selectedIndex;
    const nombre = event.target.options[index].text;
    const id = event.target.value;
    const selectedMedida = listMedidas.find(medida => medida.medidas_id === parseInt(id));

    setSelectedMedidas({ id, nombre, puntos: selectedMedida.puntos });
    handleSelectChange("medidas", id, nombre);

    let newPuntos = selectedMedida.puntos;

    // Verificar si el color seleccionado es "Color según muestra" o "Laca según muestra"
    if (selectedColor.id === '55' || selectedColor.id === '56' || selectedColor.id === '60') {
      newPuntos = Math.ceil(selectedMedida.puntos * 1.2);  // Aplicar incremento del 20% y redondear hacia arriba
    }
    if (brakesChecked) {
      newPuntos += 73;  // Añadir puntos por los frenos si el checkbox está marcado
    }

    setPuntos(newPuntos);  // Actualizar los puntos con o sin incremento
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

    // Verificar si es el especial "Gran Altura" y el producto es 4 o 5
    if (selectedProducto.id === "4" || selectedProducto.id === "5") {
      // Solo permitir "Gran Altura" si la serie es 195
      if (selectedSerie.id === "195" && id !== "") {
        alert("Solo puedes seleccionar 'Gran Altura' para esta serie.");
        return; // Bloquear selección si la serie no es la correcta
      }
    }

    // Verificar si es el especial "tirada vertical" (ID 194)
    if (id === "194" && selectedSerie.nombre.toLowerCase() !== "kanto") {
      alert("El especial 'tirada vertical' solo está disponible para la serie Kanto.");
      return; // Bloquear selección si la serie no es Kanto
    }

    // Si el usuario selecciona la opción vacía
    if (id === "") {
      if (especialIndex === 1) {
        setSelectedEspecial1({ id: "", nombre: "", puntos: 0 });
        setPuntosEspecial1(0);
        setCantidadEspecial1(0); // Restablecer la cantidad a 0
      } else if (especialIndex === 2) {
        setSelectedEspecial2({ id: "", nombre: "", puntos: 0 });
        setPuntosEspecial2(0);
        setCantidadEspecial2(0); // Restablecer la cantidad a 0
      }
      return; // Salir de la función si se selecciona el valor vacío
    }

    // Procesar la selección de especiales como de costumbre
    const selectedEspecial = listEspeciales.find(especial => especial.articulo_id === parseInt(id));
    if (!selectedEspecial) {
      console.error("Especial no encontrado:", id);
      return;
    }

    if (especialIndex === 1) {
      setSelectedEspecial1({ id, nombre, puntos: selectedEspecial.puntos });
      setPuntosEspecial1(selectedEspecial.puntos);
      setCantidadEspecial1(1); // Restablecer cantidad a 1 al seleccionar
    } else if (especialIndex === 2) {
      setSelectedEspecial2({ id, nombre, puntos: selectedEspecial.puntos });
      setPuntosEspecial2(selectedEspecial.puntos);
      setCantidadEspecial2(1); // Restablecer cantidad a 1 al seleccionar
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
  const getEspecialesOptions = () => {
    if (selectedMaterial.nombre.toLowerCase() === "melamina") {
      //console.log("Especiales:", listEspeciales.slice(0, 2));
      return listEspeciales.length >= 3 ? [listEspeciales[0], listEspeciales[2]] : listEspeciales.slice(0, 2);
      // Mostrar solo la primera y la tercera opción si hay suficientes elementos
    } else {
      return listEspeciales.slice(0, 2); // Mostrar solo la primera y la segunda opción
    }
  };
  const handleCantidadChange = (event) => {
    const newCantidad = parseInt(event.target.value, 10);
    setCantidad(newCantidad);
  };
  useEffect(() => {
    if (selectedProducto.id === "4") {
      setBrakesChecked(true);
      if (!brakesPointsApplied) {
        setPuntos(puntos + 73);
        setBrakesPointsApplied(true);
      }
    } else {
      if (brakesPointsApplied) {
        setPuntos(puntos - 73);
        setBrakesPointsApplied(false);
      }
      setBrakesChecked(false);
    }
  }, [selectedProducto.id]);

  const handleBrakesChange = (event) => {
    const isChecked = event.target.checked;
    setBrakesChecked(isChecked);
    if (isChecked) {
      setPuntos(puntos + 73); // Solo si el producto es correcto, ajusta según tu lógica
    } else {
      setPuntos(puntos - 73);
    }
  };
  const getImagePath = (modelName) => {
    if (!modelName) return null; // Si no hay modelo seleccionado, no mostrar nada
    const formattedName = modelName.toLowerCase().replace(/\s+/g, "-"); // Formatear el nombre para que coincida con el nombre del archivo
    return `/ImagenesPresupuestador/${formattedName}.png`; // Ruta de la imagen
  };
  const handleImageClick = () => {
    setShowImageModal(true);
  };

  const handleCloseImageModal = () => {
    setShowImageModal(false);
  };
  return (
    <div className="container">
      <div className="section">
        <div className="container2">
          <button className="guide-button" onClick={() => setShowGuide(true)}>
            Guía
          </button>
          <h1>Puertas</h1>
          <div className="field">
            <label htmlFor="producto">Tipo de Frente:</label>
            <select id="producto" onChange={handleSelectProductChange} value={selectedProducto.id || ""}>
              <option value="" disabled={selectedProducto.id === ""}>--Selecciona una opción--</option>
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
          {showColorPerfil && (
            <div className="field-centered">
              <label htmlFor="colorPerfil">Color del perfil:</label>
              <select
                id="colorPerfil"
                onChange={(event) => {
                  const colorPerfil = event.target.value;
                  setSelectedColorPerfil(colorPerfil);
                  handleSelectChange("colorPerfil", colorPerfil, colorPerfil);
                }}
                value={selectedColorPerfil}
              >
                <option value="">--Selecciona una opción--</option>
                <option value="blanco">Blanco</option>
                <option value="plata">Plata</option>
                <option value="negro">Negro</option>
              </select>
            </div>
          )}
          <div className="field-centered">
            <label htmlFor="cantidad">Cantidad:</label>
            <input
              type="number"
              id="cantidad"
              value={cantidad}
              onChange={handleCantidadChange}
              min="1"
            />
          </div>
          <div className="field-centered">

            <label htmlFor="puntos">Puntos: {puntos * cantidad}</label>
          </div>
          {showGuide && (
            <div
              className="modal-overlay"
              onClick={(e) => {
                // Cerrar el modal si se hace clic fuera del contenido
                if (e.target.className === "modal-overlay") {
                  setShowGuide(false);
                }
              }}
            >
              <div className="modal-content">
                <h2>Guía de Uso: Configuración de Frentes</h2>
                <ol>
                  <li>
                    <strong>Seleccionar el Tipo de Frente</strong>
                    <p>En el campo "Tipo de Frente", selecciona el tipo de frente que deseas configurar.</p>
                    <p>Ejemplo: Puertas correderas o abatibles.</p>
                    <p>Si no ves opciones disponibles, asegúrate de haber iniciado sesión correctamente.</p>
                  </li>
                  <li>
                    <strong>Seleccionar la Serie</strong>
                    <p>Una vez seleccionado el tipo de frente, el campo "Serie" se habilitará.</p>
                    <p>Selecciona la serie que corresponde al tipo de frente elegido.</p>
                    <p>Ejemplo: Serie Kanto, Serie Uniforme.</p>
                  </li>
                  <li>
                    <strong>Seleccionar el Modelo</strong>
                    <p>En el campo "Modelo", selecciona el modelo del frente.</p>
                    <p>Este campo se habilitará después de seleccionar una serie válida.</p>
                  </li>
                  <li>
                    <strong>Respecto a las puertas correderas con frenos</strong>
                    <p>Las puertas correderas con frenos los llevan incluidos por defecto, estan pensadas para llevarlos</p>
                  </li>
                  <li>
                    <strong>Seleccionar el Material</strong>
                    <p>En el campo "Material", selecciona el material principal del frente.</p>
                    <p>Ejemplo: Melamina, Laca, Cristal.</p>
                  </li>
                  <li>
                    <strong>Seleccionar el Color Principal</strong>
                    <p>En el campo "Color Principal", selecciona el color del frente.</p>
                    <p>Ejemplo: Blanco, Roble, Gris.</p>
                    <p>Si seleccionas colores especiales como "Color según muestra", se aplicará un incremento del 20% en los puntos.</p>
                  </li>
                  <li>
                    <strong>Seleccionar las Medidas</strong>
                    <p>En el campo "Medidas", selecciona las dimensiones del frente.</p>
                    <p>Las medidas disponibles dependen del modelo y material seleccionados.</p>
                  </li>
                  <li>
                    <strong>Configurar la Franja (Opcional)</strong>
                    <p>Si el modelo seleccionado admite franjas, los campos "Material Franja" y "Color Franja" estarán habilitados.</p>
                    <p>Selecciona el material y color de la franja según tus preferencias.</p>
                  </li>
                  <li>
                    <strong>Configurar el Color del Perfil</strong>
                    <p>Si el tipo de frente o la serie seleccionada lo permite, aparecerá el campo "Color del Perfil".</p>
                    <p>Selecciona el color del perfil entre las opciones disponibles: Blanco, Plata o Negro.</p>
                  </li>
                  <li>
                    <strong>Configurar la Cantidad</strong>
                    <p>En el campo "Cantidad", introduce el número de frentes que deseas presupuestar.</p>
                    <p>El precio total se calculará automáticamente en función de la cantidad y las configuraciones seleccionadas.</p>
                  </li>
                  <li>
                    <strong>Configurar Artículos Especiales (Opcional)</strong>
                    <p>En la sección "Especiales a Medida", puedes añadir hasta dos artículos especiales.</p>
                    <p>Selecciona el artículo especial en los campos "Artículo Especial 1" y "Artículo Especial 2".</p>
                    <p>Introduce la cantidad correspondiente en los campos de cantidad.</p>
                    <p>El precio de los artículos especiales se calculará automáticamente.</p>
                  </li>
                  <li>
                    <strong>Verificar los Puntos Totales</strong>
                    <p>Los puntos totales (el precio) se muestran en el campo "Puntos".</p>
                    <p>Asegúrate de que los puntos reflejen correctamente todas las configuraciones seleccionadas.</p>
                  </li>
                </ol>
                <button onClick={() => setShowGuide(false)}>Cerrar</button>
              </div>
            </div>
          )}
        </div>

        <div className="section">
          <div className="container4" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", paddingRight: "20px" }}>
            {/* Columna de campos especiales */}
            <div style={{ flex: 1, marginRight: "20px" }}>
              <h2>Especiales a Medida</h2>

              {/* Línea horizontal para Artículo Especial 1 */}
              <div style={{ display: "flex", alignItems: "flex-end", marginBottom: "12px" }}>
                <div className="field-special" style={{ flexBasis: "40%" }}>
                  <label htmlFor="especial1">Artículo Especial 1:</label>
                  <select
                    id="especial1"
                    onChange={(event) => handleSelectEspecialChange(1, event)}
                    value={selectedEspecial1.id || ""}
                  >
                    <option value="">--Selecciona una opción--</option>
                    {getEspecialesOptions().map((especial) => (
                      <option key={especial.articulo_id} value={especial.articulo_id}>
                        {especial.articulo_nombre}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="field-special" style={{ flexBasis: "20%" }}>
                  <label htmlFor="cantidadEspecial1">Cantidad:</label>
                  <input
                    type="number"
                    id="cantidadEspecial1"
                    value={cantidadEspecial1}
                    onChange={(event) => handleCantidadEspecialChange(1, event)}
                    min="0"
                  />
                </div>

                <div className="fake-field-special" style={{ flexBasis: "10%", display: "flex", alignItems: "center", gap: "5px" , fontWeight: "bold", marginLeft: "15px"}}>
                  <label style={{ marginBottom: 0 }}>Puntos:</label>
                  <p className="puntos-text" style={{ margin: 0 }}>{puntosEspecial1}</p>
                </div>
              </div>

              {/* Línea horizontal para Artículo Especial 2 */}
              <div style={{ display: "flex", alignItems: "flex-end" }}>
                <div className="field-special" style={{ flexBasis: "40%" }}>
                  <label htmlFor="especial2">Artículo Especial 2:</label>
                  <select
                    id="especial2"
                    onChange={(event) => handleSelectEspecialChange(2, event)}
                    value={selectedEspecial2.id || ""}
                  >
                    <option value="">--Selecciona una opción--</option>
                    {getEspecialesOptions().map((especial) => (
                      <option key={especial.articulo_id} value={especial.articulo_id}>
                        {especial.articulo_nombre}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="field-special" style={{ flexBasis: "20%" }}>
                  <label htmlFor="cantidadEspecial2">Cantidad:</label>
                  <input
                    type="number"
                    id="cantidadEspecial2"
                    value={cantidadEspecial2}
                    onChange={(event) => handleCantidadEspecialChange(2, event)}
                    min="0"
                  />
                </div>

                <div className="fake-field-special" style={{ flexBasis: "10%", display: "flex", alignItems: "center", gap: "5px" , fontWeight: "bold", marginLeft: "15px"}}>
                  <label style={{ marginBottom: 0 }}>Puntos:</label>
                  <p className="puntos-text" style={{ margin: 0 }}>{puntosEspecial2}</p>
                </div>
              </div>
            </div>

            {/* Imagen a la derecha */}
            <div
              style={{
                width: "350px",
                marginTop: "10px",
                marginRight: "100px",
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "center",
              }}
            >
              {selectedArticulo.nombre && (
                <img
                  src={`/ImagenesPresupuestador/${selectedArticulo.nombre}.png`}
                  alt={`Imagen de ${selectedArticulo.nombre}`}
                  style={{
                    width: "100%",
                    maxHeight: "300px",
                    objectFit: "contain",
                    border: "none",
                    borderRadius: "0",
                    cursor: "pointer", // Cambiar el cursor para indicar que es clickeable
                  }}
                  onClick={handleImageClick} // Abrir el modal al hacer clic
                  onError={(e) => (e.target.style.display = "none")}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      {showImageModal && (
        <div
          className="modal-overlay"
          onClick={(e) => {
            if (e.target.className === "modal-overlay") {
              handleCloseImageModal(); // Cerrar el modal al hacer clic fuera de la imagen
            }
          }}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              position: "relative",
              backgroundColor: "#fff",
              padding: "20px",
              borderRadius: "8px",
              maxWidth: "90%",
              maxHeight: "90%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              src={`/ImagenesPresupuestador/${selectedArticulo.nombre}.png`}
              alt={`Imagen de ${selectedArticulo.nombre}`}
              style={{
                maxWidth: "100%",
                maxHeight: "100%",
                objectFit: "contain",
              }}
            />
            <button
              onClick={handleCloseImageModal}
              style={{
                position: "absolute",
                bottom: "10px",
                right: "10px",
                padding: "10px 20px",
                backgroundColor: "#f44336",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Frentes;