import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable';

const labelsMap = {
  selectedProductoNombre: "Producto",
  selectedSerieNombre: "Serie",
  selectedArticuloNombre: "Artículo",
  selectedMaterialNombre: "Material",
  selectedColorNombre: "Color",
  selectedMedidasNombre: "Medidas",
  selectedMaterialFranjaNombre: "Material Franja",
  selectedColorFranjaNombre: "Color Franja",
  puntos: "Puntos",
  cantidad: "Cantidad",
  selectedEspecial1Nombre: "Especial a medida 1",
  selectedEspecial2Nombre: "Especial a medida 2",
  puntosEspecial1: "Puntos Especial 1",
  puntosEspecial2: "Puntos Especial 2",
  cantidadEspecial1: "Cantidad Especial 1",
  cantidadEspecial2: "Cantidad Especial 2",
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
  cantidad4: "Cantidad 4",
  cantidad5: "Cantidad 5",
  cantidad6: "Cantidad 6",
  puntos4: "Puntos 4",
  puntos5: "Puntos 5",
  puntos6: "Puntos 6",
  puntos7: "Puntos 7",
  medidas1Nombre: "Medidas 1",
  medidas2Nombre: "Medidas 2",
  medidas3Nombre: "Medidas 3",
  medidas4Nombre: "Medidas 4",
  medidas5Nombre: "Medidas 5",
  medidas6Nombre: "Medidas 6",
  medidas7Nombre: "Medidas 7",
  medidas8Nombre: "Medidas 8",
  medidas9Nombre: "Medidas 9",
  puntosTotales1: "Puntos 1",
  puntosTotales2: "Puntos 2",
  puntosTotales3: "Puntos 3",
  puntosTotales4: "Puntos 4",
  puntosTotales5: "Puntos 5",
  puntosTotales6: "Puntos 6",
  puntosTotales7: "Puntos 7",
  puntosTotales8: "Puntos 8",
  puntosTotales9: "Puntos 9",
};

