<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Modele extends Model
{
    public function categorie()
    {
        return $this->belongsTo(TypeModele::class, 'id_type_modele');
    }

    protected $table = 'modele';

    use HasFactory;
}
