//Se usa Mysql, Express y Cors para el servidor del backend.
const mysql = require("mysql");
const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const port = "6969";
const host = "localhost";
const user = "root";
const password = "root";
const database = "dbs12752680";

//Crea la conexion.
const dbConnection = mysql.createConnection({
  host: host,
  user: user,
  password: password,
  database: database,
});

//Funcion Express GET para producto.
app.get("/producto", (req, res) => {
  const query = "SELECT producto_id, nombre FROM producto";
  dbConnection.query(query, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

//Funcion Express GET para serie.
app.get("/serie", (req, res) => {
  const productoId = req.query.productoId;
  const query =
    "SELECT * FROM serie WHERE producto_id=" + productoId;
  dbConnection.query(query, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

//Funcion Express GET para articulo.
app.get("/articulo", (req, res) => {
  const serieId = req.query.serieId;
  const query =
    "SELECT * FROM articulo WHERE serie_id = " + serieId;
  dbConnection.query(query, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

//Funcion Express GET para material.
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

//Funcion Express GET para color.
app.get("/color", (req, res) => {
  const materialId = req.query.materialId;
  console.log(materialId);
  const query =
    "SELECT c.color_id, c.nombre FROM material m JOIN material_color mc ON m.material_id = mc.id_material JOIN color c ON mc.id_color = c.color_id WHERE m.material_id = " +
    materialId;
  dbConnection.query(query, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});
//Funcion Express GET para medidas.
app.get("/medidas", (req, res) => {
  const articuloId = req.query.articuloId; 
  const materialId = req.query.materialId;

  const query = "SELECT * FROM medidas WHERE articulos_id = " + articuloId + " AND material = " + materialId;

  dbConnection.query(query, [articuloId, materialId], (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json(err);
    }
    return res.json(data);
  });
});

//Funcion Express GET para material franja.
app.get("/materialFranja", (req, res) => {
  const query = "SELECT material_id, nombre FROM material";
  dbConnection.query(query, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

//Funcion Express GET para color franja.
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

//Monta Express en el puerto.
app.listen(port, () => {
  console.log(">>> SERVIDOR CORRIENDO EN: " + host + ":" + port);
});
