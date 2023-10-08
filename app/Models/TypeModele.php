<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Concerns\HasTimestamps;
use Illuminate\Database\Eloquent\Model;

class TypeModele extends Model
{
    use HasFactory, HasTimestamps;

    protected $table = 'type_modele';

    protected $fillable = [
        'nom',
    ];

    public function modeles()
    {
        return $this->hasMany(Modele::class, 'id_type_modele');
    }

    public function categorie()
    {
        return $this->belongsTo(TypeModele::class, 'id_type_modele');
    }

}
