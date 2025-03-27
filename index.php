<?php
// We need to use sessions, so you should always start sessions using the below code.
session_start();
// If the user is not logged in redirect to the login page...
if (!isset($_SESSION['loggedin'])) {
    header('Location: login.php');
    exit;
}

include("header.php")
?>

    <!-- Bootstrap core CSS -->
    <link href="selector/bootstrap.min.css" rel="stylesheet">

    <!-- Custom styles for this template -->
    <link href="selector/jumbotron.css" rel="stylesheet">

    <!-- JavaScript para cambiar la imagen -->
    <script>
        function cambiarImagen(imagen) {
            document.getElementById("imagen-derecha").src = imagen;
        }
        function cambiarImagen2(imagen) {
            document.getElementById("imagen-abajo-derecha").src = imagen;
        }

        function imagenDefecto() {
        }

        // Rotación automática de imágenes en la imagen de abajo a la izquierda
        let indexAbajoIzquierda = 0;

        function cambiarImagenAbajoIzquierda() {
            indexAbajoIzquierda = (indexAbajoIzquierda + 1) % imagenesAbajoIzquierda.length;
            document.getElementById("imagen-abajo-izquierda").src = imagenesAbajoIzquierda[indexAbajoIzquierda];
        }

        // Iniciar el cambio de imagen cada 4.5 segundos
        setInterval(cambiarImagenAbajoIzquierda, 4500);

        // Función para seleccionar un orden aleatorio de las imágenes
        function mezclarImagenes(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
        }

        // Función para rotar las imágenes de abajo a la derecha en un orden aleatorio
        function rotarImagenesAbajoDerecha() { //1, 3, 4, 5, 17
            const imagenesAbajoDerecha = ["foto1.jpg", "foto3.jpg", "foto4.jpg", " foto5.jpg"];
            let imagenesAleatorias = mezclarImagenes(imagenesAbajoDerecha);
            let index = 0;

            setInterval(function () {
                document.getElementById("imagen-abajo-derecha").src = imagenesAleatorias[index];
                index = (index + 1) % imagenesAleatorias.length; // Rotar al siguiente índice
            }, 10000); // Cambiar la imagen cada 4 segundos
        }
        function rotarImagenesDerecha() { //1, 3, 4, 5, 17
            const imagenesAbajoDerecha = ["foto12.jpg", "foto13.jpg", "foto14.jpg", "foto15", "foto16.jpg"];
            let imagenesAleatorias = mezclarImagenes(imagenesAbajoDerecha);
            let index = 0;

            setInterval(function () {
                document.getElementById("imagen-derecha").src = imagenesAleatorias[index];
                index = (index + 1) % imagenesAleatorias.length; // Rotar al siguiente índice
            }, 10000); // Cambiar la imagen cada 4 segundos
            if (getElementById("imagen-derecha").src == "imagenPresupuestador.png") {
                setInterval(function () {document.getElementById("imagen-derecha").src = "foto11.jpg"}, 1000);
                
            }
        }
        function rotarImagenesAbajoIzquierda() {
            const imagenesAbajoDerecha = ["foto2.jpg", "foto7.jpg", "foto10.jpg","foto8.jpg","foto18.jpg"];
            let imagenesAleatorias = mezclarImagenes(imagenesAbajoDerecha);
            let index = 0;

            setInterval(function () {
                document.getElementById("imagen-abajo-izquierda").src = imagenesAleatorias[index];
                index = (index + 1) % imagenesAleatorias.length; // Rotar al siguiente índice
            }, 10000); // Cambiar la imagen cada 4 segundos
        }

        // Llamamos a la función al cargar la página para iniciar la rotación
        window.onload = function() {
            rotarImagenesAbajoDerecha();
            rotarImagenesAbajoIzquierda();
            rotarImagenesDerecha();
        };
    </script>

    <!-- Estilos personalizados -->
    <style>
        body {
            background: linear-gradient(115deg, #fff, #f2f2f2); /* Fondo en degradado suave marrón claro */
            font-family: 'Arial', sans-serif; /* Tipografía moderna */
            min-height: 100vh;
        }
        .container {
            margin-left: auto;
            margin-right: auto;
            max-width: 1300px;
            padding: 20px;
            background-color: #fff; /* Fondo blanco en los contenedores */
            box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1); /* Sombra sutil para dar profundidad */
            border-radius: 10px; /* Bordes redondeados */
        }
        #imagen-derecha, #imagen-abajo-derecha, #imagen-abajo-izquierda {
            width: 100%;
            height: 100%;
            max-height: 285px;
            border-radius: 15px;
        }
        #imagen-derecha:hover, #imagen-abajo-derecha:hover, #imagen-abajo-izquierda:hover { /* Efecto de zoom al pasar el ratón */
        }
        .button-container div {
            margin-bottom: 25px;
            padding: 15px;
            color: white;
            text-align: center;
            border-radius: 15px; /* Bordes redondeados */
            transition: background-color 0.3s, box-shadow 0.3s; /* Transición suave de fondo */
            font-size: 1.2rem;
            font-weight: bold;
            cursor: pointer;
        }
        .grid-image {
            margin-top: 30px; /* Mayor separación de la segunda fila */
        }
        .button-container div a {
            color: white;
            text-decoration: none;
        }
        footer {
            text-align: center;
            padding: 20px;
            background-color: #a67c42;
            color: white;
            margin-top: 40px;
        }

        /* Estilos para la imagen expandida */
        #image-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.8);
            display: none;
            justify-content: center;
            align-items: center;
            padding: 20px;
            z-index: 1000;
        }

        #expanded-image {
            max-width: 90%;
            max-height: 90%;
            border-radius: 10px;
        }

        #close-button {
            position: absolute;
            top: 20px;
            left: 20px;
            background-color: white;
            color: black;
            padding: 10px 20px;
            font-size: 18px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
        }

        #close-button:hover {
            background-color: #f2f2f2;
        }
    </style>
  </head>

  <body>
  
