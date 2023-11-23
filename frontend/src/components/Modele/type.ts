export type Modele_Type = {
  id: number;
  nom: string;
  stockage: string;
  processeur: string;
  memoire_vive: string;
  taille: string;
  id_type_modele: number;
  favoris: number;
};

export type LightModele = {
  id: number;
  nom: string;
  id_type_modele: number;
};
