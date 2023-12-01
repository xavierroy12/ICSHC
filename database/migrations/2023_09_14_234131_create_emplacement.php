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
        Schema::create('emplacement', function (Blueprint $table) {
            $table->id();
            $table->string('matricule', 3);
            $table->string('nom', 255);
            $table->string('numero_civique',4);
            $table->string('adresse');
            $table->boolean('est_proprietaire')->default(false);
            $table->timestamps();

        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('emplacement');
    }
};
