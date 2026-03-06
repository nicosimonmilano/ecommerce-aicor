<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'id',
        'user_email',
        'user_name',
        'total',
        'status',
        'payment_method',
        'shipping_address',
        'date',
    ];

    protected $casts = [
        'total' => 'float',
    ];

    // Relación para sacar los artículos de un pedido
    public function items()
    {
        return $this->hasMany(OrderItem::class);
    }

    // Relación para ver el usuario que hizo el pedido (si existe)
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
