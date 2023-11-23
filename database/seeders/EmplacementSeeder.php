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
            'matricule' => '000',
            'nom' => 'Lieu à déterminer',
            'numero_civique' => '000',
            'adresse' => 'Non-applicable',
        ]);

        DB::table('emplacement')->insert([
            'matricule' => '068',
            'nom' => 'École Du Parchemin',
            'numero_civique' => '162',
            'adresse' => 'rue Saint-Jean Est',
            "est_proprietaire" => true,
        ]);

        DB::table('emplacement')->insert([
            'matricule' => '069',
            'nom' => 'École Ligugé',
            'numero_civique' => '194',
            'adresse' => 'rue de l\'Église',
        ]);
        DB::table('emplacement')->insert([
            'matricule' => '099',
            'nom' => 'Centre de service de East Angus',
            'numero_civique' => '123',
            'adresse' => 'rue des Entreprises',
            "est_proprietaire" => true,
        ]);

        DB::table('emplacement')->insert([
            'matricule' => '007',
            'nom' => 'Polyvalente Louis Saint-Laurent',
            'numero_civique' => '215',
            'adresse' => 'rue de l\'Aréna',
        ]);

        DB::table('emplacement')->insert([
            'matricule' =>'021',
            'nom' => 'Centre de formation professionnelle du Haut-Saint-François',
            'numero_civique' => '188',
            'adresse' => 'rue Kennedy',
            "est_proprietaire" => true,
        ]);

        DB::table('emplacement')->insert([
            'matricule' => '011',
            'nom' => 'Centre d\'éducation des adultes de la CSHC',
            'numero_civique' => '188',
            'adresse' => 'rue Kennedy',
        ]);

        DB::table('emplacement')->insert([
            'matricule' => '047',
            'nom' => 'École du Parchemin - Côté Couvent',
            'numero_civique' => '162',
            'adresse' => 'rue Saint-Jean Est',
        ]);

        DB::table('emplacement')->insert([
            'matricule' => '048',
            'nom' => 'École du Parchemin - Côté Collège',
            'numero_civique' => '96',
            'adresse' => 'rue Saint-Jacques',
        ]);

        DB::table('emplacement')->insert([
            'matricule' => '058',
            'nom' => 'École des Trois-Cantons',
            'numero_civique' => '25',
            'adresse' => 'rue de l\'Église',
        ]);

        DB::table('emplacement')->insert([
            'matricule' => '051',
            'nom' => 'École Saint-Camille',
            'numero_civique' => '150',
            'adresse' => 'rue Bibeau',
        ]);

        DB::table('emplacement')->insert([
            'matricule' => '067',
            'nom' => 'École Notre-Dame-du-Paradis',
            'numero_civique' => '184',
            'adresse' => 'rue Principale E',
        ]);

        DB::table('emplacement')->insert([
            'matricule' => '068',
            'nom' => 'École Notre-Dame-du-Sacré-Cœur',
            'numero_civique' => '211',
            'adresse' => 'rue Saint-Janvier',
        ]);

        DB::table('emplacement')->insert([
            'matricule' => '063',
            'nom' => 'École Notre-Dame-de-Lorette',
            'numero_civique' => '44',
            'adresse' => 'rue Notre-Dame Ouest',
        ]);

        DB::table('emplacement')->insert([
            'matricule' => '055',
            'nom' => 'École Saint-Paul',
            'numero_civique' => '100',
            'adresse' => 'rue Saint-Jean-Baptiste',
        ]);

        DB::table('emplacement')->insert([
            'matricule' => '005',
            'nom' => 'École La Frontalière',
            'numero_civique' => '311',
            'adresse' => 'rue Saint-Paul Est',
        ]);

        DB::table('emplacement')->insert([
            'matricule' => '006',
            'nom' => 'Polyvalente Montignac',
            'numero_civique' => '3409',
            'adresse' => 'rue Laval',
        ]);

        DB::table('emplacement')->insert([
            'matricule' => '450',
            'nom' => 'Entrepôt East-Angus',
            'numero_civique' => '3409',
            'adresse' => 'rue Laval',
        ]);

        DB::table('emplacement')->insert([
            'matricule' => '451',
            'nom' => 'Entrepôt Lac-Mégantic',
            'numero_civique' => '3409',
            'adresse' => 'rue Laval',
        ]);

        DB::table('emplacement')->insert([
            'matricule' => '452',
            'nom' => 'Entrepôt Coaticook',
            'numero_civique' => '3409',
            'adresse' => 'rue Laval',
        ]);
    }
}
