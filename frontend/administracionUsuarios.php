<?php
session_start();

// Verifica si el usuario está logueado
if (!isset($_SESSION['loggedin'])) {
    header('Location: login.php');
    exit;
}

// Verifica si el usuario tiene nivel 99; de lo contrario, redirige a la página principal
if ($_SESSION['nivel'] != 99) {
    header('Location: index.php');
    exit;
}

// Conexión a la base de datos (MISMA que la consulta de usuarios)
$DATABASE_HOST = 'db5016528861.hosting-data.io';
$DATABASE_USER = 'dbu1639387';
$DATABASE_PASS = '@Aele2024';
$DATABASE_NAME = 'dbs13415852';

$con = mysqli_connect($DATABASE_HOST, $DATABASE_USER, $DATABASE_PASS, $DATABASE_NAME);
if (mysqli_connect_errno()) {
    exit('Failed to connect to MySQL: ' . mysqli_connect_error());
}
mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
$userData = null;
$storeData = null;
$errorMsgUser = "";
$errorMsgStore = "";
$successMsg = "";
$errorMsg = "";

// Procesa el formulario de usuario cuando se envía
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['user_id'])) {
    $userId = intval($_POST['user_id']);

    // Consulta para obtener los datos del usuario por ID
    $stmt = $con->prepare('SELECT id, username, email, nombrePersonal, nivel, tienda, empresa FROM usuario WHERE id = ?');
    $stmt->bind_param('i', $userId);
    $stmt->execute();
    $result = $stmt->get_result();

    // Verifica si el usuario existe
    if ($result->num_rows > 0) {
        $userData = $result->fetch_assoc();
    } else {
        $errorMsgUser = "No se encontró ningún usuario con el ID proporcionado.";
    }

    $stmt->close();
}

// Procesa el formulario de tienda cuando se envía
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['store_id'])) {
    $storeId = intval($_POST['store_id']);

    // Consulta para obtener los datos de la tienda por ID
    $stmt = $con->prepare('SELECT id, nombre, empresa, ubicacion, fechaInicioPromo, fechaFinPromo, fechaInicioPromoEmpresa, fechaFinPromoEmpresa, valorPuntoPromoEmpresa, valorPuntoPromo, codigo FROM tienda WHERE id = ?');
    $stmt->bind_param('i', $storeId);
    $stmt->execute();
    $result = $stmt->get_result();

    // Verifica si la tienda existe
    if ($result->num_rows > 0) {
        $storeData = $result->fetch_assoc();
    } else {
        $errorMsgStore = "No se encontró ninguna tienda con el ID proporcionado.";
    }

    $stmt->close();
}

// Procesar el formulario de registro de usuario
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['register_user'])) {
    $username = trim($_POST['username']);
    $nombrePersonal = trim($_POST['nombrePersonal']);
    $email = trim($_POST['email']);
    $password = trim($_POST['password']);
    $tienda = intval($_POST['tienda']);
    $empresa = intval($_POST['empresa']);
    $nivel = intval($_POST['nivel']);

    // Validar que los campos requeridos no estén vacíos
    if (empty($username) || empty($nombrePersonal) || empty($email) || empty($password)) {
        $errorMsg = "Error: Todos los campos son obligatorios.";
    } else {
        // 🔹 Verificar si el usuario ya existe
        $checkUser = $con->prepare("SELECT id FROM usuario WHERE LOWER(username) = LOWER(?)");
        $checkUser->bind_param("s", $username);
        $checkUser->execute();
        $checkUser->store_result();

        if ($checkUser->num_rows > 0) {
            $errorMsg = "El nombre de usuario ya está en uso.";
        } else {
            // ✅ Insertar nuevo usuario
            $passwordHash = password_hash($password, PASSWORD_DEFAULT);
            $stmt = $con->prepare("INSERT INTO usuario (username, nombrePersonal, email, password, tienda, empresa, nivel, bloqueado) VALUES (?, ?, ?, ?, ?, ?, ?, 0)");
            $stmt->bind_param("ssssiii", $username, $nombrePersonal, $email, $passwordHash, $tienda, $empresa, $nivel);

            if ($stmt->execute()) {
                if ($stmt->affected_rows > 0) {
                    $successMsg = "Usuario registrado correctamente.";
                } else {
                    $errorMsg = "Error: No se insertó ningún usuario.";
                }
            } else {
                $errorMsg = "Error al registrar el usuario: " . $stmt->error;
            }
            $stmt->close();
        }
        $checkUser->close();
    }
}


