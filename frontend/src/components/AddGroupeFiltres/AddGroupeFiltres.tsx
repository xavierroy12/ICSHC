// AddGroupeFiltres component

import { Button, Input, Typography } from '@mui/material';
import { useState } from 'react';

type Props = {
    handleClose: () => void;
    saveFilters: (label: string) => void;
    selectedFilters: string[];
  };

  const AddGroupeFiltres = ({ handleClose, saveFilters, selectedFilters  }: Props) => {

    const [label, setLabel] = useState<string>('');

    const handleSubmit = () => {
      saveFilters(label);
      handleClose();
    };

  return (
    <div className="max-h-52 overflow-y-auto p-8">
      <div className="mb-4">
        <Typography variant="h4">Veuillez donner un nom au groupe de filtres:</Typography>
      </div>
      <div>
        <Input
          className="mr-8"
          id="label"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
        />

        <div className='float-right'>
        <h3>Selected Filters:</h3>
        <ul>
            {(selectedFilters as unknown as { displayData: string[][] }).displayData.map((filterGroup: any, index: number) => (
            <div key={index}>
                <ul>
                {filterGroup.map((filter: any, filterIndex: number) => (
                    <li className='red font-bold' key={filterIndex}>{filter}</li>
                ))}
                </ul>
            </div>
            ))}
        </ul>
        </div>

        <Button className="ml-4" variant="contained" onClick={handleSubmit}>
          Enregistrer
        </Button>
      </div>
    </div>
  );
};

export default AddGroupeFiltres;
