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
        Schema::create('products', function (Blueprint $table) {
            $table->id(); // ID único
            $table->string('name'); // Nombre del producto
            $table->text('description'); // Descripción detallada
            $table->decimal('price', 10, 2); // Precio con 2 decimales
            $table->integer('stock'); // Cantidad disponible
            $table->string('image_url')->nullable(); // URL de la imagen (opcional)
            $table->timestamps(); // Created_at y updated_at
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
