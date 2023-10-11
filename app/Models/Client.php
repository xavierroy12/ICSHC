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
        'nom',
        'id_poste',
        'id_type_client',
        'id_actif',
        'id_emplacement',
    ];
    public function actif()
    {
        return $this->belongsTo(Actif::class, 'id_actif');

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
