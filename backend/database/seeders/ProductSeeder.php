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
        $jsonPath = database_path('seeders/products.json');
        
        if (!file_exists($jsonPath)) return;

        $json = file_get_contents($jsonPath);
        $products = json_decode($json, true);

        if (is_array($products)) {
            $insertData = [];
            foreach ($products as $product) {
                $insertData[] = [
                    'id' => $product['id'] ?? null,
                    'name' => $product['name'],
                    'category' => $product['category'] ?? null,
                    'description' => $product['description'] ?? '',
                    'price' => $product['price'],
                    'stock' => $product['stock'],
                    'image_url' => $product['image_url'] ?? null,
                    'created_at' => now(),
                    'updated_at' => now(),
                ];
            }
            
            DB::table('products')->insert($insertData);
        }
    }
}
