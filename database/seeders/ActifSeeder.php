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
        $id_modele_commande = DB::table('modele_commande')
            ->where('quantite', 10)
            ->where('id_modele', 1)
            ->value('id');

        $id_modele_commande_2 = DB::table('modele_commande')
            ->where('quantite', 5)
            ->where('id_modele', 2)
            ->value('id');
            
        DB::table('actif')->insert([
            'numero_serie' => 'ABC123',
            'nom' => 'Ordinateur portable',
            'en_entrepot' => true,
            'adresse_mac' => '00:1A:2B:3C:4D:5E',
            'date_retour' => '2023-09-18',
            'note' => 'Cet ordinateur a tendance à exploser.',
            'id_modele_commande' => $id_modele_commande,
            'id_statut' => 1,
            'id_emplacement' => 1,
            'id_proprietaire' => 1,
            'id_utilisation' => 1,
        ]);

        DB::table('actif')->insert([
            'numero_serie' => 'XYZ789',
            'nom' => 'Téléphone mobile',
            'en_entrepot' => false,
            'adresse_mac' => null,
            'date_retour' => null,
            'note' => '',
            'id_modele_commande' => $id_modele_commande_2,
            'id_statut' => 2,
            'id_emplacement' => 2,
            'id_proprietaire' => 2,
            'id_utilisation' => 2,
        ]);
    }
}
