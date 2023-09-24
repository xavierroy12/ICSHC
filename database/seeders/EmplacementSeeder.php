<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class EmplacementSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('emplacement')->insert([
            'nom' => 'École Du Parchemin',
            'numero_civique' => 162,
            'adresse' => 'Rue Saint-Jean Est',
        ]);

        DB::table('emplacement')->insert([
            'nom' => 'École Ligugé',
            'numero_civique' => 194,
            'adresse' => 'Rue de l\'Église',
        ]);

        DB::table('emplacement')->insert([
            'nom' => 'École de la Feuille-d\'Or',
            'numero_civique' => 215,
            'adresse' => 'Rue de l\'Aréna',
        ]);
    }
}
