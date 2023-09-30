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
            $table->unsignedBigInteger('id_emplacement')->nullable();
            $table->unsignedBigInteger('id_role')->nullable();
            $table->string('token', 500)->nullable(); // Add token column
            $table->timestamp('expiration')->nullable(); // Add expiration column
            $table->foreign('id_emplacement')->references('id')->on('emplacement');
            $table->foreign('id_role')->references('id')->on('role');
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
