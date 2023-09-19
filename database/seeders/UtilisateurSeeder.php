<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UtilisateurSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('utilisateur')->insert([
            'nom' => 'Luc Grandchamps',
            'matricule' => 'AD12345',
            'id_emplacement' => 1,
            'id_role' => 1,
        ]);

        DB::table('utilisateur')->insert([
            'nom' => 'Xavier Roy',
            'matricule' => 'BS67890',
            'id_emplacement' => 1,
            'id_role' => 2,
        ]);
    }
}
