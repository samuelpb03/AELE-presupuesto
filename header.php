<!doctype html>
<html lang="en">
  <head>
<meta http-equiv="Expires" content="0">
<meta http-equiv="Last-Modified" content="0">
<meta http-equiv="Cache-Control" content="no-cache, mustrevalidate">
<meta http-equiv="Pragma" content="no-cache">
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="">
    <meta name="author" content="">

    <title>Configurador armarios AELE</title>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/js/bootstrap.bundle.min.js" integrity="sha384-b5kHyXgcpbZJO/tY9Ul7kGkf1S0CWuKcCD38l8YkeH8z8QjE0GmW1gYU5S9FOnJ0" crossorigin="anonymous"></script>

    <!-- Bootstrap core CSS -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css?n=1">
    <link href="assets/dist/css/bootstrap.min.css" rel="stylesheet">
    
    <?php include_once('TCPDF/tcpdf.php'); ?>
    <script
      src="https://code.jquery.com/jquery-3.5.1.min.js"
      integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0="
      crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-validate/1.19.0/jquery.validate.min.js"></script>

    <script src="configurador.js"></script>
    <script src="tarifa1.js"></script>
    <!-- Custom styles for this template 
    <link href="form-validation.css" rel="stylesheet">-->
  </head>

  <body class="bg-light">
	  <style>
        h4 { font-size: 12pt; }
        .textopeque { font-size: 9pt; }

        /* Estilos del menú superior */
        .navtop {
            background-color: #a67c42;
            height: 60px;
            width: 100%;
            border: 0;
            padding-top: 30px; /* Para alinear con los botones del otro código, ajustado hacia arriba */
        }

        .navtop div {
            display: flex;
            align-items: center;
            width: 100%;
            height: 100%;
            padding-left: 90px; /* Añadir margen izquierdo para comenzar a la misma altura */
        }

        .navtop div h1, .navtop div a {
            display: inline-flex;
            align-items: center;
            text-align: left;
        }

        .navtop div h1 {
            flex: 1;
            font-size: 24px;
            padding: 0;
            margin: 0;
            color: #a67c42;
            font-weight: normal;
        }

        .navtop div a {
            padding: 0 20px;
            text-decoration: none;
            color: #fff;
            font-weight: bold;
        }

        .navtop div a i {
            padding: 2px 8px 0 0;
        }

        .navtop div a:hover {
            color: #eaebed;
        }

        /* Ajustes generales */
        body.loggedin {
            background-color: #f3f4f7;
        }

        .content {
            width: 1000px;
            margin: 0 auto;
        }

        .content h2 {
            margin: 0;
            padding: 25px 0;
            font-size: 22px;
            border-bottom: 1px solid #e0e0e3;
            color: #4a536e;
        }

        .content > p, .content > div {
            box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
            margin: 25px 0;
            padding: 25px;
            background-color: #a67c42;
        }

        .content > p table td, .content > div table td {
            padding: 5px;
        }

        .content > p table td:first-child, .content > div table td:first-child {
            font-weight: bold;
            color: #4a536e;
            padding-right: 15px;
        }

        .content > div p {
            padding: 5px;
            margin: 0 0 10px 0;
        }

        .botonver  {
            height: 27px;
            margin-top: 7px;
            text-align: center;
            border-radius: 5px;
            background-color: black;
            color: white;
            font-weight: bold;
            border: 0px;
        }

        .botonver:hover {
            color: black;
            background-color: #c0c0c0;
        }
    </style>

	<nav class="navtop">
		<div>
			<h1><a href="index.php">AELE - Configurador de Armarios</a></h1>
			<a href="logout.php"><i class="fa fa-sign-out" aria-hidden="true"></i>Salir</a>
		</div>
	</nav>
  </body>
</html>

