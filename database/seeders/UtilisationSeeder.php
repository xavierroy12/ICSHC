<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UtilisationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('utilisation')->insert([
            'nom' => 'Aide aux devoirs',
        ]);

        DB::table('utilisation')->insert([
            'nom' => 'Service adapté',
        ]);

        DB::table('utilisation')->insert([
            'nom' => 'Autre',
        ]);
    }
}
