<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Order;
use App\Models\OrderItem;
use Carbon\Carbon;

class OrderSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $jsonPath = 'C:/Users/Nico/OneDrive/Escritorio/orders.json';
        if (!file_exists($jsonPath)) {
            $jsonPath = 'C:/Users/Nico/Desktop/orders.json';
            if (!file_exists($jsonPath)) {
                $jsonPath = base_path('orders.json');
                if (!file_exists($jsonPath)) return;
            }
        }

        $json = file_get_contents($jsonPath);
        $ordersData = json_decode($json, true);

        if (is_array($ordersData)) {
            foreach ($ordersData as $orderData) {
                $order = Order::create([
                    'id' => $orderData['id'], // El ID real del JSON (e.g. ORD-2026-001)
                    'user_email' => $orderData['user_email'],
                    'user_name' => $orderData['user_name'] ?? null,
                    'total' => $orderData['total'] ?? 0,
                    'status' => $orderData['status'] ?? 'Completado',
                    'payment_method' => $orderData['payment_method'] ?? 'Tarjeta',
                    'shipping_address' => $orderData['shipping_address'] ?? 'Dirección por defecto',
                    'date' => $orderData['date'] ?? null,
                    'created_at' => isset($orderData['created_at']) ? Carbon::parse($orderData['created_at']) : now(),
                ]);

                if (isset($orderData['items']) && is_array($orderData['items'])) {
                    foreach ($orderData['items'] as $itemData) {
                        OrderItem::create([
                            'order_id' => $order->id,
                            'product_id' => $itemData['product_id'] ?? null,
                            'name' => $itemData['name'] ?? 'Producto Desconocido',
                            'image_url' => $itemData['image_url'] ?? null,
                            'quantity' => $itemData['quantity'] ?? 1,
                            'price' => $itemData['price'] ?? 0,
                            'subtotal' => $itemData['subtotal'] ?? 0,
                        ]);
                    }
                }
            }
        }
    }
}
