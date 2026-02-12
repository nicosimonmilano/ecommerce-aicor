<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'total_amount',
        'status'
    ];

    /**
     * Relación: Un pedido pertenece a un usuario.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Relación: Un pedido tiene muchos detalles (items).
     */
    public function items()
    {
        return $this->hasMany(OrderItem::class);
    }
}
