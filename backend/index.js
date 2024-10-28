const mysql = require("mysql");
const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());

// Configurar CORS para permitir solicitudes desde tu dominio frontend
const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = ['http://adpta.com', 'http://www.adpta.com']; // Añade ambos dominios
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'ngrok-skip-browser-warning', 'Authorization'],
  optionsSuccessStatus: 200,
  credentials: true
};

app.use(cors(corsOptions));

// Middleware adicional para asegurarse de que las cabeceras CORS estén presentes en todas las respuestas
app.use((req, res, next) => {
  const allowedOrigins = ['http://adpta.com', 'http://www.adpta.com'];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
  }
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("ngrok-skip-browser-warning", true);
  next();
});

// Manejar solicitudes OPTIONS (preflight) globalmente
app.options('*', cors(corsOptions));

const port = "6969";
const host = "0.0.0.0";
const user = "root";
const password = "root";
const database = "dbs12752680";

// Crea la conexión.
const dbConnection = mysql.createConnection({
  host: host,
  user: user,
  password: password,
  database: database,
});

// Verificar conexión a la base de datos
dbConnection.connect(err => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database');
});

// Función Express GET para producto.
app.get("/producto", (req, res) => {
  const query = "SELECT producto_id, nombre FROM producto";
  dbConnection.query(query, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

// Función Express GET para serie.
app.get("/serie", (req, res) => {
  const productoId = req.query.productoId;
  const query = "SELECT * FROM serie WHERE producto_id=" + productoId;
  dbConnection.query(query, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

// Función Express GET para articulo.
app.get("/articulo", (req, res) => {
  const serieId = req.query.serieId;
  const query = "SELECT * FROM articulo WHERE serie_id = " + serieId;
  dbConnection.query(query, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

// Función Express GET para material.
app.get("/material", (req, res) => {
  const serieId = req.query.serieId;
  const query =
    "SELECT m.material_id, m.nombre FROM material m JOIN serie_material sm ON m.material_id = sm.id_material JOIN serie s ON sm.id_serie = s.serie_id WHERE s.serie_id = " +
    serieId;
  dbConnection.query(query, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

// Función Express GET para color.
app.get("/color", (req, res) => {
  const materialId = req.query.materialId;
  const query =
    "SELECT c.color_id, c.nombre FROM material m JOIN material_color mc ON m.material_id = mc.id_material JOIN color c ON mc.id_color = c.color_id WHERE m.material_id = " +
    materialId;
  dbConnection.query(query, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

// Función Express GET para medidas.
app.get("/medidas", (req, res) => {
  const articuloId = req.query.articuloId;
  const materialId = req.query.materialId;

  const query = `
    SELECT m.medidas_id, m.medidas, m.puntos
    FROM medidas m
    WHERE m.articulos_id = ? AND m.material = ?
  `;

  dbConnection.query(query, [articuloId, materialId], (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json(err);
    }
    return res.json(data);
  });
});

// Función Express GET para material franja.
app.get("/materialFranja", (req, res) => {
  const query = "SELECT material_id, nombre FROM material where material_id = 1 or material_id = 2 or material_id = 3 or material_id = 4 or material_id = 6";
  dbConnection.query(query, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.get("/articulo/baldas", (req, res) => {
  const query = `
    SELECT * FROM articulo
    WHERE serie_id IN (
      SELECT serie_id FROM serie
      WHERE nombre IN ('Baldas', 'Divisores')
    )
  `;
  dbConnection.query(query, (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json(err);
    }
    return res.json(data);
  });
});

app.get("/articulo/iluminacion", (req, res) => {
  const query = `
    SELECT * FROM articulo
    WHERE serie_id = (
      SELECT serie_id FROM serie
      WHERE nombre = 'Iluminacion'
    )
  `;
  dbConnection.query(query, (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json(err);
    }
    return res.json(data);
  });
});

app.get("/especialesConPuntos", (req, res) => {
  const query = `
  SELECT a.articulo_id, a.nombre AS articulo_nombre, m.puntos
  FROM articulo a
  LEFT JOIN medidas m ON a.articulo_id = m.articulos_id
  JOIN serie s ON a.serie_id = s.serie_id
  JOIN producto p ON s.producto_id = p.producto_id
  WHERE p.producto_id = 8 AND s.serie_id = 34;
  `;

  dbConnection.query(query, (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json(err);
    }
    return res.json(data);
  });
});

app.get("/especialesConPuntosFrentes", (req, res) => {
  const query = `
  SELECT a.articulo_id, a.nombre AS articulo_nombre, m.puntos
  FROM articulo a
  LEFT JOIN medidas m ON a.articulo_id = m.articulos_id
  JOIN serie s ON a.serie_id = s.serie_id
  JOIN producto p ON s.producto_id = p.producto_id
  WHERE p.producto_id = 9 AND s.serie_id = 35;
  `;

  dbConnection.query(query, (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json(err);
    }
    return res.json(data);
  });
});

app.get("/articulo/equipamiento", (req, res) => {
  const query = `
    SELECT * FROM articulo
    WHERE serie_id IN (
      SELECT serie_id FROM serie
      WHERE nombre = 'Equipamientos'
    )
  `;
  dbConnection.query(query, (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json(err);
    }
    return res.json(data);
  });
});

// Función Express GET para articulos de antracita.
app.get("/articulo/antracita", (req, res) => {
  const query = `
    SELECT * FROM articulo
    WHERE serie_id IN (
      SELECT serie_id FROM serie
      WHERE nombre = 'Antracita'
    )
  `;
  dbConnection.query(query, (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json(err);
    }
    return res.json(data);
  });
});

app.get("/articulo/interiores", (req, res) => {
  const query = `
    SELECT a.articulo_id, a.nombre, m.puntos
    FROM articulo a
    LEFT JOIN medidas m ON a.articulo_id = m.articulos_id
    WHERE a.serie_id = 26
  `;
  dbConnection.query(query, (err, data) => {
    if (err) {
      console.error("Error fetching articulos:", err);
      return res.status(500).json(err);
    }
    return res.json(data);
  });
});
app.get("/articulo/remates", (req, res) => {
  const query = `
    SELECT a.articulo_id, a.nombre AS articulo_nombre, m.puntos, ma.nombre AS material_nombre
    FROM articulo a
    LEFT JOIN medidas m ON a.articulo_id = m.articulos_id
    LEFT JOIN material ma ON m.material = ma.material_id
    WHERE a.serie_id = 37
  `;
  dbConnection.query(query, (err, data) => {
    if (err) {
      console.error("Error fetching articulos:", err);
      return res.status(500).json(err);
    }
    return res.json(data);
  });
});
app.get("/articulo/otros", (req, res) => {
  const query = `
    SELECT a.articulo_id, a.nombre AS articulo_nombre, m.puntos, ma.nombre AS material_nombre
    FROM articulo a
    JOIN medidas m ON a.articulo_id = m.articulos_id
    JOIN material ma ON m.material = ma.material_id
    WHERE a.serie_id = 39
  `;
  dbConnection.query(query, (err, data) => {
    if (err) {
      console.error("Error fetching articulos:", err);
      return res.status(500).json(err);
    }
    return res.json(data);
  });
});

// Nueva ruta para obtener artículos de las series 8 y 9
app.get("/articulo/cerraduras", (req, res) => {
  const query = `
    SELECT * FROM articulo
    WHERE serie_id IN (9)
  `;
  dbConnection.query(query, (err, data) => {
    if (err) {
      console.error("Error fetching articulos:", err);
      return res.status(500).json(err);
    }
    return res.json(data);
  });
});

// Función Express GET para color franja.
app.get("/colorFranja", (req, res) => {
  const materialFranjaId = req.query.materialFranjaId;
  const query =
    "SELECT c.color_id, c.nombre FROM material m JOIN material_color mc ON m.material_id = mc.id_material JOIN color c ON mc.id_color = c.color_id WHERE m.material_id = " +
    materialFranjaId;
  dbConnection.query(query, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.get("/medidasConPuntos", (req, res) => {
  const articuloId = req.query.articuloId;
  const materialId = req.query.materialId;

  const query = `
    SELECT m.medidas_id, m.medidas, m.puntos
    FROM medidas m
    WHERE m.articulos_id = ? AND m.material = ?
  `;

  dbConnection.query(query, [articuloId, materialId], (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json(err);
    }
    return res.json(data);
  });
});

// Nuevas rutas para medidas de los artículos de interiores
app.get("/medidasArticulo1", (req, res) => {
  const articuloId = req.query.articuloId;
  const query = `
    SELECT m.medidas_id, m.medidas, m.puntos
    FROM medidas m
    WHERE m.articulos_id = ? AND m.material = 3
  `;
  dbConnection.query(query, [articuloId], (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json(err);
    }
    return res.json(data);
  });
});

app.get("/medidasArticulo2", (req, res) => {
  const articuloId = req.query.articuloId;
  const query = `
    SELECT m.medidas_id, m.medidas, m.puntos
    FROM medidas m
    WHERE m.articulos_id = ? AND m.material = 3
  `;
  dbConnection.query(query, [articuloId], (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json(err);
    }
    return res.json(data);
  });
});

app.get("/medidasArticulo3", (req, res) => {
  const articuloId = req.query.articuloId;
  const query = `
    SELECT m.medidas_id, m.medidas, m.puntos
    FROM medidas m
    WHERE m.articulos_id = ? AND m.material = 3
  `;
  dbConnection.query(query, [articuloId], (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json(err);
    }
    return res.json(data);
  });
});

app.get("/articulo/tiradores", (req, res) => {
  const query = `SELECT a.articulo_id, a.serie_id, a.nombre, m.nombre as material_nombre, 
       GROUP_CONCAT(c.color_id) as colores
FROM articulo a
JOIN serie_material sm ON a.serie_id = sm.id_serie
JOIN material m ON sm.id_material = m.material_id
JOIN material_color mc ON m.material_id = mc.id_material
JOIN color c ON mc.id_color = c.color_id
WHERE a.serie_id IN (8)
GROUP BY a.articulo_id, a.serie_id, a.nombre, m.nombre;
  `;
  dbConnection.query(query, (err, data) => {
    if (err) {
      console.error("Error fetching articulos:", err);
      return res.status(500).json(err);
    }
    return res.json(data);
  });
});

// Ruta GET para artículos especiales
app.get("/articuloEspeciales", (req, res) => {
  const query = "SELECT * FROM articulo WHERE serie_id = 35";
  dbConnection.query(query, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json(data);
  });
});

app.get("/articuloEspecialesInteriores", (req, res) => {
  const query = "SELECT * FROM articulo WHERE serie_id = 34";
  dbConnection.query(query, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json(data);
  });
});
app.get("/articulo/interioresOtros", (req, res) => {
  const query = `
    SELECT a.articulo_id, a.nombre, m.puntos
    FROM articulo a
    LEFT JOIN medidas m ON a.articulo_id = m.articulos_id
    WHERE a.serie_id = 40
  `;
  dbConnection.query(query, (err, data) => {
    if (err) {
      console.error("Error fetching articulos:", err);
      return res.status(500).json(err);
    }
    return res.json(data);
  });
});

// Ruta para obtener materiales únicos desde medidas
app.get("/materialesPorArticulo", (req, res) => {
  const articuloId = req.query.articuloId;
  const query = `
    SELECT DISTINCT m.material, ma.nombre
    FROM medidas m
    JOIN material ma ON m.material = ma.material_id
    WHERE m.articulos_id = ?
  `;
  dbConnection.query(query, [articuloId], (err, data) => {
    if (err) {
      console.error("Error fetching materials:", err);
      return res.status(500).json(err);
    }
    return res.json(data);
  });
});
app.post("/presupuesto", (req, res) => {
  const { centro, puntos, cliente } = req.body;

  if (!centro || !puntos || !cliente) {
    return res.status(400).json({ error: "Todos los campos son requeridos" });
  }
  const tienda = centro;
  // Inserción en la base de datos
  const query = `
    INSERT INTO presupuesto (Centro, Puntos, Tienda, Cliente)
    VALUES (?, ?, ?, ?)
  `;

  dbConnection.query(query, [centro, puntos, tienda, cliente], (err, result) => {
    if (err) {
      console.error("Error al insertar el presupuesto:", err);
      return res.status(500).json({ error: "Error al crear el presupuesto" });
    }

    const idPresupuesto = result.insertId;
    const nombrePresupuesto = `${centro.substring(0, 3).toUpperCase()}-${idPresupuesto}`;

    // Devolver el nombre generado del presupuesto junto con el ID
    res.json({ 
      message: "Presupuesto creado exitosamente", 
      idPresupuesto, 
      nombrePresupuesto, 
    });
  });
});
//Sacamos la tienda del usuario
app.get("/usuarioTienda", (req, res) => {
  const id = req.query.id;
  const query = `
    SELECT tienda FROM usuario WHERE usuario_id = ?;
  `;
  dbConnection.query(query, [articuloId], (err, data) => {
    if (err) {
      console.error("Error fetching materials:", err);
      return res.status(500).json(err);
    }
    return res.json(data);
  });
});
// Verificamos si existen promociones activas para la tienda
app.get("/verificarPromocion", (req, res) => {
  const idTienda = req.query.idTienda;
  const query = `
    SELECT COUNT(*) AS totalPromociones 
    FROM tienda 
    WHERE id = ? AND fechaInicio IS NOT NULL AND fechaFin IS NOT NULL;
  `;
  dbConnection.query(query, [idTienda], (err, data) => {
    if (err) {
      console.error("Error checking promotions:", err);
      return res.status(500).json(err);
    }

    const tienePromociones = data[0].totalPromociones > 0;
    return res.json({ tienePromociones });
  });
});
// Si hay promociones activas, sacamos el valor de fechaInicio
app.get("/hayPromocion", (req, res) => {
  const idTienda = req.query.idTienda;
  const query = `
    SELECT fechaInicio 
    FROM tienda 
    WHERE id = ? AND fechaFin > CURDATE();
  `;
  dbConnection.query(query, [idTienda], (err, data) => {
    if (err) {
      console.error("Error fetching promotion:", err);
      return res.status(500).json(err);
    }
    return res.json(data);
  });
});
app.get("/calcularPuntosConPromociones", (req, res) => {
  const tiendaId = req.query.tiendaId;
  const puntos = req.query.puntos;

  // Verificar promociones de tienda y empresa
  const query = `
    SELECT 
      t.id AS tiendaId, t.nombre AS tiendaNombre, t.empresa AS empresaId,
      t.valorPuntoPromo AS valorPuntosPromoTienda, t.fechaInicioPromo AS promoInicioTienda, t.fechaFinPromo AS promoFinTienda,
      e.valorPuntosPromo AS valorPuntoPromoEmpresa, e.fechaPromoInicio AS promoInicioEmpresa, e.fechaFinPromo AS promoFinEmpresa
    FROM tienda t
    JOIN empresa e ON t.empresa = e.id
    WHERE t.id = ?;
  `;

  dbConnection.query(query, [tiendaId], (err, data) => {
    if (err) {
      console.error("Error fetching tienda and empresa:", err);
      return res.status(500).json(err);
    }

    if (data.length === 0) {
      return res.status(404).json({ message: "Tienda no encontrada" });
    }

    const today = new Date();
    const tienda = data[0];
    let puntosCalculados = puntos;

    // Verificar si la tienda tiene promoción activa
    if (new Date(tienda.promoInicioTienda) <= today && today <= new Date(tienda.promoFinTienda)) {
      puntosCalculados *= tienda.valorPuntosPromoTienda;
    }

    // Verificar si la empresa tiene promoción activa
    if (new Date(tienda.promoInicioEmpresa) <= today && today <= new Date(tienda.promoFinEmpresa)) {
      puntosCalculados *= tienda.valorPuntoPromoEmpresa;
    }

    return res.json({ puntosTotales: puntosCalculados });
  });
});
app.get("/calcularPuntosTotales", (req, res) => {
  const tiendaId = req.query.tiendaId;
  const puntos = req.query.puntos;

  // Verificar si los parámetros llegaron correctamente
  console.log("Tienda ID:", tiendaId, "Puntos:", puntos);
  return puntos;
});
// Ruta para obtener el ID de la tienda a partir del nombre
app.get("/getTiendaNameById", (req, res) => {
  const { idTienda } = req.query;

  if (!idTienda) {
    return res.status(400).json({ error: "El nombre de la tienda es requerido" });
  }

  const query = `SELECT nombre FROM tienda WHERE id = ?`;

  dbConnection.query(query, [idTienda], (err, data) => {
    if (err) {
      console.error("Error fetching tienda name:", err);
      return res.status(500).json({ error: "Error al obtener el nombre de la tienda" });
    }

    if (data.length === 0) {
      return res.status(404).json({ message: "Tienda no encontrada" });
    }

    return res.json({ tiendaId: data[0].id });
  });
});
// Monta Express en el puerto.
app.listen(port, () => {
  console.log(">>> SERVIDOR CORRIENDO EN: " + host + ":" + port);
});

