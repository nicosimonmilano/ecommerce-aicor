<?php
// Permitir cualquier origen (CORS) para que el frontend pueda conectar
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");
header("Cache-Control: no-cache, no-store, must-revalidate");
header("Pragma: no-cache");
header("Expires: 0");

// Si es una petición OPTIONS (pre-flight), terminamos aquí
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Ruta al archivo JSON
$api = __DIR__ . '/products.json';

if (file_exists($api)) {
    // Leemos el archivo y lo enviamos
    $datos_api = file_get_contents($api); 
    echo $datos_api;
} else {
    // Si no existe, devolvemos un error
    http_response_code(404);
    echo json_encode(["error" => "Archivo de productos no encontrado en " . $api]);
}
?>
