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
        Schema::create('client', function (Blueprint $table) {
            $table->id();
            $table->string('nom', 32);
            $table->unsignedBigInteger('id_poste');
            $table->unsignedBigInteger('id_type_client');
            $table->unsignedBigInteger('id_emplacement');
            $table->foreign('id_poste')->references('id')->on('poste');
            $table->foreign('id_type_client')->references('id')->on('type_client');
            $table->foreign('id_emplacement')->references('id')->on('emplacement');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('client');
    }
};
