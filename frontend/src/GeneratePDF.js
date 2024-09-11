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

export const generatePDF = (data, userInfo) => {
  const doc = new jsPDF();

  // Agregar logotipo
  const logo = 'logoAELE.png';
  doc.addImage(logo, 'PNG', 10, 10, 50, 20);
  const user = JSON.parse(localStorage.getItem('user'));
  const centro = user?.centro || 'Centro no especificado'; // Campo centro del user
  // Detalles de la empresa
  doc.setFontSize(12);
  doc.text("AELE Beniparrell", 70, 20);
  doc.text("Teléfono: 655 895 411", 70, 35);
  doc.text(`Centro: ${centro}`, 14, 70); // Centro del user
  doc.text(`Tienda: ${userInfo.tienda}`, 14, 80); // Información de userInfo
  doc.text(`Cliente: ${userInfo.cliente}`, 14, 90); 
  doc.text(`Teléfono: ${userInfo.telefono}`, 14, 100); 
  
  // Título
  doc.setFontSize(18);
  doc.text("AELE Presupuesto", doc.internal.pageSize.getWidth() / 2, 60, null, null, 'center');

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

  let startY = 110;
  let totalFrentesInteriores = 0;
  let totalArmariosCompletos = 0;

  Object.entries(sections).forEach(([section, title]) => {
    console.log(`Processing section: ${title}`);
    if (data[section]) {
      let articuloCounter = 1;
      const sectionData = [];

      // Procesar y agregar datos de la sección, excluyendo los especiales y "cantidadFrente"
      Object.entries(data[section]).forEach(([key, value]) => {
        if (key === 'cantidadFrente') return; // Excluir cantidadFrente
        if (key.endsWith('Nombre') && value && !key.startsWith('selectedEspecial')) {
          if (key.startsWith('articulo')) {
            sectionData.push([`Artículo ${articuloCounter}`, value]);
            articuloCounter++;
          } else {
            sectionData.push([labelsMap[key] || key, value]);
          }
        } else if ((key === 'cantidad' || key.startsWith('cantidad')) && value && value !== 0 && !key.startsWith('cantidadEspecial')) {
          sectionData.push([labelsMap[key] || key, value]);
          if (section === 'frentes' || section === 'frentes2' || section === 'frentes3' || section === 'interiores') {
            totalFrentesInteriores += Number(value);
          }
        } else if ((key === 'puntos' || key.startsWith('puntos')) && value && !key.startsWith('puntosEspecial')) {
          sectionData.push([labelsMap[key] || key, value]);
        }
      });

      console.log(`Section data before adding especiales for section ${title}:`, sectionData);

      // Añadir los especiales y sus puntos después de los datos procesados
      if (data[section].selectedEspecial1Nombre) {
        sectionData.push([labelsMap.selectedEspecial1Nombre, data[section].selectedEspecial1Nombre]);
        if (data[section].puntosEspecial1) {
          sectionData.push([labelsMap.puntosEspecial1, data[section].puntosEspecial1]);
        }
        if (data[section].cantidadEspecial1) {
          sectionData.push([labelsMap.cantidadEspecial1, data[section].cantidadEspecial1]);
        }
      }
      if (data[section].selectedEspecial2Nombre) {
        sectionData.push([labelsMap.selectedEspecial2Nombre, data[section].selectedEspecial2Nombre]);
        if (data[section].puntosEspecial2) {
          sectionData.push([labelsMap.puntosEspecial2, data[section].puntosEspecial2]);
        }
        if (data[section].cantidadEspecial2) {
          sectionData.push([labelsMap.cantidadEspecial2, data[section].cantidadEspecial2]);
        }
      }

      console.log(`Final section data for section ${title}:`, sectionData);

      if (sectionData.length > 0) {
        doc.setFontSize(14);
        doc.text(title, 14, startY);
        startY += 10;

        autoTable(doc, {
          head: [['Concepto', 'Detalles']],
          body: sectionData,
          startY: startY,
          theme: 'grid',
        });

        startY = doc.lastAutoTable.finalY + 10;
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

  // Calcular el total de montaje e instalación
  const numFrentesInteriores = data.instalacion?.numFrentesInteriores || 0;
  const numArmariosCompletos = data.instalacion?.numArmariosCompletos || 0;
  const acarreo = data.instalacion?.acarreo || false;

  let totalMontaje = ((numFrentesInteriores * 110) + (numArmariosCompletos * 146)) + 50;

  console.log(`Total Puntos: ${totalPuntos}`);

  doc.setFontSize(12);
  doc.text(`Total Puntos: ${totalPuntos}`, 14, startY);
  startY += 10;
  doc.text(`Total Frentes/Interiores: ${numFrentesInteriores}`, 14, startY);
  startY += 10;
  doc.text(`Total Armarios Completos: ${numArmariosCompletos}`, 14, startY);
  startY += 10;
  doc.text(`Total Montaje e Instalación: ${totalMontaje.toFixed(2)} €`, 14, startY);

  doc.save("presupuesto2.pdf");
};







