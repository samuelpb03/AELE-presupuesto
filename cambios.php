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
            display: flex;
            flex-direction: column;
            min-height: 100vh;
        }

        .container {
            background-color: #fff;
            padding: 30px 40px;
            border-radius: 12px;
            box-shadow: 0 0 20px rgba(0,0,0,0.1);
            max-width: 800px;
            margin: auto;
            flex: 1;
        }

        h1 {
            color: #a67c42;
            font-weight: bold;
            margin-bottom: 30px;
            border-bottom: 2px solid #a67c42;
            padding-bottom: 10px;
            text-align: center; /* Centrar el texto */
            font-size: 28px; /* Ajustar el tamaño de la fuente */
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
            margin-top: 20px;
            padding: 20px;
            background-color: #a67c42;
            color: white;
            border-radius: 0 0 10px 10px;
            position: relative;
            bottom: 0;
            width: 100%;
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

        .accordion-header {
            cursor: pointer;
            background-color: #a67c42;
            color: white;
            padding: 15px;
            border-radius: 8px;
            margin-bottom: 10px;
            font-weight: bold;
        }

        .accordion-body {
            display: none;
            padding: 15px;
            background-color: #f9f9f9;
            border-radius: 8px;
        }

        .accordion-body ul li {
            background: #eee2b4;
            border-left: 5px solid #a67c42;
            padding: 10px;
            margin-bottom: 10px;
            border-radius: 8px;
        }

        .accordion-body.open {
            display: block;
        }
    </style>

    <script>
        document.addEventListener("DOMContentLoaded", () => {
            const headers = document.querySelectorAll(".accordion-header");
            headers.forEach(header => {
                header.addEventListener("click", () => {
                    const body = header.nextElementSibling;
                    body.style.display = body.style.display === "block" ? "none" : "block";
                });
            });

            // Abre por defecto la sección de la versión 3.0.1
            const firstBody = document.querySelector(".accordion-body");
            if (firstBody) {
                firstBody.style.display = "block";
            }
        });
    </script>
</head>
<body>
    <div class="container">
        <h1>🛠 Últimas mejoras del Presupuestador AELE</h1>
        <div>
            <!-- Versión 3.0.1 -->
            <div>
                <div class="accordion-header">Versión 3.0.1</div>
                <div class="accordion-body open">
                    <ul>
                        <li>✅ Corregido un error que hacía que no se guardaran los presupuestos.</li>
                        <li>🎨 Corregido un error en el que no se restauraban los colores de los remates.</li>
                        <li>⚡ Optimizado el código para mejorar el rendimiento.</li>
                        <li>📥 Añadida la tarifa actualizada para poder consultar todos los productos.</li>
                        <li>💰 Cambiado el precio total de los materiales de "Precio total" a "Precio materiales".</li>
                    </ul>
                </div>
            </div>

            <!-- Versión 3.0.0 -->
            <div>
                <div class="accordion-header">Versión 3.0.0</div>
                <div class="accordion-body">
                    <ul>
                        <li>✅ Corregidos algunos errores en la pestaña de <strong>remates</strong> que hacían que no se mostraran los nombres al seleccionarse.</li>
                        <li>🎨 Añadidos <strong>colores</strong> a los remates (en caso de que el usuario quiera un color diferente).</li>
                        <li>📥 Añadida la funcionalidad de <strong>restaurar todos los datos</strong> de un presupuesto con su ID en un solo clic.</li>
                        <li>📘 Añadida una <strong>guía</strong> que irá siendo actualizada conforme se añadan nuevas funcionalidades y características.</li>
                        <li>🖼 Añadidas las <strong>imágenes de cada frente</strong> seleccionable para tener una mejor guía visual al elegir las puertas.</li>
                        <li>🎨 Modificado el <strong>aspecto visual</strong> de la aplicación para mejorar la experiencia del usuario.</li>
                        <li>🛠 Arreglado un problema con los <strong>colores del perfil</strong> en Puertas 3.</li>
                    </ul>
                </div>
            </div>
        </div>

        <a href="index.html" class="volver-btn">← Ir al presupuestador</a>
    </div>
    <footer>
        © AELE - 2025
    </footer>
</body>
</html>
