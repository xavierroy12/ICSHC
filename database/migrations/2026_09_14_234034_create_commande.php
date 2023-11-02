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
            $table->unsignedBigInteger('numero_commande')->unsigned()->primary();
            $table->integer('nb_actif')->nullable();
            $table->date('date_commande')->nullable();
            $table->unsignedBigInteger('id_etat');
            $table->unsignedBigInteger('id_emplacement_prevu')->nullable();
            $table->foreign('id_etat')->references('id')->on('etat');
            $table->foreign('id_emplacement_prevu')->references('id')->on('emplacement');
            $table->timestamps();
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
