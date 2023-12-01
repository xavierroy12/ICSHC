import { useEffect, useState } from 'react';
import {
  Autocomplete,
  FormControlLabel,
  Grid,
  IconButton,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { LightActif } from './type';

type Props = {
  selectedActifs: LightActif[];
  actifs: LightActif[];
  setSelectedActifs: (actifs: LightActif[]) => void;
};

const ActifsListSelect = ({
  selectedActifs,
  actifs,
  setSelectedActifs,
}: Props) => {
  const [selectData, setSelectData] = useState<LightActif[]>([]);
  const [currentValue, setCurrentValue] = useState<LightActif>();
  const [isName, setIsName] = useState(true);
  useEffect(() => {
    const tempActif = actifs.slice();
    selectedActifs.forEach((selected) => {
      const index = tempActif.findIndex((data) => data.id === selected.id);
      if (index !== -1) {
        tempActif.splice(index, 1);
      }
    });

    setSelectData(tempActif);
  }, [selectedActifs, actifs]);

  const updateData = () => {
    if (!currentValue) return;
    setSelectedActifs([...selectedActifs, currentValue]);
    setSelectData(selectData.filter((data) => data.id !== currentValue.id));
    setCurrentValue(undefined);
  };

  const onDeleteData = (actif: LightActif) => {
    const updatedActifs = selectedActifs.filter((data) => data.id !== actif.id);
    setSelectedActifs(updatedActifs);
    setSelectData([...selectData, actif]);
  };
  return (
    <div className="p-4">
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Autocomplete
            placeholder={'Actifs'}
            options={selectData}
            value={currentValue || null}
            sx={{ width: '100%' }}
            onChange={(_, newValue) => {
              setCurrentValue(newValue as LightActif);
            }}
            onInputChange={(_, newInputValue) => {
              setCurrentValue(
                selectData.find((actif) =>
                  isName
                    ? actif.nom === newInputValue
                    : actif.numero_serie === newInputValue
                )
              );
            }}
            getOptionLabel={(option) =>
              isName ? option.nom : option.numero_serie
            }
            renderInput={(params) => (
              <TextField
                {...params}
                label={'Actifs'}
                variant="outlined"
                onKeyDown={(e) => {
                  const inputElement = e.target as HTMLInputElement;
                  if (e.code === 'Enter' && inputElement.value) {
                    updateData();
                  }
                }}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <div className="flex flex-row w-full justify-between mt-2 ml-2">
            <div>
              <IconButton
                color="primary"
                onClick={() => {
                  updateData();
                }}
              >
                <AddIcon />
              </IconButton>
            </div>
            <div>
              <FormControlLabel
                label={isName ? 'Nom' : 'No'}
                control={
                  <Switch
                    checked={isName}
                    onChange={() => {
                      setIsName(!isName);
                    }}
                    name="info"
                  />
                }
              />
            </div>
          </div>
        </Grid>
        <Grid item xs={12}>
          <TableContainer className=" max-h-[900px] overflow-scroll">
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
                      <IconButton
                        color="error"
                        size="small"
                        onClick={() => {
                          onDeleteData(actif);
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </div>
  );
};

export default ActifsListSelect;
