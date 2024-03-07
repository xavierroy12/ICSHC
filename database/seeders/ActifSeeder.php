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

        $clients = DB::table('client')->pluck('id'); // Assuming you have a 'clients' table
        $userNoAlerte = DB::table('client')->where('prenom','NoAlerte' )->pluck('id');
        $userOldActif = DB::table('client')->where('prenom','VieuActif' )->pluck('id');
        $userInnactif = DB::table('client')->where('prenom','INACTIF' )->pluck('id');

        DB::table('actif')->insert([
            'numero_serie' => 'SER123456',
            'nom' => '1-oldActif-03',
            'en_entrepot' => FALSE,
            'adresse_mac' => '00:1A:2B:3C:4D:5E',
            'date_retour' => '2024-09-18',
            'note' => 'Cet actif est en bon état.',
            'modele_descriptif' => 'Actif de modèle ' . rand(1, 7),
            'id_modele' => rand(1, 7),
            'id_statut' => rand(1, 3),
            'created_at' => '2015-09-18',
            'id_emplacement' => 3,
            'id_proprietaire' => 1,
            'id_utilisation' => 1,
            'numero_commande' => "69123456789",
            'id_client' => $userOldActif[0],
        ]);

        DB::table('actif')->insert([
            'numero_serie' => 'SER1234156',
            'nom' => '1-oldActif-04',
            'en_entrepot' => FALSE,
            'adresse_mac' => '00:1A:2B:3C:4D:5E',
            'date_retour' => '2024-09-18',
            'note' => 'Cet actif est en bon état.',
            'modele_descriptif' => 'Actif de modèle ' . rand(1, 7),
            'id_modele' => rand(1, 7),
            'id_statut' => rand(1, 3),
            'created_at' => '2015-09-18',
            'id_emplacement' => 3,
            'id_proprietaire' => 1,
            'id_utilisation' => 1,
            'numero_commande' => "69123456789",
            'id_client' => $userNoAlerte[0],
        ]);

        DB::table('actif')->insert([
            [
            'numero_serie' => 'SER000000000001',
            'nom' => '1-JGagnon-01',
            'en_entrepot' => FALSE,
            'adresse_mac' => '00:1A:2B:3C:4D:5E',
            'date_retour' => '2024-09-18',
            'note' => 'Cet actif est en bon état.',
            'modele_descriptif' => 'Actif de modèle ' . rand(1, 7),
            'id_modele' => rand(1, 7),
            'id_statut' => rand(1, 3),
            'id_emplacement' => 3,
            'id_proprietaire' => 1,
            'id_utilisation' => 1,
            'numero_commande' => "69123456789",
            'id_client' => $clients[1],
            ],
            [
                'numero_serie' => 'SER000000000002',
                'nom' => '069-KTremblay-01',
                'en_entrepot' => FALSE,
                'adresse_mac' => '00:1A:2B:3C:4D:5E',
                'date_retour' => '2024-09-18',
                'note' => 'Cet actif est en bon état.',
                'modele_descriptif' => 'Actif de modèle ' . rand(1, 7),
                'id_modele' => rand(1, 7),
                'id_statut' => rand(1, 3),
                'id_emplacement' => 1,
                'id_proprietaire' => 1,
                'id_utilisation' => 1,
                'numero_commande' => "69123456789",
                'id_client' => $clients[1],
            ],
            [
                'numero_serie' => 'SER000000000003',
                'nom' => '1-Jdoe-01',
                'en_entrepot' => FALSE,
                'adresse_mac' => '00:1A:2B:3C:4D:5E',
                'date_retour' => '2024-09-18',
                'note' => 'Cet actif est en bon état.',
                'modele_descriptif' => 'Actif de modèle ' . rand(1, 7),
                'id_modele' => rand(1, 7),
                'id_statut' => rand(1, 3),
                'id_emplacement' => 5,
                'id_proprietaire' => 1,
                'id_utilisation' => 1,
                'numero_commande' => "69123456789",
                'id_client' => $userInnactif[0],
            ],

            [
                'numero_serie' => 'SER0000000000023',
                'nom' => '1-actifMultiple-01',
                'en_entrepot' => FALSE,
                'adresse_mac' => '00:1A:2B:3C:4D:5E',
                'date_retour' => NULL,
                'note' => 'Cet actif est en bon état.',
                'modele_descriptif' => 'Actif de modèle ' . rand(1, 7),
                'id_modele' => rand(1, 7),
                'id_statut' => rand(1, 3),
                'id_emplacement' => 4,
                'id_proprietaire' => 1,
                'id_utilisation' => 1,
                'numero_commande' => "69123456789",
                'id_client' => $userNoAlerte[0],

            ],
            [
                'numero_serie' => 'SER000000000004',
                'nom' => '069-Jsmith-01',
                'en_entrepot' => FALSE,
                'adresse_mac' => '00:1A:2B:3C:4D:5E',
                'date_retour' => '2024-09-18',
                'note' => 'Cet actif est en bon état.',
                'modele_descriptif' => 'Actif de modèle ' . rand(1, 7),
                'id_modele' => rand(1, 7),
                'id_statut' => rand(1, 3),
                'id_emplacement' => 4,
                'id_proprietaire' => 1,
                'id_utilisation' => 1,
                'numero_commande' => "69123456789",
                'id_client' => $clients[3],
            ],
            [
                'numero_serie' => 'SER00000000040023',
                'nom' => '1-actifMultiple-02',
                'en_entrepot' => FALSE,
                'adresse_mac' => '00:1A:2B:3C:4D:5E',
                'date_retour' => NULL,
                'note' => 'Cet actif est en bon état.',
                'modele_descriptif' => 'Actif de modèle ' . rand(1, 7),
                'id_modele' => rand(1, 7),
                'id_statut' => rand(1, 3),
                'id_emplacement' => 4,
                'id_proprietaire' => 1,
                'id_utilisation' => 1,
                'numero_commande' => "69123456789",
                'id_client' => $userNoAlerte[0],

            ],
            [
                'numero_serie' => 'SER00000000000223',
                'nom' => '1-actifMultiple-03',
                'en_entrepot' => FALSE,
                'adresse_mac' => '00:1A:2B:3C:4D:5E',
                'date_retour' => NULL,
                'note' => 'Cet actif est en bon état.',
                'modele_descriptif' => 'Actif de modèle ' . rand(1, 7),
                'id_modele' => rand(1, 7),
                'id_statut' => rand(1, 3),
                'id_emplacement' => 4,
                'id_proprietaire' => 1,
                'id_utilisation' => 1,
                'numero_commande' => "69123456789",
                'id_client' => $userNoAlerte[0],

            ],
            [
                'numero_serie' => 'SER0000000000023',
                'nom' => '1-actifMultiple-04',
                'en_entrepot' => FALSE,
                'adresse_mac' => '00:1A:2B:3C:4D:5E',
                'date_retour' => NULL,
                'note' => 'Cet actif est en bon état.',
                'modele_descriptif' => 'Actif de modèle ' . rand(1, 7),
                'id_modele' => rand(1, 7),
                'id_statut' => rand(1, 3),
                'id_emplacement' => 4,
                'id_proprietaire' => 1,
                'id_utilisation' => 1,
                'numero_commande' => "69123456789",
                'id_client' => $userNoAlerte[0],

            ],
        ]);
            }

    }

