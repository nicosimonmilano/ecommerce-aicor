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
        'unit_price'
    ];

    /**
     * Relación: Un detalle pertenece a un pedido.
     */
    public function order()
    {
        return $this->belongsTo(Order::class);
    }

    /**
     * Relación: Un detalle hace referencia a un producto.
     */
    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
