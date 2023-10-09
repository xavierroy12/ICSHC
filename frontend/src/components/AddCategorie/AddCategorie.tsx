import { Button, Input, Typography } from '@mui/material';
import { useState } from 'react';

type Props = {
    handleClose: () => void;
    reloadData: () => void;
};

const AddCategorie = ({ handleClose,reloadData }: Props) => {
  const [categorie, setCategorie] = useState<string>('');
  const handleSubmit = () => {
    try {
      const value = {
        nom: categorie,
      };
      fetch(window.name + `api/categorie`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(value),
      });
        reloadData();
    } catch (err) {
      console.log(err);
    }
    handleClose();
  };
  return (
    <div className="p-8">
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
