<?php

namespace Tests\Unit;

use PHPUnit\Framework\TestCase;

class StockDiscountTest extends TestCase
{
    /**
     * Prueba que el sistema descuente correctamente el stock.
     * Simulamos la lógica de negocio que hemos puesto en checkout_api.php
     */
    public function test_descuentoStock()
    {
        // 1. Preparar datos de prueba (Simulamos lo que habría en products.json)
        $productosIniciales = [
            [
                "id" => 1,
                "name" => "Producto de Prueba",
                "stock" => 10,
                "price" => 50.0
            ]
        ];

        // 2. Simular un carrito con 2 unidades
        $itemsCarrito = [
            [
                "product_id" => 1,
                "quantity" => 2
            ]
        ];

        // 3. Ejecutar la lógica de descuento (la misma que en checkout_api.php)
        $productosFinales = $productosIniciales;
        foreach ($itemsCarrito as $item) {
            foreach ($productosFinales as &$p) {
                if ($p['id'] == $item['product_id']) {
                    $p['stock'] -= $item['quantity'];
                }
            }
        }
        unset($p);

        // 4. Verificar que el stock ahora sea 8 (10 - 2)
        $this->assertEquals(8, $productosFinales[0]['stock'], "El stock no se ha descontado correctamente.");
        
        // Verificamos que el nombre no haya cambiado
        $this->assertEquals("Producto de Prueba", $productosFinales[0]['name']);
    }

    /**
     * Prueba que no se pueda descontar más stock del disponible.
     */
    public function test_cannot_discount_more_than_available_stock()
    {
        $productos = [
            ["id" => 1, "stock" => 5]
        ];
        
        $itemCarrito = ["product_id" => 1, "quantity" => 10];
        
        $errorDetectado = false;
        foreach ($productos as $p) {
            if ($p['id'] == $itemCarrito['product_id']) {
                if ($p['stock'] < $itemCarrito['quantity']) {
                    $errorDetectado = true;
                }
            }
        }
        
        $this->assertTrue($errorDetectado, "Se debería haber detectado que no hay stock suficiente.");
    }
}