// Función para generar el PDF
export const generatePDF = (data, userInfo) => {
  const doc = new jsPDF();

  // Función para redibujar el borde en cada página
  const drawBorder = () => {
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    doc.setLineWidth(0.5);
    doc.rect(5, 5, pageWidth - 10, pageHeight - 10); // Recuadro con bordes finos
  };

  // Helper para verificar si hay espacio suficiente en la página
  const checkPageSpace = (doc, startY) => {
    const pageHeight = doc.internal.pageSize.getHeight();
    const marginBottom = 20; // Margen inferior
    if (startY >= pageHeight - marginBottom) {
      doc.addPage();
      drawBorder(); // Redibujar el borde en cada nueva página
      return 20; // Reiniciar la posición vertical para la nueva página
    }
    return startY;
  };

  // Agregar logotipo
  const user = JSON.parse(localStorage.getItem('user'));
  const centro = user?.centro || 'Centro no especificado'; // Campo centro del user
  let logo = 'logoAELE.png';
  if (centro === "Leroy Merlin") {
    logo = 'logoLeroy.png';
  }

  doc.addImage(logo, 'PNG', 10, 10, 50, 20);
  drawBorder(); // Dibujar el borde en la primera página

  // Detalles de la empresa en varias líneas en la esquina superior derecha
  doc.setFontSize(10);
  const companyDetails = [
    `Centro: ${centro}`,
    `Cliente: ${userInfo.cliente}`,
    `Teléfono: ${userInfo.telefono}`
  ];
  companyDetails.forEach((line, index) => {
    doc.text(line, doc.internal.pageSize.getWidth() - 90, 15 + (index * 7)); // Ajuste de líneas
  });

  // Título ajustado a "Presupuesto"
  doc.setFontSize(18);
  doc.text("Presupuesto", doc.internal.pageSize.getWidth() - 90, 40); // En la esquina derecha, junto a los datos

  // Configurar autoTable para agregar bordes en cada nueva página
  const autoTableOptions = {
    theme: 'grid',
    styles: {
      fillColor: [255, 255, 255], // Sin color de fondo
      textColor: 0,
    },
    headStyles: {
      fillColor: [220, 220, 220], // Color gris claro para los títulos
      textColor: 0,
    },
    columnStyles: {
      0: { cellWidth: 45 }, // Ajustar el ancho de las columnas de 'Concepto'
      1: { cellWidth: 50 }  // Ajustar el ancho de las columnas de 'Detalles'
    },
    didDrawPage: (data) => {
      drawBorder(); // Redibujar el borde en cada nueva página
    }
  };

  // Tabla de datos
  const sections = {
    frentes: "Frentes",
    frentes2: "Frentes 2",
    frentes3: "Frentes 3",
    tiradores: "Tiradores y cerraduras",
    interiores: "Interiores",
    equipamiento3: "Equipamiento",
    baldas: "Baldas e iluminación",
    remates: "Remates a medida",
    instalacion: "Instalacion"
  };

  let startY = 50;
  let totalFrentesInteriores = 0;

  Object.entries(sections).forEach(([section, title]) => {
    if (data[section]) {
      let articuloCounter = 1;
      const sectionData = [];

      // Procesar y agregar datos de la sección
      Object.entries(data[section]).forEach(([key, value]) => {
        if (key === 'cantidadFrente') return; // Excluir cantidadFrente
        if (key.endsWith('Nombre') && value && !key.startsWith('selectedEspecial')) {
          sectionData.push([`Artículo ${articuloCounter}`, value]);
          articuloCounter++;
        } else if ((key === 'cantidad' || key.startsWith('cantidad')) && value && value !== 0 && !key.startsWith('cantidadEspecial')) {
          sectionData.push([labelsMap[key] || key, value]);
          if (section === 'frentes' || section === 'frentes2' || section === 'frentes3' || section === 'interiores') {
            totalFrentesInteriores += Number(value);
          }
        } else if ((key === 'puntos' || key.startsWith('puntos')) && value && !key.startsWith('puntosEspecial')) {
          sectionData.push([labelsMap[key] || key, value]);
        }
      });

      // Filtrar productos que solo tengan "Cantidad"
      const filteredSectionData = sectionData.filter(row => row[1] !== 'Cantidad');

      // Añadir los especiales y sus puntos después de los datos procesados
      if (data[section].selectedEspecial1Nombre) {
        filteredSectionData.push([labelsMap.selectedEspecial1Nombre, data[section].selectedEspecial1Nombre]);
        if (data[section].puntosEspecial1) {
          filteredSectionData.push([labelsMap.puntosEspecial1, data[section].puntosEspecial1]);
        }
        if (data[section].cantidadEspecial1) {
          filteredSectionData.push([labelsMap.cantidadEspecial1, data[section].cantidadEspecial1]);
        }
      }
      if (data[section].selectedEspecial2Nombre) {
        filteredSectionData.push([labelsMap.selectedEspecial2Nombre, data[section].selectedEspecial2Nombre]);
        if (data[section].puntosEspecial2) {
          filteredSectionData.push([labelsMap.puntosEspecial2, data[section].puntosEspecial2]);
        }
        if (data[section].cantidadEspecial2) {
          filteredSectionData.push([labelsMap.cantidadEspecial2, data[section].cantidadEspecial2]);
        }
      }

      // Solo continuar si hay datos relevantes
      if (filteredSectionData.length > 0) {
        doc.setFontSize(10);
        doc.text(title, 12, startY);
        startY += 6;

        // Dividir los datos en dos columnas
        const half = Math.ceil(filteredSectionData.length / 2);
        const firstHalf = filteredSectionData.slice(0, half);
        const secondHalf = filteredSectionData.slice(half);

        // Primera columna
        autoTable(doc, {
          ...autoTableOptions,
          body: firstHalf,
          startY: startY,
          margin: { left: 12 },
          tableWidth: doc.internal.pageSize.getWidth() / 2 - 12 // Mitad de la página
        });

        // Segunda columna
        autoTable(doc, {
          ...autoTableOptions,
          body: secondHalf,
          startY: startY,
          margin: { left: doc.internal.pageSize.getWidth() / 2 + 2 }, // Mitad derecha de la página
          tableWidth: doc.internal.pageSize.getWidth() / 2 - 12 // Mitad de la página
        });

        startY = Math.max(doc.lastAutoTable.finalY, startY) + 10; // Ajuste del espacio después de ambas columnas
        startY = checkPageSpace(doc, startY); // Verificar si hay que añadir una nueva página
      }
    }
  });

  // Calcular totales
  const totalPuntos = Object.entries(sections).reduce((total, [section]) => {
    return total + Object.entries(data[section] || {}).reduce((subTotal, [key, value]) => {
      if (key.startsWith('puntos') && value) {
        return subTotal + Number(value);
      }
      return subTotal;
    }, 0);
  }, 0);

  // Cálculo de montaje e instalación
  const numFrentesInteriores = data.instalacion?.numFrentesInteriores || 0;
  const numArmariosCompletos = data.instalacion?.numArmariosCompletos || 0;
  const presupuestoData = {
    centro: centro,
    puntos: totalPuntos,
    tienda: userInfo.tienda,
    cliente: userInfo.cliente
  };
  let totalMontaje = (numFrentesInteriores * 110) + (numArmariosCompletos * 146) + 50;
  startY = checkPageSpace(doc, startY);

  doc.setFontSize(10);

  startY += 10;

  // Primera línea que agrupa los puntos y frentes/interiores
  const linea1 = `Total Puntos: ${totalPuntos} | Total Frentes/Interiores: ${numFrentesInteriores}`;
  doc.text(linea1, 12, startY);  // Ajustamos el margen izquierdo a 12
  startY += 10;

  // Segunda línea que agrupa armarios completos y montaje/instalación
  const linea2 = `Total Armarios Completos: ${numArmariosCompletos} | Total Montaje e Instalación: ${totalMontaje.toFixed(2)} €`;
  doc.text(linea2, 12, startY);  // Ajustamos el margen izquierdo a 12

  // Guardar el PDF con el nombre correcto
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
    credentials: 'include' // Enviar cookies o autenticación si es necesario
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
