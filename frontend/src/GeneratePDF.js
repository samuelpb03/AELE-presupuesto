import { jsPDF } from "jspdf";

const labelsMap = {
  selectedProductoNombre: "Producto",
  selectedSerieNombre: "Serie",
  selectedArticuloNombre: "Artículo",
  selectedMaterialNombre: "Material",
  selectedColorNombre: "Color",
  selectedMedidasNombre: "Medidas",
  selectedMaterialFranjaNombre: "Material Franja",
  selectedColorFranjaNombre: "Color Franja"
};

export const generatePDF = (data) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const columnPadding = 5;  // Espacio de relleno entre columnas
  const cellPadding = 5;    // Espacio de relleno dentro de las celdas
  const cellHeight = 10;    // Altura de cada celda de datos
  const colWidth = (pageWidth - 3 * columnPadding) / 2; // Ancho de cada columna

  doc.setFontSize(18);
  doc.text("Presupuesto: ", pageWidth / 2, 15, null, null, 'center');

  doc.setFontSize(11);
  doc.setTextColor(0);

  let yPos = [30, 30]; // Posiciones Y iniciales para las columnas en la primera fila

  const sections = ['frentes', 'frentes2', 'tiradores', 'interiores','equipamiento']; // Secciones a procesar

  sections.forEach((section, index) => {
    let column = index % 2; // 0 o 1 para dos columnas
    let xPos = columnPadding + column * (colWidth + columnPadding);

    if (index === 2) {
      yPos[0] = Math.max(yPos[0], yPos[1]) + 30;
      yPos[1] = yPos[0];
    }

    doc.setFillColor(211, 211, 211);
    doc.rect(xPos, yPos[column], colWidth, cellHeight, 'F');
    doc.text(section.charAt(0).toUpperCase() + section.slice(1), xPos + cellPadding, yPos[column] + (cellHeight / 2));

    yPos[column] += cellHeight + 2;

    Object.entries(data[section] || {}).forEach(([key, value]) => {
      // Filtra solo las entradas que terminan en 'Nombre'
      if (!key.endsWith('Nombre')) return;

      const label = labelsMap[key] || key;
      const labelWidth = colWidth / 2;
      const valueX = xPos + labelWidth + cellPadding;

      doc.setFillColor(255, 255, 255);
      doc.rect(xPos, yPos[column], labelWidth, cellHeight, 'F');
      doc.text(label + ":", xPos + cellPadding, yPos[column] + (cellHeight / 2));

      doc.setFillColor(255, 255, 255);
      doc.rect(valueX, yPos[column], labelWidth - cellPadding, cellHeight, 'F');
      doc.text(String(value), valueX + cellPadding, yPos[column] + (cellHeight / 2));

      yPos[column] += cellHeight;
    });

    if (yPos[column] > doc.internal.pageSize.getHeight() - 20) {
      doc.addPage();
      yPos = [30, 30];
    }
  });

  doc.save("reporte.pdf");
};
