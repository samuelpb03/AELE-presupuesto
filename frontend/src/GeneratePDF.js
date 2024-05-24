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
};

export const generatePDF = (data) => {
  const doc = new jsPDF();

  // Agregar logotipo
  const logo = 'logoAELE.png';
  doc.addImage(logo, 'PNG', 10, 10, 50, 20);

  // Detalles de la empresa
  doc.setFontSize(12);
  doc.text("AELE Beniparrell", 70, 20);
  doc.text("Teléfono: 9696969", 70, 35);

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
    equipamiento3: "Equipamiento 3",
    baldas: "Baldas e iluminación"
  };

  let startY = 70;

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
          theme: 'grid'
        });

        startY = doc.lastAutoTable.finalY + 10;
      }
    }
  });

  // Calcular totales
  const totalPuntos = Object.values(data).reduce((total, section) => {
    return total + Object.entries(section).reduce((subTotal, [key, value]) => {
      if (key === 'puntos' || key === 'puntosFrente' || key === 'puntosEspecial1' || key === 'puntosEspecial2') {
        return subTotal + Number(value);
      }
      return subTotal;
    }, 0);
  }, 0);

  console.log(`Total Puntos: ${totalPuntos}`);
  
  doc.setFontSize(12);
  doc.text(`Total Puntos: ${totalPuntos}`, 14, startY);

  doc.save("presupuesto2.pdf");
};





