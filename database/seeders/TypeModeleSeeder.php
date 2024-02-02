<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TypeModeleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('type_modele')->insert([
            'nom' => 'Bureau',
        ]);
        DB::table('type_modele')->insert([
            'nom' => 'Portable',
        ]);

        DB::table('type_modele')->insert([
            'nom' => 'Tablette',
        ]);
        DB::table('type_modele')->insert([
            'nom' => 'Chromebook',
        ]);
        DB::table('type_modele')->insert([
            'nom' => 'iPAD',
        ]);
        DB::table('type_modele')->insert([
            'nom' => 'Tableau intéractif',
        ]);
        DB::table('type_modele')->insert([
            'nom' => 'Cellulaire',
        ]);
        DB::table('type_modele')->insert([
            'nom' => 'Modem LTE',
        ]);
        DB::table('type_modele')->insert([
            'nom' => 'Commutateur réseau',
        ]);
        DB::table('type_modele')->insert([
            'nom' => 'Caméra Web',
        ]);
        DB::table('type_modele')->insert([
            'nom' => 'Carte Sim',
        ]);
        DB::table('type_modele')->insert([
            'nom' => 'Serveur',
        ]);
        DB::table('type_modele')->insert([
            'nom' => 'Tablette Android',
        ]);
        DB::table('type_modele')->insert([
            'nom' => 'Mini Ordinateur',
        ]);
        DB::table('type_modele')->insert([
            'nom' => 'Aucune catégorie',
        ]);

    }
}
