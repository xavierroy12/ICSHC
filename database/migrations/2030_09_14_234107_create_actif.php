<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
     /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('actif', function (Blueprint $table) {

            $table->id();

            $table->string('numero_serie', 32)->nullable();
            $table->string('nom', 64)->default('Sans nom');
            $table->string('adresse_mac', 64)->nullable();
            $table->boolean('en_entrepot');
            $table->date('date_retour')->nullable();
            $table->text('note')->nullable();
            $table->text('modele_descriptif')->nullable();
            $table->string('numero_commande')->nullable();
            $table->unsignedBigInteger('id_sourceFinanciere')->nullable();
            $table->unsignedBigInteger('id_modele')->nullable();
            $table->unsignedBigInteger('id_statut');
            $table->unsignedBigInteger('id_emplacement')->nullable();
            $table->unsignedBigInteger('id_proprietaire')->nullable();
            $table->unsignedBigInteger('id_utilisation')->nullable();
            $table->unsignedBigInteger('id_client')->nullable();
            $table->foreign('numero_commande')->references('numero_commande')->on('commande');
            $table->foreign('id_sourceFinanciere')->references('id')->on('source_financiere');
            $table->foreign('id_modele')->references('id')->on('modele');
            $table->foreign('id_statut')->references('id')->on('statut');
            $table->foreign('id_emplacement')->references('id')->on('emplacement');
            $table->foreign('id_proprietaire')->references('id')->on('emplacement');
            $table->foreign('id_utilisation')->references('id')->on('utilisation');
            $table->foreign('id_client')->references('id')->on('client');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('actif');
    }
};
