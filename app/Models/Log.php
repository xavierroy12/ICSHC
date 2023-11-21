<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Log extends Model
{
    use HasFactory;

    protected $table = 'log';

    protected $fillable = [
        'url',
        'method',
        'action',
        'field',
        'old_value',
        'new_value',
        'id_user',
        'id_client',
        'id_actif',
        'id_modele',
        'id_emplacement',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'id_user');
    }

    public function client()
    {
        return $this->belongsTo(Client::class, 'id_client');
    }

    public function actif()
    {
        return $this->belongsTo(Actif::class, 'id_actif');
    }

    public function modele()
    {
        return $this->belongsTo(Modele::class, 'id_modele');
    }
}