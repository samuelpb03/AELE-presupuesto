import { jsPDF } from "jspdf";
// Labels para cambiar los nombres que lleguen de las otras clases y mejorar la estética
const labelsMap = {
  selectedProductoNombre: "Producto",
  selectedArticuloNombre: "Artículo",
  selectedMaterialNombre: "Material",
  selectedColorNombre: "Color",
  selectedMedidasNombre: "Medidas",
  selectedMaterialFranjaNombre: "Material Franja",
  selectedColorFranjaNombre: "Color Franja",
  puntos: "Puntos",
  cantidad: "Cantidad",
  selectedArticulos: "Artículos de Remates",
  metros: "Metros",
  selectedOtros: "Otros Artículos",
  cantidadesOtros: "Cantidades Otros",
  selectedEspecial1Nombre: "Especial a medida 1",
  puntosEspecial1: "Puntos Especial 1",
  selectedEspecial2Nombre: "Especial a medida 2",
  puntosEspecial2: "Puntos Especial 2",
  cantidadEspecial1: "Cantidad Especial 1",
  cantidadEspecial2: "Cantidad Especial 2",
  selectedEspecial3Nombre: "Especial a medida 3",
  puntosEspecial3: "Puntos Especial 3",
  selectedEspecial4Nombre: "Especial a medida 4",
  puntosEspecial4: "Puntos Especial 4",
  cantidadEspecial3: "Cantidad Especial 3",
  cantidadEspecial4: "Cantidad Especial 4",
  selectedEspecial5Nombre: "Especial a medida 5",
  puntosEspecial4: "Puntos Especial 5",
  cantidadEspecial4: "Cantidad Especial 5",
  interioresOtros1Nombre: "Otros Artículo 1",
  cantidadInterioresOtros1: "Cantidad Otros 1",
  puntosInterioresOtros1: "Puntos Otros 1",
  interioresOtros2Nombre: "Otros Artículo 2",
  cantidadInterioresOtros2: "Cantidad Otros 2",
  puntosInterioresOtros2: "Puntos Otros 2",
  interioresOtros3Nombre: "Otros Artículo 3",
  cantidadInterioresOtros3: "Cantidad Otros 3",
  puntosInterioresOtros3: "Puntos Otros 3",
  interioresOtros4Nombre: "Otros Artículo 4",
  cantidadInterioresOtros4: "Cantidad Otros 4",
  puntosInterioresOtros4: "Puntos Otros 4",
  cantidad1: "Cantidad 1",
  puntos1: "Puntos 1",
  cantidad2: "Cantidad 2",
  puntos2: "Puntos 2",
  cantidad3: "Cantidad 3",
  puntos3: "Puntos 3",
  color1Nombre: "Color 1",
  color2Nombre: "Color 2",
  color3Nombre: "Color 3",
  color4Nombre: "Color 4",
  color5Nombre: "Color 5",
  color6Nombre: "Color 6",
  color7Nombre: "Color 7",
  color8Nombre: "Color 8",
  color9Nombre: "Color 9",
  cantidad4: "Cantidad 4",
  articulo1Nombre: "Articulo 1",
  articulo2Nombre: "Articulo 2",
  articulo3Nombre: "Articulo 3",
  articulo4Nombre: "Articulo 4",
  articulo5Nombre: "Articulo 5",
  articulo6Nombre: "Articulo 6",
  articulo7Nombre: "Articulo 7",
  articulo8Nombre: "Articulo 8",
  articulo9Nombre: "Articulo 9",
  articulo10Nombre: "Articulo 10",
  articulo11Nombre: "Articulo 11",
  cantidad5: "Cantidad 5",
  cantidad6: "Cantidad 6",
  cantidad7: "Cantidad 7",
  cantidad8: "Cantidad 8",
  cantidad9: "Cantidad 9",
  cantidad10: "Cantidad 10",
  cantidad11: "Cantidad 11",
  puntos4: "Puntos 4",
  puntos5: "Puntos 5",
  puntos6: "Puntos 6",
  puntos7: "Puntos 7",
  puntos8: "Puntos 8",
  puntos9: "Puntos 9",
  puntos10: "Puntos 10",
  puntos11: "Puntos 11",
  medidas1Nombre: "Medidas 1",
  medidas2Nombre: "Medidas 2",
  medidas3Nombre: "Medidas 3",
  medidas4Nombre: "Medidas 4",
  medidas5Nombre: "Medidas 5",
  medidas6Nombre: "Medidas 6",
  medidas7Nombre: "Medidas 7",
  medidas8Nombre: "Medidas 8",
  medidas9Nombre: "Medidas 9",
  medidas10Nombre: "Medidas 10",
  medidas11Nombre: "Medidas 11",
  puntosTotales1: "Puntos 1",
  puntosTotales2: "Puntos 2",
  puntosTotales3: "Puntos 3",
  puntosTotales4: "Puntos 4",
  puntosTotales5: "Puntos 5",
  puntosTotales6: "Puntos 6",
  puntosTotales7: "Puntos 7",
  puntosTotales8: "Puntos 8",
  puntosTotales9: "Puntos 9",
  puntosTotales10: "Puntos 10",
  puntosTotales11: "Puntos 11",
};
const valorPuntos = 1;
// Función para generar el PDF
export const generatePDF = async (data, userInfo) => {
  const doc = new jsPDF();
  const drawBorder = () => {
    doc.setLineWidth(0.5);
    doc.rect(2, 2, pageWidth - 4, pageHeight - 4); // Dibujar el borde
  };

  const checkPageSpace = (doc, startY) => {
    const marginBottom = 10;
    const pageHeight = doc.internal.pageSize.getHeight();
    drawBorder();
    if (startY >= pageHeight - marginBottom) {
      doc.addPage();
      return 20;  // Reiniciar posición vertical en la nueva página
    }
    return startY;
  };

  // Agregar logotipo
  const user = JSON.parse(localStorage.getItem('user'));
  const centro = user?.centro || 'Centro no especificado';
  const idUsuario = user?.id || 'Usuario no especificado';
  let logo = 'logoAELE.png';
  if (centro === "Leroy Merlin") {
    logo = 'logoLeroy.png';
  }
  doc.addImage(logo, 'PNG', 10, 10, 50, 20);

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  doc.setLineWidth(0.5);
  doc.rect(2, 2, pageWidth - 4, pageHeight - 4); // Recuadro con bordes finos

  doc.setFontSize(7);
  const companyDetails = [
    `Centro: ${centro}`,
    `Cliente: ${userInfo.cliente}`,
    `Teléfono: ${userInfo.telefono}`,
  ];
  // Añadiendo la fecha al PDF
  const today = new Date();
  const dateStr = `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`;
  doc.text(`Fecha: ${dateStr}`, pageWidth - 90, 45);

  companyDetails.forEach((line, index) => {
    doc.text(line, pageWidth - 90, 15 + (index * 7));
  });

  doc.setFontSize(13);
  doc.text("Presupuesto", pageWidth - 90, 40);

  // Configuramos las secciones
  const sections = {
    frentes: "Frentes",
    frentes2: "Frentes 2",
    frentes3: "Frentes 3",
    tiradores: "Tiradores y cerraduras",
    interiores: "Interiores",
    equipamiento3: "Equipamiento",
    baldas: "Baldas e iluminación", // Aquí incluimos los remates como una sección más
  };
  const isValidField = (value) => value && value !== "--Selecciona una opción--";
  let startY = 52;
  let lastFrenteProcessed = "";
  let lastInterioresProcessed = "";
  let totalEspecialesFrentes = 0;
  let totalEspecialesInteriores = 0;

  // Procesar y agregar datos de la sección, incluyendo los remates
  Object.entries(sections).forEach(([section, title]) => {
    const hasData = Object.entries(data[section] || {}).some(([key, value]) => value && labelsMap[key]);


    if (!hasData) {
      return;  // Saltar esta sección si no tiene datos
    }
    

    if (data[section]) {
      let sectionData = [];
      let puntosSeccion = 0; // Inicializar acumulador de puntos

      Object.entries(data[section]).forEach(([key, value]) => {
        if (
          key.startsWith('selectedEspecial') ||
          key.startsWith('cantidadEspecial') ||
          key.startsWith('puntosEspecial') ||
          key.startsWith('interioresOtros') ||
          key.startsWith('puntosInterioresOtros') ||
          key.startsWith('cantidadInterioresOtros')
        ) {
          return; // Omitir los especiales
        }

        if (key.toLowerCase().includes('puntos') && value) {
          if (section === 'frentes' || section === 'frentes2' || section === 'frentes3') {
            const cantidad = data[section]?.cantidad || 1;
            if (cantidad > 1) {
            puntosSeccion = Number(value); // Multiplica por la cantidad cuando es mayor a 1
          } else {
            puntosSeccion = Number(value) * 1; // No hacer ninguna operación extra si la cantidad es 1
          }
          }
           // Asume que la cantidad es 1 si no está definida
        
          // Calcular los puntos basado en la cantidad
          
        }
        if (isValidField(value) && labelsMap[key]) {
          sectionData.push(`${value}`);
          startY = checkPageSpace(doc, startY);
        }
      });

      // Imprimir el título de la sección
      doc.setFontSize(10);
      doc.setFillColor(220, 220, 220);
      startY = checkPageSpace(doc, startY);
      doc.rect(10, startY - 4, pageWidth - 20, 5, 'F');
      doc.text(title, 12, startY);
      startY += 5;
      doc.setFontSize(7);
      // Imprimir los datos de la sección en filas de 4 elementos
      sectionData.forEach((line, index) => {
        let xPosition;
        if (line.toLowerCase().includes('cantidad') || line.toLowerCase().includes('puntos')) {
          xPosition = pageWidth - 20;
        } else {
          xPosition = 12 + (index % 4) * (pageWidth / 4);
        }

        doc.text(line, xPosition, startY);

        if ((index + 1) % 4 === 0) {
          startY += 6; // Avanza a la siguiente fila después de 4 elementos
        }
        startY = checkPageSpace(doc, startY);
      });

      // Imprimir los puntos de la sección (si hay puntos)
      puntosSeccion = Math.round(puntosSeccion);
      if (puntosSeccion > 0) {
        doc.setFontSize(7);
        doc.setFont("helvetica", "bold"); // Texto en negrita
        startY = checkPageSpace(doc, startY);
        doc.text(`Puntos sección: ${puntosSeccion}`, pageWidth - 50, startY); // Imprimir los puntos alineados a la derecha
        doc.setFont("helvetica", "normal");  // Volver a la fuente normal
      }

      startY += 10;

      // Verificar si es el último frente (frentes3 o el último de los frentes) y agregar los especiales a medida después
      if (section === 'frentes' || section === 'frentes2' || section === 'frentes3') {
        lastFrenteProcessed = section;
      }

      // Verificar si es "Interiores" y guardar la referencia
      if (section === 'interiores') {
        lastInterioresProcessed = section;
      }
    }
  });
  // Procesar remates a medida
let puntosRematesTotal = 0; // Inicializar los puntos de los remates
if (data.remates) {
  let rematesData = []; // Declarar array para los datos de los remates
  const { selectedArticulos = [], metros = [], selectedOtros = [], cantidadesOtros = [] } = data.remates;

  // Procesar los artículos de remates y agregar a rematesData
  selectedArticulos.forEach((articulo, index) => {
    if (articulo.nombre && metros[index] > 0) {
      rematesData.push({
        nombre: articulo.nombre,
        metros: metros[index],
        puntos: articulo.puntos,
      });
      // Sumar los puntos de remates por metros
      puntosRematesTotal += articulo.puntos;
    }
  });

  // Procesar otros artículos de remates y agregar a rematesData
  selectedOtros.forEach((otro, index) => {
    if (otro.nombre && cantidadesOtros[index] > 0) {
      rematesData.push({
        nombre: otro.nombre,
        cantidad: cantidadesOtros[index],
        puntos: otro.puntos * cantidadesOtros[index],
      });
      // Sumar los puntos de otros remates por cantidad
      puntosRematesTotal += otro.puntos * cantidadesOtros[index];
    }
  });

  // Imprimir los datos de remates en el PDF
  if (rematesData.length > 0) {
    doc.setFontSize(10);
    doc.setFillColor(220, 220, 220);
    startY = checkPageSpace(doc, startY);
    doc.rect(10, startY - 4, pageWidth - 20, 5, 'F');
    doc.text("Remates a medida", 12, startY);
    startY += 6;

    doc.setFontSize(7); // Ajustar el tamaño de la fuente para los datos
    rematesData.forEach((remate, index) => {
      doc.text(`${remate.nombre || ''}`, 12, startY);
      if (remate.metros) {
        doc.text(`Metros: ${remate.metros.toFixed(2)}`, pageWidth - 50, startY);
      }
      if (remate.cantidad) {
        doc.text(`Cantidad: ${remate.cantidad}`, pageWidth - 50, startY);
      }
      doc.text(`Puntos: ${remate.puntos.toFixed(2)}`, pageWidth - 30, startY);
      startY += 6;
      startY = checkPageSpace(doc, startY);
    });
  }
}

  // Comprobación para verificar si hay datos en los especiales
  const hasEspeciales = (especiales) => {
    return especiales.some(especial => especial.nombre || especial.cantidad || especial.puntos);
  };

  // Imprimir los especiales a medida después del último frente procesado
  if (lastFrenteProcessed) {
    const especialesFrentes = [
      { nombre: data.frentes?.selectedEspecial1Nombre, cantidad: data.frentes?.cantidadEspecial1, puntos: data.frentes?.puntosEspecial1 },
      { nombre: data.frentes?.selectedEspecial2Nombre, cantidad: data.frentes?.cantidadEspecial2, puntos: data.frentes?.puntosEspecial2 },
      { nombre: data.frentes2?.selectedEspecial1Nombre, cantidad: data.frentes2?.cantidadEspecial1, puntos: data.frentes2?.puntosEspecial1 },
      { nombre: data.frentes2?.selectedEspecial2Nombre, cantidad: data.frentes2?.cantidadEspecial2, puntos: data.frentes2?.puntosEspecial2 },
      { nombre: data.frentes3?.selectedEspecial1Nombre, cantidad: data.frentes3?.cantidadEspecial1, puntos: data.frentes3?.puntosEspecial1 },
      { nombre: data.frentes3?.selectedEspecial2Nombre, cantidad: data.frentes3?.cantidadEspecial2, puntos: data.frentes3?.puntosEspecial2 },
    ];

    // Sumar la cantidad total de especiales de frentes
    especialesFrentes.forEach((especial) => {
      totalEspecialesFrentes += Number(especial.cantidad || 0);
    });

    // Solo imprimir si hay datos en los especiales
    if (hasEspeciales(especialesFrentes)) {
      doc.setFontSize(10);
      doc.setFillColor(220, 220, 220);
      startY = checkPageSpace(doc, startY);
      doc.rect(10, startY - 4, pageWidth - 20, 5, 'F');
      doc.text("Especiales frentes a medida", 12, startY);
      startY += 6;

      doc.setFontSize(7);
      especialesFrentes.forEach((especial) => {
        if (especial.nombre || especial.cantidad || especial.puntos) {
          doc.text(`${especial.nombre || ''}`, 12, startY);
          doc.text(`Cantidad: ${especial.cantidad || ''}`, pageWidth - 50, startY);
          doc.text(`Puntos: ${especial.puntos || ''}`, pageWidth - 30, startY);
          startY += 6;
          startY = checkPageSpace(doc, startY);
        }
      });
    }
  }

  // Imprimir los especiales de interiores después de procesar la sección "Interiores"
  if (lastInterioresProcessed) {
    const especialesInteriores = [
      { nombre: data.interiores?.selectedEspecial1Nombre, cantidad: data.interiores?.cantidadEspecial1, puntos: data.interiores?.puntosEspecial1 },
      { nombre: data.interiores?.selectedEspecial2Nombre, cantidad: data.interiores?.cantidadEspecial2, puntos: data.interiores?.puntosEspecial2 },
      { nombre: data.interiores?.selectedEspecial3Nombre, cantidad: data.interiores?.cantidadEspecial3, puntos: data.interiores?.puntosEspecial3 },
      { nombre: data.interiores?.selectedEspecial4Nombre, cantidad: data.interiores?.cantidadEspecial4, puntos: data.interiores?.puntosEspecial4 },
      { nombre: data.interiores?.selectedEspecial5Nombre, cantidad: data.interiores?.cantidadEspecial5, puntos: data.interiores?.puntosEspecial5 },
    ];
  
    const otrosArticulosInteriores = [
      { nombre: data.interiores?.interioresOtros1Nombre, cantidad: data.interiores?.cantidadInterioresOtros1, puntos: data.interiores?.puntosInterioresOtros1 },
      { nombre: data.interiores?.interioresOtros2Nombre, cantidad: data.interiores?.cantidadInterioresOtros2, puntos: data.interiores?.puntosInterioresOtros2 },
      { nombre: data.interiores?.interioresOtros3Nombre, cantidad: data.interiores?.cantidadInterioresOtros3, puntos: data.interiores?.puntosInterioresOtros3 },
      { nombre: data.interiores?.interioresOtros4Nombre, cantidad: data.interiores?.cantidadInterioresOtros4, puntos: data.interiores?.puntosInterioresOtros4 },
    ];
  
    // Sumar la cantidad total de especiales de interiores, excluyendo los "Otros artículos interiores"
    especialesInteriores.forEach((especial) => {
      totalEspecialesInteriores += Number(especial.cantidad || 0);
    });
  
    // Imprimir los especiales de interiores
    if (especialesInteriores.some(especial => especial.nombre || especial.cantidad || especial.puntos)) {
      doc.setFontSize(10);
      doc.setFillColor(220, 220, 220);
      startY = checkPageSpace(doc, startY);
      doc.rect(10, startY - 4, pageWidth - 20, 5, 'F');
      doc.text("Especiales interiores a medida", 12, startY);
      startY += 6;
  
      doc.setFontSize(7);
      especialesInteriores.forEach((especial) => {
        if (especial.nombre || especial.cantidad || especial.puntos) {
          doc.text(`${especial.nombre || ''}`, 12, startY);
          doc.text(`Cantidad: ${especial.cantidad || ''}`, pageWidth - 50, startY);
          doc.text(`Puntos: ${especial.puntos || ''}`, pageWidth - 30, startY);
          startY += 6;
          startY = checkPageSpace(doc, startY);
        }
      });
    }
  
    // Imprimir los "Otros artículos interiores"
    if (otrosArticulosInteriores.some(articulo => articulo.nombre || articulo.cantidad || articulo.puntos)) {
      doc.setFontSize(10);
      doc.setFillColor(220, 220, 220);
      startY = checkPageSpace(doc, startY);
      doc.rect(10, startY - 4, pageWidth - 20, 5, 'F');
      doc.text("Otros artículos interiores", 12, startY);
      startY += 6;
  
      doc.setFontSize(7);
      otrosArticulosInteriores.forEach((articulo) => {
        if (articulo.nombre || articulo.cantidad || articulo.puntos) {
          doc.text(`${articulo.nombre || ''}`, 12, startY);
          doc.text(`Cantidad: ${articulo.cantidad || ''}`, pageWidth - 50, startY);
          doc.text(`Puntos: ${articulo.puntos || ''}`, pageWidth - 30, startY);
          startY += 6;
          startY = checkPageSpace(doc, startY);
        }
      });
    }
  }
  

    // Solo imprimir si hay datos en los especiales
    
  // Sumar 32 puntos por cada unidad de especial (frentes + interiores)
  const puntosEspecialesTotal = (totalEspecialesFrentes + totalEspecialesInteriores) * 32;

  // Calcular los puntos totales, sumando los puntos de los especiales
  const totalPuntos = Object.entries(sections).reduce((total, [section]) => {
    return total + Object.entries(data[section] || {}).reduce((subTotal, [key, value]) => {
      if (key.startsWith('puntos') && value) {
        return subTotal + Number(value);
      }
      return subTotal;
    }, 0);
  }, 0) + puntosEspecialesTotal + puntosRematesTotal; // Añadir los puntos especiales y los puntos de remates
  const obtenerTiendaId = async (centro) => {
    console.log("Centro:", centro);
    try {
      const response = await fetch(`http://194.164.166.129:6969/getTiendaIdByName?nombreTienda=${centro}`);
      const data = await response.json();
      if (response.ok) {
        return data.tiendaId;
      } else {
        console.error("Error al obtener el ID de la tienda:", data.message);
        return null;
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
      return null;
    }
  };
  

  // Cálculo de montaje e instalación
  const numDesmontaje = data.instalacion?.numDesmontaje || 0;
  const numFrentesInteriores = data.instalacion?.numFrentesInteriores || 0;
  const numArmariosCompletos = data.instalacion?.numArmariosCompletos || 0;
  let totalMontaje = (numFrentesInteriores * 110) + (numArmariosCompletos * 146) + 115;
  const calcularPuntosConPromociones = async (nombreTienda, puntos) => {
    try {
      // Obtenemos el ID de la tienda
      const tiendaId = await obtenerTiendaId(nombreTienda);
      if (!tiendaId) {
        console.error("No se pudo obtener el ID de la tienda");
        return null;
      }
  
      // Consultamos el backend para calcular los puntos con las promociones
      const response = await fetch(`http://194.164.166.129:6969/calcularPuntosConPromociones?tiendaId=${tiendaId}&puntos=${puntos}`);
      const data = await response.json();
      if (response.ok) {
        return data.puntosTotales;
      } else {
        console.error("Error calculando puntos con promociones:", data.message);
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
    return null;
  };
  
  // Luego, en el lugar donde calculas los puntos totales, llamas a esta nueva función:
  const calcularPuntosTotales = async (nombreTienda, puntos) => {
    try {
      // Primero obtenemos el ID de la tienda basado en el nombre
      const tiendaId = await obtenerTiendaId(nombreTienda);
      if (!tiendaId) {
        console.error("No se pudo obtener el ID de la tienda");
        return null;
      }
  
      // Usamos el ID de la tienda para calcular los puntos totales
      const response = await fetch(`http://194.164.166.129:6969/calcularPuntosTotales?tiendaId=${tiendaId}&puntos=${puntos}`);
      const data = await response.json();
      if (response.ok) {
        console.log("Puntos totales calculados:", data.puntosTotales);
        return data.puntosTotales;
      } else {
        console.error("Error calculando puntos totales:", data.message);
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
    return null;
  };
  // Imprimir totales
  var puntosFinal = await calcularPuntosConPromociones(centro, totalPuntos);
  if (puntosFinal === null || puntosFinal === undefined || puntosFinal === 0) {
    puntosFinal = await calcularPuntosTotales(centro, totalPuntos);
  }
  startY += 15;
  startY = checkPageSpace(doc, startY);
  doc.text(`Total Puntos: ${(puntosFinal / 10) * 10  + (numDesmontaje * 121) + '€'}`, 12, startY);
  startY += 10;
  doc.text(`Total portes/acarreo: ${totalMontaje.toFixed(2)} €`, 12, startY);

  // Crear el nombre del PDF y enviarlo
  const centroAbreviado = centro.substring(0, 3).toUpperCase();
  fetch('http://194.164.166.129:6969/presupuesto', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      centro: centro,
      puntos: totalPuntos,
      cliente: userInfo.cliente,
      tienda: userInfo.tienda
    }),
    credentials: 'include'
  })
    .then(response => response.json())
    .then(data => {
      const nombrePresupuesto = `${centroAbreviado}-${data.idPresupuesto}`;
      doc.save(`${nombrePresupuesto}.pdf`);
    })
    .catch(error => {
      console.error("Error al enviar datos del presupuesto:", error);
    });
};
