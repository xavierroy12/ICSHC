<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Concerns\HasTimestamps;
use Illuminate\Database\Eloquent\Model;

class Actif extends Model
{
    use HasFactory, HasTimestamps;

    protected $table = 'actif';
    protected $fillable = [
        'numero_serie',
        'nom',
        'en_entrepot',
        'adresse_mac',
        'date_retour',
        'note',
        'id_modele',
        'modele_descriptif',
        'id_client',
        'id_statut',
        'id_emplacement',
        'id_proprietaire',
        'id_utilisation',
        'numero_commande',
        // Autres colonnes autorisées pour l'attribution de masse
    ];

    public function modele()
    {
        return $this->belongsTo(Modele::class, 'id_modele');

    }
    public function statut()
    {
        return $this->belongsTo(Statut::class, 'id_statut');

    }
    public function proprietaire()
    {
        return $this->belongsTo(Proprietaire::class, 'id_proprietaire');

    }
    public function utilisation()
    {
        return $this->belongsTo(Utilisation::class, 'id_utilisation');

    }
    public function emplacement()
    {
        return $this->belongsTo(Emplacement::class, 'id_emplacement');
    }
    public function numero_commande()
    {
        return $this->belongsTo(Commande::class, 'numero_commande');
    }

    public function client()
    {
        return $this->belongsTo(Client::class, 'id_client');
    }


}
