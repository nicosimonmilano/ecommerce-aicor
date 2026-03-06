<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\OrderController;

// Aquí definimos todas las rutas de la API de la tienda
// Estas rutas devuelven JSON para que React las pueda leer


// Rutas de API REST
use App\Http\Controllers\ProductController;
use App\Http\Controllers\AdminProductController;

Route::get('/products', [ProductController::class, 'index']);
Route::post('/checkout', [OrderController::class, 'store']);
Route::get('/orders', [OrderController::class, 'index']);

// Rutas de Administración 
Route::prefix('admin')->group(function () {
    Route::post('/login', [AdminProductController::class, 'login']);
    Route::get('/products', [AdminProductController::class, 'index']);
    Route::post('/products', [AdminProductController::class, 'store']);
    Route::put('/products/{id}', [AdminProductController::class, 'update']);
    Route::delete('/products/{id}', [AdminProductController::class, 'destroy']);
    Route::get('/orders', [AdminProductController::class, 'allOrders']);
});
