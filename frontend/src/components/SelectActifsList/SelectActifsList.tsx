import React, { useEffect, useState } from 'react';
import {
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

  const updateData = (actif: LightActif) => {
    const updatedActifs = selectedActifs.filter((data) => data.id !== actif.id);
    setSelectedActifs(updatedActifs);
    setSelectData((prevData) => [
      ...prevData,
      { value: actif.id.toString(), label: actif.numero_serie },
    ]);
  };

  return (
    <div className=" mt-20 w-1/3 mr-12">
      <h1 className="text-3xl mb-8">Actifs</h1>
      <div className="bg-gray-200 w-full h-full pt-10 px-4">
        <Select
          className="mb-8"
          displayEmpty
          value=""
          onChange={(e) => {
            const selectedValue = e.target.value;
            if (selectedValue) {
              const selectedActif = actifs.find(
                (actif) => actif.id.toString() === selectedValue
              );
              if (selectedActif) {
                setSelectedActifs([...selectedActifs, selectedActif]);
                setSelectData((prevData) =>
                  prevData.filter((item) => item.value !== selectedValue)
                );
              }
            }
          }}
        >
          <option value="" disabled>
            Ajouter un actif
          </option>
          {selectData.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
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
                          updateData(actif);
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
