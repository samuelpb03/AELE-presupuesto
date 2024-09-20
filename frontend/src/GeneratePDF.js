import { jsPDF } from "jspdf";

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

  const checkPageSpace = (doc, startY) => {
    const marginBottom = 10;  // Margen en la parte inferior de la página
    const pageHeight = doc.internal.pageSize.getHeight();
    if (startY >= pageHeight - marginBottom) {
      doc.addPage();
      return 20;  // Reiniciar la posición vertical en la nueva página
    }
    return startY;
  };

  // Agregar logotipo
  const user = JSON.parse(localStorage.getItem('user'));
  const centro = user?.centro || 'Centro no especificado';
  let logo = 'logoAELE.png';
  if (centro === "Leroy Merlin") {
    logo = 'logoLeroy.png';
  }

  doc.addImage(logo, 'PNG', 10, 10, 50, 20);

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  doc.setLineWidth(0.5);
  doc.rect(5, 5, pageWidth - 10, pageHeight - 10); // Recuadro con bordes finos

  doc.setFontSize(8);
  const companyDetails = [
    `Centro: ${centro}`,
    `Cliente: ${userInfo.cliente}`,
    `Teléfono: ${userInfo.telefono}`,
  ];
  companyDetails.forEach((line, index) => {
    doc.text(line, pageWidth - 90, 15 + (index * 7));
  });

  doc.setFontSize(15);
  doc.text("Presupuesto", pageWidth - 90, 40);

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
    instalacion: "Instalación"
  };

  let startY = 50;
  let totalFrentesInteriores = 0;

  Object.entries(sections).forEach(([section, title]) => {
    if (data[section]) {
      let sectionData = [];
      
      // Procesar y agregar datos de la sección
      Object.entries(data[section]).forEach(([key, value]) => {
        if (
          value &&
          labelsMap[key] &&
          !key.startsWith('selectedEspecial') &&
          !key.startsWith('puntosEspecial') &&
          !key.startsWith('cantidadEspecial')
        ) {
          sectionData.push(`${labelsMap[key]}: ${value}`);
        }
      });

      // Especiales a medida
      if (data[section].selectedEspecial1Nombre) {
        sectionData.push(`${labelsMap.selectedEspecial1Nombre}: ${data[section].selectedEspecial1Nombre}`);
        sectionData.push(`Puntos: ${data[section].puntosEspecial1}`);
        sectionData.push(`Cantidad: ${data[section].cantidadEspecial1}`);
      }
      if (data[section].selectedEspecial2Nombre) {
        sectionData.push(`${labelsMap.selectedEspecial2Nombre}: ${data[section].selectedEspecial2Nombre}`);
        sectionData.push(`Puntos: ${data[section].puntosEspecial2}`);
        sectionData.push(`Cantidad: ${data[section].cantidadEspecial2}`);
      }

      // Imprimir título de la sección
      doc.setFontSize(10);
      doc.text(title, 12, startY);
      startY += 10;

      // Imprimir los datos de la sección en líneas
      doc.setFontSize(8);
      sectionData.forEach((line) => {
        doc.text(line, 12, startY);
        startY += 6;

        // Si se llena la página, crear una nueva
        if (startY > pageHeight - 20) {
          doc.addPage();
          startY = 20;
        }
      });

      startY += 10; // Espacio después de cada sección
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
  let totalMontaje = (numFrentesInteriores * 110) + (numArmariosCompletos * 146) + 50;

  doc.setFontSize(10);
  startY += 15;
  doc.text(`Total Puntos: ${totalPuntos}`, 12, startY);
  startY += 10;
  doc.text(`Total Montaje e Instalación: ${totalMontaje.toFixed(2)} €`, 12, startY);

  // Guardar el PDF
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

