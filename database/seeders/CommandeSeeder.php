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
        $id_modele_commande = DB::table('modele_commande')
            ->where('quantite', 10)
            ->where('id_modele', 1)
            ->value('id');

        $id_modele_commande_2 = DB::table('modele_commande')
            ->where('quantite', 5)
            ->where('id_modele', 2)
            ->value('id');
        $numero_commande = rand(1000, 9999);

        DB::table('commande')->insert([
            'numero_commande' => $numero_commande,
            'nb_actif' => 10,
            'date_commande' => '2023-09-20',
            'emplacement_prevu' => 'École de la Source',
            'id_etat' => 1,
            'id_modele_commande' => $id_modele_commande,
        ]);
        $numero_commande_2 = rand(1000, 9999);

        DB::table('commande')->insert([
            'numero_commande' => $numero_commande_2,
            'nb_actif' => 5,
            'date_commande' => '2023-09-21',
            'emplacement_prevu' => 'École de Sainte-Edwidge',
            'id_etat' => 2,
            'id_modele_commande' => $id_modele_commande_2,
        ]);
    }
}
