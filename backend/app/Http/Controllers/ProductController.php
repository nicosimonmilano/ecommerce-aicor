<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    // Lista todos los productos para que se vean en la tienda
    public function index()
    {
        $products = Product::all();
        return response()->json($products);
    }
}
