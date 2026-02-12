<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('order_items', function (Blueprint $table) {
            $table->id();
            // Relación con el pedido principal
            $table->foreignId('order_id')->constrained('orders')->onDelete('cascade');
            
            // Relación con el producto comprado
            $table->foreignId('product_id')->constrained('products')->onDelete('cascade');
            
            $table->integer('quantity'); // Cantidad comprada
            $table->decimal('unit_price', 10, 2); // Precio al momento de la compra (por si cambia luego)
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('order_items');
    }
};
