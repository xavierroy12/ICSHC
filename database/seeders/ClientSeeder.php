<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ClientSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        DB::table('client')->insert([
            'matricule' => '10015517',
            'nom' => 'Gagnon',
            'prenom' => 'Julie',
            'id_poste' => 1,
            'id_type_client' => 1,
            'id_actif' => 1,
            'id_emplacement' => 3,
        ]);

        DB::table('client')->insert([
            'matricule' => '10015519',
            'nom' => 'Tremblay',
            'prenom' => 'Kevin',
            'courriel' => 'ktremblay@cshc.qc.ca',
            'id_poste' => 2,
            'id_type_client' => 2,
            'id_actif' => 2,
            'id_emplacement' => 1,
        ]);

        DB::table('client')->insert([
            'matricule' => '10015526',
            'nom' => 'NoActif',
            'prenom' => 'Client',
            'id_poste' => 2,
            'id_type_client' => 2,
            'id_actif' => NULL,
            'id_emplacement' => NULL,
        ]);

        DB::table('client')->insert([
            [
                'matricule' => '10015516',
                'nom' => 'Doe',
                'prenom' => 'John',
                'id_poste' => rand(1, 2),
                'id_type_client' => 1,
                'id_actif' => 3,
                'id_emplacement' => 4,
            ],
            [
                'matricule' => '10012222',
                'nom' => 'Smith',
                'prenom' => 'Jane',
                'id_poste' => rand(1, 2),
                'id_type_client' => 2,
                'id_actif' => 4,
                'id_emplacement' => 4,
            ],
            [
                'matricule' => '10015511',
                'nom' => 'Johnson',
                'prenom' => 'Bob',
                'id_poste' => rand(1, 2),
                'id_type_client' => 1,
                'id_actif' => 5,
                'id_emplacement' => 4,
            ],
            [
                'matricule' => '10015512',
                'nom' => 'Brown',
                'prenom' => 'Mary',
                'id_poste' => rand(1, 2),
                'id_type_client' => 2,
                'id_emplacement' => 4,
            ],
            [
                'matricule' => '10015513',
                'nom' => 'Davis',
                'prenom' => 'James',
                'id_poste' => rand(1, 2),
                'id_type_client' => 1,
                'id_actif' => 7,
                'id_emplacement' => 4,
            ],
            [
                'matricule' => '10015514',
                'nom' => 'Wilson',
                'prenom' => 'Patricia',
                'id_poste' => rand(1, 2),
                'id_type_client' => 2,
                'id_actif' => 8,
                'id_emplacement' => 4,
            ],
            [
                'matricule' => '10015515',
                'nom' => 'Lee',
                'prenom' => 'Robert',
                'id_poste' => rand(1, 2),
                'id_type_client' => 1,
                'id_emplacement' => 4,
            ],
            [
                'matricule' => '10015518',
                'nom' => 'Kim',
                'prenom' => 'Jennifer',
                'id_poste' => rand(1, 2),
                'id_type_client' => 2,
                'id_actif' => 10,
                'id_emplacement' => 3,
            ],
            [
                'matricule' => '10015520',
                'nom' => 'Wilson',
                'prenom' => 'Michael',
                'id_poste' => rand(1, 2),
                'id_type_client' => 1,
                'id_actif' => 11,
                'id_emplacement' => 3,
            ],
            [
                'matricule' => '10015521',
                'nom' => 'Davis',
                'prenom' => 'Elizabeth',
                'id_poste' => rand(1, 2),
                'id_type_client' => 2,
                'id_emplacement' => 3,
            ],
            [
                'matricule' => '10015522',
                'nom' => 'Brown',
                'prenom' => 'David',
                'id_poste' => rand(1, 2),
                'id_type_client' => 1,
                'id_actif' => 13,
                'id_emplacement' => 3,
            ],
            [
                'matricule' => '10015523',
                'nom' => 'Johnson',
                'prenom' => 'Susan',
                'id_poste' => rand(1, 2),
                'id_type_client' => 2,
                'id_actif' => 14,
                'id_emplacement' => 3,
            ],
            [
                'matricule' => '10015524',
                'nom' => 'Wilson',
                'prenom' => 'Charles',
                'id_poste' => rand(1, 2),
                'id_type_client' => 1,
                'id_actif' => 15,
                'id_emplacement' => 3,
            ],
            [
                'matricule' => '10015525',
                'nom' => 'Lee',
                'prenom' => 'Karen',
                'id_poste' => rand(1, 2),
                'id_type_client' => 2,
                'id_emplacement' => 3,
            ],
            [
                'matricule' => '10015527',
                
                'nom' => 'Kim',
                'prenom' => 'Mark',
                'id_poste' => rand(1, 2),
                'id_type_client' => 1,
                'id_actif' => 17,
                'id_emplacement' => 2,
            ],
            [
                'matricule' => '1005528',
                'nom' => 'Davis',
                'prenom' => 'Karen',
                'id_poste' => rand(1, 2),
                'id_type_client' => 2,
                'id_actif' => 18,
                'id_emplacement' => 2,
            ],
            [
                'matricule' => '10015529',
                'nom' => 'Brown',
                'prenom' => 'Thomas',
                'id_poste' => rand(1, 2),
                'id_type_client' => 1,
                'id_emplacement' => 2,
            ],
            [
                'matricule' => '10015530',
                'nom' => 'Johnson',
                'prenom' => 'Donna',
                'id_poste' => rand(1, 2),
                'id_type_client' => 2,
                'id_actif' => 20,
                'id_emplacement' => 2,
            ],
            [
                'matricule' => '10015531',
                'nom' => 'Wilson',
                'prenom' => 'Kenneth',
                'id_poste' => rand(1, 2),
                'id_type_client' => 1,
                'id_actif' => 21,
                'id_emplacement' => 2,
            ],
            [
                'matricule' => '10015532',
                'nom' => 'Lee',
                'prenom' => 'Sarah',
                'id_poste' => rand(1, 2),
                'id_type_client' => 2,
                'id_actif' => 22,
                'id_emplacement' => 2,
            ],
        ]);
    }
}
