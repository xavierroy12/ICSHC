<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Concerns\HasTimestamps;
use Illuminate\Database\Eloquent\Model;

class Modele extends Model
{
    use HasFactory, HasTimestamps;

    protected $table = 'modele';

    public function categorie()
    {
        return $this->belongsTo(TypeModele::class, 'id_type_modele');
    }




}
