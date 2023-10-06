import ModeleForm from './ModeleForm';
import { useEffect, useState } from 'react';
import { LightType, SelectItem } from '../Actif/type';
import { Modal } from '@mui/material';

export type Modele_Type = {
  id: number;
  nom: string;
  categorie: string;
  stockage: string;
  processeur: string;
  carte_graphique: string;
  memoire: string;
  taille_ecran: string;
  tactile: string;
  clavier: string;
  clavier_numerique: string;
};

type Props = {
  id: string;
};

const Modele = ({ id }: Props) => {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<SelectItem[]>([]);
  const [modele, setModele] = useState<Modele_Type>();

  useEffect(() => {
    Promise.all([
      fetch('http://localhost:8000/api/categories/light'),
      fetch(`http://localhost:8000/api/modele/${id}`),
    ])
      .then((responses) =>
        Promise.all(responses.map((response) => response.json()))
      )
      .then(([fetchedCategories, fetchedModele]) => {
        setCategories(
          fetchedCategories.map((statut: LightType) => ({
            id: statut.id,
            label: statut.nom,
          }))
        );
        setModele(fetchedModele);

        setLoading(false);
      });
  }, [id]);

  return (
    <Modal open>
      <div>
        {modele ? (
          <ModeleForm modele={modele} categories={categories} />
        ) : (
          <div>loading...</div>
        )}
      </div>
    </Modal>
  );
};
export default Modele;
