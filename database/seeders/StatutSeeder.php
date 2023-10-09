<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class StatutSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('statut')->insert([
            'nom' => 'En réparation',
        ]);

        DB::table('statut')->insert([
            'nom' => 'Déployable',
        ]);

        DB::table('statut')->insert([
            'nom' => 'Déployé',
        ]);
        DB::table('statut')->insert([
            'nom' => 'Hors service',
        ]);

        DB::table('statut')->insert([
            'nom' => 'Archivé',
        ]);
    }
}
