<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CommandeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('commande')->insert([
            'numero_commande' => 1230,
            'nb_actif' => 10,
            'date_commande' => '2023-09-20',
            'emplacement_prevu' => 'École de la Source',
            'id_etat' => 1,
            'id_modele_commande' => 1,
        ]);

        DB::table('commande')->insert([
            'numero_commande' => 2120,
            'nb_actif' => 5,
            'date_commande' => '2023-09-21',
            'emplacement_prevu' => 'École de Sainte-Edwidge',
            'id_etat' => 2,
            'id_modele_commande' => 2,
        ]);
    }
}
