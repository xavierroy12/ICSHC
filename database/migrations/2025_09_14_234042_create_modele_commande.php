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
        Schema::create('modele_commande', function (Blueprint $table) {
            $table->id();
            $table->integer('quantite')->nullable();
            $table->unsignedBigInteger('id_modele');

            $table->foreign('id_modele')->references('id')->on('modele');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('modele_commande');
    }
};
