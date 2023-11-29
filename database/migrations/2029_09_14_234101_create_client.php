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
            $table->string('matricule', 9)->nullable();
            $table->string('nom', 32)->nullable();
            $table->string('prenom', 32)->nullable();
            $table->string('courriel', 64)->nullable();
            $table->boolean('emplacement_manuel')->default(FALSE);
            $table->boolean('inactif')->default(FALSE);

            $table->unsignedInteger('id_poste')->nullable();
            $table->unsignedInteger('id_type_client');
            $table->unsignedInteger('id_actif')->nullable();
            $table->unsignedInteger('id_emplacement')->nullable();

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
