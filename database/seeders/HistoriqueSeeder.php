<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class HistoriqueSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('historique')->insert([
            'action' => 'Création',
            'description' => 'Nouvel actif ajouté au système.',
            'date_creation' => '2023-09-18',
            'type_affecte' => 'Actif',
            'id_utilisateur' => 1,
        ]);

        DB::table('historique')->insert([
            'action' => 'Mise à jour',
            'description' => 'L\'état de l\'actif a été modifié.',
            'date_creation' => '2023-09-19',
            'type_affecte' => 'Actif',
            'id_utilisateur' => 2,
        ]);
    }
}
