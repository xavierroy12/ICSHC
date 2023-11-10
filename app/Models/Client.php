<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Concerns\HasTimestamps;
use Illuminate\Database\Eloquent\Model;

class Client extends Model
{
    use HasFactory, HasTimestamps;

    protected $table = 'client';

    protected $fillable = [
        'matricule',
        'nom',
        'prenom',
        'courriel',
        'emplacement_manuel',
        'id_poste',
        'actifs',
        'id_type_client',
        'id_emplacement',
    ];
    public function actifs()
    {
        return $this->hasMany(Actif::class, 'id_client');

    }
    public function emplacement()
    {
        return $this->belongsTo(Emplacement::class, 'id_emplacement');
    }
    public function poste()
    {
        return $this->belongsTo(Poste::class, 'id_poste');
    }
    public function type_client()
    {
        return $this->belongsTo(TypeClient::class, 'id_type_client');
    }

}
