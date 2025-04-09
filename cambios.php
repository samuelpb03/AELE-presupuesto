<?php
session_start();
// Si no está logueado, redirigir
if (!isset($_SESSION['loggedin'])) {
    header('Location: login.php');
    exit;
}
include("header.php");
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Últimos Cambios - Presupuestador AELE</title>
    <link rel="stylesheet" href="selector/bootstrap.min.css">

    <style>
        body {
            background: linear-gradient(to right, #f2f2f2, #ffffff);
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            padding-top: 40px;
        }

        .container {
            background-color: #fff;
            padding: 30px 40px;
            border-radius: 12px;
            box-shadow: 0 0 20px rgba(0,0,0,0.1);
            max-width: 800px;
            margin: auto;
        }

        h1 {
            color: #a67c42;
            font-weight: bold;
            margin-bottom: 30px;
            border-bottom: 2px solid #a67c42;
            padding-bottom: 10px;
        }

        ul {
            list-style: none;
            padding-left: 0;
        }

        ul li {
            background: #eee2b4;
            border-left: 5px solid #a67c42;
            padding: 15px;
            margin-bottom: 15px;
            border-radius: 8px;
            transition: transform 0.2s;
        }

        ul li:hover {
            transform: scale(1.02);
            background-color: #fef8e6;
        }

        footer {
            text-align: center;
            margin-top: 60px;
            padding: 20px;
            background-color: #a67c42;
            color: white;
            border-radius: 0 0 10px 10px;
        }

        .volver-btn {
            display: inline-block;
            margin-top: 20px;
            padding: 10px 20px;
            background-color: #a67c42;
            color: white;
            border: none;
            border-radius: 8px;
            text-decoration: none;
            font-weight: bold;
            transition: background-color 0.3s;
        }

        .volver-btn:hover {
            background-color: #8a622d;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🛠 Últimas mejoras del Presupuestador AELE</h1>
        <ul>
            <li>✅ Corregidos algunos errores en la pestaña de <strong>remates</strong> que hacían que no se mostraran los nombres al seleccionarse.</li>
            <li>🎨 Añadidos <strong>colores</strong> a los remates (en caso de que el usuario quiera un color diferente).</li>
            <li>📥 Añadida la funcionalidad de <strong>restaurar todos los datos</strong> de un presupuesto con su ID en un solo clic.</li>
            <li>📘 Añadida una <strong>guía</strong> que irá siendo actualizada conforme se añadan nuevas funcionalidades y características.</li>
            <li>🖼 Añadidas las <strong>imágenes de cada frente</strong> seleccionable para tener una mejor guía visual al elegir las puertas.</li>
        </ul>

        <a href="index.html" class="volver-btn">← Volver al presupuestador</a>
    </div>

    <footer>
        © AELE - 2024 | Mejorando contigo
    </footer>
</body>
</html>
