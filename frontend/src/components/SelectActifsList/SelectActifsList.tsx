import React, { useEffect, useState } from 'react';
import {
  Autocomplete,
  Button,
  CircularProgress,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CustomSelect from '../CustomSelect';
import { Typography } from '@mui/material';

type LightActif = {
  id: number;
  nom: string;
  numero_serie: string;
};

type Props = {
  selectedActifs: LightActif[];
  actifs: LightActif[];
  setSelectedActifs: (actifs: LightActif[]) => void;
};

const SelectActifsList: React.FC<Props> = ({
  selectedActifs,
  actifs,
  setSelectedActifs,
}) => {
  const [selectData, setSelectData] = useState<
    { value: string; label: string }[]
  >([]);

  useEffect(() => {
    const tempActif = actifs.slice();
    selectedActifs.forEach((selected) => {
      const index = tempActif.findIndex((data) => data.id === selected.id);
      if (index !== -1) {
        tempActif.splice(index, 1);
      }
    });

    setSelectData(
      tempActif.map((actif: LightActif) => ({
        value: actif.id.toString(),
        label: actif.numero_serie,
      }))
    );
  }, [selectedActifs, actifs]);

  const updateData = (actif: string) => {
    const selectedActif = actifs.find(
      (actifData) => actifData.numero_serie === actif
    );
    if (!selectedActif) return;
    const updatedActifs = selectedActifs.filter(
      (data) => data.numero_serie !== selectedActif.numero_serie
    );
    setSelectedActifs(updatedActifs);

    setSelectData((prevData) =>
      prevData.filter((data) => data.value !== selectedActif.id.toString())
    );
  };
  const onDeleteData = (actif: LightActif) => {
    const updatedActifs = selectedActifs.filter((data) => data.id !== actif.id);
    setSelectedActifs(updatedActifs);
    setSelectData((prevData) => [
      ...prevData,
      { value: actif.id.toString(), label: actif.numero_serie },
    ]);
  };
  console.log(selectedActifs);
  return (
    <div className=" mt-20 w-1/3 mr-12">
      <Typography variant="h4">Actifs sélectionnés</Typography>
      <div className="bg-slate-100 w-full h-full pt-10 px-4">
        <Autocomplete
          placeholder={'Actifs'}
          options={selectData}
          sx={{ width: 300 }}
          getOptionLabel={(option) => option.label}
          onChange={(_, newValue) => {
            updateData(newValue?.label as string);
          }}
          onInputChange={(_, newInputValue) => {
            updateData(newInputValue);
          }}
          renderInput={(params) => (
            <TextField {...params} label={'Actifs'} variant="outlined" />
          )}
        />
        {selectedActifs.length > 0 ? (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Nom</TableCell>
                  <TableCell>Numéro de série</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {selectedActifs.map((actif) => (
                  <TableRow key={actif.id}>
                    <TableCell>{actif.nom}</TableCell>
                    <TableCell>{actif.numero_serie}</TableCell>
                    <TableCell>
                      <Button
                        color="error"
                        variant="outlined"
                        size="small"
                        onClick={() => {
                          onDeleteData(actif);
                        }}
                      >
                        <DeleteIcon />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <CircularProgress className="m-auto" />
        )}
      </div>
    </div>
  );
};

export default SelectActifsList;
