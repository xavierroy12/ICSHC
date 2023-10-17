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
            'matricule' => '068',
            'nom' => '068 - École Du Parchemin',
            'numero_civique' => 162,
            'adresse' => 'Rue Saint-Jean Est',
        ]);

        DB::table('emplacement')->insert([
            'matricule' => '069',
            'nom' => '069 - École Ligugé',
            'numero_civique' => 194,
            'adresse' => 'Rue de l\'Église',
        ]);
        DB::table('emplacement')->insert([
            'matricule' => '099',
            'nom' => '099 - Entrepot East Angue',
            'numero_civique' => 123,
            'adresse' => 'Rue des Entreprises',
        ]);

        DB::table('emplacement')->insert([
            'matricule' => '007',
            'nom' => '007 - Polyvalente Louis Saint-Laurent',
            'numero_civique' => 215,
            'adresse' => 'Rue de l\'Aréna',
        ]);
    }
}
