<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ModeleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('modele')->insert([
            [
                'nom' => 'Dell Latitude 3520',
                'stockage' => '256 Go',
                'processeur' => 'Intel Core i7',
                'memoire_vive' => '16 Go',
                'taille' => '15 pouces',
                'id_type_modele' => 1,
            ],
            [
                'nom' => 'Dell Latitude 5420',
                'stockage' => '512 Go',
                'processeur' => 'Intel Core i7',
                'memoire_vive' => '16 Go',
                'taille' => '14 pouces',
                'id_type_modele' => 1,
            ],
            [
                'nom' => 'Dell Latitude 7320',
                'stockage' => '1 To',
                'processeur' => 'Intel Core i7',
                'memoire_vive' => '16 Go',
                'taille' => '13 pouces',
                'id_type_modele' => 1,
            ],
            [
                'nom' => 'HP EliteBook 840 G8',
                'stockage' => '512 Go',
                'processeur' => 'Intel Core i7',
                'memoire_vive' => '16 Go',
                'taille' => '14 pouces',
                'id_type_modele' => 1,
            ],
            [
                'nom' => 'HP Pavilion 15',
                'stockage' => '1 To',
                'processeur' => 'AMD Ryzen 7',
                'memoire_vive' => '16 Go',
                'taille' => '15 pouces',
                'id_type_modele' => 1,
            ],
            [
                'nom' => 'HP Spectre x360',
                'stockage' => '512 Go',
                'processeur' => 'Intel Core i7',
                'memoire_vive' => '16 Go',
                'taille' => '13 pouces',
                'id_type_modele' => 1,
            ],
            [
                'nom' => 'Acer Chromebook Spin 713',
                'stockage' => '256 Go',
                'processeur' => 'Intel Core i5',
                'memoire_vive' => '8 Go',
                'taille' => '13,5 pouces',
                'id_type_modele' => 1,
            ],
        ]);

        DB::table('modele')->insert([
            'nom' => 'Lenovo Legion',
            'stockage' => '512 Go',
            'processeur' => 'AMD Ryzen 5',
            'memoire_vive' => '8 Go',
            'taille' => '13 pouces',
            'id_type_modele' => 1,
        ]);

        DB::table('modele')->insert([
            'nom' => 'Samsung Galaxy S8',
            'stockage' => '128 Go',
            'processeur' => 'Snapdragon 865',
            'memoire_vive' => '8 Go',
            'taille' => '6.5 pouces',
            'id_type_modele' => 2,
        ]);
    }
}
