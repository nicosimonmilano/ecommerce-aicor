<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Datos de prueba para la tienda (32 productos tecnológicos divididos en 2 paginas, 16 en cada una)
        $products = [
            [
                'name' => 'Portátil Gamer Legion 5',
                'description' => 'Portátil gaming con RTX 4060, perfecto para jugar a todo.',
                'price' => 1299.99,
                'stock' => 15,
                'image_url' => 'https://via.placeholder.com/300?text=Legion+5',
                'created_at' => now(), 'updated_at' => now()
            ],
            [
                'name' => 'iPhone 15 Pro',
                'description' => 'El smartphone definitivo de Apple con titanio y chip A17.',
                'price' => 1199.00,
                'stock' => 25,
                'image_url' => 'https://via.placeholder.com/300?text=iPhone+15',
                'created_at' => now(), 'updated_at' => now()
            ],
            [
                'name' => 'Monitor 4K Dell UltraSharp',
                'description' => 'Monitor profesional de 27 pulgadas con colores precisos.',
                'price' => 450.50,
                'stock' => 8,
                'image_url' => 'https://via.placeholder.com/300?text=Monitor+Dell',
                'created_at' => now(), 'updated_at' => now()
            ],
            [
                'name' => 'Teclado Mecánico Keychron K2',
                'description' => 'Teclado inalámbrico compacto con switches brown.',
                'price' => 99.99,
                'stock' => 30,
                'image_url' => 'https://via.placeholder.com/300?text=Keychron+K2',
                'created_at' => now(), 'updated_at' => now()
            ],
            [
                'name' => 'Ratón Logitech MX Master 3S',
                'description' => 'El mejor ratón para productividad, ergonómico y silencioso.',
                'price' => 105.00,
                'stock' => 50,
                'image_url' => 'https://via.placeholder.com/300?text=MX+Master+3S',
                'created_at' => now(), 'updated_at' => now()
            ],
            [
                'name' => 'Auriculares Sony WH-1000XM5',
                'description' => 'Cancelación de ruido líder en la industria y sonido premium.',
                'price' => 349.99,
                'stock' => 12,
                'image_url' => 'https://via.placeholder.com/300?text=Sony+XM5',
                'created_at' => now(), 'updated_at' => now()
            ],
            [
                'name' => 'iPad Air M1',
                'description' => 'Potencia y portabilidad con el chip M1 en un diseño delgado.',
                'price' => 599.00,
                'stock' => 20,
                'image_url' => 'https://via.placeholder.com/300?text=iPad+Air',
                'created_at' => now(), 'updated_at' => now()
            ],
            [
                'name' => 'Samsung Galaxy S24 Ultra',
                'description' => 'Lo último de Android con AI integrada y S-Pen.',
                'price' => 1399.00,
                'stock' => 10,
                'image_url' => 'https://via.placeholder.com/300?text=S24+Ultra',
                'created_at' => now(), 'updated_at' => now()
            ],
            [
                'name' => 'Consola PlayStation 5 Slim',
                'description' => 'Juega como nunca antes con la PS5 formato reducido.',
                'price' => 499.00,
                'stock' => 5,
                'image_url' => 'https://via.placeholder.com/300?text=PS5+Slim',
                'created_at' => now(), 'updated_at' => now()
            ],
            [
                'name' => 'SSD NVMe Samsung 990 Pro 2TB',
                'description' => 'Almacenamiento ultrarrápido para tu PC o consola.',
                'price' => 189.99,
                'stock' => 40,
                'image_url' => 'https://via.placeholder.com/300?text=SSD+990+Pro',
                'created_at' => now(), 'updated_at' => now()
            ],
            
        ];

        DB::table('products')->insert($products);
    }
}
