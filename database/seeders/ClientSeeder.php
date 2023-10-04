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
            'nom' => 'Julie Gagnon',
            'id_poste' => 1,
            'id_type_client' => 1,
            'id_actif' => 1,
            'id_emplacement' => 1,
        ]);

        DB::table('client')->insert([
            'nom' => 'Kevin Tremblay',
            'id_poste' => 2,
            'id_type_client' => 2,
            'id_actif' => 2,
            'id_emplacement' => 2,
        ]);

        DB::table('client')->insert([
            'nom' => 'Clien NoActif',
            'id_poste' => 2,
            'id_type_client' => 2,
            'id_actif' => NULL,
            'id_emplacement' => 2,
        ]);
    }
}
