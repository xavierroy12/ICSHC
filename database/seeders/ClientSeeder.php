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
        $id_actif = DB::table('actif')
            ->where('numero_serie', 'ABC123')
            ->where('nom', 'Ordinateur portable')
            ->value('id');

        $id_actif_2 = DB::table('actif')
            ->where('numero_serie', 'XYZ789')
            ->where('nom', 'Téléphone mobile')
            ->value('id');
        DB::table('client')->insert([
            'nom' => 'Julie Gagnon',
            'id_poste' => 1,
            'id_type_client' => 1,
            'id_actif' => $id_actif,
            'id_emplacement' => 1,
        ]);

        DB::table('client')->insert([
            'nom' => 'Kevin Tremblay',
            'id_poste' => 2,
            'id_type_client' => 2,
            'id_actif' => $id_actif_2,
            'id_emplacement' => 2,
        ]);
    }
}
