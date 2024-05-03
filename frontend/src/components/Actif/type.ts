export type Actif_Type = {
  id: number;
  numero_serie: string;
  numero_commande: string;
  nom: string;
  adresse_mac: string;
  date_retour: string;
  note: string;
  id_client: number;
  id_modele_commande: number;
  id_statut: number;
  id_emplacement: number;
  id_proprietaire: number;
  id_source_financiere: number;
  id_utilisation: number;
  id_categorie: number;
  id_modele: number;
  en_entrepot: boolean;
  assigne_a: string; // Type approprié pour les utilisateurs ou null si non assigné
  categorie: string; // Type approprié pour les catégories ou null si non spécifié
  modele: string; // Type approprié pour les modèles ou null si non spécifié
  emplacement: string; // Type approprié pour les emplacements ou null si non spécifié
  entrepot: string; // Type approprié pour les entrepôts ou null si non spécifié
  statut: string; // Type approprié pour les statuts ou null si non spécifié
  utilisation: string; // Type approprié pour les utilisations ou null si non spécifié
  proprietaire: string; // Type approprié pour les propriétés ou null si non spécifié
  propriete: string; // Type approprié pour les propriétés ou null si non spécifié
  date_creation: string; // Type approprié pour les dates de création ou null si non spécifié
};

export type LightType = {
  id: number;
  nom: string;
};

export type ActifFormValues = {
  id: number;
  numero_serie: string;
  numero_commande: string;
  nom: string;
  adresse_mac: string;
  id_statut: string;
  id_emplacement: string;
  id_proprietaire: string;
  id_utilisation: string;
  id_categorie: string;
  id_modele: string;
  id_assigne_a: string;
  en_entrepot?: boolean;
  date_creation?: string;
  date_retour?: string;
  note?: string;
};

export type SelectItem = {
  label: string;
  id: number;
};
