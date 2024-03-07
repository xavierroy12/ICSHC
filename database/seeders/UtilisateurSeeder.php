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
            'nom' => 'Admi Nistrateur',
            'nom_utilisateur' => 'Admin',
            'courriel' => 'Admin@example.com',
            'token' => null,
            'id_emplacement' => 1,
            'id_role' => 1,
            'expiration' => null,
            'created_at' => now(),
            'updated_at' => now(),
        ]);


    }
}
