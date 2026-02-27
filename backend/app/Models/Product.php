<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;  
use Illuminate\Database\Eloquent\Model; 

class Product extends Model
{
    use HasFactory; //Esto es para que el modelo pueda ser usado en las migraciones tantas veces como queramos, de forma masiva

    // Campos que se pueden asignar masivamente
    protected $fillable = [
        'name',
        'category',
        'description',
        'price',
        'stock',
        'image_url'
    ];
}
