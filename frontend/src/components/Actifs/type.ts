export type Actif = {
    numero_serie: string;
    nom: string;
    modele_commande: string;
    statut: string;
    emplacement: string;
    proprietaire: string;
}
export type FiltreGeneric = {
    id: number;
    nom: string;
}
export type FiltreProps = {
    values: FiltreGeneric[];
    value: string;
    setValue: (value: string) => void;
    placeHolder: string;
};