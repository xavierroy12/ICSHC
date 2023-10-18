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
            $table->string('label');
            $table->json('filters'); // JSON column for storing filters
            $table->string('from'); // JSON column for storing from
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

