<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit;
}

$productsFile = __DIR__ . '/products.json';

if (file_exists($productsFile)) {
    echo file_get_contents($productsFile);
} else {
    http_response_code(404);
    echo json_encode(["error" => "Products not found"]);
}
