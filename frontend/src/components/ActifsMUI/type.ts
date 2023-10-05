export type Actif = {
  id: string;
  numero_serie: string;
  nom: string;
  modele: string;
  modele_id: number;
  categorie: string;
  categorie_id: number;
  statut: string;
  statut_id: number;
  proprietaire: string;
  proprietaire_id: number;
  emplacement: string;
  emplacement_id: number;
};

export type TableState = {
  filters?: Record<string, string>;
  showColumnFilters?: boolean;
  sortBy?: string;
  sortDirection?: 'asc' | 'desc';
  page?: number;
  pageSize?: number;
};
