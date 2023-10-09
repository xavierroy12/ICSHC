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
        Schema::create('modele', function (Blueprint $table) {
            $table->id();
            $table->string('nom', 32);
            $table->string('stockage', 32)->nullable();
            $table->string('processeur', 64)->nullable();
            $table->string('memoire_vive', 32)->nullable();
            $table->string('taille', 16)->nullable();
            $table->unsignedBigInteger('id_type_modele');

            $table->foreign('id_type_modele')->references('id')->on('type_modele');
            $table->boolean('favoris')->default(false);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('modele');
    }
};
