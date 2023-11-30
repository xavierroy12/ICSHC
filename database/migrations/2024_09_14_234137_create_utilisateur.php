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
        Schema::create('utilisateur', function (Blueprint $table) {
            $table->id();
            $table->string('nom', 32);
            $table->string('nom_utilisateur', 32);
            $table->string('courriel', 64);
            $table->string('token')->nullable(); // Add token column

            $table->unsignedInteger('id_emplacement')->nullable();
            $table->unsignedInteger('id_role')->default(2);

            $table->foreign('id_emplacement')->references('id')->on('emplacement');
            $table->foreign('id_role')->references('id')->on('role');

            $table->timestamp('expiration')->nullable(); // Add expiration column

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('utilisateur');
    }
};