<!-- Contenedor para la imagen expandida -->

<div style="background: #a67c42; min-height: 15px;"></div><br /><br />
<div class="container"> <!-- Contenedor centrado -->
    <div class="row">
        <!-- Sección de los botones -->
        <div class="col-md-6">
            <div class="row justify-content-start button-container">
                <div class="col-12 text-center"> <!-- Menos margen, más centrado -->
                    <a id="btn-normal" href="/index.html">
                        <div id="caja1b" style="background: #eee2b4; color: #7a7a7a;"
                             onmouseout="imagenDefecto()">PRESUPUESTADOR AELE</div>
                 	                    <a id="btn-normal" href="medicionc.pdf">
                        <div id="caja3b" style="background: #b68e56;"
                             onmouseout="imagenDefecto()">PLANTILLA MEDICIÓN</div>
                    </a>
                    <!-- Tercer botón -->
                    <a id="btn-normal" href="https://aele.es" target="_blank">
                        <div id="caja3b" style="background: #7a551c"
                             onmouseout="imagenDefecto()">VISITA NUESTRA WEB</div>
                    </a>
                </div>
            </div>
        </div>
        <!-- Sección de la imagen -->
        <div class="col-md-6 text-right">
            <img id="imagen-derecha" src="foto11.jpg" alt="Imagen" style="max-width: 570px; height: 285px;">
        </div>
    </div>

    <!-- Segunda fila de la cuadrícula -->
    <div class="row grid-image">
        <!-- Imagen debajo de los botones -->
        <div class="col-md-6">
            <img id="imagen-abajo-izquierda" src="foto2.jpg" alt="Imagen" style="max-width: 570px; height: 285px;">
        </div>
        <!-- Imagen debajo de la derecha -->
        <div class="col-md-6 text-right">
            <img id="imagen-abajo-derecha" src="foto1.jpg" alt="Imagen" style="max-width: 570px; height: 285px;">
        </div>
    </div>
</div>

<footer>
    © AELE - 2024
</footer>

<!-- Bootstrap core JavaScript ================================================== -->
<script src="selector/jquery-3.2.1.slim.min.js.descarga" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
<script>window.jQuery || document.write('<script src="../../assets/js/vendor/jquery-slim.min.js"><\/script>')</script>
<script src="selector/popper.min.js.descarga"></script>
<script src="selector/bootstrap.min.js.descarga"></script>

<script>
    const user = JSON.parse(localStorage.getItem('user'));
    const empresa = user?.empresa;
    const nivel = user?.nivel;

    const btnCompact = document.getElementById('btn-compact');
    const btnContract = document.getElementById('btn-contract');
    const btnNormal = document.getElementById('btn-normal');

    if (empresa === "5") {
        btnCompact.style.display = 'block';
        btnContract.style.display = 'none';
    } else if (empresa === "4") {
        btnCompact.style.display = 'block';
        btnContract.style.display = 'block';
    } else {
        btnCompact.style.display = 'none';
        btnContract.style.display = 'block';
    }

    btnCompact.addEventListener('click', () => {
        if (empresa === "4") {
            const tempUser = { ...user, empresa: "5" };
            localStorage.setItem('user', JSON.stringify(tempUser));
        }
    });
</script>
</body>
</html>
