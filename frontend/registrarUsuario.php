<?php
include 'config.php'; // Conexión a la base de datos
error_reporting(E_ALL);
ini_set('display_errors', 1);
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST['username'];
    $nombrePersonal = $_POST['nombrePersonal'];
    $email = $_POST['email'];
    $password = password_hash($_POST['password'], PASSWORD_DEFAULT); // Encriptar la contraseña
    $tienda = $_POST['tienda'];
    $nivel = $_POST['nivel'];
    $empresa = $_POST['empresa'];
    $bloqueado = $_POST['bloqueado'];

    $query = "INSERT INTO usuarios (username, nombrePersonal, email, password, tienda, nivel, empresa, bloqueado) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("ssssiiii", $username, $nombrePersonal, $email, $password, $tienda, $nivel, $empresa, $bloqueado);

    if ($stmt->execute()) {
        echo "Usuario registrado correctamente.";
    } else {
        echo "Error al registrar el usuario.";
    }

    $stmt->close();
    $conn->close();
}
?>