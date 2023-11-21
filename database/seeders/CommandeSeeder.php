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

        $numero_commande = rand(1000, 9999);

        DB::table('commande')->insert([
            'numero_commande' => "69123456789",
            'nb_actif' => 10,
            'date_commande' => '2023-09-20',
            'id_emplacement_prevu' => 1,
            'id_etat' => 1,
        ]);
        $numero_commande_2 = rand(1000, 9999);

        DB::table('commande')->insert([
            'numero_commande' => "42012345678",
            'nb_actif' => 5,
            'date_commande' => '2023-09-21',
            'id_emplacement_prevu' => 2,
            'id_etat' => 2,
        ]);
    }
}
