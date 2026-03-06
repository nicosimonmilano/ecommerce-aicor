<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderItem extends Model
{
    use HasFactory;

    protected $fillable = [
        'order_id',
        'product_id',
        'quantity',
        'price',
        'name',
        'image_url',
        'subtotal',
    ];

    protected $casts = [
        'price' => 'float',
        'quantity' => 'integer',
        'subtotal' => 'float',
    ];

    // Sacar el pedido al que pertenece este artículo
    public function order()
    {
        return $this->belongsTo(Order::class);
    }

    // Sacar los datos del producto (o uno por defecto si se borró)
    public function product()
    {
        return $this->belongsTo(Product::class)->withDefault([
            'name' => 'Producto Eliminado',
            'image_url' => 'https://via.placeholder.com/150',
            'price' => 0,
        ]); // Si se borra el producto, devolvemos uno por defecto pero mantenemos el item histórico
    }
}
