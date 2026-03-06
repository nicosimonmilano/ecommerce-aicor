<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class AdminProductController extends Controller
{
    // Valida la clave para entrar al panel
    public function login(Request $request)
    {
        $request->validate([
            'password' => 'required|string'
        ]);

        if ($request->password === env('ADMIN_PASSWORD')) {
            return response()->json(['success' => true]);
        }

        return response()->json(['success' => false, 'message' => 'Clave incorrecta'], 401);
    }

    // Saca todos los productos para que el admin los gestione
    public function index()
    {
        return response()->json(Product::all());
    }

    // Guarda un producto nuevo que hayamos creado
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
            'image_url' => 'required|string|max:255',
            'category' => 'required|string|max:50',
        ]);

        try {
            $product = Product::create($validatedData);
            return response()->json($product, 201);
        } catch (\Exception $e) {
            Log::error('Error al crear producto: ' . $e->getMessage());
            return response()->json(['error' => 'No se pudo crear el producto'], 400);
        }
    }

    // Actualiza los datos de un producto que ya existe
    public function update(Request $request, $id)
    {
        $product = Product::findOrFail($id);

        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
            'image_url' => 'required|string|max:255',
            'category' => 'required|string|max:50',
        ]);

        try {
            $product->update($validatedData);
            return response()->json($product);
        } catch (\Exception $e) {
            Log::error('Error al actualizar producto: ' . $e->getMessage());
            return response()->json(['error' => 'No se pudo actualizar el producto'], 400);
        }
    }

    // Borra un producto de la tienda
    public function destroy($id)
    {
        try {
            $product = Product::findOrFail($id);
            $product->delete();
            return response()->json(['message' => 'Producto eliminado correctamente']);
        } catch (\Exception $e) {
            Log::error('Error al eliminar producto: ' . $e->getMessage());
            return response()->json(['error' => 'No se pudo eliminar el producto'], 400);
        }
    }

    // Saca todos los pedidos de la tienda 
    public function allOrders()
    {
        $orders = Order::with('items')->orderBy('created_at', 'desc')->get();
        return response()->json($orders);
    }
}
