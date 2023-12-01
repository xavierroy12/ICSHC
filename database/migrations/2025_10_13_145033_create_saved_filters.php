<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('saved_filters', function (Blueprint $table) {
            $table->id();
            $table->string('label', 32);
            $table->json('filters');
            $table->string('from', 32);

            $table->unsignedBigInteger('id_user');

            $table->foreign('id_user')->references('id')->on('utilisateur');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down()
    {
        Schema::dropIfExists('saved_filters');
    }
};

