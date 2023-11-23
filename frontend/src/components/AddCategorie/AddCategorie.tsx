import { Button, Input, Typography } from '@mui/material';
import { useState } from 'react';
import { toast } from 'react-toastify';

type Props = {
  handleClose: () => void;
  reloadData: () => void;
};

const AddCategorie = ({ handleClose, reloadData }: Props) => {
  const [categorie, setCategorie] = useState<string>('');
  const handleSubmit = () => {
    const id_user = localStorage.getItem('id_user') || 'unknown'; // retrieve id_user from local storage, default to 'unknown';

    try {
      const value = {
        nom: categorie,
      };
      fetch(window.name + `api/categorie`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-User-Action-Id': id_user, // send the user id in a custom header
        },
        body: JSON.stringify(value),
      }).then((response) => {
        if (response.ok) {
          toast.success('Données sauvegardées avec succès');
        } else {
          toast.error('Une erreur est survenue');
        }
      });
    } catch (error) {
      toast.error('Une erreur est survenue');
    }
    reloadData();

    handleClose();
  };
  return (
    <div className="p-8 bg-slate-400">
      <div className="mb-4">
        <Typography variant="h4">Ajouter une catégorie</Typography>
      </div>
      <div>
        <Input
          className="mr-8"
          id="categorie"
          value={categorie}
          onChange={(e) => setCategorie(e.target.value)}
        />
        <Button className="ml-4" variant="contained" onClick={handleSubmit}>
          Ajouter
        </Button>
      </div>
    </div>
  );
};
export default AddCategorie;
