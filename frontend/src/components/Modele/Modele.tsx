import ModeleForm from './ModeleForm';
import { useEffect, useState } from 'react';
import { LightType, SelectItem } from '../Actif/type';
import { CircularProgress } from '@mui/material';
import { Modele_Type } from './type';
import { useParams } from 'react-router-dom';

const Modele = () => {
  const [categories, setCategories] = useState<SelectItem[]>([]);
  const [modele, setModele] = useState<Modele_Type>();

  const id = useParams<{ id: string }>().id;
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
        console.log(fetchedModele);
        setModele(fetchedModele);
      });
  }, [id]);

  return (
    <div>
      {!modele ? (
        <div className="fixed inset-0 flex items-center justify-center">
          <CircularProgress />
        </div>
      ) : (
        <div>
          <ModeleForm modele={modele} categories={categories} />
        </div>
      )}
    </div>
  );
};
export default Modele;