mysqli_close($con);
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Administración de datos</title>
    <link rel="stylesheet" href="selector/bootstrap.min.css">
</head>
<body>
<div class="container">
    <h1 class="mt-4">Administración de datos</h1>

    <!-- Formulario para buscar usuario por ID -->
    <form method="POST" action="administracionUsuarios.php" class="mb-4">
        <div class="form-group">
            <label for="user_id">ID de Usuario:</label>
            <input type="number" name="user_id" id="user_id" class="form-control" required>
        </div>
        <button type="submit" class="btn btn-primary">Buscar Usuario</button>
    </form>

    <?php if ($errorMsgUser): ?>
        <div class="alert alert-danger"><?php echo $errorMsgUser; ?></div>
    <?php endif; ?>

    <?php if ($userData): ?>
        <h2>Detalles del Usuario</h2>
        <table class="table table-bordered">
            <tr><th>ID</th><td><?php echo htmlspecialchars($userData['id']); ?></td></tr>
            <tr><th>Nombre de Usuario</th><td><?php echo htmlspecialchars($userData['username']); ?></td></tr>
            <tr><th>Email</th><td><?php echo htmlspecialchars($userData['email']); ?></td></tr>
            <tr><th>Nombre Personal</th><td><?php echo htmlspecialchars($userData['nombrePersonal']); ?></td></tr>
            <tr><th>Nivel</th><td><?php echo htmlspecialchars($userData['nivel']); ?></td></tr>
            <tr><th>Tienda</th><td><?php echo htmlspecialchars($userData['tienda']); ?></td></tr>
            <tr><th>Empresa</th><td><?php echo htmlspecialchars($userData['empresa']); ?></td></tr>
        </table>
    <?php endif; ?>

    <!-- Formulario para registrar nuevo usuario -->
<h2>Añadir Nuevo Usuario</h2>
<?php if ($successMsg): ?>
    <div class="alert alert-success"><?php echo $successMsg; ?></div>
<?php endif; ?>
<?php if ($errorMsg): ?>
    <div class="alert alert-danger"><?php echo $errorMsg; ?></div>
<?php endif; ?>
<form method="POST" action="administracionUsuarios.php" class="mb-4">
    <input type="hidden" name="register_user" value="1">

    <div class="form-group">
        <label>Username:</label>
        <input type="text" name="username" class="form-control" required>
    </div>

    <div class="form-group">
        <label>Nombre Personal:</label>
        <input type="text" name="nombrePersonal" class="form-control" required>
    </div>

    <div class="form-group">
        <label>Email:</label>
        <input type="email" name="email" class="form-control" required>
    </div>

    <div class="form-group">
        <label>Contraseña:</label>
        <input type="password" name="password" class="form-control" required>
    </div>

    <div class="form-group">
        <label>Tienda:</label>
        <input type="number" name="tienda" class="form-control" required>
    </div>

    <div class="form-group">
        <label>Empresa:</label>
        <input type="number" name="empresa" class="form-control" required>
    </div>

    <div class="form-group">
        <label>Nivel:</label>
        <input type="number" name="nivel" class="form-control" required>
    </div>

    <button type="submit" class="btn btn-success">Registrar Usuario</button>
</form>


<script src="selector/bootstrap.min.js"></script>
</body>
</html>
