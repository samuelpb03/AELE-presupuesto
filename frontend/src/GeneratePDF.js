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
  cantidadFrente: "Cantidad del Frente",
  selectedEspecial1Nombre: "Especial a medida 1",
  selectedEspecial2Nombre: "Especial a medida 2",
  puntosEspecial1: "Puntos Especial 1",
  puntosEspecial2: "Puntos Especial 2",
  cantidadEspecial1: "Cantidad Especial 1",
  cantidadEspecial2: "Cantidad Especial 2",
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
    if (data[section]) {
      let articuloCounter = 1;
      const sectionData = [];

      // Procesar y agregar datos de la sección
      Object.entries(data[section]).forEach(([key, value]) => {
        if (key.endsWith('Nombre') && value) {
          if (key.startsWith('articulo')) {
            sectionData.push([`Artículo ${articuloCounter}`, value]);
          } else if (!key.startsWith('selectedEspecial')) {
            sectionData.push([labelsMap[key] || key, value]);
          }
        } else if (key === 'cantidad' && value && value !== 0) {
          sectionData.push([labelsMap[key] || key, value]);
        } else if (key === 'puntos' && value) {
          const cantidadKey = `cantidad${articuloCounter - 1}`;
          const cantidad = data[section][cantidadKey] || 1;
          sectionData.push([labelsMap[key] || key, value * cantidad]);
        }
      });

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

  doc.setFontSize(12);
  doc.text(`Total Puntos: ${totalPuntos}`, 14, startY);

  doc.save("presupuesto2.pdf");
};

