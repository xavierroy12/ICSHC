<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ActifSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */

    public function run(): void
    {

        DB::table('actif')->insert([
            'numero_serie' => 'ABC123',
            'nom' => 'Ordinateur portable',
            'en_entrepot' => true,
            'adresse_mac' => '00:1A:2B:3C:4D:5E',
            'date_retour' => '2023-09-18',
            'note' => 'Cet ordinateur a tendance à exploser.',
            'modele_descriptif' => 'Ordinateur portable de la marque Acer.',
            'id_modele' => 1,
            'id_statut' => 1,
            'id_emplacement' => 1,
            'id_proprietaire' => 1,
            'id_utilisation' => 1,
        ]);

        DB::table('actif')->insert([
            'numero_serie' => 'ABC123',
            'nom' => 'Ordinateur portable',
            'en_entrepot' => true,
            'adresse_mac' => '00:1A:2B:3C:4D:5E',
            'date_retour' => '2023-09-18',
            'note' => 'Cet ordinateur a tendance à exploser.',
            'modele_descriptif' => 'Ordinateur portable de la marque DELL.',
            'id_modele' => 2,
            'id_statut' => 3,
            'id_emplacement' => 1,
            'id_proprietaire' => 1,
            'id_utilisation' => 1,
        ]);
    }
}
