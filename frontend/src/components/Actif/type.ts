
export type Actif_Type = {
    id: number;
    numero_serie: string;
    nom: string;
    en_entrepot: number;
    adresse_mac: string | null;
    date_retour: string | null;
    note: string;
    id_modele_commande: number;
    id_statut: number;
    id_emplacement: number;
    id_proprietaire: number;
    id_utilisation: number;
}
