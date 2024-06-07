import { SelectItem } from '../Actif/type';
import { SelectEmplacement } from '../Emplacement/type'; // Add this line
import { Fragment, useState } from 'react';
import {
  Autocomplete,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import { Form } from 'formik';

type Props = {
  modeles: SelectItem[];
  actifs: light_Actif[];
  setActifs: React.Dispatch<React.SetStateAction<light_Actif[]>>;
  emplacements: SelectEmplacement[]; // Add this line
  sourceFinancieres: SelectItem[];

};
export type light_Actif = {
  modele?: string;
  numero_serie?: string;
  adresse_mac?: string;
  nom?: string; // Add this line
  emplacement?: string; // Add this line
  source_financiere?: string; // Add this line
};

const ActifAddForm = ({ modeles, actifs, setActifs, emplacements, sourceFinancieres }: Props) => {
  const [currentSourceFinanciere, setCurrentSourceFinanciere] = useState<SelectItem | null>(
    sourceFinancieres[0] || null
  );
  const [currentModele, setCurrentLabel] = useState<SelectItem | null>(
    modeles[0] || null
  );
  const [currentEmplacement, setCurrentEmplacement] = useState<SelectEmplacement | null>(
    emplacements[0] || null // Set initial state using the first emplacement
  );
  const [amount, setAmount] = useState<number>(0);
  const [displayTable, setDisplayTable] = useState<boolean>(false);

  const generateTable = () => {
    if (!currentModele || !currentEmplacement || !currentSourceFinanciere) return;
    if (amount < 0) return;
    const currentAmount = actifs.length;
    if (amount < currentAmount) {
      setActifs(actifs.slice(0, amount));
    } else {
      for (let i = currentAmount; i < amount; i++) {
        setActifs((actifs) => [
          ...actifs,
          {
            modele: currentModele?.label || '',
            numero_serie: '',
            adresse_mac: '',
            emplacement: currentEmplacement?.label || '', // Add this line
            source_financiere: currentSourceFinanciere?.label || '', // Add this line
          },
        ]);
      }
    }
    setDisplayTable(true);
  };

  return (
    <Form>
      <Fragment>
        <div className="w-[1000px] p-6 bg-slate-100 dark:bg-slate-800">
          <Typography variant="h6" className="my-8 mx-auto">
            Sélectionnez un modèle
          </Typography>
          <div className="flex w-full mt-5">
            <div className="w-full mr-10">
              <Autocomplete
                className="right-0 w-full"
                placeholder={'Modèle'}
                options={modeles}
                value={currentModele}
                onChange={(_event, value) => setCurrentLabel(value)}
                getOptionLabel={(option) => option.label}
                renderInput={(params) => (
                  <TextField {...params} label={'Modele'} variant="outlined" />
                )}
              />
            </div>
            <div className="w-full mr-10">
              <Autocomplete
                options={emplacements}
                getOptionLabel={(option) => option.label}
                value={currentEmplacement} // Set value to currentEmplacement
                onChange={(__event, newValue) => {
                  setCurrentEmplacement(newValue);
                }}
                renderInput={(params) => <TextField {...params} label="Emplacement" variant="outlined" />}
              />
            </div>
            <div className="w-full mr-10">
              <Autocomplete
                options={sourceFinancieres}
                getOptionLabel={(option) => option.label}
                value={currentSourceFinanciere}
                onChange={(__event, newValue) => {
                  setCurrentSourceFinanciere(newValue);
                }}
                renderInput={(params) => <TextField {...params} label="Source Financière" variant="outlined" />}
              />
            </div>
            <div className="mr-10">
              <TextField
                label="Nombre"
                name="amount"
                value={amount}
                style={{ width: '75px' }} // Add this line

                onChange={(event) =>
                  setAmount(parseInt(event.target.value) || 0)
                }
              />
            </div>

            <div className="my-auto">
              <Button
                variant="contained"
                color="primary"
                onClick={generateTable}
              >
                Générer
              </Button>
            </div>
          </div>
          {displayTable && (
            <Fragment>
              <div className="mt-10">
                <TableContainer component={Paper}>
                  <Table
                    sx={{ minWidth: 650, width: '100%' }}
                    aria-label="simple table"
                  >
                    <TableHead>
                      <TableRow>
                        <TableCell align="left">Nom</TableCell>
                        <TableCell align="left">Numéro de série</TableCell>
                        <TableCell align="right">Adresse MAC</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {actifs.map((row, index) => (
                        <TableRow
                          key={'actif' + index}
                          sx={{
                            '&:last-child td, &:last-child th': {
                              border: 0,
                            },
                          }}
                        >
                          <TableCell align="left">
                            <TextField
                              value={row.nom} // Use the new 'name' property
                              onChange={(event) => {
                                const updatedActifs = [...actifs];
                                updatedActifs[index].nom = event.target.value; // Update the 'name' property
                                setActifs(updatedActifs);
                              }}
                            />
                          </TableCell>
                          <TableCell align="left">
                            <TextField
                              value={row.numero_serie}
                              onChange={(event) => {
                                const updatedActifs = [...actifs];
                                updatedActifs[index].numero_serie =
                                  event.target.value;
                                setActifs(updatedActifs);
                              }}
                            />
                          </TableCell>
                          <TableCell align="right">
                            <TextField
                              value={row.adresse_mac}
                              onChange={(event) => {
                                const updatedActifs = [...actifs];
                                updatedActifs[index].adresse_mac =
                                  event.target.value;
                                setActifs(updatedActifs);
                              }}

                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
              <div className="mt-5 flex justify-end">
                <Button variant="contained" color="primary" type="submit">
                  Sauvegarder
                </Button>
              </div>
            </Fragment>
          )}
        </div>
      </Fragment>
    </Form>
  );
};
export default ActifAddForm;
