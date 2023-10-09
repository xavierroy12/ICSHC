<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Concerns\HasTimestamps;
use Illuminate\Database\Eloquent\Model;


class Modele extends Model
{
    use HasFactory, HasTimestamps;

    protected $table = 'modele';

        protected $fillable = [
        'nom',
        'stockage',
        'processeur',
        'memoire_vive',
        'taille',
        'id_type_modele',
        'favoris',
    ];


    public function categorie()
    {
        return $this->belongsTo(TypeModele::class, 'id_type_modele');
    }




}
