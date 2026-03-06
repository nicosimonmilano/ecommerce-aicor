<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product; 
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class OrderController extends Controller
{
    public function store(Request $request)
    {
        // Validar que los datos del cliente y los productos lleguen bien
        $validatedData = $request->validate([
            'user_email' => 'required|email|max:255',
            'user_name' => 'nullable|string|max:255',
            'items' => 'required|array|min:1',
            'items.*.product_id' => 'required|exists:products,id',
            'items.*.quantity' => 'required|integer|min:1',
            'shipping_address' => 'nullable|string|max:255',
        ]);

        try {
            return DB::transaction(function () use ($validatedData) {
                
                $total = 0;
                $orderItemsData = [];

                foreach ($validatedData['items'] as $item) {
                    $product = Product::findOrFail($item['product_id']);

                    if ($product->stock < $item['quantity']) {
                        throw new \Exception("No hay suficiente stock para el producto: {$product->name}");
                    }

                    $product->stock -= $item['quantity'];
                    $product->save();

                    $subtotal = $product->price * $item['quantity'];
                    $total += $subtotal;

                    $orderItemsData[] = [
                        'product_id' => $product->id,
                        'name' => $product->name,
                        'image_url' => $product->image_url,
                        'quantity' => $item['quantity'],
                        'price' => $product->price,
                        'subtotal' => $subtotal,
                    ];
                }

                // Generar ID tipo ORD-2026-XXX
                $count = Order::count();
                $orderId = 'ORD-' . date('Y') . '-' . str_pad($count + 1, 3, '0', STR_PAD_LEFT);

                // Crear el Pedido
                $order = Order::create([
                    'id' => $orderId,
                    'user_email' => $validatedData['user_email'],
                    'user_name' => $validatedData['user_name'],
                    'total' => $total,
                    'status' => 'Completado',
                    'payment_method' => 'Tarjeta',
                    'shipping_address' => $validatedData['shipping_address'] ?? 'Dirección por defecto',
                    'date' => date('d M Y H:i'),
                ]);

                // 3. Guardar los Items del pedido
                foreach ($orderItemsData as $data) {
                    $order->items()->create($data);
                }

                return response()->json([
                    'message' => '¡Pedido realizado con éxito!',
                    'order_id' => $order->id,
                    'total' => $total,
                ], 201);

            });

        } catch (\Exception $e) {
            Log::error('Error al procesar pedido: ' . $e->getMessage());
            return response()->json([
                'error' => 'Error al procesar el pedido.',
                'details' => $e->getMessage()
            ], 400);
        }
    }

    // Saca el historial de pedidos de un usuario concreto
    public function index(Request $request)
    {
        $email = $request->query('email');

        if (!$email) {
             return response()->json(['error' => 'Usuario no espeficicado'], 400);
        }

        $orders = Order::with('items') // Cargamos los items directamente (ya tienen name e image_url)
                        ->where('user_email', $email)
                        ->orderBy('created_at', 'desc')
                        ->get();

        return response()->json($orders);
    }
}
