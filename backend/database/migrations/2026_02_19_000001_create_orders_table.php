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
        Schema::create('orders', function (Blueprint $table) {
            $table->string('id')->primary(); // ID string like "ORD-2026-001"
            $table->string('user_email');
            $table->string('user_name')->nullable();
            $table->decimal('total', 10, 2);
            $table->string('status')->default('Completado');
            $table->string('payment_method')->nullable();
            $table->string('shipping_address')->nullable();
            $table->string('date')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
