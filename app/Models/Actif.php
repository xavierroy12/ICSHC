<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Actif extends Model
{
    public $timestamps = false; // Désactiver les timestamps

    protected $table = 'actif';
    protected $fillable = [
        'numero_serie',
        'nom',
        'en_entrepot',
        'adresse_mac',
        'date_retour',
        'note',
        'id_modele_commande',
        'id_statut',
        'id_emplacement',
        'id_proprietaire',
        'id_utilisation',
        // Autres colonnes autorisées pour l'attribution de masse
    ];


    use HasFactory;

    public function modeleCommande()
    {
        return $this->belongsTo(ModeleCommande::class, 'id_modele_commande');

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

}
