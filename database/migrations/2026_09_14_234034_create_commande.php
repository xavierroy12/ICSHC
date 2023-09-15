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
        Schema::create('commande', function (Blueprint $table) {
            $table->integer('numero_commande')->unsigned()->primary();
            $table->integer('nb_actif')->nullable();
            $table->date('date_commande')->nullable();
            $table->string('emplacement_prevu', 64)->nullable();
            $table->unsignedBigInteger('id_etat');
            $table->unsignedBigInteger('id_modele_commande');

            $table->foreign('id_etat')->references('id')->on('etat');
            $table->foreign('id_modele_commande')->references('id')->on('modele_commande');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('commande');
    }
};
