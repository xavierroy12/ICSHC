<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class EmplacementSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('emplacement')->insert([
            'matricule' => '068',
            'nom' => '068 - École Du Parchemin',
            'numero_civique' => 162,
            'adresse' => 'Rue Saint-Jean Est',
        ]);

        DB::table('emplacement')->insert([
            'matricule' => '069',
            'nom' => '069 - École Ligugé',
            'numero_civique' => 194,
            'adresse' => 'Rue de l\'Église',
        ]);
        DB::table('emplacement')->insert([
            'matricule' => '099',
            'nom' => '099 - Centre de service de East Angus',
            'numero_civique' => 123,
            'adresse' => 'Rue des Entreprises',
        ]);

        DB::table('emplacement')->insert([
            'matricule' => '007',
            'nom' => '007 - Polyvalente Louis Saint-Laurent',
            'numero_civique' => 215,
            'adresse' => 'Rue de l\'Aréna',
        ]);

        DB::table('emplacement')->insert([
            'matricule' =>'021',
            'nom' => '021 - Centre de formation professionnelle du Haut-Saint-François',
            'numero_civique' => 188,
            'adresse' => '188, rue Kennedy',
        ]);

        DB::table('emplacement')->insert([
            'matricule' => '011',
            'nom' => '011 - Centre d’éducation des adultes de la CSHC',
            'numero_civique' => 188,
            'adresse' => '188, rue Kennedy',
        ]);

        DB::table('emplacement')->insert([
            'matricule' => '047',
            'nom' => '047 - École du Parchemin – Côté Couvent',
            'numero_civique' => 162,
            'adresse' => '162, rue Saint-Jean Est',
        ]);

        DB::table('emplacement')->insert([
            'matricule' => '048',
            'nom' => '048 - École du Parchemin – Côté Collège',
            'numero_civique' => 96,
            'adresse' => '96, rue Saint-Jacques',
        ]);

        DB::table('emplacement')->insert([
            'matricule' => '058',
            'nom' => '058 - École des Trois-Cantons',
            'numero_civique' => 25,
            'adresse' => '25, rue de l’Église',
        ]);

        DB::table('emplacement')->insert([
            'matricule' => '051',
            'nom' => '051 - École Saint-Camille',
            'numero_civique' => 150,
            'adresse' => '150, rue Bibeau',
        ]);

        DB::table('emplacement')->insert([
            'matricule' => '067',
            'nom' => '067 - École Notre-Dame-du-Paradis',
            'numero_civique' => 184,
            'adresse' => '184, rue Principale E',
        ]);

        DB::table('emplacement')->insert([
            'matricule' => '068',
            'nom' => '068 - École Notre-Dame-du-Sacré-Cœur',
            'numero_civique' => 211,
            'adresse' => '211, rue Saint-Janvier',
        ]);

        DB::table('emplacement')->insert([
            'matricule' => '063',
            'nom' => '063 - École Notre-Dame-de-Lorette',
            'numero_civique' => 44,
            'adresse' => '44, rue Notre-Dame Ouest',
        ]);

        DB::table('emplacement')->insert([
            'matricule' => '055',
            'nom' => '055 - École Saint-Paul',
            'numero_civique' => 100,
            'adresse' => '100, rue Saint-Jean-Baptiste',
        ]);

        DB::table('emplacement')->insert([
            'matricule' => '005',
            'nom' => '005 - École La Frontalière',
            'numero_civique' => 311,
            'adresse' => '311, rue Saint-Paul Est',
        ]);

        DB::table('emplacement')->insert([
            'matricule' => '006',
            'nom' => '006 - Polyvalente Montignac',
            'numero_civique' => 3409,
            'adresse' => '3409, rue Laval',
        ]);

        DB::table('emplacement')->insert([
            'matricule' => '450',
            'nom' => '099 - Entrepot East-Angus',
            'numero_civique' => 3409,
            'adresse' => '3409, rue Laval',
        ]);

        DB::table('emplacement')->insert([
            'matricule' => '451',
            'nom' => '099 - Entrepot Lac-Mégantic',
            'numero_civique' => 3409,
            'adresse' => '3409, rue Laval',
        ]);

        DB::table('emplacement')->insert([
            'matricule' => '452',
            'nom' => '099 - Entrepot Coaticook',
            'numero_civique' => 3409,
            'adresse' => '3409, rue Laval',
        ]);






    }
}
