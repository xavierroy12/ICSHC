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
            'matricule' => '000',
            'nom' => 'Lieu à déterminer',
            'id_type_client' => 3,
        ]);

        DB::table('client')->insert([
            'matricule' => '069',
            'nom' => 'École Ligugé',
            'id_type_client' => 3,

        ]);

        DB::table('client')->insert([
            'matricule' => '099',
            'nom' => 'Centre de service de East Angus',
            'id_type_client' => 3,

        ]);

        DB::table('client')->insert([
            'matricule' => '097',
            'nom' => 'Centre de Service de Coaticook',
            'id_type_client' => 3,

        ]);

        DB::table('client')->insert([
            'matricule' => '098',
            'nom' => 'Centre de services Lac-Mégantic',
            'id_type_client' => 3,

        ]);

        

        DB::table('client')->insert([
            'matricule' => '007',
            'nom' => 'Polyvalente Louis Saint-Laurent',
            'id_type_client' => 3,

        ]);

        DB::table('client')->insert([
            'matricule' =>'021',
            'nom' => 'Centre de formation professionnelle du Haut-Saint-François',
            'id_type_client' => 3,

        ]);

        DB::table('client')->insert([
            'matricule' => '011',
            'nom' => 'Centre d\'éducation des adultes de la CSHC',
            'id_type_client' => 3,

        ]);

        DB::table('client')->insert([
            'matricule' => '047',
            'nom' => 'École du Parchemin - Côté Couvent',
            'id_type_client' => 3,

        ]);

        DB::table('client')->insert([
            'matricule' => '048',
            'nom' => 'École du Parchemin - Côté Collège',
            'id_type_client' => 3,

        ]);

        DB::table('client')->insert([
            'matricule' => '058',
            'nom' => 'École des Trois-Cantons',
            'id_type_client' => 3,

        ]);

        DB::table('client')->insert([
            'matricule' => '051',
            'nom' => 'École Saint-Camille',
            'id_type_client' => 3,

        ]);

        DB::table('client')->insert([
            'matricule' => '067',
            'nom' => 'École Notre-Dame-du-Paradis',
            'id_type_client' => 3,

        ]);

        DB::table('client')->insert([
            'matricule' => '068',
            'nom' => 'École Notre-Dame-du-Sacré-Cœur',
            'id_type_client' => 3,

        ]);

        DB::table('client')->insert([
            'matricule' => '063',
            'nom' => 'École Notre-Dame-de-Lorette',
            'id_type_client' => 3,

        ]);

        DB::table('client')->insert([
            'matricule' => '055',
            'nom' => 'École Saint-Paul',
            'id_type_client' => 3,

        ]);

        DB::table('client')->insert([
            'matricule' => '023',
            'nom' => 'Centre de formation professionnelle de Coaticook',
            'id_type_client' => 3,

        ]);

        DB::table('client')->insert([
            'matricule' => '013',
            'nom' => 'Centre d\'éducation des adultes de la CSHC',
            'id_type_client' => 3,

        ]);

        DB::table('client')->insert([
            'matricule' => '005',
            'nom' => 'École La Frontalière',
            'id_type_client' => 3,

        ]);

        DB::table('client')->insert([
            'matricule' => '024',
            'nom' => 'École Gendreau',
            'id_type_client' => 3,

        ]);

        DB::table('client')->insert([
            'matricule' => '039',
            'nom' => 'École Louis-Saint-Laurent',
            'id_type_client' => 3,

        ]);

        DB::table('client')->insert([
            'matricule' => '027',
            'nom' => 'École Sacré-Coeur',
            'id_type_client' => 3,

        ]);

        DB::table('client')->insert([
            'matricule' => '030',
            'nom' => 'École Saint-Luc',
            'id_type_client' => 3,

        ]);

        DB::table('client')->insert([
            'matricule' => '032',
            'nom' => 'École Sancta-Maria',
            'id_type_client' => 3,

        ]);

        DB::table('client')->insert([
            'matricule' => '037',
            'nom' => 'École de Sainte-Edwidge',
            'id_type_client' => 3,

        ]);

        DB::table('client')->insert([
            'matricule' => '185',
            'nom' => 'École de Ligugé',
            'id_type_client' => 3,

        ]);
        
        DB::table('client')->insert([
            'matricule' => '036',
            'nom' => 'École Notre-Dame-de-Toutes-Aides',
            'id_type_client' => 3,

        ]);

        DB::table('client')->insert([
            'matricule' => '034',
            'nom' => 'École Saint-Pie-X',
            'id_type_client' => 3,

        ]);

        DB::table('client')->insert([
            'matricule' => '022',
            'nom' => 'Centre de formation professionnelle Le Granit',
            'id_type_client' => 3,

        ]);

        DB::table('client')->insert([
            'matricule' => '012',
            'nom' => 'Centre d\'éducation des adultes de la CSHC',
            'id_type_client' => 3,

        ]);

        DB::table('client')->insert([
            'matricule' => '079',
            'nom' => 'École d\'Audet',
            'id_type_client' => 3,

        ]);

        DB::table('client')->insert([
            'matricule' => '080',
            'nom' => 'École des Monts-et-Lacs',
            'id_type_client' => 3,

        ]);

        DB::table('client')->insert([
            'matricule' => '086',
            'nom' => 'École de la Feuille d\'Or',
            'id_type_client' => 3,

        ]);

        DB::table('client')->insert([
            'matricule' => '089',
            'nom' => 'École de la Rose-des-Vents',
            'id_type_client' => 3,


        ]);

        DB::table('client')->insert([
            'matricule' => '091',
            'nom' => 'École de la Source',
            'id_type_client' => 3,

        ]);

        DB::table('client')->insert([
            'matricule' => '095',
            'nom' => 'École de la Voie-Lactée',
            'id_type_client' => 3,

        ]);


        DB::table('client')->insert([
            'matricule' => '082',
            'nom' => 'École de Sainte-Cécile',
            'id_type_client' => 3,

        ]);

        DB::table('client')->insert([
            'matricule' => '088',
            'nom' => 'École de Saint-Romain',
            'id_type_client' => 3,

        ]);

        DB::table('client')->insert([
            'matricule' => '094',
            'nom' => 'École des Monts-Blancs',
            'id_type_client' => 3,

        ]);

        DB::table('client')->insert([
            'matricule' => '084',
            'nom' => 'École des Sommets',
            'id_type_client' => 3,

        ]);

        DB::table('client')->insert([
            'matricule' => '074',
            'nom' => 'École Notre-Dame-de-Fatima',
            'id_type_client' => 3,

        ]);

        DB::table('client')->insert([
            'matricule' => '071',
            'nom' => 'École Sacré-coeur',
            'id_type_client' => 3,

        ]);

        DB::table('client')->insert([
            'matricule' => '016',
            'nom' => 'Maison familiale rurale du Granit',
            'id_type_client' => 3,

        ]);

        DB::table('client')->insert([
            'matricule' => '006',
            'nom' => 'Polyvalente Montignac',
            'id_type_client' => 3,

        ]);

        DB::table('client')->insert([
            'matricule' => '000',
            'nom' => 'Lieu à déterminer',
            'id_type_client' => 3,

        ]);

        DB::table('client')->insert([
            'matricule' => '450',
            'nom' => 'Entrepôt East-Angus',
            'id_type_client' => 3,

        ]);

        DB::table('client')->insert([
            'matricule' => '451',
            'nom' => 'Entrepôt Lac-Mégantic',
            'id_type_client' => 3,

        ]);

        DB::table('client')->insert([
            'matricule' => '452',
            'nom' => 'Entrepôt Coaticook',
            'id_type_client' => 3,

        ]);

        DB::table('client')->insert([
            'matricule' => '999',
            'nom' => 'Service informatique',
            'id_type_client' => 3,

        ]);

        DB::table('client')->insert([
            'matricule' => '998',
            'nom' => 'Utilisateurs Inactifs',
            'id_type_client' => 3,

        ]);

        DB::table('client')->insert([
            'matricule' => '997',
            'nom' => 'Service Éducatif',
            'id_type_client' => 3,

        ]);

        DB::table('client')->insert([
            'matricule' => '996',
            'nom' => 'Projet EER',
            'id_type_client' => 3,

        ]);

        DB::table('client')->insert([
            'matricule' => '995',
            'nom' => 'Équipe volante',
            'id_type_client' => 3,

        ]);
    }
}
