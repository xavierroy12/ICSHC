export type Actif_Commande_Type = {
  id: string;
  modele: string;
  description_modele: string;
  adresse_mac: string;
  numero_serie: string;
};

export type Model_Type = {
  nombre: number;
  modele: string;
  description_modele: string;
};

export type Commande_Type = {
  numero_commande: string;
  etat: string;
  nb_actif: number;
  emplacement: string;
  date_commande: string;
  actifs: Actif_Commande_Type[];
};
export type LightType = {
  id: number;
  nom: string;
};

export type SelectItem = {
  label: string;
  id: number;
};
