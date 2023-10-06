import ModeleForm from './ModeleForm';
import { useEffect, useState } from 'react';
import { LightType, SelectItem } from '../Actif/type';
import { Modal } from '@mui/material';
import { Modele_Type } from './type';

type Props = {
  id: number;
  setOpen: (isOpen: boolean) => void;
  open: boolean;
};

const Modele = ({ id, setOpen, open }: Props) => {
  const [categories, setCategories] = useState<SelectItem[]>([]);
  const [modele, setModele] = useState<Modele_Type>();

  const handleClose = () => {
    setOpen(false);
  };
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
      });
  }, [id]);

  return (
    <div>
      <Modal open={open} onClose={handleClose}>
        <div>
          {modele ? (
            <ModeleForm
              modele={modele}
              categories={categories}
              handleClose={handleClose}
            />
          ) : (
            <div>loading...</div>
          )}
        </div>
      </Modal>
    </div>
  );
};
export default Modele;
