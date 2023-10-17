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
            'nom_utilisateur' => 'lgrandchamps',
            'id_emplacement' => 1,
            'id_role' => 1,
        ]);

        DB::table('utilisateur')->insert([
            'nom' => 'Nicolas Lachance',
            'nom_utilisateur' => 'nlachance',
            'id_emplacement' => 3,
            'id_role' => 2,
        ]);
    }
}
