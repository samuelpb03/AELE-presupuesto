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
  // No need to add defaultArticuloNombre as we will handle it dynamically
};

export const generatePDF = (data) => {
  const doc = new jsPDF();

  // Agregar logotipo
  const logo = 'logoAELE.png'; // Ruta al logotipo
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
      let articuloCounter = 1; // Counter for Artículo
      const sectionData = [];

      Object.entries(data[section]).forEach(([key, value]) => {
        if (key.endsWith('Nombre') && value) {
          if (key.startsWith('articulo')) {
            sectionData.push([`Artículo ${articuloCounter}`, value]);
          } else {
            sectionData.push([labelsMap[key] || key, value]);
          }
        } else if (key.startsWith('cantidad') && value && value !== 0) {
          const match = key.match(/\d+/);
          if (match) {
            sectionData.push([`Cantidad ${articuloCounter}`, value]);
            articuloCounter++; // Increment counter for the next Artículo
          }
        } else if (key === 'puntos' && value) {
          const cantidadKey = `cantidad${articuloCounter - 1}`;
          const cantidad = data[section][cantidadKey] || 1;
          sectionData.push([labelsMap[key] || key, value * cantidad]);
        }
      });

      if (sectionData.length > 0) {
        // Agregar título de sección
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
      if (key === 'puntos') {
        const match = key.match(/\d+/);
        if (match) {
          const cantidadKey = `cantidad${match[0]}`;
          const cantidad = section[cantidadKey] || 1;
          return subTotal + (Number(value) * cantidad);
        }
      }
      return subTotal;
    }, 0);
  }, 0);

  // Mostrar totales
  doc.setFontSize(12);
  doc.text(`Total Puntos: ${totalPuntos}`, 14, startY);

  doc.save("presupuesto2.pdf");
};













