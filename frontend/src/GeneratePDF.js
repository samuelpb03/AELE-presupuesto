import { jsPDF } from "jspdf";

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
  selectedEspecial1Nombre: "Especial a medida 1",
  puntosEspecial1: "Puntos Especial 1",
  selectedEspecial2Nombre: "Especial a medida 2",
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
let lastFrenteProcessed = "";
// Función para generar el PDF
export const generatePDF = (data, userInfo) => {
  const doc = new jsPDF();
  const drawBorder = () => {
    doc.setLineWidth(0.5);
    doc.rect(5, 5, pageWidth - 10, pageHeight - 10); // Dibujar el borde
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
  let logo = 'logoAELE.png';
  if (centro === "Leroy Merlin") {
    logo = 'logoLeroy.png';
  }
  doc.addImage(logo, 'PNG', 10, 10, 50, 20);

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  doc.setLineWidth(0.5);
  doc.rect(5, 5, pageWidth - 10, pageHeight - 10); // Recuadro con bordes finos

  doc.setFontSize(7);
  const companyDetails = [
    `Centro: ${centro}`,
    `Cliente: ${userInfo.cliente}`,
    `Teléfono: ${userInfo.telefono}`,
  ];
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
    baldas: "Baldas e iluminación",
    remates: "Remates a medida",
  };

  let startY = 50;
  let totalFrentesInteriores = 0;

  // Procesar y agregar datos de la sección
  Object.entries(sections).forEach(([section, title]) => {
    if (data[section]) {
      let sectionData = [];

      // Procesar y agregar datos de la sección
      Object.entries(data[section]).forEach(([key, value]) => {
        // Excluir los especiales a medida de la sección de frentes
        if (
          key.startsWith('selectedEspecial') ||
          key.startsWith('cantidadEspecial') ||
          key.startsWith('puntosEspecial')
        ) {
          return; // Omitir los especiales
        }
        if (value && labelsMap[key]) {
          sectionData.push(`${value}`);
          startY = checkPageSpace(doc, startY);
        }
      });

      // Imprimir el título de la sección
      doc.setFontSize(10);
      doc.setFillColor(220, 220, 220);
      startY = checkPageSpace(doc, startY);
      doc.rect(10, startY - 5, pageWidth - 20, 10, 'F');
      doc.text(title, 12, startY);
      startY += 10;

      // Imprimir los datos de la sección en filas de 4 elementos
      doc.setFontSize(7);
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

      startY += 10; // Espacio después de cada sección

      // Verificar si es el último frente (frentes3 o el último de los frentes) y agregar los especiales a medida después
      if (section === 'frentes' || section === 'frentes2' || section === 'frentes3') {
        lastFrenteProcessed = section;
      } 
      if (lastFrenteProcessed) {
        doc.setFontSize(10);
        doc.setFillColor(220, 220, 220);
        startY = checkPageSpace(doc, startY);
        doc.rect(10, startY - 5, pageWidth - 20, 10, 'F');
        doc.text("Especiales frentes a medida", 12, startY);
        startY += 10;

        doc.setFontSize(7);

        // Agregar los datos de los especiales a medida
        const especiales = [
          { nombre: data.frentes?.selectedEspecial1Nombre, cantidad: data.frentes?.cantidadEspecial1, puntos: data.frentes?.puntosEspecial1 },
          { nombre: data.frentes2?.selectedEspecial1Nombre, cantidad: data.frentes2?.cantidadEspecial1, puntos: data.frentes2?.puntosEspecial1 },
          { nombre: data.frentes3?.selectedEspecial1Nombre, cantidad: data.frentes3?.cantidadEspecial1, puntos: data.frentes3?.puntosEspecial1 },
        ];

        especiales.forEach((especial) => {
          if (especial.nombre) {
            doc.text(`${especial.nombre}`, 12, startY);
            doc.text(`Cantidad: ${especial.cantidad}`, pageWidth - 50, startY);
            doc.text(`Puntos: ${especial.puntos}`, pageWidth - 30, startY);
            startY += 10;
            startY = checkPageSpace(doc, startY);
          }
        });

        startY += 10; // Espacio después de los especiales
      }

      // Continuar con el resto del PDF (montaje e instalación, totales, etc.)
      startY += 10; // Espacio después del apartado de Especiales
    }
  });

  // Imprimir los especiales a medida después del último frente procesado


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

  doc.setFontSize(8);
  startY += 15;
  startY = checkPageSpace(doc, startY);
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