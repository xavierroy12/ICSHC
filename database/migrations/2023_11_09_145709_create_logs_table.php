<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('log', function (Blueprint $table) {
            $table->id();
            $table->string('url');
            $table->string('method');
            $table->string('action');
            $table->string('field')->nullable();
            $table->string('old_value')->nullable();
            $table->string('new_value')->nullable();
            $table->string('id_user')->nullable();
            $table->string('id_client')->nullable();
            $table->string('id_actif')->nullable();
            $table->string('id_modele')->nullable();
            $table->string('id_emplacement')->nullable();
            $table->string('id_utilisateur')->nullable();
            $table->string('id_commande')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('log');
    }
};
